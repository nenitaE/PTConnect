from app.models import db, Exercise, environment, SCHEMA
from sqlalchemy.sql import text


# Adds messages
def seed_messages():
    msg1 = Exercise(
        clinicianId = 1,
        patientId = 2,
        senderIsClinician = True,
        body = 'Hello Marnie.  You can use this link to set up an account on PT connect https://rehabportal.com '
        )
    msg2 = Exercise(
        clinicianId = 1,
        patientId = 2,
        senderIsClinician = False,
        body = 'Hi Dr. Demo.  The link doesn\'t work. '
        )
    

    db.session.add(msg1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))
        
    db.session.commit()