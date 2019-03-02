#!/bin/bash

echo "Building up environment ..."

yarn check || yarn install

yarn dev