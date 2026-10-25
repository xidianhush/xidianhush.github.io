# Input-Boosted CCIA — Shared Reproduction Plan

Last updated: 2026-10-25

## Scope

- Reference: *A Highly Power-Efficient Input-Boosted First Stage for Capacitively Coupled Chopper Instrumentation Amplifiers* (JSSC, DOI: 10.1109/JSSC.2025.3564316).
- Reproduce the **180 nm implementation** using the available **SMIC_018_MMRF** PDK, subject to device and model verification.
- Deliver **first-stage principle verification** and **full-amplifier schematic simulation**.
- Layout, DRC/LVS, and post-layout simulation are outside the current scope.
- Working language: English; explain unfamiliar terms, commands, and interface operations step by step.

## How we update this file

- Task IDs are tracking labels, not a mandatory sequence. Choose tasks flexibly while respecting technical dependencies. Suggested next tasks can change together.
- Either of us can edit this document. Read its latest contents before planning or changing task status.
- `✅` means complete with the evidence described in the row. `❌` means remaining or not yet verified; it does not necessarily mean a failed test.
- When finishing a task, change its status and add a short note with the result, test conditions, and a log, plot, or file path when available.
- User-reported completion can be recorded as such. Distinguish it from a result independently checked in this project.
- Keep task IDs stable. Add new subtasks when needed instead of silently expanding a completed task.
- Update the date and the **Current checkpoint** after meaningful progress. Preserve existing notes from either collaborator.
- A simulation finishing successfully proves software execution, not that the circuit meets the paper's specifications.
- Back up configuration files before edits. Preserve the practice project, centralized PDK, models, and existing simulation data.

## Current checkpoint

- **Verified visually on 2026-10-24:** eight sized MOSFETs, both vertical branches and supply rails, VON/VOP output pins, VIP/VIN input pins, four Cg = 3.5 pF and four Cs = 20 pF capacitors, and the intended opposite-polarity gate/source coupling. Evidence: user screenshot codex-clipboard-b27a3791-1f8c-41a8-bf78-57a2b944a9e8.png.
- **Verification limit:** this is a screenshot connectivity review, not a netlist audit. Highlight crossing nets, inspect pin directions and supply-symbol global-net names, and run Check and Save after completing the circuit. Current disk save state is not independently verified.
- **Still missing:** four gate-bias paths, tail-gate bias connections, all body connections, Fig. 4(b) bias circuitry, testbench, model verification, and simulation results.
- **Paper-confirmed nominal supply:** VDD - VSS = 0.6 V (Section IV-D, PDF page 7). Testbench starting convention: VSS = 0 V, VDD = 0.6 V.
- **Next learning step:** derive the current/headroom budget and characterize SMIC MOS devices before choosing missing bias and pseudo-resistor dimensions. Do not invent unpublished sizes as paper facts.
- **Working pace:** explain calculations and use larger UI instruction batches, checking each batch. Task order is flexible; dependencies still matter.
- **Project:** /home/userhush/Projects/IC_Projects/CCIA; ccia_lib/input_boosted_stage1/schematic. No reproduction simulation has been validated.

## 1. Define the project

| ID | Task | Completion check | Status | Evidence / notes |
|---|---|---|:---:|---|
| 1.1 | Obtain and read the paper | Identify architecture, circuits, parameters, and reported results | ✅ | PDF read; Fig. 4, Fig. 7–9, and Tables I–II reviewed. |
| 1.2 | Select the reference implementation | Use the paper's 180 nm version | ✅ | Agreed in chat. Same process node does not establish identical device behavior. |
| 1.3 | Agree on scope | First stage and complete CCIA, schematic simulation only | ✅ | User confirmed the provisional scope; no layout or post-layout work. |
| 1.4 | Prepare the specification checklist | Record target values, definitions, test conditions, and missing information | ❌ | Initial reference values appear below; detailed measurement procedures remain to be defined. |

## 2. Prepare and verify the environment

