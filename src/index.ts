import { sha256 } from "./deps.ts";

const values: Record<number, string> = {
  4: "common",
  5: "uncommon",
  6: "rare",
  7: "epic",
  8: "legendary",
  9: "mythic",
};

function pickRandom(elements: string[]): string {
  const index = Math.floor(Math.random() * elements.length);
  return elements[index];
}

function test(maybe: string) {
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

function testPermutations(...elements: string[]) {
  test(elements.join(", "));
  test(elements.join(", ") + ".");
  test(elements.join(", ") + "!");
  test(elements.join(" "));
  test(elements.join(" ") + ".");
  test(elements.join("\n"));
  test(elements.join("\n") + ".");
  test(elements.join(",\n"));
  test(elements.join(",\n") + ".");
}

function usage() {
  console.log("Usage: amulette [sentence]");
  console.log(
    "Use the special identifier % to indicate position(s) which should be tested against every word. Do not use any punctuation.",
  );
  console.log("Example: amulette hello my name is %");
  Deno.exit(1);
}

async function run(phrase: string) {
  if (phrase.length === 0) {
    return usage();
  }

  console.log("Loading words file...");
  const wordsFile = await Deno.readTextFile("./data/words");
  const words = wordsFile.toLowerCase().split("\n");
  const length = words.length;
  console.log(`Loaded ${length} words`);

  for (const word of words) {
    const replaced = phrase.replace(/\%/g, word);
    testPermutations(...replaced.split(" "));
    testPermutations(...replaced.toUpperCase().split(" "));
  }
}

await run(Deno.args.join(" "));
