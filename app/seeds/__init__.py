from flask.cli import AppGroup
from .users import seed_users, undo_users
from .patientlists import seed_patientlists, undo_patientlists
from .exercises import seed_exercises, undo_exercises
from .exerciseprescriptions import seed_exerciseprescriptions, undo_exerciseprescriptions
from .bookedvisits import seed_bookedvisits, undo_bookedvisits
from .messages import seed_messages, undo_messages
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_patientlists()
        undo_exerciseprescriptions()
        undo_exercises()
        undo_messages()
        undo_bookedvisits()
    seed_users()
    seed_patientlists()
    seed_exerciseprescriptions()
    seed_exercises()
    seed_messages()
    seed_bookedvisits()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_bookedvisits()
    undo_messages()
    undo_exercises()
    undo_exerciseprescriptions()
    undo_patientlists()
    undo_users()
    # Add other undo functions here