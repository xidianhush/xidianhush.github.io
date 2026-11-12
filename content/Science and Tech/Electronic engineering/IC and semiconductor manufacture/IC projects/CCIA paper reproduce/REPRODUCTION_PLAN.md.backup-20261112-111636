this is my graduation project
# Input-Boosted CCIA — Shared Reproduction Plan

Last updated: 2026-10-25
I want to know what I have done
And what I will do
## Scope

- Reference: *A Highly Power-Efficient Input-Boosted First Stage for Capacitively Coupled Chopper Instrumentation Amplifiers* (JSSC, DOI: 10.1109/JSSC.2025.3564316).
- Reproduce the **180 nm implementation** using the available **SMIC_018_MMRF** PDK, subject to device and model verification.
- Determine the size of the transistors of **full-amplifier schematic simulation**.
- Layout, DRC/LVS, and post-layout simulation later.
- Working language: English; explain unfamiliar terms, commands, and interface operations step by step.

## How we update this file (for Agent)

- Task IDs are tracking labels, not a mandatory sequence. Choose tasks flexibly while respecting technical dependencies. Suggested next tasks can change together.
- Either of us can edit this document. Read its latest contents before planning or changing task status.
- `✅` means complete with the evidence described in the row. `❌` means remaining or not yet verified; it does not necessarily mean a failed test.
- When finishing a task, change its status and add a short note with the result, test conditions, and a log, plot, or file path when available.
- User-reported completion can be recorded as such. Distinguish it from a result independently checked in this project.
- Keep task IDs stable. Add new subtasks when needed instead of silently expanding a completed task.
- Update the date and the **Current checkpoint** after meaningful progress. Preserve existing notes from either collaborator.
- A simulation finishing successfully proves software execution, not that the circuit meets the paper's specifications.
- Back up configuration files before edits. Preserve the practice project, centralized PDK, models, and existing simulation data.

## Current checkpoint (for Agent)

- **Verified visually on 2026-10-24:** eight sized MOSFETs, both vertical branches and supply rails, VON/VOP output pins, VIP/VIN input pins, four Cg = 3.5 pF and four Cs = 20 pF capacitors, and the intended opposite-polarity gate/source coupling. Evidence: user screenshot codex-clipboard-b27a3791-1f8c-41a8-bf78-57a2b944a9e8.png.
- **Verification limit:** this is a screenshot connectivity review, not a netlist audit. Highlight crossing nets, inspect pin directions and supply-symbol global-net names, and run Check and Save after completing the circuit. Current disk save state is not independently verified.
- **Still missing:** four gate-bias paths, tail-gate bias connections, all body connections, Fig. 4(b) bias circuitry, testbench, model verification, and simulation results.
- **Paper-confirmed nominal supply:** VDD - VSS = 0.6 V (Section IV-D, PDF page 7). Testbench starting convention: VSS = 0 V, VDD = 0.6 V.
- **Next learning step:** derive the current/headroom budget and characterize SMIC MOS devices before choosing missing bias and pseudo-resistor dimensions. Do not invent unpublished sizes as paper facts.
- **Working pace:** explain calculations and use larger UI instruction batches, checking each batch. Task order is flexible; dependencies still matter.
- **Project:** /home/userhush/Projects/IC_Projects/CCIA; ccia_lib/input_boosted_stage1/schematic. No reproduction simulation has been validated.

## 1. Define the project

| ID  | Task                                | Completion check                                                            | Status | Evidence / notes                                                                             |
| --- | ----------------------------------- | --------------------------------------------------------------------------- | :----: | -------------------------------------------------------------------------------------------- |
| 1.1 | Obtain and read the paper           | Identify architecture, circuits, parameters, and reported results           |   ✅    | PDF read; Fig. 4, Fig. 7–9, and Tables I–II reviewed.                                        |
| 1.2 | Select the reference implementation | Use the paper's 180 nm version                                              |   ✅    | Agreed in chat. Same process node does not establish identical device behavior.              |
| 1.3 | Agree on scope                      | First stage and complete CCIA, schematic simulation first , then layout     |   ✅    | User confirmed the provisional scope; no layout or post-layout work.                         |
| 1.4 | Prepare the specification checklist | Record target values, definitions, test conditions, and missing information |   ❌    | Initial reference values appear below; detailed measurement procedures remain to be defined. |

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
| 3.4 | Configure model files and process corner      | Netlist loads intended models without invalid includes     |   ❌    | Record model paths and selected sections.  , ⚠️ this step can be done with later step `### 4.3 Verification`  , if `### 4.3 Verification` failed , return to this                                                                                                                                                                                  |
| 3.5 | Run a minimal transistor test                 | Valid DC and transient results; no fatal errors            |   ❌    | Check operating points and node voltages, not just run completion.⚠️ this step can be done with later step `### 4.3 Verification`  , if `### 4.3 Verification` failed , return to this                                                                                                                                                             |

## 4. Build & verify the input-boosted first stage

In this step, I try to split whole big tasks into several small tasks
I list several unordered to task below
so we should put those tasks in the right order later

To let the complete amplifier meet those standards:
+ VDD ： 0.5-1v
+ BW ：1KHz-1.5KHz
+ $Z_{in} \geq 100M \ohm$
+ Equivalent Input Noise (IRN) : ≤5μV
+ Small signal Open-loop gain: ≥50 dB
+ Power Supply Rejection Ratio (PSRR): ≥90dB, Common-Mode Rejection Ratio (CMRR): ≥85dB
+ Total Harmonic Distortion (THD): ≤0.5%
+ Open-loop stability and closed-loop stability

