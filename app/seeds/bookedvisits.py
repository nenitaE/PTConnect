from app.models import db, BookedVisit, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_bookedvisits():
    visit1 = BookedVisit(
        visitTime = '6am',
        visitDate =  '2022-09-19',
        clinicianId = 1,
        patientId = 2
        )
    visit2 = BookedVisit(
        visitTime = '6pm',
        visitDate = '2023-07-31',
        clinicianId = 1,
        patientId = 2
        )
    visit3 = BookedVisit(
        visitTime = '6am',
        visitDate = '2023-09-10',
        clinicianId = 3,
        patientId = 5,
        )
    visit4 = BookedVisit(
        visitTime = '6pm',
        visitDate = '2023-09-11',
        clinicianId = 3,
        patientId = 6,
        )
    

    db.session.add(visit1)
    db.session.add(visit2)
    db.session.add(visit3)
    db.session.add(visit4)
    # db.session.add(ex5)
    # db.session.add(ex6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_bookedvisits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookedvisits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookedvisits"))
        
    db.session.commit()