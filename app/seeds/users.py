from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io',
        username='Demo',
        firstName = 'Demo',
        lastName = 'Smith', 
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
    Chelsie = User(
        username='Chelsie', 
        email='Chelsie@aa.io',
        firstName = 'Chelsie',
        lastName = 'Simpson', 
        city = 'LA',
        state = 'California',
        profileImage = 'https://tinyurl.com/2nhwvbck',
        isClinician = False, 
        password='password')
    Mike = User(
        username='Mike', 
        email='mike@aa.io',
        firstName = 'Mike',
        lastName = 'Jones', 
        city = 'San Francisco',
        state = 'California',
        profileImage = 'https://tinyurl.com/2s4ezj9u',
        isClinician = False, 
        password='password')
    Ellie = User(
        username='ellie', 
        email='ellie@aa.io',
        firstName = 'Ellie',
        lastName = 'Jones', 
        city = 'San Diego',
        state = 'California',
        profileImage = '',
        isClinician = False, 
        password='password')
    Craig = User(
        username='Craig', 
        email='craigL@aa.io',
        firstName = 'Craig',
        lastName = 'Lopez', 
        city = 'San Diego',
        state = 'California',
        profileImage = '',
        isClinician = False, 
        password='password')
    Jacob = User(
        username='jacob', 
        email='jacob@aa.io',
        firstName = 'Jacob',
        lastName = 'Harris', 
        city = 'San Diego',
        state = 'California',
        profileImage = '',
        isClinician = False, 
        password='password')
    Edward = User(
        username='Edward', 
        email='edward@aa.io',
        firstName = 'Edward',
        lastName = 'Newsome', 
        city = 'San Diego',
        state = 'California',
        profileImage = '',
        isClinician = False, 
        password='password')
    Abraham = User(
        username='abe', 
        email='abraham@aa.io',
        firstName = 'Abraham',
        lastName = 'Genesis', 
        city = 'San Francisco',
        state = 'California',
        profileImage = 'https://tinyurl.com/2s4ezj9u',
        isClinician = False, 
        password='password')
    Isaac = User(
        username='isaac', 
        email='isaac@aa.io',
        firstName = 'Ellie',
        lastName = 'Exodus', 
        city = 'San Diego',
        state = 'California',
        profileImage = '',
        isClinician = False, 
        password='password')
    Jake = User(
        username='jake', 
        email='jake@aa.io',
        firstName = 'Jake',
        lastName = 'Lopez', 
        city = 'San Diego',
        state = 'California',
        profileImage = '',
        isClinician = False, 
        password='password')
    Sarah = User(
        username='sarahL', 
        email='sarahL@aa.io',
        firstName = 'Sarah',
        lastName = 'Leslie', 
        city = 'San Diego',
        state = 'California',
        profileImage = '',
        isClinician = False, 
        password='password')
    John = User(
        username='JohnB', 
        email='johnB@aa.io',
        firstName = 'John',
        lastName = 'Bradshaw', 
        city = 'San Diego',
        state = 'California',
        profileImage = '',
        isClinician = False, 
        password='password')
    April = User(
        username='April', 
        email='april@aa.io',
        firstName = 'April',
        lastName = 'May', 
        city = 'San Diego',
        state = 'California',
        profileImage = '',
        isClinician = False, 
        password='password')
    Luz = User(
        username='Luz', 
        email='luz@aa.io',
        firstName = 'Luz',
        lastName = 'Hernandez', 
        city = 'San Diego',
        state = 'California',
        profileImage = 'https://rb.gy/nw3jc',
        isClinician = True, 
        password='password')
    Thomas = User(
        username='Thomas', 
        email='thomas@aa.io',
        firstName = 'Thomas',
        lastName = 'Smith', 
        city = 'San Diego',
        state = 'California',
        profileImage = 'https://rb.gy/tyqdk',
        isClinician = True, 
        password='password')
    Jessica = User(
        username='Jess', 
        email='Jess@aa.io',
        firstName = 'Jessica',
        lastName = 'Robbins', 
        city = 'San Diego',
        state = 'California',
        profileImage = 'https://rb.gy/prbar',
        isClinician = True, 
        password='password')
    Tracey = User(
        username='Tracey', 
        email='tracey@aa.io',
        firstName = 'Tracey',
        lastName = 'McRae', 
        city = 'San Diego',
        state = 'California',
        profileImage = 'https://rb.gy/puni6',
        isClinician = True, 
        password='password')
    Anne = User(
        username='Anne', 
        email='anne@aa.io',
        firstName = 'Anne',
        lastName = 'Carmichael', 
        city = 'San Diego',
        state = 'California',
        profileImage = 'https://rb.gy/vfcfo',
        isClinician = True, 
        password='password')
    Derek = User(
        username='Derek', 
        email='derek@aa.io',
        firstName = 'Derek',
        lastName = 'Jones', 
        city = 'San Diego',
        state = 'California',
        profileImage = 'https://shorturl.at/lFNQR',
        isClinician = True, 
        password='password')
    Sam = User(
        username='Sam', 
        email='sam@aa.io',
        firstName = 'Sam',
        lastName = 'Smith', 
        city = 'San Diego',
        state = 'California',
        profileImage = 'https://shorturl.at/mqBQU',
        isClinician = True, 
        password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(tim)
    db.session.add(mel)
    db.session.add(leah)
    db.session.add(Chelsie)
    db.session.add(Mike)
    db.session.add(Ellie)
    db.session.add(Craig)
    db.session.add(Jacob)
    db.session.add(Edward)
    db.session.add(Abraham)
    db.session.add(Isaac)
    db.session.add(Jake)
    db.session.add(Sarah)
    db.session.add(John)
    db.session.add(April)
    db.session.add(Luz)
    db.session.add(Thomas)
    db.session.add(Jessica)
    db.session.add(Tracey)
    db.session.add(Anne)
    db.session.add(Derek)
    db.session.add(Sam)
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