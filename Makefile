ARGS = $(filter-out $@,$(MAKECMDGOALS))
MAKEFLAGS += --silent
.PHONY: build re full purge attach stop start

list:
	sh -c "echo; $(MAKE) -p no_targets__ | awk -F':' '/^[a-zA-Z0-9][^\$$#\/\\t=]*:([^=]|$$)/ {split(\$$1,A,/ /);for(i in A)print A[i]}' | grep -v '__\$$' | grep -v 'Makefile'| sort"

#############################
# Docker machine states
#############################

start:
	docker-compose start

startdev:
	docker-compose -f docker-compose.dev.yml start

stop:
	docker-compose stop

stopdev:
	docker-compose -f docker-compose.dev.yml stop

state:
	docker-compose ps

build:
	docker-compose build
	docker-compose up -d

builddev:
	docker-compose -f docker-compose.dev.yml build
	docker-compose -f docker-compose.dev.yml up -d

attach:
	docker exec -i -t ${c} /bin/bash

purge:
	docker-compose down

purgedev:
	docker-compose -f docker-compose.dev.yml down

re: stop build

redev: stopdev builddev

full: purge build

fulldev: purgedev builddev
