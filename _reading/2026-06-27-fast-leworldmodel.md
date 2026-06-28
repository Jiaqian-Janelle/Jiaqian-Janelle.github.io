---
title: "Fast LeWorldModel"
date: 2026-06-27
authors: "Yuntian Gao, Xiangyu Xu"
venue: "arXiv 2606.26217"
link: "https://arxiv.org/abs/2606.26217"
tags: [world-models, jepa, planning, embodied-ai]
gist: "Speeds up LeWM visual planning by swapping step-by-step latent rollouts for action-prefix prediction — encode an action prefix and predict the resulting future latent in parallel, cutting planning time and slowing latent-error growth over long horizons."
---

## Core idea

JEPA-style world models like LeWM plan via expensive one-step autoregressive latent rollouts, which accumulate error and are slow over long horizons. Fast-LeWM trains with prefix-level supervision: encode a whole action prefix and directly predict the latent reached after executing it, at multiple horizons in parallel — at planning time only the final prefix token is needed to score a future latent, no intermediate traversal. Reports higher average success, much lower planning time, and open-loop latent loss that grows far slower with horizon.

(Direct follow-up to my LeWM experiments — worth reading closely.)
