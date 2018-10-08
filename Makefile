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

startstage:
	docker-compose -f docker-compose.stage.yml start

stop:
	docker-compose stop

stopstage:
	docker-compose -f docker-compose.stage.yml stop

state:
	docker-compose ps

build:
	docker-compose build
	docker-compose up -d

buildstage:
	docker-compose -f docker-compose.stage.yml build
	docker-compose -f docker-compose.stage.yml up -d

attach:
	docker exec -i -t ${c} /bin/bash

purge:
	docker-compose down

purgestage:
	docker-compose -f docker-compose.stage.yml down

re: stop build

restage: stopstage buildstage

full: purge build

fullstage: purgestage buildstage
