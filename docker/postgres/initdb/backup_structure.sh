#!/bin/bash

pg_dump -F p -s -E UTF8 -C -O -x --file=/backups/myeoswallet_structure.sql --dbname=myeoswallet -U postgres
