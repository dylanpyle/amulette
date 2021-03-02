import { testPermutations } from "./util.ts";

function usage() {
  console.log("Usage: book.ts <path to book>");
  Deno.exit(1);
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
