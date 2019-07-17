#!/bin/bash
BUILD_BUILDNUMBER=${BUILD_BUILDNUMBER:=local} 
echo "REACT_APP_VERSION=\${npm_package_version}-$(git rev-parse HEAD | cut -c 1-8)-$BUILD_BUILDNUMBER" > .env
