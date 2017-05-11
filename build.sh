#!/usr/bin/env bash
CURRENT_FOLDER=$(pwd);
# Build of all passed projects
while [ "$1" ]; do
    echo $1
    cd ../$1
    gulp
    echo ''
    cd ${CURRENT_FOLDER}
    shift
done
# Build of the fIDE
gulp