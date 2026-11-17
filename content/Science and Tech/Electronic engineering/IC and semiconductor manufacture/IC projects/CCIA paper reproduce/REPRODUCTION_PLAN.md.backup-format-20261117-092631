# Input-Boosted CCIA — Graduation Project and Shared Reproduction Plan

Last updated: 2026-11-16

This is our working checklist for what has been done, what to do next, and how tutoring and simulation feedback guide the design. The graduation assignment defines the final target; the paper provides the reference architecture. Tasks are milestones rather than dated commitments because the school deadline is not announced and the student works when available.

## Scope and confirmed decisions

| Item | Current decision | Basis / limitation |
| --- | --- | --- |
| Final goal | Design a bioelectric electrode-sensing analog front end in 180 nm CMOS, including circuit design and layout | Supervisor's graduation assignment; layout-verification depth remains unknown |
| Reference | A Highly Power-Efficient Input-Boosted First Stage for Capacitively Coupled Chopper Instrumentation Amplifiers, DOI 10.1109/JSSC.2025.3564316 | Use the 180 nm implementation as the reference; identical node does not imply identical devices |
| Available PDK | SMIC_018_MMRF; registered library smic18mmrf | Model suitability, well options and low-current behavior still need verification |
| Initial supply | **VDD = 0.6 V, VSS = 0 V** | Explicitly confirmed by the student; 1 V was the intended alternative and 3 V was a typing error |
| Later supply tests | Explore toward 1 V after establishing the baseline | Whether specifications must hold throughout 0.5–1 V remains unresolved |
| Design ownership | Derive, simulate and justify final dimensions and circuit choices | Published dimensions/capacitors can be benchmark or initial candidates; they are not automatically final SMIC values |
| Scope order | First-stage principle and bias verification → full-amplifier schematic → layout | Clarify DRC/LVS/extraction/post-layout requirements before that phase; plan for verification availability |
| Whole-amplifier gain | Open-loop gain **>50 dB** (>316 V/V) | User clarification; the assignment text says ≥50 dB without specifying open-loop; closed-loop signal gain is separate |
| Current and power | No numerical assignment power ceiling has been supplied | Paper currents are exploratory baselines; record implemented bias and clock-power boundaries |
| Schedule | Work in manageable sessions; update after results | Deadline not announced; no fixed weekly commitment assumed |
| Language and operation | English; student operates Virtuoso and returns results | Tutor explains reasoning, calculations and UI steps, inspects evidence and revises next actions |

## How we update this file and tutor

- Read the latest file before editing; either collaborator may change it. Back up before edits and check for concurrent changes. The user's vault has automatic Git commit/push sync; do not manually alter that setup.
- Keep task IDs stable. Their numbering is a tracking system, not a mandatory sequence. Add subtasks rather than silently changing a completed task's scope.
- ✅ means completed with the stated evidence; ❌ means pending/unverified, not necessarily failed. “In progress” means started without completed evidence.
- Distinguish **visually checked**, **electrically verified**, **simulation completed**, and **specification achieved**. A completed simulation alone does not prove a specification.
- For each batch: explain purpose and predicted behavior → student operates → inspect schematic/settings/log/data → interpret the result → update the plan. Do not pause after every click.
- When debugging, state one hypothesis, make a controlled change and retain previous results. Revise the relevant bias, dimensions, test setup or budget rather than restarting all theory after every failure.
- Preserve existing projects, PDK/models and simulation data. Document ideal substitutions and excluded circuitry/power. Record each design parameter as paper-reported, derived, provisional or simulation-verified.
- For each result retain the cell/view, model path/section, simulator, corner, temperature, supply, body connections, analysis settings, stimulus, loading and a log/plot/data path. Update the checkpoint only with new evidence.

## Current checkpoint

| Area | Evidence so far | Remaining / next action |
| --- | --- | --- |
| Project and technology | Previously checked project/library creation and attachment to smic18mmrf; see 3.1–3.2 | Startup, output and model loading for this project remain unverified |
| Main schematic | Eight MOS devices placed and sized; branches/rails, VON/VOP, VIP/VIN and eight coupling capacitors reviewed in a 2026-10-24 screenshot | Historical visual evidence only; later live inspection showed apparently open capacitor terminals. Reconcile current saved wiring and netlist |
| Device dimensions | W=10u throughout; input L=400n, tail L=10u, m=1; right column mirrored | Paper reference sizes, not finalized through SMIC characterization |
| Missing circuits | No completed electrical verification | Four gate DC-bias paths, tail-gate biases, MOS bodies, replica/branch controls, testbench and loads remain to complete/check |
| Simulation/performance | **No reproduction simulation or amplifier specification has been validated** | First complete S0–S1 |
| Planning | 0.6 V baseline and >50 dB open-loop target confirmed | Supply range, measurement conditions and layout verification still need clarification |

