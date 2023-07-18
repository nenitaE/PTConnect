# User Stories

## Users

### Sign Up as a User

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
    * when I'm on the signup page I should be able to
        1. add my firstname, lastname, email address, phone number and location on a clearly laid out form
        2. create a password
        3. select to become a tasker
            * a new form should be provided to me to become a tasker
    * on correct information passed in
        * when I hit the "create account" button it should correctly log me in direct me to the home page and allow me to start creating tasks
    * When I enter invalid data on the sign-up form:
        * The website should inform me of the failed validations and repopulate the form with my inputs
            * First Name: Can't be blank
            * Last Name: Can't be blank
            * Email Address: Can't be blank, Must be a valid email address
            * Phone Number: Can't be blank, Phone number is not valid
            * Password: Can't be blank
            * Zip Code: Can't be blank

## Log in as a User

* As a registered and unauthorized user/tasker, I want to be able to log in to the website via a log-in form.
    * When I'm on the '/login' page:
        * I would like to be able to enter my email and password on a clearly laid out form.
        * I would like the website to log me in upon successful completion of the
        log-in form.
        * When I enter invalid data on the log-in form:
            * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries
            (except my password).
            * I don't want to have to refill the form again with the valid data I had
            in there.

## Demo User-Tasker

* As an unregistered, unauthorized and site testing user, I would like an easy way to log-in
    as a demo-user so I can access the functionality without having to sign-up:
    * I would like an easy to read and notice "Login as Demo-User" button that logs me in as a demo_user upon clicking the button.
        * This way I can easily log-in and test the site's features and functionality without needing to sign-up and enter credentials.
    * I would like the button to be on both the '/signup' and '/login' pages so I can easily notice it.

## Log Out

* If I'm a logged in user, I want to be able to log out via an easy to find log-out button on the navigation bar.
    * While on any page of the site:
        * I can log out of my account and be redirected to the homepage.
        * This way I can have peace of mind easily by quickly logging out to keep my information secure.

* If I'm a logged in tasker, I want to be able to log out via an easy to find log-out button on the navigation bar.
    * While on any page of the site:
        * I can log out of my account and be redirected to the homepage.
        * This way I can have peace of mind easily by quickly logging out to keep my information secure.

## Choose a TaskType

* If I'm a logged out user:
    * I should be able to access a button list of the 10 tasktypes available for me to choose from.
        * doing this should save the tasktype I want and redirect me to the sign-up login menu
        * If I decide to signup or login it should redirect me to the next part of the form
            and continue to create my task.

* If I'm a logged in user:
    * I should be able to access the search filter for my tasktype I want done.
        * doing this should save the tasktype and get the form to fill out my tasks details.


## Task Details

* If I'm a logged out user:
    * I should only be able to access the form to create a task (task details) after signing up or logging in

* If I'm a logged in user:
    * I should be able to access the form to create a task through the "Choose a Task" search filter
    * I should be able to access and see the details about any previous tasks I have created

    * I would like the layout of the form to be easy to read and come in multiple steps so I
        don't get overwhelmed while trying to create my task.
        * I would like a bar at the top with 4 stopping points to let me know where I am
            in the form.
            * clicking on any of those stopping points should bring me to that part of the form
            * each stopping point should have a title for that part of the form so I can easily
                see where I am currently
            * once I finish one stopping point on the form I want to see a continue button that
                takes me to the next stopping point

            * once I reach the last stopping point I would like to see a Confirm button to let me know I am
                about to create this task

* upon submission of the form I would like to see my new task added to my list of tasks


## Tasker Reviews
* If I'm a logged out user:
    * I should not be able to post any reviews for any taskers

* If I'm a logged in user:
    * I should be able to create, update or delete a review for taskers that have finished
        a task for me.
        * I should be able to change the star rating inside the review for the specific tasker


## Managing Tasker profile

* Once I have become a Tasker I should be available to perform tasks of the type I specified for other people in my area.
* I should be able to update my profile and hourly-rate based on a task type
* I should be able to decide to not be a tasker and delete my profile
* I should be able to create a new task-type and set my hourly-rate for that tasktype
* I should be able
