#!/bin/bash

apt update && apt-get -y install libusb-1.0-0-dev && apt-get -y install libudev-dev

rm -rf .config
rm -rf  .node-gyp
rm -rf node_modules
rm -rf .npm

yarn install

npm run build