Historical screenshot: codex-clipboard-b27a3791-1f8c-41a8-bf78-57a2b944a9e8.png. Current disk save state has not been independently verified. No new circuit inspection or simulation was performed during this planning revision.

## Session schedule — start here

This is the operational order. Detailed settings and completion criteria are in the linked task sections below; do one manageable batch and return evidence before expanding it. Every session remains pending until its own evidence is recorded.

| Session                | Tasks                         | Student operation                                                                                                    | Result to bring back / milestone                                                                          | Status |
| ---------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | :----: |
| **S0 — next**          | 3.3–3.4; 4.2.4e; 4.1.2a       | Preserve the existing design, inspect saved wiring, build separate tb_n18_char and inspect ADE model/output settings | Test schematic, n18 properties, Check and Save messages, model path/section and project-local output path |   ❌    |
| S1                     | 4.1.2b; DC part of 3.5        | Sweep VGS, locate 12 nA if crossed, refine and obtain the operating point                                            | Current curve, VGS/VDS/VSB/Id/gm/gds/gmb, gm/Id, gm/gds and log                                           |   ❌    |
| S2                     | 4.1.2c–e                      | Sweep drain voltage/body bias; characterize p18 and long-channel tail devices in separate batches                    | Headroom/current-sensitivity curves and NMOS/PMOS characterization records                                |   ❌    |
| S3                     | 4.1.1; 4.2.3; 4.2.4c/e/f; 4.4 | Calculate branch current/headroom; complete a controlled-bias core and obtain DC points                              | All terminal voltages, branch currents and outputs; explain dimensions and any temporary controls         |   ❌    |
| S4                     | 4.2.4a/b; 4.5–4.9             | Compare input paths; implement and test replica, separate branch controls and pseudo-resistors; recheck              | Demonstrated boosting under stated bias/load, realistic-bias startup/settling and robustness evidence     |   ❌    |
| S5 — multiple sessions | 5.1–5.7; 6.1–6.8              | Verify later stages, integrate feedback/chopping/impedance enhancement and assess system metrics                     | Repeatable full-amplifier measurements and revised budgets; then scope layout work                        |   ❌    |

## 1. Define requirements and design budgets

| ID | Task | Completion check | Status | Evidence / notes |
| --- | --- | --- | :---: | --- |
| 1.1 | Obtain and read the paper | Identify architecture, parameters and reported results | ✅ | Earlier review of Fig. 4, Figs. 7–9 and Tables I–II; detailed first-stage reasoning is still 4.1.1 |
| 1.2 | Select reference implementation | 180 nm implementation chosen | ✅ | Agreed; SMIC devices need characterization |
| 1.3 | Agree on scope | First stage and full schematic first, layout later | ✅ | Verification depth unresolved; the old schematic-only scope has been superseded |
| 1.4 | Define measurement conditions | Each target has a test definition, stimulus, load, band and corner | ❌ | Numerical targets recorded below; unresolved conditions must remain explicit |
| 1.5 | Allocate provisional stage budgets | Explain current, headroom, gain/noise/load/frequency budgets and revise after tests | ❌ | Do not require every individual stage to meet every whole-system specification |
| 1.6 | Clarify graduation deliverables | Deadline, supply-range interpretation and layout verification confirmed | ❌ | Deadline unannounced; questions do not block one-device learning |

### Assignment targets and open definitions

Source: D:/what_i_am_doing/Project/Graduation_Project/docx/3.西安电子科技大学本科毕业设计（论文）任务书_本人自用（需装订）-1 2.docx, read on 2026-11-12. Values below are targets, not achieved results.

| Quantity | Whole-amplifier requirement | Initial design choice / unresolved test definition |
| --- | --- | --- |
| Supply | 0.5–1 V | Start at 0.6 V; full-range specification coverage unknown |
| Bandwidth | 1–1.5 kHz | Confirm passband and corner definitions, especially the lowest signal frequency; distinct from chopping frequency |
| Input impedance | ≥100 MΩ | Define differential/common-mode stimulus, frequency band and chopped measurement method |
| Input-referred noise | ≤5 µV | Integration limits, RMS convention and filtering remain to confirm |
| Gain | Assignment ≥50 dB; user clarifies open-loop >50 dB | Define measurement frequency, differential input/output, DC controls and chopped/unchopped conditions; closed-loop gain still to choose |
| PSRR / CMRR | ≥90 dB / ≥85 dB | Define frequency, supply/input stimulus and measurement mode |
| THD | ≤0.5% | Define input frequency/amplitude, output swing convention, load and analysis window |
| Stability | Verify applicable signal and bias feedback loops | Engineering verification task; choose loop configurations and margins; standalone open-loop phase alone does not establish closed-loop stability |
| Output swing / load | No numerical requirement provided | Select and record provisional test conditions; do not invent supervisor requirements |
| Current / power | No numerical limit provided | Record total with bias/auxiliaries and clock-power accounting |

