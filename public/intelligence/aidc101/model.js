export function schedule(grid=9, arrival=9, cooling=9) {
  const transformer = Math.max(6, arrival) + 1;
  const ends = [grid, transformer, 8, 8, cooling, 9];
  const gate = Math.max(...ends);
  return {g:grid,a:arrival,c:cooling,tx:transformer,ends,gate,finish:gate+1};
}
