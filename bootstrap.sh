#!/bin/bash

apt-get update
apt-get install -y curl
apt-get install -y g++
apt-get install -y build-essential
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install -y nodejs
apt-get install -y npm

mkdir -p /home/vagrant/tmp_node_modules /vagrant/node_modules
sudo mount --bind /home/vagrant/tmp_node_modules /vagrant/node_modules
cd /vagrant
npm install
