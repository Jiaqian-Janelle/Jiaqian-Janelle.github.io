---
title: "Attention Is All You Need"
date: 2026-06-23
authors: "Vaswani et al."
venue: "NeurIPS 2017"
link: "https://arxiv.org/abs/1706.03762"
rating: 5
tags: [transformers, architecture, classic]
gist: "The paper that replaced recurrence with self-attention and set the template for everything since."
---

## Why I read it

Re-reading the foundation. Wanted to revisit the exact form of scaled
dot-product attention before working through some newer variants.

## Key ideas

- Self-attention lets every token attend to every other token in one step,
  removing the sequential bottleneck of RNNs.
- Multi-head attention runs several attention computations in parallel so the
  model can attend to different kinds of relationships at once.
- Positional encodings inject order information that attention alone would
  otherwise ignore.

## What stuck with me

The whole architecture is strikingly simple once the attention block is in
place — most of the design is about stacking and normalising that one
operation cleanly.

## Open questions for me

- How much of the original positional-encoding scheme survives in modern models?
- Where does the quadratic cost actually start to hurt in practice?
