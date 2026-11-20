# gm/ID Theory Notes — CCIA Reproduction Project

> **What this file is:** theory-tutoring notes (English) for the paused gm/ID learning session. Written by the theory agent; grows one section per teaching batch.
> **What this file is NOT:** it does not modify the student's [[Analog IC]] notes or [[REPRODUCTION_PLAN]] (operations session owns that file). No Virtuoso/Spectre/ADE operation is performed here.
> **Primary reference:** F. Silveira, D. Flandre, P. G. A. Jespers, "A $g_m/I_D$ Based Methodology for the Design of CMOS Analog Circuits and Its Application to the Synthesis of a Silicon-on-Insulator Micropower OTA," *IEEE J. Solid-State Circuits*, vol. 31, no. 9, pp. 1314–1319, Sept. 1996. Cited below as **[Silveira §x, Fig. y, Table z]**.
> **Project context (from handoff, 2026-11-19):** SMIC 0.18 µm MMRF (`n18`/`p18`), $V_{DD}=0.6$ V, corner `tt`, 27 °C. Characterization bench `tb_n18_char`: one n18, $W=10$ µm, $L=0.4$ µm ($W/L=25$), $V_{DS}=0.15$ V, $V_{SB}=0$, $V_{GS}$ swept 0→0.6 V (2 mV step). Measured: $|I_D|=97.83$ µA at $V_{GS}=0.6$ V. Target: $|I_D|=12$ nA per series device (24 nA branch ÷ 2).
> **Student baseline:** Razavi-style strong-inversion hand calculation (telescopic + folded-cascode design steps, images at `Analog IC.md` lines 952 and 1045). Each batch maps the new idea onto that baseline.

---

## 1 · Why square-law hand calculation fails at 12 nA and 0.6 V

### 1.1 What your Razavi procedure assumes

Your handwritten steps (both telescopic and folded cascode) run on:

$$I_D = \tfrac{1}{2}\mu_n C_{ox}\frac{W}{L}(V_{GS}-V_{TH})^2,\qquad g_m = \mu_n C_{ox}\frac{W}{L}V_{OD},\qquad g_m r_o = \frac{\sqrt{2\mu_n C_{ox}(W/L)I_D}}{\lambda I_D}$$

with $V_{OD}=V_{GS}-V_{TH}$ chosen from the output swing (your example: $V_{OD1}=V_{OD3}=200$ mV). **Every one of these equations is a strong-inversion (SI) saturation model.** [Silveira §I] calls this the "mainstream" method keyed on the gate overdrive GVO; it is accurate only when $V_{GS}$ is well above $V_{TH}$.

### 1.2 The three inversion regions — there is no sharp $V_{TH}$ boundary

$V_{TH}$ is a modeling convention, not a physical switch. Below it the channel is weakly inverted and current flows by **diffusion** (BJT-like), exponentially in $V_{GS}$; above it, drift gives the square law; in between is **moderate inversion (MI)**, where neither closed form is accurate. [Silveira §I: minimum power in WI, best speed–power compromise in MI; §II: $g_m/I_D$ falls from its WI maximum as the device moves into SI.]

| Region | Rough condition | $I_D(V_{GS})$ | $g_m/I_D$ |
|---|---|---|---|
| Weak (WI) | $V_{GS}$ well below $V_{TH}$ | $\propto e^{V_{GS}/(nU_T)}$ | $\approx \dfrac{1}{nU_T}$ (maximum) |
| Moderate (MI) | $V_{GS}\approx V_{TH}\pm\sim 100$ mV | between exponential and square | between the two limits |
| Strong (SI) | $V_{OD}\gg nU_T$ | $\propto V_{OD}^2$ (→ linear deep in SI, velocity saturation) | $\approx \dfrac{2}{V_{OD}}$ |

Key definitions:

- $U_T = kT/q \approx 25.9$ mV at 27 °C (thermal voltage).
- $n$ = subthreshold slope factor, $n \approx 1 + C_{dep}/C_{ox} > 1$. [Silveira Fig. 1] reports $n=1.1$ for thin-film fully-depleted SOI and $n=1.5$ for the bulk devices of that 1996 process. Our SMIC 0.18 µm bulk $n$ must be **measured from the sweep**, not assumed.
- On a log axis the WI region is a straight line with slope $nU_T\ln 10 \approx 60\,n$ mV/decade.

