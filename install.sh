#!/bin/bash
# This script clones TUPass backend,
# installs dependencies, builds backend binary and runs both

# dep frontend
CWD=$(pwd)
#npm install

# get, dep, build and run backend
cd ${GOPATH}/src
git clone https://github.com/tupass/tupass-backend.git
cd tupass-backend
make build
APP_ENV=dev ./tupass-backend &
PID=$!
echo $PID
trap "kill $PID" SIGINT

# build and run frontend
cd "$CWD"
ng serve --open
