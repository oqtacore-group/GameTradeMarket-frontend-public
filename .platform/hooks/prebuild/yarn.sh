#!/bin/bash

echo "install node.js"
sudo curl --silent --location https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum -y install nodejs

echo "install and init yarnpkg"
sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
sudo yum -y install yarn

export PATH="$PATH:$HOME/.yarn/bin"
source ~/.bashrc

echo "pwd 1"
pwd

echo "cd"
cd /var/app/staging/

echo "pwd 2"
pwd

echo "ls 1"
ls -lah

echo "install next."
sudo yarn global add next@12.0.7

echo "install env-cmd"
sudo yarn global add env-cmd

echo "pwd"
pwd

echo "ls 2"
ls -lah

echo "chown"
sudo chown -R webapp:webapp node_modules/ || true # allow to fail

echo "ls 3"
ls -lah

echo "install dependencies"
sudo yarn cache clean
sudo yarn install --frozen-lockfile

echo "ls 4"
ls -lah
