from app.models import db, ExercisePrescription, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_exerciseprescriptions():
    rx1 = ExercisePrescription(
        title='Rotator Cuff Tear',
        dailyFrequency = 2,
        weeklyFrequency = 5,
        status = 'current',
        clinicianId = 1,
        patientId = 2
        )
    rx2 = ExercisePrescription(
        title='HamstringTear',
        dailyFrequency = 1,
        weeklyFrequency = 4,
        status = 'current',
        clinicianId = 1,
        patientId = 4
        )
    rx3 = ExercisePrescription(
        title='Sciatica',
        dailyFrequency = 3,
        weeklyFrequency = 5,
        status = 'current',
        clinicianId = 3,
        patientId = 5
        )
    rx4 = ExercisePrescription(
        title='Quad Tendonitis',
        dailyFrequency = 2,
        weeklyFrequency = 4,
        status = 'current',
        clinicianId = 3,
        patientId = 6
        )
    rx5 = ExercisePrescription(
        title='Sciatica',
        dailyFrequency = 3,
        weeklyFrequency = 5,
        status = 'current',
        clinicianId = 1,
        patientId = 2
        )
    rx6 = ExercisePrescription(
        title='Quad Tendonitis',
        dailyFrequency = 2,
        weeklyFrequency = 4,
        status = 'current',
        clinicianId = 1,
        patientId = 4
        )
    rx7 = ExercisePrescription(
        title='Achilles Tendonitis',
        dailyFrequency = 2,
        weeklyFrequency = 5,
        status = 'current',
        clinicianId = 1,
        patientId = 2
        )
    rx8 = ExercisePrescription(
        title='Plantar Fasciitis',
        dailyFrequency = 1,
        weeklyFrequency = 4,
        status = 'current',
        clinicianId = 1,
        patientId = 4
        )
    

    db.session.add(rx1)
    db.session.add(rx2)
    db.session.add(rx3)
    db.session.add(rx4)
    db.session.add(rx5)
    db.session.add(rx6)
    db.session.add(rx7)
    db.session.add(rx8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_exerciseprescriptions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.exerciseprescriptions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exerciseprescriptions"))
        
    db.session.commit()