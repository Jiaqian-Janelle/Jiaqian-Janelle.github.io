---
title: "Survey: on-policy distillation for LLMs"
date: 2026-06-25
tags: [survey, auto]
---
_Auto-generated literature survey · 16 papers · 2026-06-25_

## Abstract

This survey covers **on-policy distillation for LLMs** across 16 papers retrieved from arXiv, Semantic Scholar, OpenAlex and PubMed. It compares methods, traces trends, profiles datasets from first-hand sources, identifies gaps, and lists candidate directions for human evaluation. Facts are linked; unverifiable items are marked.

## Method comparison

| # | Paper (year) | Object / Modality | Method category | Core innovation | Reported results | Limitations |
|---|---|---|---|---|---|---|
| 1 | MiniLLM: On-Policy Distillation of Large Language … (2023) | language | on-policy knowledge distillation for LLMs | Replace forward KLD with reverse KLD in KD objective for generative models; derive on-poli… | REQUIRES FULL TEXT | NOT IN SOURCE |
| 2 | On-Policy Distillation of Language Models: Learnin… (2023) | Language (auto-regressive LLMs) | On-Policy Distillation | Generalized Knowledge Distillation (GKD) trains student models on self-generated output se… | REQUIRES FULL TEXT | NOT IN SOURCE |
| 3 | X-OPD: Cross-Modal On-Policy Distillation for Capa… (2026) | speech and text (cross-modal) | on-policy distillation with cross-modal teacher-student alignment | X-OPD framework enabling Speech LLM to explore its own distribution via on-policy rollouts… | REQUIRES FULL TEXT | NOT IN SOURCE |
| 4 | Self-Distilled Reasoner: On-Policy Self-Distillati… (2026) | language | on-policy self-distillation | On-Policy Self-Distillation (OPSD): a single LLM acts as both teacher and student with dif… | REQUIRES FULL TEXT | NOT IN SOURCE |
| 5 | DP-OPD: Differentially Private On-Policy Distillat… (2026) | language | on-policy distillation with differential privacy | DP-OPD enforces privacy solely through DP-SGD on the student while leveraging a frozen tea… | Perplexity improvements under ε=2.0: Yelp 44.15→41.68; BigPatent 32.43→30.63 | NOT IN SOURCE |
| 6 | Black-Box On-Policy Distillation of Large Language… (2025) | language | adversarial on-policy distillation | Generative Adversarial Distillation (GAD): frames student LLM as generator and trains disc… | Qwen2.5-14B-Instruct becomes comparable to GPT-5-Chat on LMSYS-Chat automatic evaluation; … | NOT IN SOURCE |
| 7 | On-Policy Context Distillation for Language Models (2026) | language | on-policy distillation with context conditioning | On-Policy Context Distillation (OPCD) framework that trains a student model on its own gen… | REQUIRES FULL TEXT | NOT IN SOURCE |
| 8 | Entropy-Aware On-Policy Distillation of Language M… (2026) | language | on-policy distillation with entropy-aware objective mixing | Augmenting reverse KL (mode-seeking) with forward KL (mode-covering) during on-policy dist… | Pass@8 accuracy gains: +1.37 (Qwen3-0.6B-Base), +2.39 (Qwen3-1.7B-Base), +5.05 (Qwen3-4B-B… | NOT IN SOURCE |
| 9 | Hybrid Policy Distillation for LLMs (2026) | Language (LLM text generation) | Hybrid Policy Distillation with On-Policy Sampling | Hybrid Policy Distillation (HPD) integrates forward and reverse KL divergence to balance m… | REQUIRES FULL TEXT | NOT IN SOURCE |
| 10 | Trust Region On-Policy Distillation (2026) | language | on-policy distillation with trust region optimization | Trust Region On-Policy Distillation (TrOPD) addresses instability in OPD under distributio… | REQUIRES FULL TEXT | NOT IN SOURCE |
| 11 | On the Geometry of On-Policy Distillation (2026) | language | on-policy distillation analysis & geometric characterization | Parameter-space geometric analysis of on-policy distillation (OPD) for LLMs, revealing sub… | REQUIRES FULL TEXT | NOT IN SOURCE |
| 12 | Rubric-based On-policy Distillation (2026) | language | rubric-based on-policy distillation | ROPD framework that replaces teacher logits with structured semantic rubrics induced from … | outperforms advanced logit-based OPD methods across most scenarios; up to 10x gain in samp… | NOT IN SOURCE |
| 13 | On the Position Bias of On-Policy Distillation (2026) | language | on-policy distillation with importance weighting | Importance-Weighted On-Policy Distillation (IW-OPD): a principled approach that assigns to… | up to 6.9 points improvement on AIME-2025; faster convergence and better learning efficien… | NOT IN SOURCE |
| 14 | ReNIO: Reweighting Negative Trajectory Importance … (2026) | language | on-policy trajectory reweighting for distillation | ReNIO reweights student-generated outputs using student-to-teacher probability ratios to i… | up to 8.90% relative gain for Qwen3-1.7B and 10.00% for R1-Distill-Qwen-7B on mathematical… | NOT IN SOURCE |
| 15 | Extreme Region Policy Distillation (2026) | language (LLM) | two-stage on-policy distillation with trust-region constraints | ERPD decouples sample efficiency from KL efficiency via: (1) weakly constrained off-policy… | REQUIRES FULL TEXT | NOT IN SOURCE |
| 16 | ORPO-Distill: Mixed-Policy Preference Optimization… (2025) | language | on-policy preference optimization distillation | Mixed-policy strategy for on-policy student-generated outputs combined with Odds-Ratio Pre… | REQUIRES FULL TEXT | NOT IN SOURCE |

## Trend analysis

### Trend Analysis: On-Policy Distillation for LLMs

The field of on-policy distillation for large language models emerged as a coherent research direction in 2023 with two foundational contributions that identified a core problem: standard off-policy knowledge distillation creates distribution mismatch when students generate sequences outside the teacher's training distribution. MiniLLM: On-Policy Distillation of Large Language Models (2023) provided the first principled solution by replacing forward KL with reverse KL in the distillation objective, deriving an on-policy optimization approach that prevents students from overestimating teacher probability in low-probability regions. Simultaneously, On-Policy Distillation of Language Models: Learning from Self-Generated Mistakes (2023) introduced Generalized Knowledge Distillation (GKD), which trains students on their own output sequences using teacher feedback, demonstrating that flexible loss functions could be integrated with RLHF. These two 2023 papers established the fundamental insight that on-policy sampling from student distributions enables more faithful knowledge transfer than static offline datasets.

The period from 2024-2025 saw refinement and specialization of the core on-policy distillation framework. ORPO-Distill: Mixed-Policy Preference Optimization for Cross-Architecture LLM Distillation (2025) and Black-Box On-Policy Distillation of Large Language Models (2025) represented critical turning points by relaxing assumptions about teacher accessibility and loss function design. The GAD framework in the latter paper introduced adversarial training where a discriminator provides adaptive, evolving feedback rather than fixed teacher logits, fundamentally shifting from supervised imitation toward co-evolutionary dynamics. These papers revealed that on-policy distillation could operate with weaker supervision signals—preference pairs or discriminator scores rather than full probability distributions—expanding applicability beyond white-box teacher scenarios.

The 2026 wave of publications introduced substantial methodological diversity, creating at least three distinct schools of approach. The first school focuses on refining the reverse KL objective under realistic conditions. Trust Region On-Policy Distillation (2026) identified critical instability problems arising from distribution mismatch despite on-policy sampling, proposing trust-region constraints and outlier estimation via gradient clipping to handle unreliable supervision regions. Similarly, On the Position Bias of On-Policy Distillation (2026) discovered that token-level distribution divergence between student and teacher accumulates across sequence position, introducing importance weighting to upweight early tokens with lower divergence. (synthesis) This represents recognition that on-policy distillation does not eliminate distribution mismatch entirely; it only shifts where misalignment occurs, from the full trajectory distribution to per-token divergence during rollout generation.

A second methodological school emerged around entropy-aware and hybrid objectives. Entropy-Aware On-Policy Distillation of Language Models (2026) augments reverse KL with forward KL when teachers exhibit high entropy, explicitly balancing mode-seeking and mode-covering behavior to preserve generation diversity. Hybrid Policy Distillation for LLMs (2026) similarly combines forward and reverse KL while incorporating lightweight approximate on-policy sampling at the token level, reformulating KD as reweighted log-likelihood. (synthesis) These approaches acknowledge a fundamental trade-off: pure reverse KL preserves teacher mode structure but risks mode collapse in student rollouts; forward KL encourages coverage but can dilute precise imitation of high-probability teacher actions. The trend toward mixing objectives reflects maturation beyond single-objective frameworks.

A third school emphasizes structural and geometric insights. On the Geometry of On-Policy Distillation (2026) provided parameter-space analysis revealing that cumulative on-policy updates enter a narrow low-dimensional "locked subspace," distinct from supervised fine-tuning and reinforcement learning from verified rewards. This geometric characterization suggests on-policy distillation occupies a unique optimization regime where training efficacy depends on subspace properties rather than conventional learning curves. Additionally, ReNIO: Reweighting Negative Trajectory Importance for LLM On-Policy Distillation (2026) and Rubric-based On-policy Distillation (2026) demonstrate that on-policy distillation can extract learning signals from failure cases and structured semantic descriptions respectively, moving beyond the assumption that only successful teacher trajectories provide supervision.

Architectural and modality extensions appeared in 2026. X-OPD: Cross-Modal On-Policy Distillation for Capability Alignment in Speech LLMs (2026) extended on-policy distillation to multi-modal settings where text-based teachers evaluate speech LLM rollouts, establishing that reverse KL objectives can guide cross-modal knowledge transfer. Self-Distilled Reasoner: On-Policy Self-Distillation for Large Language Models (2026) introduced single-model self-distillation where privileged information (verified reasoning traces) conditions the teacher context while student sees only questions, eliminating

## Dataset analysis

### Usage frequency (source: surveyed papers)

| Dataset | Mentions |
|---|---|
| Yelp | 1 |
| BigPatent | 1 |
| LMSYS-Chat | 1 |
| AIME-2025 | 1 |

### First-hand dataset profiles (source: each dataset's own paper)

**Yelp** — mentions: 1 · unverified
- size: unverified
- modality: unverified
- annotation: unverified
- access: unverified
- caveats: unverified

**BigPatent** — mentions: 1 · [source](http://arxiv.org/abs/1906.03741v1)
- size: 1.3 million records
- modality: text
- annotation: human written abstractive summaries
- access: unverified
- caveats: unverified

**LMSYS-Chat** — mentions: 1 · [source](https://arxiv.org/abs/2309.11998)
- size: 1 million conversations
- modality: text
- annotation: unverified
- access: publicly available
- caveats: collected from 210K unique IP addresses from Vicuna demo and Chatbot Arena website (potential population/site bias)

**AIME-2025** — mentions: 1 · unverified
- size: unverified
- modality: unverified
- annotation: unverified
- access: unverified
- caveats: unverified

### Recent dataset candidates (last 1-2 years)

- [Generative Dataset Distillation: Balancing Global Structure and Local Details](http://arxiv.org/abs/2404.17732v1) (2024)
- [DD-RobustBench: An Adversarial Robustness Benchmark for Dataset Distillation](http://arxiv.org/abs/2403.13322v3) (2024)

### Metric conventions & analogues

### (d) Evaluation-metric conventions & suitability

On-policy distillation for LLMs typically relies on task-specific metrics inherited from their source benchmarks. For Yelp and BigPatent, standard practice uses ROUGE and BERTScore to measure summary quality, though these reference-based metrics can mislead when student outputs diverge stylistically from gold references while preserving semantic content—a common outcome under on-policy sampling where the student explores its own modes (synthesis). LMSYS-Chat and similar conversational benchmarks default to human preference judgments or proxy metrics like win-rate comparisons, which better capture alignment but suffer from high annotation cost and evaluator disagreement (synthesis). AIME-2025, being a mathematics benchmark, uses exact-match accuracy, which is appropriate for symbolic tasks but masks partial credit and intermediate reasoning quality—particularly problematic if distillation prioritizes speed over solution completeness (synthesis). A broader pitfall across all four: on-policy sampling generates diverse outputs not present in original datasets, making coverage-based metrics (BLEU, exact match) systematically underestimate student quality compared to reference-based evaluation alone (synthesis).

### (e) Cross-domain analogous benchmarks worth borrowing

(Speculation) Legal and scientific document summarization benchmarks (e.g., from contract law or biomedical literature) could usefully inform distillation evaluation on BigPatent, since both demand technical precision and long-form abstractive reasoning under constrained output length. (Speculation) Conversational reasoning benchmarks from multi-turn dialogue systems and task-oriented dialogue corpora offer established protocols for measuring coherence and goal fulfillment that might transfer to LMSYS-Chat evaluation beyond win-rate metrics. (Speculation) High-school mathematics competition datasets and problem-solving trajectories (analogous in difficulty tier to AIME) could provide intermediate evaluation checkpoints, allowing practitioners to distinguish whether student degradation stems from reasoning capacity or mathematical knowledge distillation specifically.

## Research gaps _(synthesis)_

### Synthesis

The field of on-policy distillation for LLMs shows substantial methodological diversity but reveals several significant gaps between current work and practical deployment challenges.

**Method combination gaps** constitute the most immediate research opportunity. While individual techniques like entropy-aware objective mixing, importance weighting, and trust region optimization have been explored independently, no work systematically investigates their interactions when combined. The stated future work mentions two-stage on-policy distillation with trust-region constraints, suggesting researchers recognize that sequential application of multiple techniques remains understudied. Similarly, the combination of on-policy distillation with differential privacy and cross-modal alignment has not been explored together, despite privacy and multimodal capabilities becoming increasingly central to production LLM systems.

**Adversarial robustness in on-policy settings** remains largely unaddressed. While adversarial on-policy distillation appears as a category, no work describes how distilled student models maintain robustness properties learned from teacher distributions when sampling on-policy introduces distribution shift. The geometric characterization work hints at understanding policy divergence, but how adversarial perturbations propagate through on-policy sampling processes remains unexplored.

**Data limitations create substantial practical barriers**. The reliance on unverified datasets (Yelp, BigPatent, AIME-2025) means researchers cannot establish ground truth for model performance on these benchmarks. LMSYS-Chat's documented population and site bias—originating from 210K IP addresses concentrated on specific demo platforms—raises questions about whether distillation methods optimized on this data generalize to broader user populations. No stated future work addresses collection of verified, representative datasets specifically designed to evaluate on-policy distillation across diverse linguistic or domain distributions.

**Context conditioning remains underdeveloped**. On-policy distillation with context conditioning exists as a category but lacks specification of which context dimensions matter for distillation performance. It is unknown whether context conditioning primarily benefits from teacher guidance, student adaptation, or both, and how context-specific on-policy sampling should be scheduled during training.

**Preference optimization integration is incomplete**. On-policy preference optimization distillation appears as a method category, but the interaction between preference signals (typically from human feedback or reward models) and on-policy sampling trajectories lacks theoretical grounding. How preference-based objectives align with on-policy distribution shifts during distillation remains unclear.

**Scalability and computational trade-offs are unexplored**. On-policy sampling by definition requires running the student model to generate trajectories, creating computational overhead absent in off-policy distillation. No work quantifies this cost across model scales or provides principled guidance on when on-policy distillation becomes preferable to off-policy alternatives, despite this being central to practical adoption decisions.

## Candidate directions — require human evaluation, not conclusions

### Candidate 1: Systematic ablation study of combined on-policy techniques (entropy-aware mixing + importance weighting + trust-region constraints) with interaction effect analysis across model scales (1B–70B)
- ① **Idea:** Systematic ablation study of combined on-policy techniques (entropy-aware mixing + importance weighting + trust-region constraints) with interaction effect analysis across model scales (1B–70B)
- ② **Gap it fills:** Method combination gaps; scalability trade-offs
- ③ **Why feasible now:** Recent open-source implementations of trust-region constrained RL (e.g., PPO variants in TRL library) and entropy regularization in transformers make controlled combination tractable; compute-efficient distillation baselines now reduce experimental cost
- ④ **Difficulty / risk:** High dimensionality of interaction space requires factorial design or Bayesian optimization; risk of null interaction findings limiting impact; reproducibility across hardware setups remains challenging

### Candidate 2: Benchmark on-policy distillation generalization using held-out verified datasets (e.g., curated subsets of MMLU, MT-Bench with expert validation) separate from LMSYS-Chat, with analysis of performance degradation under domain shift
- ① **Idea:** Benchmark on-policy distillation generalization using held-out verified datasets (e.g., curated subsets of MMLU, MT-Bench with expert validation) separate from LMSYS-Chat, with analysis of performance degradation under domain shift
- ② **Gap it fills:** Data limitations; ground truth establishment
- ③ **Why feasible now:** Expert-annotated LLM evaluation datasets (MMLU, MT-Bench, recent HumanEval variants) are now mature and publicly available with documented construction; distributed evaluation infrastructure (vLLM, Ray) enables efficient benchmark sweeps
- ④ **Difficulty / risk:** Medium difficulty; expensive annotation cost if new specialized datasets needed; risk of benchmark saturation reducing signal; requires careful statistical control for fair comparison across distillation methods

### Candidate 3: Theoretical and empirical analysis of how adversarial perturbations propagate through on-policy sampling: characterize student robustness loss as function of teacher robustness, KL divergence, and on-policy trajectory noise
- ① **Idea:** Theoretical and empirical analysis of how adversarial perturbations propagate through on-policy sampling: characterize student robustness loss as function of teacher robustness, KL divergence, and on-policy trajectory noise
- ② **Gap it fills:** Adversarial robustness in on-policy settings
- ③ **Why feasible now:** Certified robustness literature (randomized smoothing, IBP bounds) has matured; recent work on policy divergence in RL provides geometric tools; adversarial LLM eval benchmarks (e.g., ADVGLUE, AutoAttack variants) are available
- ④ **Difficulty / risk:** High theoretical difficulty; empirical validation expensive (requires adversarial eval across multiple perturbation budgets); risk that certified bounds are too loose to guide practice; unclear if insights transfer to discrete token space

### Candidate 4: Develop principled cost-benefit framework quantifying on-policy vs. off-policy distillation trade-offs: measure FLOPs, wall-clock time, and performance gains across 4–7 model scales with recommendation heuristics
- ① **Idea:** Develop principled cost-benefit framework quantifying on-policy vs. off-policy distillation trade-offs: measure FLOPs, wall-clock time, and performance gains across 4–7 model scales with recommendation heuristics
- ② **Gap it fills:** Scalability and computational trade-offs
- ③ **Why feasible now:** Standardized benchmarking infrastructure (MLCommons, HuggingFace Benchmarks) and open profiling tools (PyTorch Profiler, DeepSpeed Flops counter) now enable reproducible cost measurement; multiple off-policy baselines published with comparable metrics
- ④ **Difficulty / risk:** Medium difficulty; high cost of large-scale experiments (70B+ models); results sensitive to hardware, quantization, and batch-size choices limiting generalizability; framework may suggest on-policy is rarely preferable, reducing adoption

### Candidate 5: Investigate context-specific on-policy distillation with explicit curriculum: identify which context dimensions (task type, input length, domain, complexity) benefit most from on-policy vs. off-policy paths using learnable scheduling
- ① **Idea:** Investigate context-specific on-policy distillation with explicit curriculum: identify which context dimensions (task type, input length, domain, complexity) benefit most from on-policy vs. off-policy paths using learnable scheduling
- ② **Gap it fills:** Context conditioning remains underdeveloped; method combination gaps
- ③ **Why feasible now:** Curriculum learning methods (learning-to-curriculum frameworks, meta-learning for task selection) have recently been applied to LLM training; multi-task RL formulations now standard in TRL/RL4LMs codebases
- ④ **Difficulty / risk:** Medium-high difficulty; requires defining and labeling context dimensions across diverse datasets; risk of curriculum overfitting to specific benchmark; unclear whether gains transfer to held-out context distributions

### Candidate 6: Model the interaction between preference objectives (DPO, IPO, ORCA) and on-policy sampling: characterize when preference signals amplify vs. contradict on-policy KL constraints, with empirical validation on preference-labeled datasets
- ① **Idea:** Model the interaction between preference objectives (DPO, IPO, ORCA) and on-policy sampling: characterize when preference signals amplify vs. contradict on-policy KL constraints, with empirical validation on preference-labeled datasets
- ② **Gap it fills:** Preference optimization integration; method combination gaps
- ③ **Why feasible now:** DPO and variants now widely adopted with public implementations; preference-annotated datasets (Anthropic-HH, UltraFeedback, Orca-DPO) are openly available; recent work on combining RL objectives provides theoretical scaffolding
- ④ **Difficulty / risk:** Medium-high difficulty; preference signals may be noisy or sparse, confounding interaction effects; requires careful experimental design to separate preference learning from on-policy distillation effects; risk of marginal improvements over simpler off-policy preference optimization


## References

1. [MiniLLM: On-Policy Distillation of Large Language Models](http://arxiv.org/abs/2306.08543v6) — Yuxian Gu, Li Dong, Furu Wei et al. — 2023 — arXiv [arXiv]
2. [On-Policy Distillation of Language Models: Learning from Self-Generated Mistakes](http://arxiv.org/abs/2306.13649v3) — Rishabh Agarwal, Nino Vieillard, Yongchao Zhou et al. — 2023 — arXiv [arXiv]
3. [X-OPD: Cross-Modal On-Policy Distillation for Capability Alignment in Speech LLMs](http://arxiv.org/abs/2603.24596v3) — Di Cao, Dongjie Fu, Hai Yu et al. — 2026 — arXiv [arXiv]
4. [Self-Distilled Reasoner: On-Policy Self-Distillation for Large Language Models](http://arxiv.org/abs/2601.18734v3) — Siyan Zhao, Zhihui Xie, Mengchen Liu et al. — 2026 — arXiv [arXiv]
5. [DP-OPD: Differentially Private On-Policy Distillation for Language Models](http://arxiv.org/abs/2604.04461v1) — Fatemeh Khadem, Sajad Mousavi, Yi Fang et al. — 2026 — arXiv [arXiv]
6. [Black-Box On-Policy Distillation of Large Language Models](http://arxiv.org/abs/2511.10643v3) — Tianzhu Ye, Li Dong, Zewen Chi et al. — 2025 — arXiv [arXiv]
7. [On-Policy Context Distillation for Language Models](http://arxiv.org/abs/2602.12275v2) — Tianzhu Ye, Li Dong, Xun Wu et al. — 2026 — arXiv [arXiv]
8. [Entropy-Aware On-Policy Distillation of Language Models](http://arxiv.org/abs/2603.07079v3) — Woogyeol Jin, Taywon Min, Yongjin Yang et al. — 2026 — arXiv [arXiv]
9. [Hybrid Policy Distillation for LLMs](http://arxiv.org/abs/2604.20244v1) — Wenhong Zhu, Ruobing Xie, Rui Wang et al. — 2026 — arXiv [arXiv]
10. [Trust Region On-Policy Distillation](http://arxiv.org/abs/2606.01249v3) — Xingrun Xing, Haoqing Wang, Boyan Gao et al. — 2026 — arXiv [arXiv]
11. [On the Geometry of On-Policy Distillation](http://arxiv.org/abs/2606.07082v3) — Zhennan Shen, Yanshu Li, Qingyu Yin et al. — 2026 — arXiv [arXiv]
12. [Rubric-based On-policy Distillation](http://arxiv.org/abs/2605.07396v1) — Junfeng Fang, Zhepei Hong, Mao Zheng et al. — 2026 — arXiv [arXiv]
13. [On the Position Bias of On-Policy Distillation](http://arxiv.org/abs/2606.22600v2) — Yan Xie, Sijie Zhu, Tiansheng Wen et al. — 2026 — arXiv [arXiv]
14. [ReNIO: Reweighting Negative Trajectory Importance for LLM On-Policy Distillation](http://arxiv.org/abs/2606.23104v1) — Chen Lin, Kedi Chen, Wei Zhang — 2026 — arXiv [arXiv]
15. [Extreme Region Policy Distillation](http://arxiv.org/abs/2605.25582v2) — Changyu Chen, Xiting Wang, Rui Yan — 2026 — arXiv [arXiv]
16. [ORPO-Distill: Mixed-Policy Preference Optimization for Cross-Architecture LLM Distillation](http://arxiv.org/abs/2509.25100v1) — Aasheesh Singh, Vishal Vaddina, Dagnachew Birru — 2025 — arXiv [arXiv]

> ⚠️ This survey is AI-generated. Facts are traceable to the linked sources; anything marked 'unverified' or 'REQUIRES FULL TEXT' was not confirmable from an available source and must be checked manually. Candidate directions are suggestions requiring human evaluation, not conclusions. For medical/unfamiliar fields, treat any clinical or ethics statement as 'verify independently'.
