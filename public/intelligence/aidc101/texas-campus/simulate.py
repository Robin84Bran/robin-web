"""Python 3, standard library. Rebuild results.csv and hourly.csv next to this file."""
import csv
import json
import math
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent
p = json.loads((ROOT / "inputs.json").read_text())
portfolios = ("Grid", "Grid + battery", "Grid + firm")
cases = ("On time", "Supply delay", "Shared substation delay")


def annual_payment(principal, years):
    rate = p["capital_rate"]
    return principal * rate / (1 - (1 + rate) ** -years) if rate else principal / years


def run(case, portfolio, trace):
    battery = portfolio == "Grid + battery"
    firm = portfolio == "Grid + firm"
    gate = p["substation_delay_days"] if case == cases[2] else 0
    upgrade = p["expansion_day"] + (p["supply_delay_days"] if case == cases[1] else 0)
    committed = p["shared_capex"]
    fixed = annual_payment(committed, p["capital_life_years"])
    if battery:
        committed += p["battery_capex"]
        fixed += annual_payment(p["battery_capex"], p["battery_life_years"])
        fixed += p["battery_capex"] * p["battery_annual_om_fraction"]
    if firm:
        committed += p["firm_connection_capex"]
        fixed += annual_payment(p["firm_connection_capex"], p["capital_life_years"])
    cost, soc, served, missed = fixed, 0., 0., 0.
    deadline = []
    for day in range(p["days"]):
        stamp = date.fromisoformat(p["start"]) + timedelta(days=day)
        live = day >= gate
        grid_cap = p["grid_base_mw"] + (p["grid_expansion_mw"] if day >= upgrade and not firm else 0)
        firm_block = (p["firm_stage_one_mw"] + (p["firm_stage_two_mw"] if day >= p["expansion_day"] else 0)) if firm else 0
        for hour in range(24):
            peak = p["peak_start_hour"] <= hour < p["peak_start_hour"] + p["peak_hours"]
            load = p["peak_load_mw"] if peak else p["offpeak_load_mw"]
            price = p["peak_wholesale_per_mwh"] if peak else p["offpeak_wholesale_per_mwh"]
            deliverable = min(load, p["campus_limit_mw"]) if live else 0
            contracted = min(firm_block, deliverable)
            grid = min(deliverable - contracted, grid_cap)
            charge = discharge = 0.
            if battery and live:
                if peak:
                    discharge = min(soc, p["battery_mw"], deliverable - contracted)
                    grid = min(grid_cap, deliverable - contracted - discharge)
                else:
                    charge = min(p["battery_mw"], grid_cap - grid,
                                 p["campus_limit_mw"] - grid - contracted,
                                 (p["battery_deliverable_mwh"] - soc) / p["round_trip_efficiency"])
                soc += charge * p["round_trip_efficiency"] - discharge
            delivered = grid + contracted + discharge
            assert -1e-8 <= soc <= p["battery_deliverable_mwh"] + 1e-8
            assert 0 <= delivered <= load and grid + charge <= grid_cap
            met = delivered / p["pue"]
            short = (load - delivered) / p["pue"]
            hourly_cost = (grid + charge) * price + firm_block * p["firm_take_or_pay_per_mwh"]
            hourly_cost += (grid + charge + contracted) * p["delivery_per_mwh_imported"]
            cost += hourly_cost
            served += met
            missed += short
            if day == p["deadline_day"] and peak:
                deadline.append(met)
            trace.writerow([case, portfolio, stamp, hour, load, grid, contracted, charge, discharge, soc, met, short, hourly_cost])
    assert math.isclose(served + missed, p["days"] * ((24-p["peak_hours"])*p["offpeak_load_mw"] + p["peak_hours"]*p["peak_load_mw"]) / p["pue"])
    return [case, portfolio, min(deadline), round(missed, 3), round(cost / served, 2) if served else "", committed, round(cost, 2), round(served, 3)]


if __name__ == "__main__":
    with (ROOT / "hourly.csv").open("w", newline="") as hourly, (ROOT / "results.csv").open("w", newline="") as summary:
        trace, out = csv.writer(hourly), csv.writer(summary)
        trace.writerow("scenario,portfolio,date,hour_fixed_CST,requested_facility_MW,grid_to_load_MWh,firm_to_load_MWh,grid_to_charge_MWh,battery_to_load_MWh,ending_deliverable_SOC_MWh,served_IT_MWh,unserved_IT_MWh,variable_cost_USD".split(","))
        out.writerow("scenario,portfolio,deadline_peak_IT_MW,unserved_IT_MWh,cost_USD_per_served_IT_MWh,committed_USD,total_year_cost_USD,served_IT_MWh".split(","))
        for case in cases:
            for portfolio in portfolios:
                out.writerow(run(case, portfolio, trace))
