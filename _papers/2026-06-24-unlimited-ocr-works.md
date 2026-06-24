---
title: "Unlimited OCR Works: Welcome the Era of One-shot Long-horizon Parsing"
date: 2026-06-24
authors: "Baidu Inc."
venue: "Technical Report, 2026"
link: "https://github.com/baidu/Unlimited-OCR"
tags: [ocr, long-context, efficiency, attention, kv-cache]
gist: "Replaces decoder attention with a Reference Sliding Window Attention that keeps the KV cache constant, letting an OCR model transcribe dozens of pages in a single forward pass without the usual slowdown."
---

## Status

Started 2026-06-24.

## The problem

End-to-end OCR with an LLM decoder (e.g. DeepSeek OCR) benefits from the language prior,
but as output length grows the KV cache balloons — memory goes up and generation slows down.
Humans don't slow down like this on long copying tasks; the paper wants to close that gap.

## The idea

Take DeepSeek OCR as the baseline and replace all decoder attention layers with **Reference
Sliding Window Attention (R-SWA)**, which cuts attention cost while keeping the KV cache
*constant* throughout decoding. Combined with the encoder's high compression rate, the model
can transcribe dozens of pages in one forward pass at 32K max length.

## Why it's interesting to me

R-SWA is pitched as a general parsing-attention mechanism, not OCR-specific — they claim it
transfers to ASR, translation, etc. The constant-KV-cache angle connects directly to the
efficiency side of what I care about.

## My notes (to fill in)

-