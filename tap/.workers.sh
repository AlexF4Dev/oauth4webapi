#!/bin/bash

COMPATIBILITY_DATE=$(NODE_PATH=$(npm root -g) node -p "require('workerd').compatibilityDate")
WORKERD_VERSION=$(npm ls --global --json | jq -r '.dependencies.workerd.version')

echo "Using workerd $WORKERD_VERSION, compatibility date $COMPATIBILITY_DATE"

./node_modules/.bin/esbuild \
  --log-level=warning \
  --format=esm \
  --bundle \
  --define:WORKERD_VERSION=\"$WORKERD_VERSION\" \
  --minify-syntax \
  --target=esnext \
  --outfile=tap/run-workers.js \
  tap/run-workers.ts

cat <<EOT > $(pwd)/tap/.workers.capnp
using Workerd = import "/workerd/workerd.capnp";

const config :Workerd.Config = (
  services = [
    (name = "main", worker = .tapWorker),
  ],

  sockets = [
    # Serve HTTP on port 8080.
    ( name = "http",
      address = "*:8080",
      http = (),
      service = "main"
    ),
  ]
);

const tapWorker :Workerd.Worker = (
  modules = [
    (name = "worker", esModule = embed "run-workers.js")
  ],
  compatibilityDate = "$COMPATIBILITY_DATE",
);
EOT

workerd serve --verbose $(pwd)/tap/.workers.capnp &
sleep 1
failed=$(curl -s http://localhost:8080 | jq '.failed')
kill $(ps aux | grep 'workerd' | grep -v 'grep' | awk '{print $2}')
test $failed -eq 0
