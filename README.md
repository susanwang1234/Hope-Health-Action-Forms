<h1>Ceres Client and Serverside</h1>

Proceed with Section A if:<br>

1. This is your first time setting up the environment<br>
2. New dependencies were added<br>

Otherwise proceed to Section B<br>

\*\*\*If the commands "make \_\_\_\_" do not work, refer only to Section C<br>

A video tutorial for setting up the environment can be found here: https://youtu.be/p5ku4wTy-FQ<br>

<h3>Section A</h3>

Instructions on setting up the build (From the ./ directory)<br>

- make setup<br>

<h3>Section B</h3>

Steps to run (From the ./ directory) <br>

- make build<br>
- make up<br>

To visit the client <br>

- Go to the following URL: http://localhost:3000/<br>

To visit the serverside <br>

- Go to the following URL: http://localhost:8080/<br>

To shut down the Docker containers (From the ./ directory)<br>

- make down<br>

<h3>Section C</h3>

Proceed with Section C if:<br>

1. This is your first time setting up the environment<br>
2. New dependencies were added<br>
3. The commands "make \_\_\_\_" do not work<br>

Instructions on setting up the build (From the ./ directory)<br>

- ./setup.sh<br>

\*\*\* If permission is denied, do the following<br>

- chmod +x setup.sh<br>
- ./setup.sh<br>

Otherwise proceed to Section D<br>

<h3>Section D</h3>

Steps to run (From the ./ directory) <br>

- docker-compose build<br>
- docker-compose up -d<br>

To visit the client <br>

- Go to the following URL: http://localhost:3000/<br>

To visit the serverside <br>

- Go to the following URL: http://localhost:8080/<br>

To shut down the Docker containers (From the ./ directory)<br>

- docker-compose down<br>

<h1>Important Knex commands (executed inside server docker container root)</h1>

<h3>Make a migration</h3>
Steps to run (From the ceres-server CLI terminal) <br>
- node_modules/.bin/knex migrate:make -x ts "migration_name"<br>

<h3>Run migrations</h3>
Steps to run (From the ceres-server CLI terminal)
- node_modules/.bin/knex migrate:latest<br>

<h3>Make seed</h3>
Steps to run (From the ceres-server CLI terminal)
- node_modules/.bin/knex seed:make -x ts "seed_name"<br>

<h3>Seed database</h3>
Steps to run (From the ceres-server CLI terminal)
- node_modules/.bin/knex seed:run<br>

<h1>Important mysql commands (executed inside mysql docker container root)</h1>

<h3>Login to table</h3>
Steps to run (From the ceres-ceres-database-1 CLI terminal)
- mysql -u root -p<br>
- password (this is the password)<br>

<h3>Show tables</h3>
Steps to run (From the ceres-ceres-database-1 CLI terminal)
- use ceresdb;<br>
- show tables;<br>

<h3>Delete a table</h3>
Steps to run (From the ceres-ceres-database-1 CLI terminal)
- Delete _____ <br>
