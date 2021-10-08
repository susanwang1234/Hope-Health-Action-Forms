<h1>Ceres Client and Serverside</h1> <br>

Proceed with Section A if:<br>

1. This is your first time setting up the environment<br>
2. New dependencies were added<br>

Otherwise proceed to Section B<br>

\*\*\*If the commands "make \_\_\_\_" do not work, refer only to Section C<br>

A video tutorial for setting up the environment can be found here: https://youtu.be/p5ku4wTy-FQ <br>

-----------------------------------Section A-----------------------------------<br>

- Instructions on setting up the build (From the ./ directory)<br>
  --- make setup<br>

-----------------------------------Section B-----------------------------------<br>

- Steps to run (From the ./ directory) <br>
  --- make build<br>
  --- make up<br>

- To visit the client <br>
  --- Go to the following URL: http://localhost:3000/<br>

- To visit the serverside <br>
  --- Go to the following URL: http://localhost:8080/<br>

- To shut down the Docker containers (From the ./ directory)<br>
  --- make down<br>

-----------------------------------Section C-----------------------------------<br>

Proceed with Section C if:<br>

1. This is your first time setting up the environment<br>
2. New dependencies were added<br>
3. The commands "make \_\_\_\_" do not work<br>

- Instructions on setting up the build (From the ./ directory)<br>
  --- ./setup.sh<br>

- \*\*\* If permission is denied, do the following<br>
  --- chmod +x setup.sh<br>
  --- ./setup.sh<br>

Otherwise proceed to Section D<br>

-----------------------------------Section D-----------------------------------<br>

- Steps to run (From the ./ directory) <br>
  --- docker-compose build<br>
  --- docker-compose up -d<br>

- To visit the client <br>
  --- Go to the following URL: http://localhost:3000/<br>

- To visit the serverside <br>
  --- Go to the following URL: http://localhost:8080/<br>

- To shut down the Docker containers (From the ./ directory)<br>
  --- docker-compose down<br>

<h1>Important Knex commands (executed inside server docker container root)</h1><br>

<h3>Make a migration:</h3><br>
node_modules/.bin/knex migrate:make -x ts "migration_name"<br>

<h3>Run migrations:</h3><br>
node_modules/.bin/knex migrate:latest<br>

<h3>Make seed:</h3><br>
node_modules/.bin/knex seed:make -x ts "seed_name"<br>

<h3>Seed database:</h3><br>
node_modules/.bin/knex seed:run