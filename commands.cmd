To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
To start backend run pipenv run flask run
To start frontend cd into react-app then run npm start

To migrate/seed tables run:
pipenv run flask db migrate
pipenv run flask db upgrade
pipenv run flask seed all