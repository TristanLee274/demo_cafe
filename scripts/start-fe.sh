#!/bin/bash
# Start Frontend
cd "$(dirname "$0")/../src/frontend" || exit
npm run dev