### How the student's existing design method applies

The two handwritten images under “The design steps I summarize by myself” in [[Analog IC]] connect power/current, swing/headroom, gain checks, channel length and fine-tuning. Those are useful relationships; the particular textbook branch allocations and square-law formulas are not universal design rules. The requested section of [[Paper reading]] contains DOI 10.1109/4.535411 as a reading reference; no further derivation was present there during this review.

Start with supply/signal constraints and provisional noise/bandwidth/loading budgets, characterize the devices, then iterate current and geometry against headroom, gain, noise and stability. If a hard power limit is later supplied, it bounds current as Imax=Pmax/VDD. Without one, the paper current is an exploratory starting point. Noise constrains useful gm, but 5 µV alone cannot determine gm without its integration band, flicker/chopping and filtering conditions.

At a chosen bias, gm=(gm/Id)Id and transistor intrinsic gain is gm/gds. In weak inversion, Id≈I0 exp(VGS/(nUT)) and gm/Id≈1/(nUT) provide intuition; obtain actual SMIC curves. Use neither positive strong-inversion overdrive nor square-law sizing as the primary deep-subthreshold input-device method. Longer L may improve output resistance while changing capacitance, speed, area and leakage. Process constants μCox, λ, γ and VTH from the student's earlier table are not all prerequisite hand-extracted constants: measured gm/Id, current density, gds, body sensitivity and capacitances at relevant biases are more useful here.

### Paper reference register — not assignment achievements

| Parameter | Paper 180 nm reference | How we use it |
| --- | --- | --- |
| Input MP1/MN1 W/L | 10u/0.4u | Initial characterization sample / benchmark |
| Tail MP2/MN2 W/L | 10u/10u | Characterize independently; not proof of operating region |
| Cg / Cs | 3.5 pF / 20 pF | Initial coupling network; distinguish Cs from transistor parasitic Cgs |
| Cgf / Csf | 35 fF / 200 fF | Feedback candidates; derive whole-network gain and parasitic sensitivity |
| Ci2 / Ci3 | 1.8 pF / 200 fF | Later-stage coupling starting values |
| Stage main currents | 24 nA / 7.2 nA / 4.8 nA | Provisional comparisons, not assigned final budgets |
| Bias current / Ib | 4.2 nA total bias / 600 pA Ib | Replica/current-accounting reference; not all missing circuit sizes are published |
| Nominal supply / chopping | 0.6 V / 12 kHz | Baseline supply; chopping remains a distinct design/test parameter |
| Full-amplifier results | 40 nA, 24 nW, 39 dB closed-loop gain, 1.6 kHz BW | Paper results, not our measurements; closed-loop 39 dB does not contradict the clarified open-loop target |
| Noise / impedance / rejection | 5.09 µV rms, about 100 nV/√Hz floor, >75 MΩ, CMRR >83 dB, PSRR >88 dB below 1 kHz | Assignment targets differ; compare only with matched measurement definitions |

## 2. Prepare and verify the environment

| ID  | Task                                                 | Completion check                                                                      | Status | Evidence / notes                                                                                   |
| --- | ---------------------------------------------------- | ------------------------------------------------------------------------------------- | :----: | -------------------------------------------------------------------------------------------------- |
| 2.1 | Organize the centralized PDK                         | Keep the complete kit in the established location                                     |   ✅    | Previously checked through FileZilla; user handover.                                               |
| 2.2 | Confirm project-local output in the practice project | Log shows output inside that project's simulation directory                           |   ✅    | Previous log confirmed the path; this does not establish that all simulation errors were resolved. |
| 2.3 | Check available interface-control tools | Confirm whether the current VM desktop can be inspected | ✅ | Computer Use successfully inspected VMware and Virtuoso on 2026-10-21. FileZilla was detected, but its folder listing was not successfully inspected in this session. Recheck availability in future sessions. |
| 2.4 | Inspect previous model configuration and logs        | Determine whether VACOMP-2096 recurs; diagnose if necessary                           |   ❌    | `res.def` and `res_rf.def` errors remain unresolved in the handover. Do not delete these files.    |
| 2.5 | Verify PDK suitability | Identify core MOS, capacitors, well options, model sections, and relevant limitations | ❌ | Partially complete: n18 and p18 symbols and CDF parameter fields inspected. Models at 0.6 V/nA, capacitor options, and well/pseudo-resistor suitability remain unverified. |

