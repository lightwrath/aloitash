#!/bin/bash

cd aloitash-client
npm install
npm run build
cd ../aloitash-express
npm install
npm start

