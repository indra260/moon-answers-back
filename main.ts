// The Moon Finally Answers Back — entry program.
//
// Writes the Moon's one-line comeback to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Runs on Node 22 via type stripping; no dependencies, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line: the Moon, four billion years in, finally replying to
// every wish, howl and late-night promise aimed at it.
const ENTRY =
  "Four billion years of wishes, howls, and promises — and not one of you ever wished me a happy birthday. So no, he isn't texting back.";

// The gate, from the competition rules: 1–240 characters, not only
// whitespace, a single line of UTF-8 text. Anything outside that is
// refused before a byte is written, so a bad line can never ship.
const MIN_CHARS = 1;
const MAX_CHARS = 240;

function checkGate(line: string): void {
  if (line.length < MIN_CHARS || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Control characters other than a plain space would corrupt the text.
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
}

function main(): void {
  checkGate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Written exactly, with no trailing newline.
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote entry.txt (${ENTRY.length} chars)`);
}

main();
