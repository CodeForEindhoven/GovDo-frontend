#!/bin/bash

sed -i "s^__API_ENDPOINT__^$API_ENDPOINT^g" /app/src/js/config.js


cd /app
if [ "$BUILD_MODE" = "true" ]
then
    npm run watch & npm start
else
    npm run build
    npm start
fi
