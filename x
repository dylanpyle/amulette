#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail
set -o noglob

dictionary() {
  deno run --allow-read src/dictionary.ts $@
}

book() {
  deno run --allow-read src/book.ts $@
}

format() {
  deno fmt src
}

check() {
  deno fmt src --check
  deno lint --unstable src
}

test() {
  files=${@:-$(find src | egrep 'spec.ts$' | xargs echo)}

  deno test -L info $files
}

(
  cd $(dirname "$0")
  "$@"
)
