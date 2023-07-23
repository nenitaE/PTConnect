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
        profileImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEOUVNaiN4ACSA5phlu9V67Zl7lPeu37VCVA&usqp=CAU',
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
        profileImage = 'https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGlzcGFuaWMlMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
        isClinician = False, 
        password='password')
    bobbie = User(
        username='bobbie', 
        email='bobbie@aa.io',
        firstName = 'Bob',
        lastName = 'Jones', 
        city = 'La Jolla',
        state = 'California',
        profileImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbnJs-BygXaqqnWsmZv0r8H9wE2xzvJfYHPA&usqp=CAU',
        isClinician = True, 
        password='password')
    leah = User(
        username='leah', 
        email='leah@aa.io',
        firstName = 'Leah',
        lastName = 'Smith', 
        city = 'La Jolla',
        state = 'California',
        profileImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllBg0j5AAtjDX6yX8mBHvTHNMoYlpSreunQ&usqp=CAU',
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
        profileImage = 'https://www.nyc.gov/assets/finance/images/content/misc/sche_brochure_thm.png',
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