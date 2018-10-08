#!/bin/bash

pg_dump -F p -s -E UTF8 -C -O -x --file=/backups/meeoswallet_structure.sql --dbname=meeoswallet -U postgres