### 1.3 Your own sweep proves the square law is useless here

From `tb_n18_char` (already run, linear axis): $I_D = 97.83$ µA at $V_{GS}=0.6$ V, $W/L=25$.

- $12$ nA is $97.83\,\mu\text{A}/12\,\text{nA} \approx 8150\times \approx 3.9$ decades below that point.
- In the exponential region each decade costs $\approx 60\,n$ mV. With $n\approx1.3\text{–}1.5$: $\Delta V_{GS}\approx 3.9\times(78\text{–}90\text{ mV}) \approx 0.30\text{–}0.35$ V.
- So $V_{GS}(12\text{ nA})$ lands roughly around $0.25\text{–}0.3$ V — **at or below threshold**. (Rough estimate: the top decades are not exponential, so the true value is somewhat higher; the log-axis read at S1 step 4 gives the truth, and the OP field `vth` tells us exactly where the boundary sits.)
- The square law says $I_D=0$ for $V_{GS}<V_{TH}$. The real device delivers 12 nA. **A model that predicts zero current cannot size the device.** That is the whole reason this theory session exists.

### 1.4 The payoff: transconductance efficiency

[Silveira §II, eq. (3)] $g_m/I_D = \frac{1}{I_D}\frac{dI_D}{dV_{GS}} = \frac{d\ln I_D}{dV_{GS}}$, maximal in WI at $1/(nU_T)$:

- Your Razavi SI example, $V_{OD}=200$ mV: $g_m/I_D = 2/V_{OD} = 10$ S/A.
- WI ceiling: $n=1.5 \Rightarrow 25.7$ S/A; $n=1.1 \Rightarrow 35$ S/A (the bulk/SOI maxima of [Silveira Fig. 1]).

At 12 nA the device gives roughly **2.5–3.5× more $g_m$ per ampere** than your 3 V Razavi design point. nA analog design works *because* of this efficiency — and it must be sized with $g_m/I_D$, not $V_{OD}$.

**Cost of ignoring this** [Silveira §IV, Table III]: forcing the square law into MI overestimates $g_m/I_D$ at a given $I_D/(W/L)$, so it **undersizes** $W/L$; on the real device the predicted $f_T$ was ~50% too high and the gain ~7 dB too high (3 µm SOI OTA case). The pure-WI exponential errs the other way (oversizes; ~15% $f_T$ error, +25% area in the same table). Only the unified $g_m/I_D$ curve is accurate in MI — where our 12 nA devices live.

**Check question (batch 1):** (a) $V_{OD}=200$ mV → $g_m/I_D=?$ (b) $n=1.4$, $U_T=25.9$ mV → $1/(nU_T)=?$ (c) Which is larger, and what does that say about the current needed for the same $g_m$?

---

### 1.5 Clarification (student question, 2026-11-19): where does $V_{OD}=200$ mV come from?

**Nobody's law — it is a designer's allocation from the output-swing headroom budget**, copied from Razavi's worked example into the student's sheet (Step 2, `Pasted image 20261116155030.png`). Each stacked device needs $V_{DS}\ge V_{OD}$, so each eats $V_{OD}$ volts of swing:

$$V_{swing}=V_{DD}-(V_{OD9}+V_{OD1}+V_{OD3})-(|V_{OD5}|+|V_{OD7}|) = 3-(0.5+0.2+0.2)-(0.3+0.3)=1.5\text{ V}$$

The 400 mV budget for the NMOS input+cascode pair is split *equally* (200+200 mV) by choice, not derivation. At $V_{DD}=0.6$ V this allocation is impossible (1.5 V > 0.6 V), and at 12 nA "$V_{OD}$" can be negative anyway. **gm/ID replaces the knob:** choose $g_m/I_D$ per role; $V_{GS}$ (headroom) becomes an *output*, read from the companion $g_m/I_D$–$V_{GS}$ curve [Silveira §II end, Fig. 3]. Bonus: in WI, $V_{DS,sat}\approx 4U_T\approx 0.1$ V regardless of current.

