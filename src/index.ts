import { sha256 } from "./deps.ts";

console.log('Loading words...');
const words = await Deno.readTextFile("./data/words");
const wordList = words.split('\n');
const length = wordList.length;
console.log(`Got ${length} words`);

function pickRandom(): string {
  const index = Math.floor(Math.random() * length)
  return wordList[index];
}

function test(maybe: string) {
  const hash = sha256(maybe, "utf8", "hex").toString();

  const match = hash.match(/8{7,}/g);
  if (match) {
    console.log({
      maybe,
      hash,
      len: match[0].length
    });
  }
}

while (true) {
  const [w1, w2] = [pickRandom(), pickRandom()];
  const [l1, l2] = [w1.toLowerCase(), w2.toLowerCase()];
  test(`${w1} ${w2}`);
  test(`${l1} ${l2}`);
  test(`${w1} ${w2}!`);
  test(`${l1} ${l2}!`);
  test(`${w1} ${w2}.`);
  test(`${l1} ${l2}.`);
  test(`${w1}? ${w2}!`);
  test(`${l1}? ${l2}!`);
  test(`${w1}, ${w2}!`);
  test(`${l1}, ${l2}!`);
  test(`${w1}, ${w2}.`);
  test(`${l1}, ${l2}.`);
}