| ID  | Task                                                 | Completion check                                                                      | Status | Evidence / notes                                                                                   |
| --- | ---------------------------------------------------- | ------------------------------------------------------------------------------------- | :----: | -------------------------------------------------------------------------------------------------- |
| 2.1 | Organize the centralized PDK                         | Keep the complete kit in the established location                                     |   ✅    | Previously checked through FileZilla; user handover.                                               |
| 2.2 | Confirm project-local output in the practice project | Log shows output inside that project's simulation directory                           |   ✅    | Previous log confirmed the path; this does not establish that all simulation errors were resolved. |
| 2.3 | Check available interface-control tools | Confirm whether the current VM desktop can be inspected | ✅ | Computer Use successfully inspected VMware and Virtuoso on 2026-10-21. FileZilla was detected, but its folder listing was not successfully inspected in this session. Recheck availability in future sessions. |
| 2.4 | Inspect previous model configuration and logs        | Determine whether VACOMP-2096 recurs; diagnose if necessary                           |   ❌    | `res.def` and `res_rf.def` errors remain unresolved in the handover. Do not delete these files.    |
| 2.5 | Verify PDK suitability | Identify core MOS, capacitors, well options, model sections, and relevant limitations | ❌ | Partially complete: n18 and p18 symbols and CDF parameter fields inspected. Models at 0.6 V/nA, capacitor options, and well/pseudo-resistor suitability remain unverified. |

## 3. Create an independent reproduction project

| ID  | Task                                          | Completion check                                           | Status | Evidence / notes                                                                                                                                                                                                |
| --- | --------------------------------------------- | ---------------------------------------------------------- | :----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.1 | Create the new project directory | Independent directory; practice project preserved | ✅ | VM terminal pwd confirmed /home/userhush/Projects/IC_Projects/CCIA. Practice-project directory was also visible in a listing; its contents were not audited. |
| 3.2 | Configure cds.lib and create a design library | Register centralized PDK and attach appropriate technology | ✅ | Inspected cat cds.lib showing Cadence INCLUDE and centralized smic18mmrf DEFINE. Library Manager confirmed ccia_lib at /home/userhush/Projects/IC_Projects/CCIA/ccia_lib. CIW reported successful technology attachment; techGetTechFile(ddGetObj("ccia_lib"))~>libName returned "smic18mmrf". Backup command completed without a displayed error. |
| 3.3 | Configure startup and simulation output       | New sessions use this project's own results directory      |   ❌    | Do not copy the practice project's absolute output path.                                                                                                                                                        |
| 3.4 | Configure model files and process corner      | Netlist loads intended models without invalid includes     |   ❌    | Record model paths and selected sections.                                                                                                                                                                       |
| 3.5 | Run a minimal transistor test                 | Valid DC and transient results; no fatal errors            |   ❌    | Check operating points and node voltages, not just run completion.                                                                                                                                              |

## 4. Verify the input-boosted first stage
### 4.1 Theory preparation

| ID | Task | Completion check | Status | Evidence / notes |
|---|---|---|:---:|---|
| 4.1.1 | Study and annotate Fig. 4 | Explain input devices, tail devices, capacitors, and bias loops | ❌ | |
| 4.1.2 | Characterize candidate MOS devices | Check current and gm/Id near intended operating points | ❌ | Record device type, W/L, body connections, and model corner. |
| 4.1.3 | Build the first-stage core | Correct connectivity with controlled bias sources for initial tests | ❌ | In progress: core and coupling network visually reviewed on 2026-10-24. Bias paths, body wiring, electrical checks, and testbench remain pending. |
| 4.1.3a | Create the first-stage schematic view | Correct library/cell/view opens | ✅ | Verified title: ccia_lib / input_boosted_stage1 / schematic. |
| 4.1.3b | Place the eight core MOSFETs | Check names, models, dimensions, and branch arrangement | ✅ | User screenshot inspected: MP2P, MP1P, MN1P, MN2P on left; MP2N, MP1N, MN1N, MN2N on right. p18/n18; W = 10u throughout; input L = 400n, tail L = 10u; m = 1. Right column mirrored. |
| 4.1.3c | Wire the core branches and supplies | Verify connections and VDD/VSS, VON/VOP, SP_P/SP_N, SN_P/SN_N labels | ❌ | Branches, rails and VON/VOP visually checked on 2026-10-24. Internal source-net labels and electrical connectivity audit remain pending; retain this parent task as incomplete. |
| 4.1.3d | Add coupling, bias elements, body wiring, and pins | Complete and check Fig. 4(a) connectivity | ❌ | Four Cg and four Cs plus input/output pins visually checked; see 4.1.3e. Gate-bias elements, body wiring, supply interfaces and electrical audit remain pending. Document all ideal substitutions. |
| 4.1.3e | Place and wire the coupling network and signal pins | Visually trace VIP/VIN, Cg/Cs, and VON/VOP | ✅ | Screenshot reviewed 2026-10-24: VIP to left gates/right sources; VIN to right gates/left sources; Cg 3.5pF, Cs 20pF. Pin directions and netlist verification are separate pending checks. |
| 4.1.3f | Audit connectivity and supply interfaces | Highlight VIP/VIN/VON/VOP; verify crossings, pin directions and actual supply net names | ❌ | Supply symbols are present; decide explicit supply pins for reusable cells. Labels alone do not supply voltage. |
| 4.1.3g | Complete MOS body connections | Record each body net and confirm PDK well/device restrictions | ❌ | Do not tie each body to its source without checking paper body-effect assumptions and available devices. |


