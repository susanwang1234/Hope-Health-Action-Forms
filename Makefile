setup:
	cd ceres-client
	npm install
	cd ..
	cd ceres-server
	npm install
	cd ..

build:
	docker-compose build

up:
	docker-compose up -d

down: 
	docker-compose down

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d