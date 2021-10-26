setup:
	cd ceres-client
	npm install
	cd ..
	cd ceres-server
	npm install
	cd ..

setup-client:
	cd ceres-client
	npm install
	cd ..

setup-server:
	cd ceres-server
	npm install
	cd ..

build:
	docker-compose build

u:
	docker-compose up

up:
	docker-compose up -d

up-test:
	docker-compose up -d
	docker exec ceres-server node_modules/.bin/knex seed:run --specific=seed_test.ts
	docker exec ceres-server npm test
	docker exec ceres-server node_modules/.bin/knex seed:run --specific=seed_project.ts

up-test-stop:
	docker-compose up -d
	docker exec ceres-server node_modules/.bin/knex seed:run --specific=seed_test.ts
	docker exec ceres-server npm test
	docker exec ceres-server node_modules/.bin/knex seed:run --specific=seed_project.ts
	docker-compose stop

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

stop: 
	docker-compose stop

migrate:
	docker exec ceres-server node_modules/.bin/knex migrate:latest

seed:
	docker exec ceres-server node_modules/.bin/knex seed:run --specific=seed_project.ts

test:
	docker exec ceres-server node_modules/.bin/knex seed:run --specific=seed_test.ts
	docker exec ceres-server npm test
	docker exec ceres-server node_modules/.bin/knex seed:run --specific=seed_project.ts
