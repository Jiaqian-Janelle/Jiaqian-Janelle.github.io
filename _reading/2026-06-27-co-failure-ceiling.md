---
title: "When Does Combining Language Models Help? A Co-Failure Ceiling on Routing, Voting, and Mixture-of-Agents"
date: 2026-06-27
authors: "Josef Chen"
venue: "arXiv 2606.27288"
link: "https://arxiv.org/abs/2606.27288"
tags: [multi-agent, ensembling, routing, llm]
gist: "Argues a 'co-failure ceiling' caps routing / voting / mixture-of-agents gains across 67 frontier models: when models fail on the same inputs, combining them recovers little — bounding how far multi-model systems can scale."
---

## Core idea

Routing, voting, and mixture-of-agents only help to the extent that models fail on *different* inputs. Across 67 frontier models, correlated (shared) failures impose a ceiling on the achievable gain from combining them — a useful sanity check before investing in multi-model orchestration.

**Why flagged:** the author, Josef Chen, is co-founder and CEO of [kaikaku.ai](https://www.kaikaku.ai/) — a London startup using robotics and AI to automate restaurant operations (food-assembly robots, ~$1.8M seed). Flagged for the founder angle: a frontier-AI researcher also running a physical-AI / robotics startup.
