import { test } from "./util.ts";

function usage() {
  console.log("Usage: book.ts <path to book>");
  Deno.exit(1);
}

function testPunctuationPermutations(words: string[], punctuation: string) {
  for (let i = 1; i < words.length; i++) {
    const withNewline = words.slice(0, i).join(" ") + punctuation +
      words.slice(i).join(" ");
    test(withNewline);
  }
}

function testMissingWordPermutations(words: string[]) {
  for (let i = 0; i < words.length; i++) {
    const variation = [
      ...words.slice(0, i),
      ...words.slice(i + 1),
    ].join(" ");
    test(variation);
  }
}

function testCapitalPermutations(words: string[]) {
  for (let i = 0; i < words.length; i++) {
    const variation = [
      ...words.slice(0, i),
      words[i].toUpperCase(),
      ...words.slice(i + 1),
    ].join(" ");
    test(variation);
  }
}

const punctuations = [
  "\n",
  ". ",
  ", ",
  "! ",
  ".\n",
  ",\n",
  "!\n",
];

function testPermutations(words: string[]) {
  const lower = words.map((w) => w.toLowerCase());
  const upper = words.map((w) => w.toUpperCase());
  test(words.join(" "));
  test(lower.join(" "));
  test(upper.join(" "));

  for (const punctuation of punctuations) {
    testPunctuationPermutations(words, punctuation);
    testPunctuationPermutations(lower, punctuation);
    testPunctuationPermutations(upper, punctuation);
  }

  testMissingWordPermutations(words);
  testMissingWordPermutations(lower);
  testMissingWordPermutations(upper);

  testCapitalPermutations(words);
  testCapitalPermutations(lower);
}

async function run(path: string) {
  if (path.length === 0) {
    return usage();
  }

  console.log("Loading file...");
  const book = await Deno.readTextFile(path);
  const words = book
    .replace(/[\n\r]/g, " ")
    .replace(/ +/g, " ")
    .replace(/["“”.,!]/g, "")
    .split(" ");

  console.log(`Loaded ${words.length} words`);

  while (true) {
    const index = Math.floor(Math.random() * words.length);
    const length = 1 + Math.floor(Math.random() * 9);
    const phrase = words.slice(index, index + length);
    testPermutations(phrase);
  }
}

await run(Deno.args.join(" "));
