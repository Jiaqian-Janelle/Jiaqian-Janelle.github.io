---
title: "Deep Residual Learning for Image Recognition"
date: 2026-06-22
authors: "He, Zhang, Ren, Sun"
venue: "CVPR 2016"
link: "https://arxiv.org/abs/1512.03385"
rating: 4
tags: [vision, optimization, skip-connections]
gist: "Residual connections made very deep networks trainable — a trick now everywhere, including transformers."
---

## One-line summary

Instead of learning a mapping directly, learn the *residual* from the input,
so identity is the easy default and depth stops hurting optimisation.

## Notes

- The degradation problem: deeper plain networks did *worse*, not just from
  overfitting but from harder optimisation.
- Skip connections give gradients a clean path backward — the reason the idea
  shows up far outside vision.

## Connection to today

Worth noting how directly this feeds into the residual streams in modern
transformer blocks. Same idea, different domain.
