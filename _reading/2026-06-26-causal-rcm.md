---
title: "Causal-rCM: A Unified Teacher-Forcing and Self-Forcing Open Recipe for Autoregressive Diffusion Distillation in Streaming Video Generation and Interactive World Models"
date: 2026-06-26
authors: "Kaiwen Zheng, Guande He, Min Zhao, Jintao Zhang, et al."
venue: "arXiv 2606.25473"
link: "https://arxiv.org/abs/2606.25473"
tags: [world-models, video-diffusion, distillation, efficiency]
gist: "Pairs teacher-forcing (offline) and self-forcing (on-policy) as complementary phases to distill autoregressive video diffusion — reaching SOTA VBench-T2V with just 2-step inference, enabling interactive world models."
---

## Core idea

Extends rCM to the autoregressive video setting: TF-based continuous-time CMs + SF-based DMD,
via a custom masked FlashAttention-2 JVP kernel for efficient causal training. ~10× faster
convergence; 2-step generation on a 1.3B model; applied to streaming video + action-conditioned
world models (Cosmos). Hits my world-models + inference-efficiency interests at once.