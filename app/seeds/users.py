from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io',
        username='Demo',
        firstName = 'Demo',
        lastName = 'Clinician', 
        city = 'San Diego',
        state = 'CA',
        profileImage = 'https://rb.gy/7cyhf',
        isClinician = True,
        password='password'
        )
    marnie = User(
        username='marnie', 
        email='marnie@aa.io',
        firstName = 'Marnie',
        lastName = 'Patient', 
        city = 'San Diego',
        state = 'California',
        profileImage = 'https://tinyurl.com/39veyb2f',
        isClinician = False, 
        password='password')
    bobbie = User(
        username='bobbie', 
        email='bobbie@aa.io',
        firstName = 'Bob',
        lastName = 'Jones', 
        city = 'La Jolla',
        state = 'California',
        profileImage = 'https://tinyurl.com/mr38wcfb',
        isClinician = True, 
        password='password')
    leah = User(
        username='leah', 
        email='leah@aa.io',
        firstName = 'Leah',
        lastName = 'Smith', 
        city = 'La Jolla',
        state = 'California',
        profileImage = 'https://tinyurl.com/3da6az9c',
        isClinician = False, 
        password='password')
    mel = User(
        username='mel', 
        email='mel@aa.io',
        firstName = 'Melinda',
        lastName = 'Carter', 
        city = 'San Diego',
        state = 'California',
        profileImage = 'https://www.greatseniorliving.com/assets/img/seniors-citizen-age-@3X.jpg',
        isClinician = False, 
        password='password')
    tim = User(
        username='tim', 
        email='tim@aa.io',
        firstName = 'Tim',
        lastName = 'Smith', 
        city = 'La Jolla',
        state = 'California',
        profileImage = 'https://tinyurl.com/bdhepd5n',
        isClinician = False, 
        password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(tim)
    db.session.add(mel)
    db.session.add(leah)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()