### 1.6 Pitfall (student answer corrected, 2026-11-19): direction of the efficiency argument

$g_m=(g_m/I_D)\cdot I_D$: the ratio is a **conversion rate (S of $g_m$ per A of bias)**. WI rate (≈27.6 S/A at $n=1.4$) > SI rate (10 S/A at $V_{OD}=200$ mV). Hence: same current → WI gives MORE $g_m$; same $g_m$ → WI needs LESS current. (Student initially stated both directions inverted; corrected.) Example: $I_D=12$ nA → $g_m=331$ nS (WI) vs 120 nS (SI); $g_m=331$ nS → $I_D=12$ nA (WI) vs 33.1 nA (SI).

---

## 2 · $g_m/I_D$: a size-independent dial for inversion level — the Silveira charts

### 2.1 Why $g_m/I_D$ labels the inversion level

[Silveira §II, reason 2, eq. (3)]: $g_m/I_D = d\ln I_D/dV_{GS}$ = the local slope of the log-$I_D$ curve. WI: constant at $1/(nU_T)$; SI: $2/V_{OD}$, falling as current rises; MI: the monotonic bridge between. So the *value* of $g_m/I_D$ is a continuous, one-to-one dial of "how inverted the channel is" — no binary region label needed [Silveira Fig. 1].

Rough reading for a bulk device with $n\approx1.3$–$1.5$: $g_m/I_D \gtrsim 25$ S/A → WI; $\sim 10$–$25$ → MI; $\lesssim 10$ → SI. (Boundaries are fuzzy by construction; our 12 nA target expects ≈25–38 S/A.)

### 2.2 Why $W$ cancels — the universality that makes sizing possible

At fixed $L$, $V_{DS}$, $V_{SB}$, $T$, write $I_D=(W/L)\,f(V_{GS})$; then $g_m=(W/L)\,f'(V_{GS})$, so

