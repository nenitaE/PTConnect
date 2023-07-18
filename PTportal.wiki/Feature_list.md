# MVP LIST ______________________
RehabPortal is a website for rehab professionals to interact with their patients.

It allows _licensed clinicians_ to:
* create and send personalized exercise prescriptions (HEP) to their patients
* communicate with their patients via a secure online portal
* provide virtual sessions 

It allows _invited patients_ to receive a secure link to their personal portal where they can:
* view their exercise prescription and click links with video demonstrations of proper technique 
* send direct messages to their clinicians
* log their exercise sessions so their clinician can view compliance
* schedule a virtual session with their clinician if they are struggling with something or having problems with their exercises.  

## 1. New account creation, log in, log out, and guest/demo login

* Users can sign up, log in, and log out.
     * sign up is through invitation only.  Users will receive a code from their clinician that allows them to sign up.
* Users can use a demo log in to try the site.
* Users can't use any features without logging in.
* When a user logs in they should be directed to a dashboard which will be different based on whether the user is a clinician or a patient.
     * the navigation bar should not show sign-up or log-in
     * the navigation bar should show logout
* When a user logs out they should be directed to the homepage.
    * the navigation bar should not show logout
    * the navigation bar should show sign-up or log-in

# -------------------------------

Features:
## 1. Create an HEP (home exercise program):
Methods: GET, POST, DELETE, PUT

* Logged in clinician-users can search for the exercises they want to prescribe to their patient based on the injured muscle group/diagnosis (GET, POST, DELETE, PUT)
* Logged in patient-users can get a list of exercises that have been prescribed by their clinician (GET)

## 2. Direct message your clinician:
Methods: GET, POST, DELETE, PUT

* Logged in patient-users and clinician-users can create, read, edit and delete secure messages to one another.

## 3. Book a virtual visit with your clinician:
Methods: GET, POST, DELETE, PUT

* Logged in patient-users can select from available virtual visit time slots and book a virtual visit, edit the visit or cancel (delete) the visit.
* Logged in clinician-users can set virtual visit availability through time slots, accept/reject bookings requested by patient-users or cancel (delete) bookings.

## 4. Create a client list:
Methods: GET, POST, PUT

* Only logged in clinician-users are allowed to create a patient list.  Upon adding creating a new entry in their patient list, the patient will receive an email invitation with a secure code that will alow them to sign up.  Upon sign up,  the patient-user will be "connected" to their clinician and have access to send/receive messages, view their HEP, and book virtual visits.

# --------------------------------