### 4.2 Verification(if not meet the standard , return 4.1)
| ID | Task | Completion check | Status | Evidence / notes |
|---|---|---|:---:|---|
| 4.4 | Verify DC operating point | Check branch currents, device voltages, and output headroom | ❌ | |
| 4.5 | Test gate and source coupling separately | Verify gain, polarity, and useful frequency ranges | ❌ | Maintain consistent loading and bias. |
| 4.6 | Test both coupling paths together | Demonstrate input boosting under matched conditions | ❌ | Compare with separate-path results. |
| 4.7 | Compare with a conventional inverter-based reference | Compare gain and input-referred noise at consistent current and loading | ❌ | State noise bandwidth and normalization. |
| 4.8 | Implement the bias circuits | Replace temporary bias sources and verify bias-loop operation | ❌ | Include startup and settling checks. |
| 4.9 | Check first-stage robustness | Repeat essential checks over selected corners and temperatures | ❌ | Select and document test coverage. |

## 5. Build the complete amplifier

| ID | Task | Completion check | Status | Evidence / notes |
|---|---|---|:---:|---|
| 5.1 | Build and test the second stage | Verify bias, gain, and bandwidth | ❌ | Reference: Fig. 8. |
| 5.2 | Build and test the third stage | Verify bias, output common mode, and load behavior | ❌ | Reference: Fig. 9. |
| 5.3 | Implement interstage coupling and pseudo-resistors | Verify bias recovery and high-pass corners | ❌ | Check leakage and available well connections. |
| 5.4 | Integrate stages and capacitive feedback | Obtain intended closed-loop gain | ❌ | Reference: Fig. 7; record all loads and feedback values. |
| 5.5 | Verify loop stability | Assess signal and bias loops and transient settling | ❌ | Recheck after adding choppers and positive feedback. |
| 5.6 | Add choppers and clocks | Verify modulation, demodulation, and recovered output | ❌ | Document clock levels, timing, and switch implementation. |
| 5.7 | Add input-impedance enhancement | Verify impedance improvement and stable operation | ❌ | Compare positive-feedback loop enabled and disabled. |

## 6. Evaluate and document performance