$$\frac{g_m}{I_D}=\frac{f'}{f}\quad(\text{no }W),\qquad \frac{I_D}{W/L}=f\quad(\text{no }W).$$

Both axes are width-free ⇒ **one curve per device type, per $L$, per bias condition, valid for every $W$** [Silveira §II: "a unique characteristic for all transistors of the same type … in a given batch"; the paper's caveat: revise for short-channel devices ⇒ in 0.18 µm keep one chart per $L$]. Sizing engine [Silveira §II, reason 3]: any two of $\{g_m/I_D,\ g_m,\ I_D\}$ fix the third; the chart then gives $I_D/(W/L)$; and $W/L = I_D \div \big(I_D/(W/L)\big)$.

### 2.3 The chart family

| Chart | Axes | Design question it answers | Paper anchor |
|---|---|---|---|
| Main | $g_m/I_D$ vs $I_D/(W/L)$ (log x) | inversion level ↔ current density; gives $W$ | Fig. 1 |
| Gain | $g_m/g_{ds}$ ($=g_m r_o$) vs $g_m/I_D$ | intrinsic gain available per device | eq. (1): $A_0=g_m/g_d=(g_m/I_D)V_A$; $V_A\propto L$ (≈7 V/µm for $L=3$–$12$ µm in their 3 µm process) |
| Speed | $f_T$ vs $g_m/I_D$ | speed bought at this efficiency | eq. (2): $f_T=g_m/(2\pi C_L)$ (loaded stage); device-level $f_T=g_m/(2\pi C_{gg})$ |
| Headroom | $g_m/I_D$ vs $V_{GS}$ (or $I_D$–$V_{GS}$) | bias voltages, swing | §II end; Fig. 3 flow |

Log x-axis because $I_D/(W/L)$ spans many decades (nA to µA per unit aspect ratio).

### 2.4 Lookup replaces closed form

No single equation is accurate from WI through MI to SI; the two asymptotes err in *opposite* directions [Silveira §IV, Table III: SI sizing → $f_T$ ~50% optimistic, gain ~7 dB optimistic; WI sizing → ~15% $f_T$ error, +25% area]. A simulated/measured curve carries velocity saturation, DIBL and mobility degradation automatically. **The curve IS the model** — no fitting error in MI, exactly where our 12 nA devices sit.

**Razavi bridge:** his five knobs $\{I_D,\ V_{OD},\ W/L,\ g_m,\ r_o\}$ become $\{I_D,\ g_m/I_D,\ W/L,\ g_m,\ g_{ds}\}$: $V_{OD}$ is demoted from design *input* to chart *output*; $r_o$ is read as $g_m/g_{ds}$. His Step 2 ("pick $V_{OD}$ from swing") becomes "pick $g_m/I_D$ from device role; check headroom on the $V_{GS}$ companion curve."

**Check question (batch 2):** (a) A device must give $g_m=300$ nS at $I_D=12$ nA — what $g_m/I_D$? (b) WI, MI or SI? (c) Double $W$ at fixed $L$ and fixed $V_{GS}$: do $g_m/I_D$ and $I_D/(W/L)$ change? Why?

---

## 3 · The design flow on *our* project — where the inputs come from, and how REPRODUCTION_PLAN uses the chart

*(Answers the student's question, 2026-11-19: "Razavi needs power and swing; our assignment gives neither — how does gm/ID apply per REPRODUCTION_PLAN?")*

### 3.1 The reframe: Razavi's two givens are replaced by two *other* givens

Razavi's hand flow needs two supplied numbers: $P$ (→ $I_D$) and output swing (→ $V_{OD}$). Our assignment supplies **neither** as a number — but it supplies something his textbook example did not: **a published design to reproduce**, plus performance specs. So:

| Razavi's given | Our replacement | Source |
|---|---|---|
| $P=10$ mW, $V_{DD}=3$ V → $I_{tot}$ | **Paper's current allocation**, inherited: 40 nA total; 24 nA first-stage branch → 12 nA per series device; 7.2 / 4.8 nA later stages; 4.2 nA bias; $I_b=600$ pA | Paper register, REPRODUCTION_PLAN lines 111–122; task 4.2.3d |
| Output swing → $V_{OD}$ per device | **No numerical swing spec** (plan line 95). Headroom becomes an *a posteriori constraint*, not an a priori allocation: at 0.6 V, four stacked devices cannot each take 200 mV ($0.8>0.6$). WI/MI devices need only $V_{DS,sat}\approx4U_T\approx0.1$ V. Budget written as $0.6=V_{SD,p2}+V_{SD,p1}+V_{DS,n1}+V_{DS,n2}$ (provisional CM 0.3 V → 0.3 V per *pair*, not per device); $V_{GS}$ cost read from the $g_m/I_D$–$V_{GS}$ companion curve; actual headroom/gds measured by the $V_{DS}$ sweep | Plan 4.2.3e; S2a ($V_{DS}$ 0.02–0.30 V); Silveira §II end |
| — (his example has no noise/gain spec driving $V_{OD}$) | **Performance specs we DO have** drive the $g_m/I_D$ choice per role (table 3.2) | Assignment targets, plan lines 86–97 |

If a hard power ceiling is supplied later: $I_{max}=P_{max}/V_{DD}$ (plan line 103). Until then the paper's currents are the *exploratory baseline*, not a derived optimum (plan line 26). Note: 5 µV noise alone cannot fix $g_m$ without integration band, flicker, chopping and filtering (plan line 103) — it sets a *direction* (more $g_m$), not a number.

### 3.2 Choosing $g_m/I_D$ per device role (replaces "pick $V_{OD}$ from swing")

| Role | Spec that drives it | $g_m/I_D$ direction | Mechanism |
|---|---|---|---|
| Input pair | noise ≤ 5 µV; open-loop gain > 50 dB | **high** (≈25–30 S/A) | $g_m=(g_m/I_D)I_D$: at fixed 12 nA, higher ratio = more $g_m$; $g_m$ sets the thermal-noise floor and the gain $g_mR_{out}$ |
| Tail / current sources | headroom at 0.6 V; CMRR ≥ 85 dB, PSRR ≥ 90 dB | **high** $g_m/I_D$ + **long $L$** | low $V_{DS,sat}$ frees stack voltage; long $L$ → high $g_m/g_{ds}$ → stiffer current source |
| Loads / mirrors | matching, noise contribution, speed | **moderate–low** (≈8–15 S/A) | Silveira §III chose $(g_m/I_D)_3=8$ for mirrors: SI improves matching and lowers their noise share; they need little $g_m$ |
| Bandwidth 1–1.5 kHz | set by the *loop* ($g_m/C$), not device $f_T$ | check only | $f_T$ chart confirms the device is ≫ kHz; it does not set the BW |

$L$ comes from the $g_m/g_{ds}$ chart ($V_A\propto L$, Silveira eq. (1)); the paper already fixes input $L=400$ nm and tail $L=10$ µm — task 4.2.3f asks you to **justify** those with model operating points, not re-derive them. $W$ then follows: $W/L = I_D \div \big(I_D/(W/L)\big)$; the paper's $W=10$ µm is a cross-check, not an input.

### 3.3 Step-by-step bridge: your sheet → gm/ID → plan task

| Your Razavi step | gm/ID counterpart | Input source in our project | Plan task / session |
|---|---|---|---|
| Step 1: $P,V_{DD}\to I_{tot}$, mirror ratios via $W/L$ | current allocation (same arithmetic) | paper register; $12\text{ nA}/600\text{ pA}=20$ | 4.2.3d, 4.2.4 (S3/S4) |
| Step 2: swing → $V_{OD}$ → $W/L$ via square law | choose $g_m/I_D$ per role → read $I_D/(W/L)$ → $W/L$; headroom checked *after* | specs (gain/noise/headroom) + chart | 4.1.2 (S1/S2), 4.2.3e/f (S3) |
| Step 3: verify $A_v$ via $g_m=\mu C_{ox}(W/L)V_{OD}$ | verify via $g_m/g_{ds}$ chart: $A_0=(g_m/I_D)V_A$ | measured OP at 12 nA | 4.1.2b (S1 step 5), 4.2.3f |
| Step 4: $A_v$ short → raise $L$ ($\lambda\propto1/L$) | same logic on $g_m/g_{ds}$ vs $L$; $L$ fixed by paper → verify, don't re-derive | $V_A\propto L$; tail $L=10$ µm | S2c, 4.2.3f |
| Step 5: body effect, CMFB | $g_{mb}$ OP field; body sensitivity sweep; CCIA uses capacitive feedback + chopping, not a Razavi-style CMFB | $V_{SB}\neq0$ sweep | S2b; S5 |

### 3.4 The plan in one paragraph (plain language)

**S1** measures *one point* of the chart (your paused sweep → 12 nA crossing → OP $g_m,g_{ds},g_{mb}$). **S2** extends the chart family ($V_{DS}$, body, p18, tails) and repairs the floating bulks. **S3** *uses* the chart to justify the first-stage sizes and write the voltage/current budgets. **S4** sizes the bias replica (~1/20 $W/L$ for 600 pA vs 12 nA) and pseudo-resistors. **S5** repeats the flow for later stages, feedback, chopping, impedance boost. **S6** verifies the whole amplifier against the assignment. The plan *is* the gm/ID method, staged — which is why line 320 says: **do not choose all sizes or complete all bias circuits before obtaining the first device curve.** The chart must exist before it can be used.

**Check question (batch 3):** (a) In our flow, what plays the role of Razavi's "$P=10$ mW → $I_{tot}$"? (b) Why can't we allocate $V_{OD}=200$ mV to each of the four stacked first-stage devices at $V_{DD}=0.6$ V, and what does a WI device need instead? (c) Which assignment spec pushes the *input pair* toward high $g_m/I_D$, and which pushes the *mirrors* toward low $g_m/I_D$?

---

## 4 · From your one sweep to the chart family; and how a $g_m/I_D$ value is actually chosen

*(Answers student questions, 2026-11-20: Q1 "I have the I–VGS curve from tb_n18_char — how does it become the gm/ID chart?" Q2 "I only get a range per role, not a value — do I guess (e.g. 20) and adjust?")*

### 4.1 Q1: the chart is your sweep, re-plotted (no new simulation)

Your sweep stores, at every $V_{GS}$ step (with $V_{DS}=0.15$ V, $V_{SB}=0$, $W/L=25$ fixed): $I_D$, **and the simulator's operating point** $g_m,\ g_{ds},\ g_{mb},\ C_{gg}$. $g_m$ there is the BSIM model's exact derivative $dI_D/dV_{GS}$ — not a square-law estimate. The charts are *parametric re-plots* of that same table; $V_{GS}$ becomes the hidden parameter that traces the curve:

| Chart | y | x | From your sweep |
|---|---|---|---|
| Main (Silveira Fig. 1) | $g_m/I_D$ | $I_D/(W/L)=I_D/25$ (log) | divide OP $g_m$ by $I_D$; divide $I_D$ by 25 |
| Headroom companion | $g_m/I_D$ | $V_{GS}$ | same y, x = sweep axis |
| Gain | $g_m/g_{ds}$ | $g_m/I_D$ | OP $g_{ds}$ at $V_{DS}=0.15$ V |
| Speed | $f_T=g_m/(2\pi C_{gg})$ | $g_m/I_D$ | OP $C_{gg}$ |

**One sweep → four charts.** The $I_D$–$V_{GS}$ curve you see and the $g_m/I_D$–$I_D/(W/L)$ chart are the *same data*, different axes. Dividing by $W/L=25$ is what makes x width-free (§2.2), so the curve then serves every $W$ at $L=400$ nm, $V_{DS}=0.15$ V, $V_{SB}=0$.

**Why your screenshot looks flat (and why S1 step 4 = log axis):** on a linear y-axis the nA decades are crushed into the baseline (your trace is flat to ~350–400 mV, then climbs to ~97.8 µA at 600 mV). On a **log** y-axis the WI region is a straight line whose slope is $1/(nU_T)$: in decades, $\text{mV/decade}=n\,U_T\ln 10\approx n\times59.6$ mV. Reading ~83 mV/dec ⇒ $n\approx1.4$ ⇒ WI ceiling $1/(nU_T)\approx27.6$ S/A. The 12 nA crossing is read on this log plot (S1 step 4); the OP there (step 5) gives the single chart point at 12 nA.

### 4.2 Q2: yes — guess, then verify-and-adjust. But for *reproduction* you mostly READ, not guess.

**Iteration is normal, in both methods.** Silveira's own flow (§III, Fig. 3) picks $(g_m/I_D)$, sizes, simulates, checks gain/phase-margin, and adjusts $g_m/I_D$, $B$, $L$ if short. Razavi's sheet also iterates (Step 3 → Step 4: $A_v$ fails → raise $L$). gm/ID is not worse here; each iteration is a *lookup on measured data* + one sim, not a re-derivation with wrong equations.

**Informed initial guess (for a NEW or re-sized device):** anchor to (i) the WI ceiling read from your own log-slope ($\approx27.6$ S/A at $n=1.4$): "high" ≈ 80–90% of ceiling ≈ 22–25; "moderate" ≈ 10–15; "low/SI" ≈ 5–10; (ii) Silveira's published priors: 28/30 for gain devices, 8 for mirrors (§III); (iii) the role table (§3.2). Your "20 for the input pair" is a reasonable MI-near-WI prior. Then check gain ($g_m/g_{ds}$), $W$ sanity/parasitics, and $V_{GS}$ headroom; raise $g_m/I_D$ or $L$ if gain short, lower it if $W$/parasitics blow up.

**But in *our* reproduction the input pair's $W/L$ is already given (=25).** At $I_D=12$ nA the chart point is *determined*, not chosen:
$$x=\frac{I_D}{W/L}=\frac{12\text{ nA}}{25}=0.48\text{ nA}=4.8\times10^{-10}\text{ A},$$
and $y=g_m/I_D$ is whatever the curve says there (deep-WI, near the ceiling). S1 step 5 *reads* it. So: **paper-specified devices → read $g_m/I_D$; new/re-sized devices → guess then iterate.** The read value becomes the anchor for every later guess. (Do not transfer Silveira's $V_A\approx7$ V/µm — his 3 µm process — to 0.18 µm; read $g_m/g_{ds}$ from your SMIC OP, plan line 105.)

**Check question (batch 4):** (a) Compute $x=I_D/(W/L)$ at 12 nA, $W/L=25$. (b) Your log plot shows ~83 mV/decade in WI — what $n$ and what WI ceiling? (c) Keeping the paper's $W/L=25$ and $I_D=12$ nA, is $g_m/I_D$ a free choice or a read-off? Why?

---

## 5 · Measure $n$ from your own curve; and knobs vs read-offs (what you actually adjust)

*(Clarifications, 2026-11-20: student asked how the 83 mV/decade is obtained and whether it is the next simulation step; and whether $W/L$ is what gets adjusted later. Two errors in their batch-4 answer corrected here.)*

### 5.1 Corrections to batch-4 answer (b)

- **$1/(nU_T)$ is NOT 59.6 mV.** 59.6 mV $=U_T\ln10$ is a *voltage* (the $n=1$ decade slope). $1/(nU_T)$ is a *conductance-per-current*: at $n=1.4$, $1/(1.4\times25.9\text{ mV})\approx27.6\ \text{V}^{-1}=27.6$ S/A. Keep the two constants apart: $n\,U_T\ln10$ [mV/dec] vs $1/(nU_T)$ [S/A].
- **83 mV/dec and $n=1.4$ were a worked *example*, not a measurement.** The student's current screenshot is linear-axis; no log slope has been read yet. The whole method is "the curve is the model" — do not adopt a number you have not measured. SMIC n18 at $L=400$ nm may give $n\approx1.2$–$1.5$; read it.

### 5.2 How $n$ is extracted (the principle behind S1 step 4)

In WI, $I_D\propto e^{V_{GS}/(nU_T)}$. A decade = $\times10$ in $I_D$, so $\Delta V_{GS}\big|_{\times10}=nU_T\ln10$. Hence

$$n=\frac{\text{mV/decade}}{U_T\ln10}=\frac{\text{mV/decade}}{59.6\text{ mV}},\qquad \left(\frac{g_m}{I_D}\right)_{max}=\frac{1}{nU_T}\ [\text{S/A}].$$

Read the slope on the **log-$I_D$** plot in the straight (exponential) region: two markers one decade apart, $\Delta V_{GS}$ between them. This is exactly what S1 step 4 (log-axis zoom 0.15–0.45 V) exists to produce, alongside the $V_{GS}$@12 nA crossing; step 5 then reads the OP. The GUI axis/marker mechanics belong to the operations session — here we only fix *what* is extracted and *why*. The measured $n$ sets the WI ceiling that anchors every $g_m/I_D$ choice (§4.2).

### 5.3 Knobs vs read-offs: $W/L$ is an OUTPUT, not the knob you turn

| Quantity | Knob / read-off / derived | Set by |
|---|---|---|
| $I_D$ | knob (allocated) | paper budget / power |
| $g_m/I_D$ | **knob** (choose per role, then verify) | specs + role; anchored to measured WI ceiling |
| $L$ | **knob** (choose) | gain ($g_m/g_{ds}$, $V_A\propto L$), matching, noise, area |
| $I_D/(W/L)$ | read-off | main chart at chosen $g_m/I_D$ |
| $W/L$, hence $W$ | **derived** | $I_D \div \big(I_D/(W/L)\big)$ |
| $V_{GS},V_{DS,sat},g_m,g_{ds},g_{mb}$ | read-off | OP / companion curves |

So "what you adjust later" = $g_m/I_D$, $L$ (and the current split $B$); $W$ is *computed*, not turned. Turning $W$ alone at fixed $V_{GS}$ only scales $I_D$ (since $I_D/(W/L)=f(V_{GS})$ is fixed) — it does NOT change inversion level. For paper-fixed devices ($W/L=25$, $L=400$ nm) you **read/verify** rather than choose. Raising $g_m/I_D$ at fixed $I_D,L$ moves to lower current density ⇒ **larger** $W$.

**Check question (batch 5):** (a) A log plot gives 70 mV/decade in WI — compute $n$ and the WI ceiling in S/A. (b) At fixed $I_D,L$, raising $g_m/I_D$ from 20 to 25: does $W$ go up or down? (c) Classify $\{g_m/I_D,\ L,\ W,\ I_D\}$ as knob / derived / read-off.

---

## 6 · Direction fix (fixed-$I_D$ vs fixed-$V_{GS}$) + worked example at 12 nA

### 6.1 Correction to batch-5 answer (b): $W$ goes UP, not down

The main chart $g_m/I_D$ vs $I_D/(W/L)$ is **monotonically DECREASING** (Silveira Fig. 1): left = low current density = deep WI = high $g_m/I_D$; right = high density = SI = low $g_m/I_D$. "Current density = how hard you push the channel." At **fixed $I_D$**, the only way to push *less* hard (raise $g_m/I_D$) is to give **more width** ⇒ lower $I_D/(W/L)$ ⇒ move LEFT ⇒ higher $g_m/I_D$. So raising $g_m/I_D$ from 20→25 at fixed $I_D,L$ **increases** $W$. (Student answered "down" — inverted.)

Do not confuse the two constraints:

| Constraint | Change $W$ → effect |
|---|---|
| Fixed $V_{GS}$ | $I_D/(W/L)=f(V_{GS})$ fixed ⇒ $g_m/I_D$ unchanged; $I_D,g_m$ scale with $W$ |
| Fixed $I_D$ | $I_D/(W/L)\propto1/W$ ⇒ moves ALONG curve; larger $W$ ⇒ higher $g_m/I_D$ |

### 6.2 Worked example, first-stage input device at $I_D=12$ nA, $L=400$ nm

Chart values below are **ILLUSTRATIVE placeholders** (shape per Silveira Fig. 1); replace with the measured SMIC curve after S1/S2. $\mu C_{ox}\approx300\ \mu\text{A/V}^2$ used only for the SI row, order-of-magnitude.

| Row | chosen $g_m/I_D$ [S/A] | chart $I_D/(W/L)$ | $W/L=I_D\div x$ | $W=(W/L)\times0.4\ \mu$m | $g_m=(g_m/I_D)I_D$ |
|---|---|---|---|---|---|
| A (deep WI, = paper device) | 26 | 0.48 nA | 25 | **10 µm** ✓ paper | 312 nS |
| B (MI) | 20 | 5 nA | 2.4 | 0.96 µm | 240 nS |
| C (SI) | 10 | 6 µA | 0.002 | 0.8 nm (impossible) | 120 nS |

Read-offs / verification for row A: $g_m/g_{ds}$ from OP (placeholder ≈60 ⇒ 35.6 dB per device; cascode + later stages reach the >50 dB open-loop budget); $V_{GS}$ from companion curve ≈0.25–0.3 V; $V_{DS,sat}\approx4U_T\approx0.1$ V (fits the 0.6 V stack); $f_T=g_m/(2\pi C_{gg})\approx312\text{ nS}/(2\pi\times23\text{ fF})\approx2$ MHz ≫ 1.5 kHz. If gain/phase-margin short → raise $g_m/I_D$ or $L$ (or $B$), recompute $W$, re-simulate (Silveira Fig. 3 loop).

**Lessons:** (i) row A reproduces the paper's $W=10$ µm — the paper's input device *is* deep WI; (ii) higher $g_m/I_D$ ⇒ more $g_m$ at the same 12 nA ⇒ better noise/gain, but larger $W$ (parasitics/area); (iii) row C shows SI at 12 nA demands sub-nm $W$ — physically impossible, which is *why* nA forces WI and why square-law sizing fails here.

**Check question (batch 6):** (a) Which row has the largest $W$? At fixed $I_D$, does raising $g_m/I_D$ raise or lower $W$? (b) Row A: compute $g_m$ and confirm $W$ equals the paper's 10 µm. (c) Why is row C impractical?

---

*(next batch appended below as the session progresses)*
