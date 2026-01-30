#!/bin/bash
# Start Backend
cd "$(dirname "$0")/../src/backend" || exit
if [ -d "venv" ]; then
    source venv/bin/activate
fi
python3 main.py
