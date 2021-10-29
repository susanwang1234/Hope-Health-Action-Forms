<h1>Ceres Project Introduction</h1>

Ceres’ web-based application for Hope Health Action (HHA) will allow users to upload, submit, and view data to fulfill their monthly requirements. Currently, users are able to add new MSPP required
data; eventually, they will also be able to upload new case studies and an employee of the month to receive points and compete with other departments. Users will also be able to view data they had
previously submitted so they can either edit or delete the files.<br>

<h1>Ceres Directory Structure</h1>

In the root directory, there are 4 folders. These 4 folders are ceres-client, ceres-database, ceres-postman and ceres-server. ceres-client contains all the files for the client written with Typescript
and React and a dockerfile. It follows the typical React file structure where it has an src folder with all the different tsx files inside of it. ceres-database contains a dockerfile and sql files for
the mysql database used for this project. The sql files will be removed next iteration since we transitioned to using migrations and seeds. ceres-postman contains a json of the rest api for this
project. ceres-server contains all the files for the server written with Typescript and Node/Express and a dockerfile. It follows the typical Node file structure where it has an src folder with all
the different tsx files inside of it. <br>

<h1>Ceres Client and Serverside Build and Deploy Instructions</h1>

Proceed with Section A if:

1. This is your first time setting up the environment<br>
2. New dependencies were added<br>

Otherwise proceed to Section B<br>

\*\*\*If the commands "make \_\_\_\_" do not work, refer only to Section C<br>

A video tutorial for setting up the environment can be found here: https://youtu.be/p5ku4wTy-FQ<br>

<h3>Section A</h3>
Instructions on setting up the build (From the ./ directory)

- make setup<br>

<h3>Section B</h3>
Steps to run (From the ./ directory)

- make build<br>
- make up<br>

To visit the client

- Go to the following URL: http://localhost:3000/<br>

To visit the serverside

- Go to the following URL: http://localhost:8080/<br>

To shut down the Docker containers (From the ./ directory)

- make stop<br>

<h3>Section C</h3>
Proceed with Section C if:

1. This is your first time setting up the environment<br>
2. New dependencies were added<br>
3. The commands "make \_\_\_\_" do not work<br>

Instructions on setting up the build (From the ./ directory)

- ./setup.sh<br>

\*\*\* If permission is denied, do the following<br>

- chmod +x setup.sh
- ./setup.sh<br>

Otherwise proceed to Section D<br>

<h3>Section D</h3>
Steps to run (From the ./ directory)

- docker-compose build<br>
- docker-compose up -d<br>

To visit the client

- Go to the following URL: http://localhost:3000/<br>

To visit the serverside

- Go to the following URL: http://localhost:8080/<br>

To shut down the Docker containers (From the ./ directory)

- docker-compose down<br>

<h1>Important Knex commands (executed inside server docker container root)</h1>

<h3>Make a migration</h3>
Steps to run (From the ceres-server CLI terminal)

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

<h3> Important notes </h3>
<p>You only need to make a migration if you want to change the schema. You only need to make a seed if you want to change the default state of the database. Otherwise, just run the migration and seed the database to view the updated database.</p>

<h1>Important mysql commands (executed inside mysql docker container root)</h1>

<h3>Dumping the schema</h3>
Steps to run (From the ceres-ceres-database-1 CLI terminal)

- mysqldump -u root -p --databases ceresdb > dump.sql<br>

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

- DROP TABLE "table_name"; <br>

<h3> View table columns </h3>
Steps to run (From the ceres-ceres-database-1 CLI terminal)

- DESCRIBE "table_name"; <br>

<h1>Running Unit Tests</h1>

<h3>Serverside Unit Tests</h3>
Steps to run (From the ceres-server CLI terminal)

- node_modules/.bin/knex migrate:latest (Only needed if migrations have not been done)<br>
- ./runTests.sh<br>
