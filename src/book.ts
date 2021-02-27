import { test } from "./util.ts";

function usage() {
  console.log("Usage: book.ts <path to book>");
  Deno.exit(1);
}

function testNewlinePermutations(words: string[]) {
  for (let i = 1; i < words.length; i++) {
    const withNewline = words.slice(0, i).join(" ") + "\n" +
      words.slice(i).join(" ");
    test(withNewline);
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

function testPermutations(words: string[]) {
  const lower = words.map((w) => w.toLowerCase());
  const upper = words.map((w) => w.toUpperCase());
  test(words.join(" "));
  test(lower.join(" "));
  test(upper.join(" "));

  testNewlinePermutations(words);
  testNewlinePermutations(lower);
  testNewlinePermutations(upper);

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
    .replace(/["“”]/g, "")
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
