#!/bin/bash

apt update && apt-get -y install libusb-1.0-0-dev && apt-get -y install libudev-dev

yarn install

npm run build
