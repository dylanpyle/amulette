#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail
set -o noglob

run() {
  deno run --allow-read src/index.ts $@
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
