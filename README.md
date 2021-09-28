<h1>Ceres Client and Serverside</h1> <br>

If this is your first time setting up the environment, proceed with Section A<br>
The steps in Section A only need to be done once. Once completed, only follow the steps in Section B<br>

***If the commands "make ____" do not work, refer only to Section C<br>

A video tutorial for setting up the environment can be found here: https://youtu.be/p5ku4wTy-FQ <br>

------------------------Section A------------------------<br>

- Instructions on setting up the build (From the ./ directory)<br>
  --- make setup<br>

------------------------Section B------------------------<br>

- Steps to run (From the ./ directory) <br>
  --- make build<br>
  --- make up<br>

- To visit the client <br>
  --- Go to the following URL: http://localhost:3000/<br>

- To visit the serverside <br>
  --- Go to the following URL: http://localhost:8080/<br>

- To shut down the Docker containers (From the ./ directory)<br>
  --- make down<br>

------------------------Section C------------------------<br>

- Instructions on setting up the build (From the ./ directory)
  --- ./setup.sh<br>

- *** If permission is denied, do the following<br>
  --- chmod +x setup.sh<br>
  --- ./setup.sh<br>

The steps in Section C only need to be done once. Once completed, only follow the steps in Section D<br>

------------------------Section D------------------------<br>

- Steps to run (From the ./ directory) <br>
  --- docker-compose build
  --- docker-compose up -d

- To visit the client <br>
  --- Go to the following URL: http://localhost:3000/<br>

- To visit the serverside <br>
  --- Go to the following URL: http://localhost:8080/<br>

- To shut down the Docker containers (From the ./ directory)<br>
  --- docker-compose down<br>
