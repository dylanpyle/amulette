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
