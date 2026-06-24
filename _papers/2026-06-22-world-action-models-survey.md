---
title: "World Action Models: A Survey — Dream Less, Act More"
date: 2026-06-22
authors: "Qiuhong Shen, Shihua Zhang, Yue Liao, et al. (NUS)"
venue: "Survey, 2026"
link: "https://world-action-models.github.io/"
tags: [world-models, action-models, survey, embodied-ai]
gist: "Surveys World Action Models — predictive-action models that make a forecast of the future usable for control — and argues the field is moving toward generating less of the future while keeping what control actually needs."
---

## Status

Started 2026-06-22, still reading.

## What it's about

World Action Models (WAMs) are embodied predictive-action models: they forecast the
future in a form that can be turned into action. The survey argues the field has gotten
blurry — broad world models, video generation models, action-grounded video world
models, VLA policies, and WAMs all overlap — and tries to give everyone a shared vocabulary.

## How it organizes the field (two views)

- **What must be generated:** rendered futures vs. latent futures vs. video-generation-free
  action reasoning.
- **How a method is built:** decomposed by predictive substrate, backbone, action coupling,
  and deployment regime.

## The takeaway I want to remember

WAMs aren't just video generators with an action head. Their design choices trade
representational richness against compute, memory, latency, and action-label cost — and the
trend is "dream less, act more": generate less of the future, preserve what control requires.

## My notes (to fill in)

-