| ID | Task | Completion check | Status | Evidence / notes |
|---|---|---|:---:|---|
| 6.1 | Measure gain and bandwidth | Compare with 39 dB and 1.6 kHz | ❌ | Specify differential input/output and loading. |
| 6.2 | Measure total current and power | Compare with 40 nA / 24 nW at 0.6 V | ❌ | Include implemented bias and auxiliary circuits; explicitly state clock-power accounting. |
| 6.3 | Measure noise with chopping active | Use a suitable periodic-noise method; document integration limits | ❌ | Compare with 5.09 µV rms and approximately 100 nV/√Hz noise floor. |
| 6.4 | Calculate NEF and PEF | Use consistent noise, bandwidth, temperature, and current definitions | ❌ | Reference NEF 0.98; PEF 0.58. |
| 6.5 | Measure CMRR, PSRR, and input impedance | Define stimulus, frequency, and measurement procedure | ❌ | Reference CMRR >83 dB, PSRR >88 dB below 1 kHz; input impedance >75 MΩ. |
| 6.6 | Measure distortion and output swing | Define input amplitude, frequency, output swing convention, and load | ❌ | Reference THD approximately 0.5% at the reported 75%-of-supply output swing; verify exact convention. |
| 6.7 | Check robustness | Document corners, temperature, supply, and mismatch coverage | ❌ | Do not assume all statistical models are available. |
| 6.8 | Prepare the reproduction report | Compare results, explain differences, and record design changes | ❌ | Distinguish schematic simulation from the paper's chip measurements. |

## Initial paper reference values — 180 nm version

These are reported paper values, **not our achieved results**. This list is a starting point for task 1.4, not a complete test specification.

| Quantity | Paper reference | Notes |
|---|---|---|
| Supply | 0.6 V | Low-voltage biasing must be verified in SMIC. |
| Total current / power | 40 nA / 24 nW | Define simulation accounting boundaries. |
| Closed-loop gain | 39 dB | Do not interpret this as a linear gain of 39. |
| −3 dB bandwidth | 1.6 kHz | Define measurement method for chopped operation. |
| Chopping frequency | 12 kHz | Clock implementation remains to be designed. |
| Integrated input-referred noise | 5.09 µV rms | Verify integration limits and filtering before comparison. |
| Input-referred noise floor | Approximately 100 nV/√Hz | Distinct from integrated noise. |
| NEF / PEF | 0.98 / 0.58 | Use the paper's definitions. |
| CMRR / PSRR | >83 dB / >88 dB below 1 kHz | Reported across three samples. |
| Input impedance | >75 MΩ | Includes positive-feedback enhancement; specify test conditions. |
| THD | Approximately 0.5% | Reported at 75%-of-supply output swing; exact stimulus/convention to confirm. |

## Detailed design and learning work packages

These tasks expand sections 1, 4 and 5; they do not replace their stable IDs. Calculation, PDK simulation, and explanation are all part of reproduction. A parameter is either **paper-reported**, **derived**, **chosen provisionally**, or **simulation-verified**. Record which category applies.

### A. Establish the numerical design basis

| ID | Subtask / learning objective | Completion evidence | Status |
|---|---|---|:---:|
| A1 | Confirm nominal supply from the paper | Section IV-D explicitly states 0.6 V for both prototypes; reviewed 2026-10-24 | ✅ |
| A2 | Record the 180 nm starting values | Table I: input MOS 10u/0.4u; tail MOS 10u/10u; Cg 3.5pF; Cs 20pF; Gm1 main 24nA; Ib 600pA | ✅ |
| A3 | Derive branch-current and power budgets | Explain 24nA/2 = 12nA per symmetric series branch; 12nA/600pA = 20; do not count PMOS and NMOS series currents twice. Reconcile rounded Table I total 40.2nA with reported 40nA | ❌ |
| A4 | Draw a DC voltage/headroom budget for each branch | Start with proposed Vcm = 0.3V; derive source/gate voltages and allowable swings using SMIC operating points. Vcm is a starting choice, not a measured reproduction result | ❌ |
| A5 | Build a parameter/assumption register | For each missing size, bias voltage, load, clock detail and temperature: source, initial choice, reason, sweep and acceptance condition | ❌ |

### B. Characterize devices and design Fig. 4(b) bias circuitry

