from app.models import db, PatientList, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_patientlists():
    list1 = PatientList(
        email = 'marnie@aa.io',
        status = 'active',
        clinicianId = 1,
        patientId = 2
        )
    list2 = PatientList(
        email = 'leah@aa.io',
        status = 'active',
        clinicianId = 1,
        patientId = 4
        )
    list3 = PatientList(
        email = 'mel@aa.io',
        status = 'discharged',
        clinicianId = 3,
        patientId = 5
        )
    list4 = PatientList(
        email = 'tim@aa.io',
        status = 'current',
        clinicianId = 3,
        patientId = 6
        )
    list5 = PatientList(
        email = 'edward@aa.io',
        status = 'active',
        clinicianId = 1,
        patientId = 12
        )
    list6 = PatientList(
        email = 'ellie@aa.io',
        status = 'active',
        clinicianId = 1,
        patientId = 9
        )
    list7 = PatientList(
        email = 'craigL@aa.io',
        status = 'active',
        clinicianId = 1,
        patientId = 10
        )
    list8 = PatientList(
        email = 'jacob@aa.io',
        status = 'discharged',
        clinicianId = 1,
        patientId = 11
        )
    

    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.add(list4)
    db.session.add(list5)
    db.session.add(list6)
    db.session.add(list7)
    db.session.add(list8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_patientlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.patientlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM patientlists"))
        
    db.session.commit()