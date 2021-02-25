import { sha256 } from "./deps.ts";

console.log('Loading words...');
const words = await Deno.readTextFile("./data/words");
const wordList = words.toLowerCase().split('\n');
const length = wordList.length;

const adverbs = wordList.filter(a => a.match(/ly$/));
const adverbsLength = adverbs.length;
console.log(`Got ${length} words, ${adverbsLength} adverbs`);

function pickRandom(): string {
  const index = Math.floor(Math.random() * length)
  return wordList[index];
}

function randomAdverb(): string {
  const index = Math.floor(Math.random() * adverbsLength)
  return adverbs[index];
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
  const [l1, l2] = [pickRandom(), pickRandom()];
  const [u1, u2] = [l1.toUpperCase(), l2.toUpperCase()];
  const [a1, a2] = [randomAdverb(), randomAdverb(), randomAdverb()];

  test(`${u1} ${u2}`);
  test(`${l1} ${l2}`);
  test(`${u1} ${u2}!`);
  test(`${l1} ${l2}!`);
  test(`${u1} ${u2}.`);
  test(`${l1} ${l2}.`);
  test(`${u1}? ${u2}!`);
  test(`${l1}? ${l2}!`);
  test(`${u1}, ${u2}!`);
  test(`${l1}, ${l2}!`);
  test(`${u1}, ${u2}.`);
  test(`${l1}, ${l2}.`);

  test(`${u1} ${u2}. how lovely`);
  test(`a small ${l1}`);
  test(`a small ${l2}`);
  test(`language, code, luck, and ${l1}`);
  test(`language, code, luck, and ${l2}`);
  test(`standing on the shoulders of ${l1}`);
  test(`standing on the shoulders of ${l2}`);
  test(`gently,\n${l1}`);
  test(`gently,\n${l2}`);
  test(`slowly,\n${l1}`);
  test(`slowly,\n${l2}`);

  test(`${a1},\n${a2},\n${l1}`);
  test(`${a1},\n${a2},\n${l2}`);
  test(`${a1},\n${a2},\n${l1}.`);
  test(`${a1},\n${a2},\n${l2}.`);
}
