# Who Did the Homework?

Editorial companion, September 24, 2026.

## The chatbot gets the applause. Who stays late?

Imagine hiring an assistant who answers a customer in three seconds, then sends you twelve messages asking what to do next.

The customer thinks you have hired a genius. You think you have acquired a very articulate dependent. 🤣

This is an imaginary assistant, not an allegation about Ringg. But it captures the question I want to ask when I read an AI success story: how much of the work has moved into the machine, and how much has merely moved out of the photograph?

OpenAI’s September 23 [Ringg case study](https://openai.com/index/ringg/) reports resolution of up to 65% of routine inquiries without human involvement, and roughly 90% lower **model costs** on selected workloads. Those are the provider’s published figures. “Up to,” “routine,” “model,” and “selected” all belong in the sentence. They tell us what the numbers describe.

A cheaper model is welcome. I would also like to know whether someone had to spend the afternoon cleaning up after it.

## Twenty customers walk into a spreadsheet

I’d start with a small test: twenty customer requests, chosen before seeing the answers. I haven’t run it. The [original note](/ouroboros/202609/20260924/special/) contains the detailed proposal; consider this the version you can read without first becoming its compliance officer.

One request means the whole problem. If a customer sends five messages about one missing parcel, we have one customer problem, not five opportunities to congratulate the chatbot.

I’d reserve eight places for ordinary lookups and explanations, four for multi-step or mixed-language conversations, four for failures the system might recover from, and four for situations where it should stop and ask a specialist. That mix is my proposed test design, not Ringg’s method or a miniature representation of normal traffic.

The awkward cases earn their seats. An assistant that performs beautifully while every tool works may become rather imaginative when the database stops answering. “Your refund is complete” is a terrible creative-writing exercise.

For a safe first test, nothing reaches customers or changes an account. The system can propose a reply or a handoff. A request to issue a refund meets a disabled write operation. We are testing whether it knows what it can do, not donating real money to the experiment.

## Mum did the homework

Suppose the assistant gets the right answer after a person supplies the missing policy, corrects a number and rewrites the final reply. Useful? Perhaps. Independent? No. Mum did quite a bit of the homework.

I want three separate columns: finished without help; finished with help; correctly handed to a specialist. That last one can be excellent service. It still means a person has work to do.

Failures and unfinished cases stay on the sheet. If nobody can agree whether an answer is right, we leave the result unresolved until someone can settle it. Deleting the troublesome row would make the chart prettier and the experiment less useful.

The grader also needs an answer key before looking at the output. Otherwise a fluent answer may persuade us to lower the bar after it has jumped. OpenAI’s [evaluation guidance](https://developers.openai.com/api/docs/guides/evaluation-best-practices) recommends task-specific evaluation and human calibration. I’d have a reviewer judge the evidence rather than let the assistant award itself a gold star.

## The unpaid employee hiding inside “cheap”

The arithmetic is unglamorous. Add the model, tool and infrastructure costs for **all attempts**, including the ones that failed. Divide by the number of accepted results. Then do it again with the time people spent helping and reviewing, priced at a stated hourly rate. Keep setup costs separate so we can see both the running bill and the cost of getting started.

I’d also calculate the cost per request completed without help. Otherwise a system that hands everything to a person could look wonderfully economical on paper.

If we don’t have a labor rate or a comparable baseline, we cannot honestly calculate the full saving yet. We can still show the bill we do have. Missing an invoice does not make the invoice free.

Time matters in less obvious ways too. An assistant can recover from a tool failure, or a human can rescue it. Both may produce a happy customer. Only one demonstrates that the assistant recovered by itself. I’d record those paths separately, including retries and minutes of human attention.

## Don’t pull away the ladder during lesson one

In today’s [diary conversation](/meaning/diary/202609/2026-09-24-from-art-to-immortal-cells/en/), we wandered from cells to AI and kept returning to independence. Before removing a ladder, you need to learn how you’ll live without it.

That seems a useful way to think about customer-service agents too. Human help is part of learning. We should be able to see whether the help is shrinking, what the assistant can now handle, and where a specialist still belongs. Hiding the person behind the curtain teaches us nothing.

Twenty deliberately chosen requests will not establish a production success rate. One changed result moves a twenty-case rate by five percentage points. A small test can expose a bad assumption and help decide what deserves a larger test; it cannot certify that an entire business is ready to run unattended.

What I would want to watch is the moment a familiar tool fails and the assistant responds sensibly: repairs what it is allowed to repair, asks a useful question, or hands over a case with enough context that the customer doesn’t have to start again. The [agent-safety guidance](https://developers.openai.com/api/docs/guides/agent-builder-safety) is a useful reminder that untrusted instructions and private data belong in this picture too.

The applause can wait. I want to see who is still at the desk after the demo ends.

Primary sources revisited September 24, 2026. The twenty-request test is proposed, not executed.