i split the whole task to small tasks
So i should let the first stage of the amplifier meet those standards:
+ VDD： 1v
+ BW：unknown yet
+ $Z_{in} \geq 100M \ohm$ (reference paper use Positive Feedback Loop to increase iput impetance)
+ Equivalent Input Noise (IRN): unknown yet
+ Small signal Open-loop gain:  unknown yet
+ Power Supply Rejection Ratio (PSRR): ≥unknown yet, Common-Mode Rejection Ratio (CMRR): unknown yet
+ Total Harmonic Distortion (THD): unknown yet
+ Open-loop stability should be concerned


### 4.1 Theory preparation

| ID    | Task                               | Completion check                                                |       Status        | Evidence / notes                                             |
| ----- | ---------------------------------- | --------------------------------------------------------------- | :-----------------: | ------------------------------------------------------------ |
| 4.1.1 | Study and annotate Fig. 4          | Explain input devices, tail devices, capacitors, and bias loops | <br>In progress<br> |                                                              |
| 4.1.2 | Characterize candidate MOS devices | Check current and gm/Id near intended operating points          |          ❌          | Record device type, W/L, body connections, and model corner. |

### 4.2 Build the first-stage ampilfier

`### 4.2 Build the first-stage core` shouled be modified extensively
#### 4.2.3 Build the first stage amplifier core

I got stuck here.
==I do not know whether this is right before==

problem:

As for the main part of the amplifier
Can i directly apply the size of the transistor in paper , 
or whether I should determine the size all by myself?

answer:
CAN NOT

temporary decision
i will design by myself




#### 4.2.4 Build the bias circuit and pseudo-resistors of the first stage 

##### build the bias circuit

first
I need to determine the bias circuit and bias voltage 
for all the MOSFETs in the first stage amplifier

##### Determine the resistance of pseudo resistor

problems

Before determine the resistance of pseudo-resistors , 
i shall determine those things in sequence 
+ BW of this amp related to the chopper frequency given 1k - 1.5k in Project plan 
then
+ $C_g$ , Only given in the paper
+ $C_{gf}$, Only given in the paper
+ $C_{sf}$, Only given in the paper

if i need to calculate the $C_{gf} , C_{gs}$ my self
Do not know how to determine them so far

or shall I directly use the capacitors in the paper?


link: https://chat.deepseek.com/share/0ma0pkpgnqsqtoceyu

##### Determine the size of MOSFET of the biasing circuit

problems:
+ The paper does not mention the size of bias circuit transistors.

Temporary decision
+ not decide yet



| ID     | Task                                                                                              | Completion check                                                                        | Status | Evidence / notes                                                                                                                                                                                   |
| ------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | :----: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4.2.4  | Plot the circuit which the size of which is unknown in the paper                                  | Do not know                                                                             |   ❌    | Do not know                                                                                                                                                                                        |
| 4.2.4a | Determine the resistance of pseudo-resistors and determine the size of MOSFET in pseudo-resistors | Do not know                                                                             |   ❌    | Do not know                                                                                                                                                                                        |
| 4.2.4b | Determine the biasing current and voltage, and determine the size of the biasing circuit          | Do not know                                                                             |   ❌    | Do not know                                                                                                                                                                                        |
| 4.2.4c | Add coupling, bias elements, body wiring, and pins                                                | Complete and check Fig. 4(a) connectivity                                               |   ❌    | Four Cg and four Cs plus input/output pins visually checked; see 4.1.3e. Gate-bias elements, body wiring, supply interfaces and electrical audit remain pending. Document all ideal substitutions. |
| 4.2.4d | Place and wire the coupling network and signal pins                                               | Visually trace VIP/VIN, Cg/Cs, and VON/VOP                                              |   ✅    | Screenshot reviewed 2026-10-24: VIP to left gates/right sources; VIN to right gates/left sources; Cg 3.5pF, Cs 20pF. Pin directions and netlist verification are separate pending checks.          |
| 4.2.4e | Audit connectivity and supply interfaces                                                          | Highlight VIP/VIN/VON/VOP; verify crossings, pin directions and actual supply net names |   ❌    | Supply symbols are present; decide explicit supply pins for reusable cells. Labels alone do not supply voltage.                                                                                    |
| 4.2.4f | Complete MOS body connections                                                                     | Record each body net and confirm PDK well/device restrictions                           |   ❌    | Do not tie each body to its source without checking paper body-effect assumptions and available devices.                                                                                           |


### 4.3 Verification(if not meet the standard , return 4.1)
| ID  | Task                                                 | Completion check                                                        | Status | Evidence / notes                         |
| --- | ---------------------------------------------------- | ----------------------------------------------------------------------- | :----: | ---------------------------------------- |
| 4.4 | Verify DC operating point                            | Check branch currents, device voltages, and output headroom             |   ❌    |                                          |
| 4.5 | Test gate and source coupling separately             | Verify gain, polarity, and useful frequency ranges                      |   ❌    | Maintain consistent loading and bias.    |
| 4.6 | Test both coupling paths together                    | Demonstrate input boosting under matched conditions                     |   ❌    | Compare with separate-path results.      |
| 4.7 | Compare with a conventional inverter-based reference | Compare gain and input-referred noise at consistent current and loading |   ❌    | State noise bandwidth and normalization. |
| 4.8 | Implement the bias circuits                          | Replace temporary bias sources and verify bias-loop operation           |   ❌    | Include startup and settling checks.     |
| 4.9 | Check first-stage robustness                         | Repeat essential checks over selected corners and temperatures          |   ❌    | Select and document test coverage.       |

## 5. Build the complete amplifier

I will refine the content of this section next.



## 6. Evaluate and document performance




## Immediate next session

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
