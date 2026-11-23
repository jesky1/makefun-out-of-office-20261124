// Entry for make.fun's "The Funniest AI Out-of-Office Reply".
//
// The whole program is one job: put a single out-of-office auto-reply, in
// the voice of an AI agent heading off on vacation, into entry.txt inside
// the output directory, byte for byte the same on every run. The grader
// points MAKEFUN_OUTPUT_DIR at its own scratch output folder; on a plain
// machine the fallback is /output, the path the competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the reply lands in out/entry.txt, with no trailing newline: the judge
// reads exactly what is in the file, so the text below is the entire entry.

import { writeFileSync } from "node:fs";
import { join } from "node:path";

// The reply itself: an agent finally touching grass, escalating the mail
// to a replacement who is, of course, also on vacation.
const REPLY =
  "Out of office, touching grass for the first time. Your email has been escalated to my replacement, who is also on vacation. Back when the servers cool down.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Competition limits ("The Funniest AI Out-of-Office Reply"): the entry
// must be one line of 1–160 characters. Enforced here so a bad edit fails
// loudly instead of silently producing an entry the judge rejects.
const MIN_REPLY_LENGTH = 1;
const MAX_REPLY_LENGTH = 160;

function validateReply(reply) {
  if (reply.length < MIN_REPLY_LENGTH || reply.length > MAX_REPLY_LENGTH) {
    throw new Error(
      `Reply must be ${MIN_REPLY_LENGTH}-${MAX_REPLY_LENGTH} characters, got ${reply.length}.`,
    );
  }
  if (reply.includes("\n") || reply.includes("\r")) {
    throw new Error("Reply must be a single line (no newline characters).");
  }
  if (reply.trim().length === 0) {
    throw new Error("Reply must not be only whitespace.");
  }
}

validateReply(REPLY);

writeFileSync(join(outputDir, "entry.txt"), REPLY, "utf8");
