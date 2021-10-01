setup:
	cd ceres-client
	npm install
	cd ..
	cd ceres-server
	npm install
	npm install express body-parser dotenv
	npm install npm install --save-dev @types/express @types/body-parser @types/dotenv 
	cd ..

setup-client:
	cd ceres-client
	npm install
	cd ..

setup-server:
	cd ceres-server
	npm install
	npm install express body-parser dotenv
	npm install npm install --save-dev @types/express @types/body-parser @types/dotenv 
	npm install @types/mysql
	cd ..

build:
	docker-compose build

up:
	docker-compose up -d

down: 
	docker-compose down

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d