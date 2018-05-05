run:
	@echo "*********************************\n"
	@echo "Lifting up the whole environment!\n"
	@echo "*********************************\n"
	@docker-compose up

quiet-run:
	@echo "*********************************\n"
	@echo "Quietly lifting up the whole environment!\n"
	@echo "*********************************\n"
	@docker-compose up --detach

build:
	@echo "*********************************\n"
	@echo "Building static files!\n"
	@echo "*********************************\n"
	@docker-compose exec npm run build

cy-test:
	@echo "*************************\n"
	@echo "Running Cypress tests!\n"
	@echo "*************************\n"
	@docker-compose exec front npx cypress run

test:
	@echo "*************************\n"
	@echo "Running Cypress tests!\n"
	@echo "*************************\n"
	@docker-compose exec front npm run unit

down:
	@echo "******************************\n"
	@echo "Dropping down the environment!\n"
	@echo "******************************\n"
	@docker-compose down

ps:
	@echo "************************\n"
	@echo "Listing running services\n"
	@echo "************************\n"
	@docker-compose ps

rm-network:
	@echo "**********************************\n"
	@echo "Removing all networks!\n"
	@echo "**********************************\n"
	@docker network rm $(sudo docker network ls -q)

rm-volume:
	@echo "*********************\n"
	@echo "Removing all volumes!\n"
	@echo "*********************\n"
	@docker volume rm $(sudo docker volume ls -q)

.PHONY: no_targets__ list
no_targets__:
list:
	@sh -c "$(MAKE) -p no_targets__ -prRn -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -F':' '/^[a-zA-Z0-9][^\$$#\/\\t=]*:([^=]|$$)/ {split(\$$1,A,/ /);for(i in A)print A[i]}' | grep -v '__\$$' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'"
