from app.models import db, Exercise, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_exercises():
    ex1 = Exercise(
        name = 'internal rotation',
        exerciseData = '',
        images = '',
        sets = 1,
        reps = 10,
        notes = 'stop if pain increases',
        holdTime = 0,
        exercisePrescriptionId = 1 
        )
    ex2 = Exercise(
        name = 'external rotation',
        exerciseData = '',
        images = '',
        sets = 1,
        reps = 10,
        notes = 'stop if pain increases',
        holdTime = 0,
        exercisePrescriptionId = 1 
        )
    ex3 = Exercise(
        name = 'seated hamstring stretch',
        exerciseData = '',
        images = '',
        sets = 1,
        reps = 3,
        notes = 'stretch to the point of discomfort, not pain',
        holdTime = 30,
        exercisePrescriptionId = 2 
        )
    ex4 = Exercise(
        name ='Hamstring isometrics',
        exerciseData = '',
        images = '',
        sets = 2,
        reps = 10,
        notes = '',
        holdTime = 5,
        exercisePrescriptionId = 2 
        )
    ex5 = Exercise(
        name = 'piriformis stretch',
        exerciseData = '',
        images = '',
        sets = 1,
        reps = 3,
        notes = '',
        holdTime = 30,
        exercisePrescriptionId = 3 
        )
    ex6 = Exercise(
        name = 'quad stretches',
        exerciseData = '',
        images = '',
        sets = 1,
        reps = 3,
        notes = '',
        holdTime = 30,
        exercisePrescriptionId = 4 
        )
    

    db.session.add(ex1)
    db.session.add(ex2)
    db.session.add(ex3)
    db.session.add(ex4)
    db.session.add(ex5)
    db.session.add(ex6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_exercises():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exercises"))
        
    db.session.commit()