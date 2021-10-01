setup:
	cd ceres-client
	npm install
	npm install craco
	npm install @craco/craco
	npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
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