## 3. Create an independent reproduction project

| ID  | Task                                          | Completion check                                           | Status | Evidence / notes                                                                                                                                                                                                                                                                                                                                   |
| --- | --------------------------------------------- | ---------------------------------------------------------- | :----: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.1 | Create the new project directory              | Independent directory; practice project preserved          |   ✅    | VM terminal pwd confirmed /home/userhush/Projects/IC_Projects/CCIA. Practice-project directory was also visible in a listing; its contents were not audited.                                                                                                                                                                                       |
| 3.2 | Configure cds.lib and create a design library | Register centralized PDK and attach appropriate technology |   ✅    | Inspected cat cds.lib showing Cadence INCLUDE and centralized smic18mmrf DEFINE. Library Manager confirmed ccia_lib at /home/userhush/Projects/IC_Projects/CCIA/ccia_lib. CIW reported successful technology attachment; techGetTechFile(ddGetObj("ccia_lib"))~>libName returned "smic18mmrf". Backup command completed without a displayed error. |
| 3.3 | Configure startup and simulation output       | New sessions use this project's own results directory      |   ❌    | Do not copy the practice project's absolute output path. see [[Cadence virtuoso tutorial#move the simuilation folder to current working directory]] for specific procedure                                                                                                                                                                         |
| 3.4 | Configure model files and process corner      | Netlist loads intended models without invalid includes     |   ❌    | Record actual model paths and selected sections in S0; validate loading with S1 before integrating the first stage. Earlier student suggestion was to defer this to 4.3; an early one-device test isolates model problems more efficiently.                                                                                                        |
| 3.5 | Run a minimal transistor test                 | Valid DC and transient results; no fatal errors            |   ❌    | Use S1 for DC current and operating-point evidence, then a minimal transient test for full completion of 3.5. Check node voltages and currents, not just run completion. Do this before full-stage verification.                                                                                                                                   |

## 4. Build and verify the input-boosted first stage

The student's question was 
how to split system specifications into first-stage tasks. 
Start with a valid biased core and measured device behavior; 
derive provisional stage budgets in 1.5. 
The first stage's output impedance/load, 
useful band around the chopping frequency, 
noise and input impedance interact with the rest of the CCIA. 
Do not impose the whole-amplifier 100 MΩ, 50 dB or 1.5 kHz directly on this standalone stage. 
Keep its signal path and DC-control loops stable under their intended connections.

To let the complete amplifier meet those standards:

+ VDD ： 0.5-1v
+ BW ：1KHz-1.5KHz
+ $Z_{in} \geq 100M \ohm$
+ Equivalent Input Noise (IRN) : ≤5μV
+ Small signal Open-loop gain ($A_v$): ≥50 dB
+ Power Supply Rejection Ratio (PSRR): ≥90dB, Common-Mode Rejection Ratio (CMRR): ≥85dB
+ Total Harmonic Distortion (THD): ≤0.5%
+ Open-loop stability and closed-loop stability

i split the whole task to small tasks
So i should let the first stage of the amplifier meet those standards:

+ VDD： 1v
+ BW：unknown yet
+ $Z_{in} \geq 100M \ohm$ (reference paper use Positive Feedback Loop to increase iput impetance)
+ Equivalent Input Noise (IRN): unknown yet
+ Small signal Open-loop gain($A_v$):  unknown yet
+ Power Supply Rejection Ratio (PSRR): ≥unknown yet, Common-Mode Rejection Ratio (CMRR): unknown yet
+ Total Harmonic Distortion (THD): unknown yet
+ Open-loop stability should be concerned


so we got those conditions:

  
| Specification | Process Parameters |
| ---- | ---- |
| $V_{DD}$: 1 V | $\mu_{n} C_{ox}$: unknown |
| BW: unknown yet | $\mu_{p} C_{ox}$: unknown |
| $Z_{in} \ge 100\,\mathrm{M}\Omega$ (reference paper uses Positive Feedback Loop to boost input impedance) | $\lambda_{n}$: unknown |
| Equivalent Input Noise (IRN): unknown yet | $\lambda_{p}$: unknown |
| Small-signal Open-loop Gain ($A_v$): unknown yet | $\gamma$: unknown |
| PSRR: unknown yet | $V_{THn}$: unknown |
| CMRR: unknown yet | $V_{THp}$: unknown |
| THD: unknown yet |  |
| Open-loop stability should be concerned |  |
| No output swing, no power consumption |  |

this is all the conditions i could find

| ID     | Task                               | Procedure / completion check                                                                                                                                                                                                 |   Status    | Notes                                                                                                                                                            |
| ------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4.1.1  | Study and annotate Fig. 4          | Explain input and tail devices, DC current path, gate/source coupling and replica/branch-control loop polarities                                                                                                             | In progress | Explain signs using vid=VIP−VIN and vod=VOP−VON                                                                                                                  |
| 4.1.2  | Characterize candidate MOS devices | Complete 4.1.2a–e and retain curves plus operating-point conditions                                                                                                                                                          |      ❌      | Use data for current, geometry and headroom decisions                                                                                                            |
| 4.1.2a | S0: build n18 testbench            | Separate ccia_lib/tb_n18_char/schematic; n18 W=10u, L=400n, m=1; source/bulk=0; drain vdc=0.15 V; gate vdc=VGS; both source negatives grounded. Check and Save; inspect models/output                                        |      ❌      | Zero-body-bias reference test, not the full branch; back up the main design first                                                                                |
| 4.1.2b | S1: sweep and locate 12 nA         | Record provisional 27 °C and an available nominal model corner; DC sweep VGS 0–0.6 V, step 2 mV, VDS=0.15 V. Plot magnitude of Id on logarithmic axis; locate and refine crossing locally. Save gm/gds/gmb at selected point |      ❌      | Report VGS,VDS,VSB,Id,gm/Id,gm/gds and log. Document source-current sign. If no crossing/error, diagnose before changing W/L; region label alone is insufficient |
| 4.1.2c | S2a: headroom sensitivity          | Hold selected VGS; sweep VDS initially 0.02–0.30 V. Examine current/gds near 0.10,0.15,0.20 V                                                                                                                                |      ❌      | Test values are exploratory, not established branch drops                                                                                                        |
| 4.1.2d | S2b: body sensitivity              | Compare source=0.15 V, bulk=0, drain=source+VDS, gate=source+VGS with the zero-VSB test; refine VGS for 12 nA                                                                                                                |      ❌      | Preserve VGS/VDS when comparing; report actual absolute node voltages                                                                                            |
| 4.1.2e | S2c: PMOS and tail devices         | p18 source/bulk=0.6 V, drain=source−VSD, gate=source−VSG; sweep positive VSG using current magnitude. Then characterize 10u/10u tails and relevant body biases separately                                                    |      ❌      | Record actual device/well constraints, corner and temperature; use several manageable batches                                                                    |

### 4.2 Build and size the core, bias and coupling network

#### 4.2.3 Main-stage dimensions and current/headroom budget

Student question: “Can I use the paper's sizes, or should I determine them myself?” Earlier answer “CAN NOT” is corrected: published sizes can be reference candidates. The student's decision is to independently justify final sizes through calculation and SMIC simulation. Preserve existing placements and compare evidence before resizing.

problem:


As for the main part of the amplifier
Can i directly apply the size of the transistor in paper ,
or whether I should determine the size all by myself?
  
Earlier student answer (retained for context):
CAN NOT

Tutor correction, 2026-11-16:
published dimensions CAN be a benchmark or initial candidate. 
Final dimensions must be justified and verified in SMIC; 
using a starting value does not prevent independent design.

temporary decision(adjusted 2026-11-16)
start from paper dimensions

| ID | Task | Completion check | Status | Evidence / next action |
| --- | --- | --- | :---: | --- |
| 4.2.3 | Build and size first-stage core | Correct connectivity and a controlled-bias DC point with justified dimensions | ❌ | Parent task; use 4.1.2 characterization and 4.4 DC verification |
| 4.2.3a | Create first-stage schematic view | Correct library/cell/view opens | ✅ | Previously inspected ccia_lib/input_boosted_stage1/schematic; current saved contents need reconciliation |
| 4.2.3b | Place eight core MOSFETs | Names, models, dimensions and arrangement checked | ✅ | MP2P/MP1P/MN1P/MN2P left; MP2N/MP1N/MN1N/MN2N right; p18/n18, W=10u, input L=400n, tail L=10u, m=1; right mirrored. Placement evidence, not final sizing |
| 4.2.3c | Audit branch wiring and labels | VDD/VSS,VON/VOP and source-node labels electrically checked | ❌ | Branches/rails visually reviewed; highlight crossing nets and inspect netlist |
| 4.2.3d | Derive branch-current budget | Explain 24 nA/2=12 nA per series branch and 12 nA/600 pA=20 | ❌ | Never count PMOS/NMOS series currents twice; 0.6 V×24 nA=14.4 nW core-only provisional power |
| 4.2.3e | Derive voltage budget | 0.6 V=VSD,p2+VSD,p1+VDS,n1+VDS,n2; check against measured device curves | ❌ | Provisional output CM=0.3 V gives upper/lower pairs 0.3 V each, not equal individual drops. Gates may have different DC levels from input CM |
| 4.2.3f | Select and justify geometry/current | Show model-based operating points, gm/gds, noise and frequency tradeoffs | ❌ | Keep a parameter/assumption record; do not label chosen sizes as paper data |

#### 4.2.4 Bias, pseudo-resistors and capacitors

| Student doubt                                                          | Working answer                                                                                                                                         | Experiment / decision needed                                                                                                                                       |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Must all bias-circuit dimensions be chosen before any main-stage test? | Use explicitly documented ideal bias/reference sources or temporary DC control to isolate the core first; realistic bias remains a required later test | Replica and separate branch-control DC points, polarity, range, startup and settling                                                                               |
| How to size unpublished replica devices?                               | Comparable bias and current scaling provide an initial W/L estimate near 1/20 of corresponding main W/L for 600 pA versus 12 nA; not a unique size     | Check VDS/VSB, geometry effects, matching, current accuracy and headroom; ACMB sizing needs its own current/gain/stability analysis                                |
| How to select pseudo-resistors?                                        | Choose low-frequency attenuation and recovery requirements first; then topology, I–V and differential resistance                                       | For isolated gate path fL≈1/(2πRbCg); 3.5 pF and chosen 1 Hz give ~45.5 GΩ and RC~0.159 s, illustrative only. Test leakage/noise/nonlinearity/temperature/settling |
| Is 1–1.5 kHz the chopping frequency?                                   | It is the assignment bandwidth; paper chopping is 12 kHz                                                                                               | Core must pass the modulated signal band; source-coupling response differs from the simple gate RC                                                                 |
| Must Cg/Cs/Cgf/Csf be derived from scratch?                            | Start with registered paper candidates, understand the network, and sweep as needed                                                                    | Derive capacitive feedback ratios and finite-loop-gain/loading/parasitic effects; distinguish Cs from Cgs                                                          |

Student's earlier external discussion link is retained as an optional reference, not reviewed evidence: https://chat.deepseek.com/share/0ma0pkpgnqsqtoceyu

| ID     | Task                                                                                              | Completion check                                                                        | Status | Evidence / notes                                                                                                                                                                                                                                                                                                              |
| ------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | :----: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4.2.4  | Design and verify the missing bias and pseudo-resistor circuits                                   | Document topology, sizing rationale and successful circuit tests                        |   ❌    | Parent task: complete 4.2.4a–f and realistic-bias verification in 4.8.                                                                                                                                                                                                                                                        |
| 4.2.4a | Determine the resistance of pseudo-resistors and determine the size of MOSFET in pseudo-resistors | Characterized I–V, differential resistance, recovery and noise                          |   ❌    | Select low-frequency/recovery requirements first; see 4.2.4 design guidance.                                                                                                                                                                                                                                                  |
| 4.2.4b | Determine the biasing current and voltage, and determine the size of the biasing circuit          | Valid replica and control-loop DC points, current, headroom and settling                |   ❌    | Use device characterization and current ratios; unpublished W/L values are our design choices.                                                                                                                                                                                                                                |
| 4.2.4c | Add coupling, bias elements, body wiring, and pins                                                | Complete and check Fig. 4(a) connectivity                                               |   ❌    | Four Cg and four Cs plus input/output pins visually checked; see 4.2.4d. Gate-bias elements, body wiring, supply interfaces and electrical audit remain pending. Document all ideal substitutions.                                                                                                                            |
| 4.2.4d | Place and wire the coupling network and signal pins                                               | Visually trace VIP/VIN, Cg/Cs, and VON/VOP                                              |   ✅    | Screenshot reviewed 2026-10-24: VIP to left gates/right sources; VIN to right gates/left sources; Cg 3.5pF, Cs 20pF. Historical screenshot evidence only. Later live inspection showed apparently open capacitor terminals; reconcile current saved wiring in 4.2.4e. Pin directions and netlist verification remain pending. |
| 4.2.4e | Audit connectivity and supply interfaces                                                          | Highlight VIP/VIN/VON/VOP; verify crossings, pin directions and actual supply net names |   ❌    | Supply symbols are present; decide explicit supply pins for reusable cells. Labels alone do not supply voltage.                                                                                                                                                                                                               |
| 4.2.4f | Complete MOS body connections                                                                     | Record each body net and confirm PDK well/device restrictions                           |   ❌    | Do not tie each body to its source without checking paper body-effect assumptions and available devices.                                                                                                                                                                                                                      |

### 4.3 Verify and iterate from the observed cause
| ID  | Task                                                 | Completion check                                                        | Status | Evidence / notes                         |
| --- | ---------------------------------------------------- | ----------------------------------------------------------------------- | :----: | ---------------------------------------- |
| 4.4 | Verify DC operating point                            | Check branch currents, device voltages, and output headroom             |   ❌    |                                          |
| 4.5 | Test gate and source coupling separately             | Verify gain, polarity, and useful frequency ranges                      |   ❌    | Maintain consistent loading and bias.    |
| 4.6 | Test both coupling paths together                    | Demonstrate input boosting under matched conditions                     |   ❌    | Compare with separate-path results.      |
| 4.7 | Compare with a conventional inverter-based reference | Compare gain and input-referred noise at consistent current and loading |   ❌    | State noise bandwidth and normalization. |
| 4.8 | Implement the bias circuits                          | Replace temporary bias sources and verify bias-loop operation           |   ❌    | Include startup and settling checks.     |
| 4.9 | Check first-stage robustness                         | Repeat essential checks over selected corners and temperatures          |   ❌    | Select and document test coverage.       |

Before AC, verify both branch currents, all device terminal voltages and outputs. Fixed biases can rail high-gain outputs; temporary DC control may be needed and must be documented. For path comparisons retain bias and loading; disable a drive by AC-grounding it without deleting its coupling capacitor. Later replace ideal bias/resistor elements, repeat boosting and check startup, settling and leakage/tolerance sensitivity.

## 5. Build the complete amplifier

Refine numerical budgets with first-stage results. These rows provide an integration outline; they do not imply final later-stage sizes are known.

| ID | Task | Completion check / dependency | Status | Notes |
| --- | --- | --- | :---: | --- |
| 5.1 | Design and verify stage 2 | Current/headroom and bias-loop DC, gain/phase, load and startup verified | ❌ | Fig. 8; characterize missing dimensions; paper main current 7.2 nA is a candidate |
| 5.2 | Design and verify stage 3 | Bias, CM control, gain, load, swing and settling verified | ❌ | Fig. 9; paper main current 4.8 nA is a candidate |
| 5.3 | Verify interstage coupling and pseudo-resistors | Correct independent DC levels and useful frequency response | ❌ | Ci2/Ci3 candidates from reference register; verify leakage/recovery |
| 5.4 | Integrate capacitive feedback | Valid full DC state and chosen closed-loop response without chopping first | ❌ | Derive network gain; closed-loop target distinct from >50 dB open-loop target |
| 5.5 | Verify signal and bias-loop stability | Define loop configurations, loading and stability/settling criteria | ❌ | Recheck after chopping and positive feedback; preserve DC controls in suitable tests |
| 5.6 | Add chopping and clocks | Verify modulation/demodulation, recovered signal, noise/ripple and power boundary | ❌ | 12 kHz paper starting candidate; record levels,duty,nonoverlap and switch implementation |
| 5.7 | Add input-impedance enhancement | Disabled/enabled impedance and stable response compared | ❌ | Full-system ≥100 MΩ is the target; positive feedback needs stability checks |

## 6. Evaluate and document performance

Measure during development as well as final evaluation. Define conditions through 1.4 and use appropriate periodic or validated transient methods when chopping is active. Ordinary unchopped AC/noise tests are intermediate evidence only.

| ID | Measurement | Completion evidence | Status |
| --- | --- | --- | :---: |
| 6.1 | Open-loop gain; closed-loop gain and bandwidth | >50 dB open-loop under defined conditions; separately chosen closed-loop gain and 1–1.5 kHz BW; record differential definitions and bias controls | ❌ |
| 6.2 | Total current and power | Include implemented stages,bias/auxiliaries and explicitly account for clocks; compare to paper with matching boundaries | ❌ |
| 6.3 | Input-referred noise | ≤5 µV under agreed integration/filter/RMS conditions; distinguish noise density from integrated noise | ❌ |
| 6.4 | NEF/PEF comparison | Consistent current,temperature,bandwidth and noise definitions if useful for paper comparison | ❌ |
| 6.5 | Input impedance, PSRR and CMRR | ≥100 MΩ, ≥90 dB PSRR, ≥85 dB CMRR with defined frequency/stimulus/mode | ❌ |
| 6.6 | THD and output swing | ≤0.5% THD with defined frequency,amplitude,load,output convention and window | ❌ |
| 6.7 | Robustness | Document supply/corner/temperature and mismatch coverage where models exist; no unsupported full-range claim | ❌ |
| 6.8 | Thesis and reproduction report | Assignment targets versus own results and paper; calculations,design choices,paths and limitations recorded | ❌ |

## 7. Layout and physical verification — later phase

| ID | Task | Completion check | Status | Scope limitation |
| --- | --- | --- | :---: | --- |
| 7.1 | Clarify physical deliverables and tools | Supervisor expectations and PDK/Calibre decks/extraction availability recorded | ❌ | Required verification depth unknown |
| 7.2 | Plan and draw layout | Schematic mature; matching,well/body,capacitor,clock routing and parasitic constraints addressed | ❌ | Layout is stated in assignment |
| 7.3 | DRC/LVS | Required checks and results documented | ❌ | Proposed verification work; final graduation scope to confirm |
| 7.4 | Extract and re-simulate | Compare relevant metrics before/after parasitics and resolve regressions | ❌ | Proposed post-layout phase; scope/tools to confirm |

## Immediate next session

**Start S0 in the schedule near the top.** Prepare tb_n18_char, inspect device properties and Check and Save messages, model paths/sections and output directory. Return those for review before S1. Do not choose all amplifier sizes or complete all bias circuits before obtaining the first device curve.

## Environment reference

The following paths and versions come from the user's handover and should be inspected when precise diagnosis is required.

```text
Linux user: userhush
VM: CentOS 7 on VMware
SFTP host: 192.168.30.100
Virtuoso: IC618
Spectre: 18.1.0.077

Cadence installation:
/home/userhush/Program/eda/cadence/IC618
/home/userhush/Program/eda/cadence/SPECTRE181

Central PDK kit:
/home/userhush/Program/eda/cadence/pdks/pdks_after_extraction/SMIC_018_MMRF

PDK device library:
/home/userhush/Program/eda/cadence/pdks/pdks_after_extraction/SMIC_018_MMRF/smic18mmrf

New reproduction project:

/home/userhush/Projects/IC_Projects/CCIA

Design library: ccia_lib (attached to smic18mmrf)

Cell/view: input_boosted_stage1/schematic

Configuration backup: cds.lib.before_library_creation



Existing practice project — preserve:
/home/userhush/Projects/IC_Projects/Analog_IC_learning_project_2
```

## Open questions and unresolved issues

| Question / issue | Current state | Action |
| --- | --- | --- |
| Deadline / supply-range / physical verification | Deadline unannounced; range interpretation and layout depth unknown | Clarify when available; continue S0–S1 now |
| Measurement definitions | See 1.4 and assignment table | Agree bands,stimuli,loads and modes before claiming compliance |
| Current saved schematic | Historical visual evidence conflicts with later apparent open terminals | Audit 4.2.4e; preserve prior evidence and backup |
| Model/output/startup | Unverified for new project; practice project's cds.lib/.cdsinit not reread in this session | Verify 3.3–3.5; never copy its absolute simulation path unchanged |
| VACOMP-2096 | Earlier res.def/res_rf.def issue has no confirmed root cause/fix; previous transient success does not prove permanent resolution | If it recurs, inspect netlist/includes/log; do not delete those PDK files |
| Earlier practice-project plots | Port currents were seen; full input/output voltage verification was not documented | Do not count as reproduction performance evidence |
| PDK differences and missing sizes | Same node is insufficient; auxiliary details may be unpublished | Characterize devices and label chosen implementation/ideal elements explicitly |

## Progress log

| Date | Update | Evidence / author |
|---|---|---|
| 2026-10-20 | Created the shared plan from the agreed scope and existing conversation. No new circuit tasks marked complete. | Assistant; environment completion based on user handover. |

| 2026-10-21 | Reviewed user notes: marked 3.1 complete as user-reported; retained 3.2 as incomplete with partial progress recorded. Updated project path and flexible-order guidance. | Assistant reviewed this Markdown file; no direct VM verification. |


| 2026-10-21 | End-of-session update: verified Computer Use, project/library setup and technology attachment; created first-stage schematic and placed eight sized MOSFETs. User reports saving. Wiring is not yet verified; resume from saved schematic inspection. | Assistant checked live VM screens and user-supplied screenshot; no simulation results. |


| 2026-10-24 | Visually reviewed core rails, outputs, eight coupling capacitors and input routing. Confirmed 0.6V and Table I design basis; added calculation, device characterization, bias sizing, pseudo-resistor design and staged integration work packages. Electrical audit and simulation remain pending. | Assistant: supplied schematic screenshot and paper pages 5/7 reviewed; no simulation evidence. |

| 2026-11-12 | Read DOCX assignment and reviewed student's design questions; clarified system-versus-stage targets and missing measurement definitions. | Planning only; no new circuit performance evidence. |
| 2026-11-16 | Integrated decisions and S0–S5 session schedule into main task tables; confirmed 0.6 V/0 V and user open-loop >50 dB target; corrected obsolete 1 V/3 V assumptions and retained existing IDs/evidence. | Backed up latest plan before editing; no new circuit inspection or simulation. |
