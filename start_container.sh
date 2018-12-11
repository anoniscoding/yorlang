#!/usr/bin/env bash

IMAGE_NAME="yorlang_playground"

ROOT="$( pwd )"

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
    --rm \
    -v ${ROOT}:/src \
    ${IMAGE_NAME} \
    sh -c "npm i && bash"

echo " ----- EXITED from Disposable Container -----"
echo " ----- REMOVED Exited Container -----"
