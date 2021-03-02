import { sha256 } from "./deps.ts";

export const values: Record<number, string> = {
  4: "common",
  5: "uncommon",
  6: "rare",
  7: "epic",
  8: "legendary",
  9: "mythic",
};

export function pickRandom(elements: string[]): string {
  const index = Math.floor(Math.random() * elements.length);
  return elements[index];
}

export function test(maybe: string) {
  const hash = sha256(maybe, "utf8", "hex").toString();

  const match = hash.match(/8{7,}/g);
  if (match) {
    const { length } = match[0];

    console.log({
      amulet: maybe,
      hash,
      length,
      rarity: values[length] || "???",
    });
  }
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

export function testPermutations(words: string[]) {
  const lower = words.map((w) => w.toLowerCase());
  const upper = words.map((w) => w.toUpperCase());
  const capitalized = words.map((w) =>
    w.slice(0, 1).toUpperCase() + w.slice(1)
  );

  test(words.join(" "));
  test(lower.join(" "));
  test(upper.join(" "));
  test(capitalized.join(" "));

  for (const punctuation of punctuations) {
    testPunctuationPermutations(words, punctuation);
    testPunctuationPermutations(lower, punctuation);
    testPunctuationPermutations(upper, punctuation);
    testPunctuationPermutations(capitalized, punctuation);
  }

  testMissingWordPermutations(words);
  testMissingWordPermutations(lower);
  testMissingWordPermutations(upper);
  testMissingWordPermutations(capitalized);

  testCapitalPermutations(words);
  testCapitalPermutations(lower);
  testCapitalPermutations(capitalized);
}
