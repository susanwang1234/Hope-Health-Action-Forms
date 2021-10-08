setup:
	cd ceres-client
	npm install
	npm install craco
	npm install @craco/craco
	npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
	npm install react-router-dom
	cd ..
	cd ceres-server
	npm install
	npm install express body-parser dotenv
	npm install npm install --save-dev @types/express @types/body-parser @types/dotenv
	npm install knex
	cd ..

setup-client:
	cd ceres-client
	npm install
	npm install craco
	npm install @craco/craco
	npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
	npm install react-router-dom
	cd ..

setup-server:
	cd ceres-server
	npm install
	npm install express body-parser dotenv
	npm install npm install --save-dev @types/express @types/body-parser @types/dotenv 
	npm install @types/mysql
	npm install knex
	cd ..

build:
	docker-compose build

u:
	docker-compose up

up:
	docker-compose up -d

stop: 
	docker-compose stop

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d