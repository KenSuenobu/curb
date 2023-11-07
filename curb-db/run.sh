#!/usr/bin/env bash
#
# Script to load the database.

psql < database/scripts/main.sql

yarn install

echo "Building library"
yarn build

