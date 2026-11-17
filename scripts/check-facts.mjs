#!/usr/bin/env node
/**
 * Holds the numbers these pages state about the product against the product.
 *
 *   node scripts/check-facts.mjs                       the facts the docs site publishes
 *   node scripts/check-facts.mjs --facts <file|url>    another copy, e.g. docs/public/facts.json in a product checkout
 *
 * The pages are hand-maintained in a repository of their own, so no change to the product can fail on them. The
 * product's docs build writes what it has to `facts.json` (the package version, the registry's records, the
 * session extensions, the committed reports, the debt ledger's rows); this script reads every sentence on a page
 * that states one of those and exits 1 when a page says something else, naming the page and the sentence.
 *
 * It reads what it can recognise: a count worded another way is not checked, and a page may be wrong about
 * anything this file has no rule for.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = fileURLToPath(new URL("../site/", import.meta.url));
const DEFAULT_FACTS = "https://docs.regulator.metacoding.io/facts.json";

const UNITS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

/** A count as a page writes it: digits, or a number word up to ninety-nine. Undefined for any other word. */
export function countOf(word) {
  const w = word.toLowerCase();
  if (/^\d+$/.test(w)) return Number(w);
  const unit = UNITS.indexOf(w);
  if (unit !== -1) return unit;
  const [tens, ones] = w.split("-");
  const t = TENS.indexOf(tens ?? "");
  if (t < 2) return undefined;
  if (ones === undefined) return t * 10;
  const o = UNITS.indexOf(ones);
  return o >= 1 && o <= 9 ? t * 10 + o : undefined;
}

/** The page as a reader meets it: tags and scripts gone, entities for the few characters a count sits beside, whitespace folded. */
function textOf(html) {
  return html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ");
}

const N = "(\\d+|[A-Za-z]+(?:-[a-z]+)?)";

/** Each rule: what a sentence looks like when it states the fact, and what each number in it must be. `floor` skips a small count that is about something else. */
function rulesFor(facts) {
  const { regulators, debt } = facts;
  return [
    { what: "registry records", pattern: new RegExp(`registry \\(${N}(?: records)?\\)`, "g"), expect: [[regulators.total]], floor: 10 },
    { what: "regulators", pattern: new RegExp(`\\b${N} regulators\\b`, "g"), expect: [[regulators.total, regulators.active]], floor: 10 },
    { what: "records, active and retired", pattern: new RegExp(`\\b${N} Records in the registry, ${N} active and ${N} retired`, "g"), expect: [[regulators.total], [regulators.active], [regulators.retired]], floor: 0 },
    { what: "session extensions", pattern: new RegExp(`\\b${N} (?:session )?extensions\\b`, "g"), expect: [[facts.sessionExtensions]], floor: 5 },
    { what: "committed reports", pattern: new RegExp(`\\b${N} committed (?:drift-scenario |drift |eval )?reports\\b`, "g"), expect: [[facts.committedReports]], floor: 2 },
    { what: "debt rows, and how many are paid", pattern: new RegExp(`\\b${N} rows so far, ${N} of them paid`, "g"), expect: [[debt.rows], [debt.paid]], floor: 0 },
  ];
}

async function loadFacts(source) {
  if (/^https?:\/\//.test(source)) {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`${source} answered ${response.status}`);
    return response.json();
  }
  return JSON.parse(await readFile(source, "utf8"));
}

const args = process.argv.slice(2);
const source = args[0] === "--facts" && args[1] ? args[1] : DEFAULT_FACTS;
let facts;
try {
  facts = await loadFacts(source);
} catch (error) {
  console.error(`could not read the product's facts from ${source}: ${error.message}`);
  console.error("a check that cannot read its source guards nothing, so this fails; pass --facts <file> to check against a product checkout");
  process.exit(2);
}

const wrong = [];
let read = 0;
const pages = (await readdir(SITE)).filter((f) => f.endsWith(".html")).sort();
for (const page of pages) {
  const text = textOf(await readFile(path.join(SITE, page), "utf8"));
  for (const rule of rulesFor(facts)) {
    for (const match of text.matchAll(rule.pattern)) {
      const counts = match.slice(1).map((word) => (word === undefined ? undefined : countOf(word)));
      if (counts.some((c) => c === undefined) || counts[0] < rule.floor) continue;
      read += 1;
      counts.forEach((count, i) => {
        if (!rule.expect[i].includes(count)) wrong.push(`${page}: "${match[0]}" — ${rule.what}: the product has ${rule.expect[i].join(" or ")}`);
      });
    }
  }
  const version = /\((\d+\.\d+\.\d+) is current\)/.exec(text);
  if (version) {
    read += 1;
    if (version[1] !== facts.version) wrong.push(`${page}: "${version[0]}" — the product's version is ${facts.version}`);
  }
}

if (read < 5) {
  console.error(`only ${read} statement(s) were recognised on ${pages.length} page(s): the rules no longer match how the pages are worded, so nothing is being checked`);
  process.exit(1);
}
if (wrong.length) {
  console.error(`${wrong.length} statement(s) disagree with the product (${source}):`);
  for (const line of wrong) console.error(`  ${line}`);
  process.exit(1);
}
console.log(`${read} statement(s) on ${pages.length} page(s) agree with the product: ${facts.version}, ${facts.regulators.total} records (${facts.regulators.active} active), ${facts.sessionExtensions} extensions, ${facts.committedReports} reports, ${facts.debt.rows} debt rows (${facts.debt.paid} paid)`);
