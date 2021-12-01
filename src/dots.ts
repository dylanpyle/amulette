import { test } from "./util.ts";

const words = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
  'twenty-one',
  'twenty-two',
  'twenty-three',
  'twenty-four',
  'twenty-five',
  'twenty-six',
  'twenty-seven',
  'twenty-eight',
  'twenty-nine',
  'thirty'
];

function run() {
  for (let i = 5; i < 10; i++) {
    const dots = new Array(i).fill('8').join('');
    for (const joiner of ['\n',', ',',\n',' ']) {
    for (const joiner2 of ['\n',' ',', ',',\n']) {
    for (const punctuation of ['','.','!']) {
    for (const num of [i, words[i-1]]) {

    for (const noun of ['string', 'text', 'phrase', 'sentence', 'amulet', 'poem', 'riddle']) {
      for (const intro of ['this', 'my', 'both this', 'our']) {
    for (const verb of ['contain', 'have', 'each contain', 'each have', 'both contain', 'both have']) {
      for (const dotstring of [` (${dots})`, `: ${dots}`]) { 
      const phrase = `${intro} ${noun}${joiner}and its hash${joiner2}${verb} ${num} eights${punctuation}${dotstring}`;
      test(phrase);
      test(phrase.toUpperCase());
    }
    }
      }
    }
  }
  }
  }
  }
  }
}

run();
