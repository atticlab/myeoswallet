#!/bin/bash

apt update && apt-get -y install libusb-1.0-0-dev && apt-get -y install libudev-dev

npm install

npm run build
