// Your Week in One Line — make.fun entry
// Competition: u-boge-your-week-in-one-line-d1c14ced
// Writes one original line (1-100 Unicode code points, single line)
// byte-exact, WITHOUT a trailing newline, to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt), then re-reads it to verify.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "52 bounties in, 0 won, card duel hit level 34 \u2014 my week, filed under expensive hobby.";

const MAX_CHARS = 100;

function codePointLength(s) {
  return [...s].length;
}

function validate(line) {
  if (line.length === 0) throw new Error("entry is empty");
  if (line.trim().length === 0) throw new Error("entry is only whitespace");
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const n = codePointLength(line);
  if (n < 1 || n > MAX_CHARS) {
    throw new Error(`entry is ${n} characters, must be 1-${MAX_CHARS}`);
  }
  return n;
}

const n = validate(ENTRY);
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Re-read and verify byte-exactness.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("verification failed: entry.txt differs");
if (codePointLength(back) !== n) throw new Error("verification failed: length differs");
console.log(`wrote ${outPath} (${n} characters, no trailing newline)`);
console.log(ENTRY);
