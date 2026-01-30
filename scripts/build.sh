#!/bin/bash
# Build Project
echo "Building Frontend..."
cd "$(dirname "$0")/../src/frontend" || exit
npm run build

echo "Backend does not require a build step (Interpreted)."
