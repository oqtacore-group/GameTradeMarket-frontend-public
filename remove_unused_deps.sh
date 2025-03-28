#!/bin/bash
# bash remove_unused_deps.sh - run the check
file='unused-deps.txt'
#echo "list all unused deps"
#npx depcheck > $file
n=1
while read line; do
dep=$( echo "$line" | cut -c 3- )
echo "uninstall : $dep"
yarn remove "$dep" -W
n=$((n+1))
done < $file
