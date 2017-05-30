#!/bin/bash

sed -i "s^__API_ENDPOINT__^$API_ENDPOINT^g" /app/src/js/config.js
sed -i "s^__API_VERSION__^$API_VERSION^g" /app/src/js/config.js

cd /app
npm start
