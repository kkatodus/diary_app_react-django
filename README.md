# About this project

This project is a diary creation application using django as a backend with a psql database and a react frontend. Its main purpose was for me to educate myself on restful api calls and UI development in react.

To allow easier sharing of this project, I have containerized the backend and db of this project using docker.

You can look at a quick walk through of this project [here](https://youtu.be/fzO0WR2NVC8)

## Getting Started

## Start the backend

First, to get the backend of this project started, cd into the root directory of this project and run the following command:

```bash
docker-compose up --build db backend
```

Then log into the backend docker container and run the two commands below:

```bash
python manage.py makemigrations api
python manage.py migrate api
```

This should initiate your database with the models we are using.

(Optionally you can create a superuser to log into the admin site of django. To do this, run the command below in the backend docker container)

```bash
python manage.py createsuperuser
```

Now the backend should be ready to accept connections from the react frontend

### Start the frontend

I personally prefer to not use docker to start the frontend because it doesn't give me the hot reload react has. So just cd into the frontend and start the frontend normally with the following two commands.

```bash
npm install
npm start
```

This should start your react frontend at port 3000
