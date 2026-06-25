---
title: "RoboAtlas: Contextual Active SLAM"
date: 2026-06-26
authors: "Alexander Schperberg, Shivam K. Panda, Abraham P. Vinod, M. K. Jawed, et al."
venue: "arXiv 2606.26046"
link: "https://arxiv.org/abs/2606.26046"
tags: [robotics, slam, embodied-ai, vlm]
gist: "Uses a contextual multi-armed bandit to adaptively balance frontier-based exploration against VLM-guided semantic navigation over a scalable 3D semantic map — strong real-robot navigation results."
---

## Core idea

Combines classical frontier exploration with egocentric VLM reasoning and a global 3D semantic
map (OpenRoboVox); the bandit shifts the robot from exploration to semantically-guided
navigation as understanding improves. 90.6% on GOAT-Bench Val Unseen (+17.8pp), runs on a real
Unitree Go2 in 1800m² spaces — suggesting semantic grounding can matter more than model size.