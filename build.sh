#!/usr/bin/env bash

set -e
set -u
set -x

npm install -g yarn

rm -rf package-lock.json
yarn install

zip -r archive.zip .
open .
