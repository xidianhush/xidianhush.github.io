# Input-Boosted CCIA — Shared Reproduction Plan

Last updated: 2026-10-21

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

- **Session stopped:** 2026-10-21. User reports saving the schematic before ending the session.
- **Verified:** project directory, PDK registration, `ccia_lib` creation, attachment to `smic18mmrf`, and creation of `ccia_lib/input_boosted_stage1/schematic`.
- **Latest inspected circuit:** eight MOSFETs placed in two columns, with the right column mirrored. Input devices have W/L = 10u/400n; tail devices have W/L = 10u/10u; all visible multipliers are 1.
- **Wiring status:** the latest supplied screenshot shows no inter-device wiring. Wiring instructions were provided afterward, but completion has not been confirmed. Inspect the saved schematic before assuming these wires exist.
- **Suggested next action:** inspect the saved state, finish the vertical branch and supply wiring and node labels, then add coupling capacitors, gate-bias elements, body connections, and interface pins for Fig. 4(a).
- **Working pace:** use larger batches of instructions with a check after each batch, as requested by the user. Task order remains flexible.
- No reproduction simulation has been run or validated. Fig. 4(b) bias circuits remain pending.
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

| ID | Task | Completion check | Status | Evidence / notes |
|---|---|---|:---:|---|
| 4.1 | Study and annotate Fig. 4 | Explain input devices, tail devices, capacitors, and bias loops | ❌ | |
| 4.2 | Characterize candidate MOS devices | Check current and gm/Id near intended operating points | ❌ | Record device type, W/L, body connections, and model corner. |
| 4.3 | Build the first-stage core | Correct connectivity with controlled bias sources for initial tests | ❌ | In progress: schematic created and eight MOSFETs placed; see subtasks and session checkpoint. Wiring, capacitors, gate-bias elements, body connections, pins, and test bias sources remain to be completed/verified. |
| 4.3a | Create the first-stage schematic view | Correct library/cell/view opens | ✅ | Verified title: ccia_lib / input_boosted_stage1 / schematic. |
| 4.3b | Place the eight core MOSFETs | Check names, models, dimensions, and branch arrangement | ✅ | User screenshot inspected: MP2P, MP1P, MN1P, MN2P on left; MP2N, MP1N, MN1N, MN2N on right. p18/n18; W = 10u throughout; input L = 400n, tail L = 10u; m = 1. Right column mirrored. |
| 4.3c | Wire the core branches and supplies | Verify connections and VDD/VSS, VON/VOP, SP_P/SP_N, SN_P/SN_N labels | ❌ | Instructions delivered; completion not yet confirmed. Inspect saved schematic next session. |
| 4.3d | Add coupling, bias elements, body wiring, and pins | Complete and check Fig. 4(a) connectivity | ❌ | Four gate-coupling and four source-coupling capacitors; four gate-bias pseudo-resistor elements. Any temporary ideal substitutions must be explicitly documented. |
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

- Project and library creation are verified. The latest saved wiring state still needs inspection; model loading and startup/output settings remain unverified for this project.
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
