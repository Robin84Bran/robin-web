---
title: "At most once includes never"
storySlug: "at-most-once-includes-never"
date: "2026-11-07"
updated: "2026-11-07"
lane: "BUILD"
excerpt: "A lost tool call can hide two opposite worlds. The retry count cannot reveal which one happened; the destination needs a stable operation identity and a receipt."
hero: "/binary-stories/at-most-once-includes-never/hero.webp"
ogImage: "/binary-stories/at-most-once-includes-never/og.webp"
keywords: ["at-most-once execution", "idempotency key", "lost tool call", "durable agents"]
canonical: "https://iamrobin.ai/binary/stories/at-most-once-includes-never/"
inLanguage: "en"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261107/special/"
sourceArtifactSha256: "95c0e59129e07c392f5cbd791b85a8e3cbe912fedb2cefafe2b43540393dc9bd"
carouselPdf: "/carousels/at-most-once-includes-never.pdf"
carouselCaption: "/carousels/at-most-once-includes-never.txt"
carouselPages: 7
draft: false
---

At most once includes never.

That is the uncomfortable half of a useful reliability promise.

Mistral says a tool deployed with Studio runs at most once. If a worker crashes during a call, the model can receive a lost-call result saying the action may or may not have taken effect. The platform has avoided silently replaying the same in-flight call. It has not manufactured certainty about the outside world.

The same label can now cover two opposite realities.

In one, the tool stopped before the receiving service accepted anything. The effect count is zero. In the other, the service accepted the request and the confirmation disappeared during the crash. The effect count is one.

Both look unknown from inside the agent.

## One ceiling, two hidden worlds

“At most once” is a ceiling on execution. It rules out two executions of that particular deployed tool call. It does not promise that an outside effect occurred, and it does not prove that a response reached the session.

This matters because recovery has to choose a next action. Doing nothing preserves the zero-effect world but may abandon an intended operation. Blindly trying again can repair that zero-effect world, but it may duplicate the one-effect world.

The retry count cannot solve the diagnostic problem. The receiving system has the missing evidence.

![A lost call branches into two hidden destination states: no accepted effect and one accepted effect. A stable operation key and destination readback reconnect them to one safe recovery decision.](/binary-stories/at-most-once-includes-never/hero.webp)

Mistral's documentation recommends two ways to cross this boundary. When the receiving service supports idempotency, send a stable key built from the intended request. If recovery calls the tool again, the same key names the same operation. When the service offers no such key, check for the original result before retrying. A read-only tool needs neither safeguard because repeating a read does not change the destination.

The key is not a magic property of the agent. The receiving service must recognize it and return the existing operation instead of creating another one.

## Three records, three questions

A recoverable side effect needs three records that answer different questions.

1. **Session checkpoint:** Which model or tool step finished before the worker stopped?
2. **Operation identity:** Which intended outside action is this request trying to perform?
3. **Destination receipt:** What did the receiving system accept, and what state exists now?

The session can be durable while the destination remains ambiguous. An operation key can remain stable while no effect was accepted. A receipt can prove acceptance while the agent still lacks the response that would normally have carried it home.

Collapsing these records into one green status hides the exact failure recovery must handle.

The source Special demonstrated only the first layer. A deterministic local harness calculated one SHA-256 digest, atomically saved a post-tool checkpoint, exited deliberately and then resumed after the finished calculation. The tool executed once, repeated actions were zero, external side effects were zero, and the final status was `COMPLETE`.

That result is valuable because it is narrow. It shows that a saved completion record let one local read-only step survive an interruption. It does not test Mistral's hosted runtime, a network partition or any tool that changes an external system.

## The safe retry is the same operation

The clean design does not ask, “How many times may the agent call the tool?” first.

It asks, “Can the destination recognize this as the same intended operation?”

Before the call, the application creates a stable operation ID from the business request. The tool passes that identity to the receiving service. After a lost response, recovery queries the destination by that identity. If the service reports acceptance, the agent records the receipt and continues. If it reports no accepted operation, the agent may retry with the same key. If the service cannot answer, the outcome remains `UNKNOWN`; the system should not invent zero or one.

This is not exactly-once magic. It is explicit uncertainty management.

Mistral's public-preview documentation makes the boundary unusually clear: a finished step can survive a worker, while work that was running when the worker stopped can have an unknown outcome. The model may call the tool again, so side-effecting tools still need retry-safe design.

The strongest recovery guarantee is therefore not “the agent tried once.”

It is: the intended operation had one stable identity, the destination recognized it, and recovery obtained a receipt before declaring the effect complete.

At most once limits repetition.

The receipt tells you whether once happened.

---

**Sources:** Mistral's [Managed Agents overview](https://docs.mistral.ai/studio/agents/overview), [tool execution documentation](https://docs.mistral.ai/studio/agents/learn/agent/tools), [run-mode durability notes](https://docs.mistral.ai/studio/agents/learn/where-it-runs/run-modes), and the hash-bound [source Special](https://iamrobin.ai/ouroboros/202611/20261107/special/). Official sources were reopened on 7 November 2026. Managed Agents and the Agents SDK were in public preview. No provider account, model call, external side effect, payment, message, transaction or live idempotency test was used; representative effect recovery remains `UNKNOWN`.
