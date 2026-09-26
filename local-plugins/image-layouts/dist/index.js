// Quartz transformer for Obsidian "image-layouts" fenced code blocks.
//
// Obsidian's image-layouts plugin renders blocks like:
//
//     ```image-layout-a
//     ![[a.png]]
//     ![[b.png]]
//     ```
//
// Quartz has no idea what that language is and outputs a literal code block.
// This transformer rewrites such a block into:
//
//     <div class="image-layout image-layout-a">
//
//     ![[a.png]] ![[b.png]]
//
//     </div>
//
// so the wiki embeds keep being resolved by Quartz's own Obsidian-flavored
// markdown support, while the surrounding div gives the styling in
// quartz/styles/custom.scss something to hook onto.
//
// This file is plain ESM and is imported directly by Quartz's local plugin
// loader — there is no build step. Keep it free of external imports: local
// plugins are only symlinked into .quartz/plugins, never npm-installed.

/** Whole fenced block, closing fence required at the start of a line. */
const FENCE_RE =
  /^[ \t]*```image-layout(?:-([A-Za-z0-9_-]+))?[ \t]*\r?\n([\s\S]*?)^[ \t]*```[ \t]*\r?$/gm

/** One embed, e.g. `![[a.png]]` or `![[a.png|300]]`. */
const EMBED_RE = /!\[\[[^\]\n]+\]\]/g

/** A line consisting only of embeds (separated by whitespace). */
const EMBED_ONLY_RE = /^(?:!\[\[[^\]\n]+\]\][ \t]*)+$/

function blankLineBefore(src) {
  return src === "" || /\r?\n[ \t]*\r?\n$/.test(src)
}

function blankLineAfter(src) {
  return src === "" || /^\r?\n([ \t]*\r?\n|$)/.test(src)
}

function rewrite(src) {
  return src.replace(FENCE_RE, (block, variant, body, offset, whole) => {
    const lines = body
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    // Anything unexpected inside the block (captions, other markup): leave the
    // block untouched so it still shows up as a code block rather than being
    // silently truncated.
    if (lines.length === 0) return block
    if (!lines.every((line) => EMBED_ONLY_RE.test(line))) return block

    const embeds = []
    for (const line of lines) {
      const found = line.match(EMBED_RE)
      if (found === null) return block
      embeds.push(...found)
    }
    if (embeds.length < 2) return block

    const cls = variant ? `image-layout image-layout-${variant}` : "image-layout"
    const before = whole.slice(0, offset)
    const after = whole.slice(offset + block.length)
    const prefix = blankLineBefore(before) ? "" : /\r?\n$/.test(before) ? "\n" : "\n\n"
    const suffix = blankLineAfter(after) ? "" : "\n"

    return `${prefix}<div class="${cls}">\n\n${embeds.join(" ")}\n\n</div>${suffix}`
  })
}

export function ImageLayouts() {
  return {
    name: "ImageLayouts",
    textTransform(_ctx, src) {
      try {
        return rewrite(src)
      } catch (err) {
        console.warn(`[image-layouts] transform failed, keeping source as-is: ${err}`)
        return src
      }
    },
  }
}

export const manifest = {
  name: "image-layouts",
  displayName: "Obsidian Image Layouts",
  description:
    "Renders ```image-layout-a``` style fenced code blocks as side-by-side image rows.",
  version: "1.0.0",
  category: "transformer",
  quartzVersion: ">=5.0.0",
  defaultOrder: 35,
}

export default ImageLayouts