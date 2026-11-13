// Headless QA harness: runs the page script in a VM with a DOM stub,
// then exercises engine / renderer / svg / content across topologies & steps.
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const m = html.match(/<script>([\s\S]*)<\/script>/);
if (!m) { console.error("NO SCRIPT FOUND"); process.exit(1); }
const src = m[1];

function el() { return { innerHTML: "", textContent: "", value: "", disabled: false, onclick: null, onchange: null, dataset: {}, click() {} }; }
const els = {};
const document = {
  getElementById(id) { if (!els[id]) els[id] = el(); return els[id]; },
  querySelectorAll() { return []; },
  createElement() { return el(); },
};
const ctx = vm.createContext({ document, console, Math, JSON, URL: { createObjectURL: () => "blob:x" }, Blob: function () {}, setTimeout, parseFloat, parseInt, isNaN, isFinite });
try { vm.runInContext(src, ctx, { filename: "page.js" }); }
catch (e) { console.error("SCRIPT LOAD ERROR:", e.message); process.exit(1); }

const run = (code) => vm.runInContext(code, ctx);
let fail = 0;
function check(name, cond, extra) { if (cond) console.log("PASS " + name + (extra ? "  " + extra : "")); else { fail++; console.log("FAIL " + name + (extra ? "  " + extra : "")); } }

// engine across topologies
for (const topo of ["csdeg", "cs", "sf", "cascode"]) {
  run(`topoId="${topo}";`);
  const r = run("compute()");
  check(topo + " dc ok", r.ok === true);
  if (!r.ok) continue;
  check(topo + " Rout finite", isFinite(r.Rout) && r.Rout > 0, "Rout=" + r.Rout);
  check(topo + " schur==Rout", Math.abs(r.Rschur - r.Rout) / r.Rout < 1e-6, "schur=" + r.Rschur);
  check(topo + " closed==Rout", Math.abs(r.closed - r.Rout) / r.Rout < 1e-3, "closed=" + r.closed);
  check(topo + " central->Rout", Math.abs(r.central - r.Rout) / r.Rout < 1e-3, "central=" + r.central);
  // content + svg for every step
  for (let st = 0; st <= 4; st++) {
    run(`step=${st};`);
    let okc = true, oks = true, oka = true;
    try { run("conContent(step, compute())"); } catch (e) { okc = false; console.log("  conContent err step" + st + ": " + e.message); }
    try { run("absContent(step)"); } catch (e) { oka = false; console.log("  absContent err step" + st + ": " + e.message); }
    try { run(`schematic("${topo}", ${st >= 3})`); } catch (e) { oks = false; console.log("  schematic err step" + st + ": " + e.message); }
    check(topo + " step" + st + " content/svg", okc && oks && oka);
  }
}
// renderer battery
const formulas = [
  "F(v,i_X)=Gv+b+a\\,f(Bv)-e_p\\,i_X=0",
  "J=G+a\\,g^{T}B,\\qquad g=\\nabla f=(g_m,g_o,g_{mb})^{T}",
  "\\frac{dv}{di_X}=J^{-1}e_p",
  "R_{out}=e_p^{T}J^{-1}e_p",
  "\\underbrace{(G+a\\,g^{T}B)}_{=J}\\,\\tilde v=e_p\\,\\tilde i_X",
  "\\left(J_{pp}-J_{pr}J_{rr}^{-1}J_{rp}\\right)^{-1}",
  "\\begin{pmatrix}1 & 2\\\\ 3 & 4\\end{pmatrix}",
  "\\frac{1}{g_m+g_{mb}+g_o}\\parallel R_S",
  "[1+(g_m+g_{mb})R_S]r_o+R_S",
  "\\sqrt{x^2+1}",
  "O(\\Delta^2)",
];
for (const f of formulas) {
  let ok = true, out = "";
  try { out = run(`texInner(${JSON.stringify(f)})`); } catch (e) { ok = false; console.log("  tex err: " + e.message); }
  check("tex " + f.slice(0, 24), ok && out.length > 0 && !/tilde|parallel|begin|pmatrix|frac|underbrace/.test(out.replace(/class="[^"]*"/g, "")), "");
}
// ---- render capture: run render() with DOM stub, scan produced HTML/SVG in memory ----
const bad = (s) => /NaN|undefined|\bnull\b/.test(s) || /\$/.test(s) || /\\(frac|begin|sqrt|underbrace|tilde|hat|bar|vec|parallel|qquad|nabla|left|right)/.test(s);
function svgWellFormed(s) {
  const stack = []; const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g; let m;
  while ((m = re.exec(s))) {
    const [, close, tag, , self] = m;
    if (close) { if (stack.pop() !== tag) return "mismatch </" + tag + ">"; }
    else if (!self) stack.push(tag);
  }
  return stack.length ? "unclosed <" + stack.join(",") + ">" : "";
}
for (const topo of ["csdeg", "cs", "sf", "cascode"]) {
  for (let st = 0; st <= 4; st++) {
    run(`topoId="${topo}";step=${st};render();`);
    const abs = els["absBody"].innerHTML, con = els["conBody"].innerHTML, svg = els["svgBox"].innerHTML, dc = els["dcNodes"].innerHTML;
    check(`render ${topo} s${st} dc clean`, !bad(dc), bad(dc) ? (dc.match(/NaN|undefined|\bnull\b|\$|\\[a-z]+/) || ["?"])[0] : "");
    check(`render ${topo} s${st} abs clean`, !bad(abs), bad(abs) ? (abs.match(/NaN|undefined|\bnull\b|\$|\\[a-z]+/) || ["?"])[0] : "");
    check(`render ${topo} s${st} con clean`, !bad(con), bad(con) ? (con.match(/NaN|undefined|\bnull\b|\$|\\[a-z]+/) || ["?"])[0] : "");
    const wf = svgWellFormed(svg);
    check(`render ${topo} s${st} svg wellformed`, svg.length > 200 && svg.includes("<svg") && !wf, wf);
  }
}
console.log(fail === 0 ? "\nALL QA PASS" : `\n${fail} QA FAILURES`);
process.exit(fail === 0 ? 0 : 2);
