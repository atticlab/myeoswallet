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

stop:
	docker-compose stop

state:
	docker-compose ps

build:
	docker-compose build
	docker-compose up -d

attach:
	docker exec -i -t ${c} /bin/bash

purge:
	docker-compose down

re: stop build

full: purge build
