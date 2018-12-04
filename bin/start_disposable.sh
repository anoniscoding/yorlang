#!/usr/bin/env bash

IMAGE_NAME="yorlang_playground"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

ROOT="$(dirname "${SCRIPT_DIR}")"

if [[ "$(docker images -q ${IMAGE_NAME}:latest 2> /dev/null)" == "" ]]; then
    echo " ----- Image Does Not Exist. Building Now. -----"
    docker build -t ${IMAGE_NAME} ${ROOT}
else
    echo " ----- Image Available for Use. -----"
fi

echo " ----- Run Application in a Disposable Container -----"
docker run \
    -i \
    -t \
    -v ${ROOT}:/src \
    ${IMAGE_NAME} \
    bash

echo " ----- EXITED from disposable container -----"
echo " ----- Removing Exited Containers. -----"