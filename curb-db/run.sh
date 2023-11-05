#!/usr/bin/env bash
#
# Script to load the database.

psql < database/scripts/main.sql

echo "Building library"
yarn build

