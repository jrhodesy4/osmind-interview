# /bin/bash

set -e

(
  cd serverless-stack-demo-api
  docker-compose up -d
  npm install
  node scripts/init-table.js
  npm start
)
