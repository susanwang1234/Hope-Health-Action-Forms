docker exec ceres-server node_modules/.bin/knex seed:run --specific=seed_test.ts
docker exec ceres-server npm test
docker exec ceres-server node_modules/.bin/knex seed:run --specific=seed_project.ts
read # Prevents window from closing