| ID | Subtask / learning objective | Completion evidence | Status |
|---|---|---|:---:|
| B1 | Finish 3.3-3.5: configure output/models and run a one-device testbench | Correct model section and project-local logs; valid DC node voltages and currents | ❌ |
| B2 | Sweep n18 and p18 at relevant body bias and drain voltage | Plot Id versus VGS/VSG; extract gm/Id, gds, gmb and source/drain headroom near 600pA and 12nA. Record temperature/corner and simulator tolerances | ❌ |
| B3 | Derive an initial replica geometry | For equivalent terminal voltages and same device type, current approximately scales with W/L. A 20:1 current ratio suggests replica W/L about 1/20 of main W/L. Check minimum geometry, narrow-width effects, current accuracy and mismatch; this is an estimate, not paper data | ❌ |
| B4 | Verify the PMOS and NMOS replica stacks separately | Obtain Vbp/Vbn at Ib = 600pA with 0.6V supply; verify that the main stack reaches intended current/headroom. Iterate W and L independently as needed | ❌ |
| B5 | Derive the branch DC-control loop polarity | Annotate Fig. 4(b) ACMB and its two separate tail controls; verify a rise in output causes corrective feedback. Do not replace both controls permanently with one common voltage | ❌ |
| B6 | Size and test the ACMB circuitry | Establish current allocation, DC gain, input/output ranges and stable settling; characterize each loop before connecting both branches | ❌ |
| B7 | Verify first-stage bias startup and robustness | Supply ramp, initial-condition variation, supply/corner/temperature checks; verify both outputs settle near target and remain in useful operating regions | ❌ |
| B8 | Address generation of Ib and Vcm | Begin with clearly documented ideal sources; reproduce or design the constant-gm/PTAT reference and startup where details permit. If retained ideal, state the missing circuitry and excluded power explicitly | ❌ |

Avoid using the strong-inversion square-law equation as the primary sizing model for the paper's deep-subthreshold input devices. Use weak-inversion reasoning and PDK Id/gm characterization. The paper's tail-device operating region must also be checked rather than inferred solely from a simulator region label.

### C. Design and verify the pseudo-resistors

| ID | Subtask / learning objective | Completion evidence | Status |
|---|---|---|:---:|
| C1 | Select and document a feasible pseudo-resistor topology | Separate published topology from our implementation choice; check well/body options, voltage polarity and leakage | ❌ |
| C2 | Derive the required gate-bias resistance | Choose allowable attenuation at the lowest test frequency and a recovery-time goal; for a simple gate-coupling approximation use fL ≈ 1/(2*pi*Rb*Cg), then account for parasitics and actual network | ❌ |
| C3 | Use a temporary ideal resistor to verify the core | Choose R from C2, not an arbitrary default; record that this is a temporary linear model and include its modeled noise when relevant | ❌ |
| C4 | Sweep candidate pseudo-resistor W/L and bias | Obtain I-V and differential resistance rd = 1/(dI/dV) around intended DC voltage, including leakage, symmetry and large-signal behavior | ❌ |
| C5 | Integrate four MOS pseudo-resistor elements and re-test | Check gate DC bias, transfer response, noise, offset recovery and settling over relevant conditions; inspect numerical leakage/tolerance sensitivity | ❌ |

Illustration only: Cg = 3.5pF and a chosen fL = 1Hz imply Rb ≈ 45.5Gohm and RC ≈ 0.159s in the simple one-pole model. This is not a paper-specified resistance or our selected final target. Source coupling has a different impedance and cannot be sized with the same gate-path approximation without analysis.

### D. Verify the first-stage principle with controlled experiments

| ID | Subtask / learning objective | Completion evidence | Status |
|---|---|---|:---:|
| D1 | Finish wiring, pin/body audit and Check and Save | No unexplained connectivity errors; inspect generated netlist and preserve a checkpoint | ❌ |
| D2 | Establish a DC operating point with controlled test bias | VDD 0.6V, VSS 0V; record branch currents, all device terminal voltages, gm/gds/gmb and outputs. Fixed bias may fail to center high-gain outputs; add documented temporary DC control if needed | ❌ |
| D3 | Derive small-signal gate/source contributions | Predict signs and frequency dependence; include body effect and tail impedance. Define v_id = VIP-VIN and v_od = VOP-VON | ❌ |
| D4 | Compare gate-only, source-only and combined drive | Preserve DC bias and AC loading; disable a stimulus by AC-grounding its drive, not by removing capacitors. Plot contributions at matched bias/load | ❌ |
| D5 | Compare analytical predictions with AC/transient results | Identify band where boosting occurs, gain ratio, phase and source-node motion; explain discrepancies | ❌ |
| D6 | Replace temporary bias/resistor models and repeat | Demonstrate that boosting and useful operating points survive realistic implementation | ❌ |
| D7 | Compare with a conventional reference and measure noise | Same current, load and integration band; document fair normalization and unresolved differences | ❌ |

