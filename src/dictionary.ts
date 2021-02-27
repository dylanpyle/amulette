import { pickRandom, test } from "./util.ts";

export function testPermutations(elements: string[]) {
  test(elements.join(", "));
  test(elements.join(". "));
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
  console.log("Usage: dictionary.ts [sentence]");
  console.log(
    "Use the special identifier % to indicate position(s) which should be tested against every word. Do not use any punctuation.",
  );
  console.log("Example: dictionary.ts hello my name is %");
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
    testPermutations(replaced.split(" "));
    testPermutations(replaced.toUpperCase().split(" "));
  }
}

await run(Deno.args.join(" "));
