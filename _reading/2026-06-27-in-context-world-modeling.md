---
title: "In-Context World Modeling for Robotic Control"
date: 2026-06-27
authors: "Siyin Wang, Junhao Shi, Senyu Fei, Zhaoyang Fu, et al."
venue: "arXiv 2606.26025"
link: "https://arxiv.org/abs/2606.26025"
tags: [world-models, vla, embodied-ai, in-context-learning]
gist: "Treats system identification as in-context adaptation: feed a VLA a short window of task-agnostic self-generated interactions so it infers the current system's dynamics and adapts zero-shot to new camera viewpoints and robot morphologies — no fine-tuning."
---

## Core idea

VLAs fail to generalize to novel execution contexts (new viewpoints, new robot bodies) because they condition only on the current observation and instruction, implicitly assuming the training setup. ICWM runs a short history of self-generated, task-agnostic interactions through the model's context window — in-context demonstrations of *system properties* rather than of the task — letting it implicitly learn the current dynamics and adapt without weight updates. Reported to beat standard VLA baselines on unseen viewpoints in sim and on real robots.