### E. Integrate and evaluate the full amplifier

| ID | Subtask / learning objective | Completion evidence | Status |
|---|---|---|:---:|
| E1 | Derive stage-2/stage-3 current and headroom budgets | Table I starting currents 7.2nA and 4.8nA; separately characterize missing dimensions for Figs. 8-9 | ❌ |
| E2 | Test each later stage and its DC-control loop | DC, gain/phase, load response, startup and current results before integration | ❌ |
| E3 | Integrate coupling and capacitive feedback without chopping first | Use Table I feedback/interstage values; derive gain and check signal/bias-loop stability | ❌ |
| E4 | Add and verify chopping | Start from documented ideal switches if useful, then MOS switches; 12kHz starting clock; record levels, duty, nonoverlap, charge injection and power boundary | ❌ |
| E5 | Add input-impedance positive feedback | Compare disabled/enabled impedance, gain and stability; derive missing component choices | ❌ |
| E6 | Execute section 6 measurements with fixed definitions | Record stimulus, load, corner, temperature, noise limits and chopped-analysis method for every metric | ❌ |
| E7 | Produce a comparison and limitations report | Paper measured results versus our schematic results; list process differences, chosen sizes and all remaining ideal sources/circuits | ❌ |

### Immediate next session

1. Save the schematic and audit signal/supply net names, pin directions, crossing wires and MOS body options.
2. Work through A3-A4 together: current paths, 12nA nominal branch current, reference ratio, and the 0.6V headroom budget.
3. Complete model/output setup and one-device characterization (B1-B2) before assigning missing W/L values.
4. Choose a temporary gate-bias resistance from an explicit frequency/recovery requirement; obtain a controlled first-stage DC point.
5. Characterize input boosting, then replace temporary elements and integrate the complete amplifier. Do not claim paper-level performance from the idealized core test.

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

- Project and library creation are verified. Core/capacitor wiring has been visually reviewed; disk save state, netlist connectivity, model loading and startup/output settings remain unverified for this project.
- The current contents of the practice project's `cds.lib` and `.cdsinit` have not been reread in this session.
- Earlier `VACOMP-2096` errors involving `res.def` and `res_rf.def` have no confirmed root cause or documented fix.
- A previous transient run succeeded, but later plots alone do not establish that the model errors are permanently resolved.
- Previous inverter screenshots showed port currents; full input/output voltage verification is not documented.
- The paper's 180 nm process is not established as identical to SMIC_018_MMRF.
- Missing device sizes, auxiliary-circuit details, and measurement conditions must be identified rather than guessed as paper facts.

## Progress log

| Date | Update | Evidence / author |
|---|---|---|
| 2026-10-20 | Created the shared plan from the agreed scope and existing conversation. No new circuit tasks marked complete. | Assistant; environment completion based on user handover. |

| 2026-10-21 | Reviewed user notes: marked 3.1 complete as user-reported; retained 3.2 as incomplete with partial progress recorded. Updated project path and flexible-order guidance. | Assistant reviewed this Markdown file; no direct VM verification. |


| 2026-10-21 | End-of-session update: verified Computer Use, project/library setup and technology attachment; created first-stage schematic and placed eight sized MOSFETs. User reports saving. Wiring is not yet verified; resume from saved schematic inspection. | Assistant checked live VM screens and user-supplied screenshot; no simulation results. |


| 2026-10-24 | Visually reviewed core rails, outputs, eight coupling capacitors and input routing. Confirmed 0.6V and Table I design basis; added calculation, device characterization, bias sizing, pseudo-resistor design and staged integration work packages. Electrical audit and simulation remain pending. | Assistant: supplied schematic screenshot and paper pages 5/7 reviewed; no simulation evidence. |
