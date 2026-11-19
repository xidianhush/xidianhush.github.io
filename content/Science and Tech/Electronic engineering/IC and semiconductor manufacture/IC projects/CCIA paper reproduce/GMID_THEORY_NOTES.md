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

*(next batch appended below as the session progresses)*
