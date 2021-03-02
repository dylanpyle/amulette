import { pickRandom, testPermutations } from "./util.ts";

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
  }
}

await run(Deno.args.join(" "));
