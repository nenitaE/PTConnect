# TASKWABBIT

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
    "email": "john.smith@gmail.com",
    "id": 1,
    "username": "john"
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "location": "California",
      "isTasker": True,
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "location": "California",
      "isTasker": True,
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required",
        "location": "Location is required"
      }
    }
    ```

# Task Details 

## Get all Tasker Details
 * Returns all users/taskers (boolean is true)          

 * Require Authentication: false

 * Request
     * Method: GET
     * URL: /api/taskers
     * Body: none
 * Successful Response
     * Status Code: 200
     * Headers:
         * Content*Type: application/json
     * * Body:
​
        ```json
        {
          "Taskers": [
            {
                "id": 1,
                "firstName": "John",
                "lastName": "Doe",
                "username": "johndoe",
                "phone": 123456789,
                "location": "San Francisco",
                "email": "johndoe@example.com",
                "isTasker": true,
                "createdAt": "2023-06-21 20:39:36",
                "updatedAt": "2023-06-21 20:39:36",
                "tasks": [
                {
                  "id": 1,
                  "taskTypeId": 1,
                  "title": "New Task",
                  "description": "Description of the new task",
                  "totalPrice": 123,
                  "location": "San Francisco",
                  "task_date": "2023-06-21 20:39:36",
                  "user_id": 1,
                  "tasker_id": 2,
                  "createdAt": "2023-06-21 20:39:36",
                  "updatedAt": "2023-06-21 20:39:36"
                },
                  //... more tasks
                ],
                "reviews": [
                {
                  "id": 1,
                  "description": "Great job",
                  "rating": 4.5,
                  "user_id": 2,
                  "tasker_id": 1,
                  "createdAt": "2023-06-21 20:39:36",
                  "updatedAt": "2023-06-21 20:39:36"
                },
                  //... more reviews
                ],
                "taskerTaskTypes": [
                {
                  "id": 1,
                  "hourlyRate": 25,
                  "tasker_id": 1,
                  "taskType_id": 1,
                  "createdAt": "2023-06-21 20:39:36",
                  "updatedAt": "2023-06-21 20:39:36",
                  "taskType": {
                      "id": 1,
                      "type": "Plumbing",
                      "createdAt": "2023-06-21 20:39:36",
                      "updatedAt": "2023-06-21 20:39:36"
                  }
                },
                  //... more taskerTaskTypes
                ]
            },
            //... more taskers
          ]
          }    
          ```

    

## Create a New Task 
 * Creates and returns a new task

 * Require Authentication: true

 * Request
     * Method: POST
     * URL: /api/tasks
     * Body: 
          ```json
            { 
                "taskTypeId": 1, 
                "title": "New Task",
                "description": "Description of the new task", 
                "totalPrice": 123, 
                "location": "San Francisco", 
                "task_date": "2023-06-21 20:39:36", 
                "user_id": 1,
                "tasker_id": 2 
            }    
        ```
 * Successful Response
     * Status Code: 200
     * Headers:
         * Content*Type: application/json
     * Body:
        ```json
        {
            "id": 1,
            "taskTypeId": 1,
            "title": "New Task",
            "description": "Description of the new task",
            "totalPrice": 123,
            "location": "San Francisco",
            "task_date": "2023-06-21 20:39:36",
            "user_id": 1,
            "tasker_id": 2,
            "createdAt": "2023-06-21 20:39:36",
            "updatedAt": "2023-06-21 20:39:36"
          }    
        ```

 * Error Response: Body validation error
     * Status Code: 400
     * Headers:
          * Content-Type: application/json
          * Body:
              ```json
              {
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                  "taskTypeId": "Task type is required",
                  "title": "Task title is required",
                  "description": "Task description is required",
                  "totalPrice": "Task total price is required",
                  "location": "Task location is required",
                  "task_date": "Task date is required",
                }
              }    
            ```

 ### Validations
 *Scheduling Conflicts: 
 When a new task is being created or an existing one is being updated, check if the tasker already has a task assigned at that specific date. 
 Query the tasks assigned to the tasker on the specified date. If any task exists, it's a scheduling conflict.

 *Maximum Task Limit: Whenever a new task is being created, check if the tasker already has 8 tasks assigned for any date. 
 If yes, then do not allow more tasks to be assigned.

 *Bookings/Tasks in the Past
 * also want to check that the proposed task date is in the future, not the past. 
 * limit the workload of a tasker, a tasker can have up to 8 tasks per day 

## GET "/api/tasks/current  get all tasks of current user
Tip: JOIN Tasks, TaskType, Users
 Will need joins. We want to return detailed task information, such as task date stored in the Tasks table as task_date, location(from Task table) and Tasker(from users table)
 * Returns all tasks of the current user.

 * Require Authentication:true
 * Request
     * Method: GET
     * URL: /api/tasks/current
     * Body: none
 * Successful Response
     * Status Code: 200
     * Headers:
         * Content-Type: application/json
     * Body:
        ```json
        {
          "Tasks": [
            {
              "id": 1,
              "taskTypeId": 2,
              "title": "Task title",
              "description": "Task description",
              "totalPrice": 100.00,
              "location": "123 Task Street",
              "task_date": "2023-06-22 10:30:00",
              "user_id": 1,
              "tasker_id": 2,
              "TaskType": {
                "id": 2,
                "type": "Cleaning"
              },
              "Tasker": {
                "id": 2,
                "firstName": "John",
                "lastName": "Doe",
                "username": "johndoe",
                "email": "johndoe@email.com",
                "isTasker": true
              }
            }
          ]
        }    
        ```

## Edit A Task
 Tip: Query only Task Table
 Update and return an existing task

 * Require Authentication:true
 * Request
     * Method: PUT
     * URL: /api/tasks/:taskId
     * Body: 
          ```json
          { 
              "taskTypeId": 2, 
              "title": "Updated Task",
              "description": "Updated description of the task", 
              "totalPrice": 150, 
              "location": "California", 
              "task_date": "2023-06-22", 
              "tasker_id": 3 
          }
          ```

 * Successful Response
     * Status Code: 200
     * Headers:
         * Content-Type: application/json
     * Body:
          ```json
          {
            "id": 1,
            "taskTypeId": 2,
            "title": "Updated Task",
            "description": "Updated description of the task",
            "totalPrice": 150,
            "location": "San Jose",
            "task_date": "2023-06-22",
            "user_id": 1,
            "tasker_id": 3,
            "createdAt": "2023-06-21 20:39:36",
            "updatedAt": "2023-06-22 20:39:36"
          }
          ```

 * Error Response: Body validation error
     * Status Code: 400
     * Headers:
          * Content-Type: application/json
          * Body:
          ```json
          {
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
              "taskTypeId": "Task type is required",
              "title": "Task title is required",
              "description": "Task description is required",
              "totalPrice": "Task total price is required",
              "location": "Task location is required",
              "task_date": "Task date is required",
              "tasker_id": "Tasker ID is required"
            }
          }
          ```

 ### Validations
 Scheduling Conflicts: 
 When a new task is being created or an existing one is being updated, check if the tasker already has a task assigned at that specific date. 
 Query the tasks assigned to the tasker on the specified date. If any task exists, it's a scheduling conflict.

 Maximum Task Limit: Whenever a new task is being created, check if the tasker already has 8 tasks assigned for any date. 
 If yes, then do not allow more tasks to be assigned.

 Bookings/Tasks in the Past
 * also want to check that the proposed task date is in the future, not the past. 
 * limit the workload of a tasker, a tasker can have up to 8 tasks per day 


Bonus Taking into ACCOUNT TIME! 



## Delete A Task
 Deletes a specific task.

 Require Authentication: true

 * Request
    * Method: DELETE
    * URL: /api/tasks/:taskId
    * Body: none

 * Successful Response

    * Status Code: 200
    * Headers:
        Content-Type: application/json
    * Body:
        ```json
        {
            "message": "Task successfully deleted."
        }
        ```

# Task Types 

## Get all TaskTypes
​
Returns all the taskTypes.
​
* Require Authentication: false
* Request
    * Method: GET
    * URL: /api/taskTypes
    * Body: none
​
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
​
        ```json
        {
            "TaskTypes":[
                {
                    "id": 1,
                    "type": "General Mounting",
                    "createdAt": "",
                    "updatedAt": "",
                }
            ]
        }
        ```


# Reviews 

## Get All Reviews of the Current User
Get all Reviews written by the current user.

Require Auth: true

* Request:
  * Method: Get
  * URL: /api/reviews/current
  * Body: none

* Successful Response

  * Status Code: 200

Headers:
  Content-Type: application/json

## Get all Reviews by a Tasker's id 
Returns all the reviews that belong to a tasker specified by id.

Require Authentication: false

* Request
  * Method: GET
  * URL: /api/taskers/:tasker_id/reviews
  * Body: none

* Successful Response

  * Status Code: 200
  * Headers:
  * Content-Type: application/json

## Create a Review for a Tasker based on the Tasker's id
Create and return a new review for a Tasker specified by id.

Require Authentication: true

* Request
  * Method: POST
  * URL: /api/taskers/:tasker_id/reviews
  * Headers:
      * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome tasker!",
      "stars": 5,
    }
    ```

## Edit a Review
Update and return an existing review.

Require Authentication: true

Require proper authorization: Review must belong to the current user

* Request
  * Method: PUT
  * URL: /api/reviews/:reviewId
  * Headers:
      * Content-Type: application/json

## Delete a Review 
Delete an existing review.

Require Authentication: true

Require proper authorization: Review must belong to the current user

* Request
  * Method: DELETE
  * URL: /api/reviews/:reviewId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json

# Tasker profile
A logged in tasker can manage their tasktypes in their tasker profile

## Get all tasktypes for the current tasker

Require Auth: true

Require proper authorization: Profile must belong to the current user/tasker

* Request
  * Method: GET
  * URL: /api/taskerTaskTypes/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json
      * Body:
  ​
          ```json
          {
            "TaskerTaskTypes": [
                {
                    "createdAt": "2023-06-26T18:00:34.700804",
                    "email": "demo@aa.io",
                    "firstName": "Demo",
                    "id": 1,
                    "isTasker": true,
                    "lastName": "Lition",
                    "location": "California",
                    "phone": 1234567890,
                    "reviews": [
                        {
                            "description": "Tasker was very 
                            professional and worked fast.  
                            Left a scuff mark on my wall.",
                            "rating": 4.0,
                            "tasker_id": 1,
                            "user_id": 2
                        },...
                    ],
                    "taskerTaskTypes": [
                        {
                            "createdAt": "2023-06-26T18:00:34.716441",
                            "hourlyRate": 45,
                            "taskType_id": 2,
                            "tasker_id": 1,
                            "updatedAt": "2023-06-26T18:00:34.716442"
                        },...
                    ],
                    "tasks": [
                        {
                            "createdAt": "2023-06-26T18:00:34.706451",
                            "description": "Stand in a looooong
                             line to get me some icecream any flavor",
                            "id": 1,
                            "location": "California",
                            "taskTypeId": 4,
                            "task_date": "2023-06-21",
                            "tasker_id": 2,
                            "title": "Get icecream from popular 
                            icecream place",
                            "totalPrice": 130.65,
                            "updatedAt": "2023-06-26T18:00:34.706454",
                            "user_id": 1
                        },...
                    ],
                    "updatedAt": "2023-06-26T18:00:34.700809",
                    "username": "demo"
                }
            ]
          }
          ```

## Add a new TaskType 
Tasker can select and add a new tasktype they would like to perform.  (This will create a new row in the TaskerTaskTypes table.)

Require Auth: true

* Request
  * Method: POST
  * URL: /api/taskerTaskTypes
  * Headers:
      * Content-Type: application/json
    * Body:
        ```json
        {
            "hourlyRate": 50,
            "tasker_id": 1,
            "taskType_id": 1
        }
        ```
  * Successful Response
     * Status Code: 200
     * Headers:
         * Content*Type: application/json
     * * Body:
        ```json
        {
            "createdAt": "2023-06-26T23:58:09.401365",
            "hourlyRate": 50,
            "taskType_id": 1,
            "tasker_id": 1,
            "updatedAt": "2023-06-26T23:58:09.401382"
        }
        ```
  * Error Response: Body validation error
     * Status Code: 400
     * Headers:
          * Content-Type: application/json
          * Body:
              ```json
              {
                "message": "Tasker is already assigned 
                 this tasktype",
                "statusCode": 400
              }    
            ```
​

## Edit a TaskType 
Returns a list of tasktypes the current logged in tasker is willing to perform and allows the current tasker to update their hourlyrate for any of the listed taskstypes (updates hourlyrate in TaskerTaskTypes table).

Require Authentication: true

* Request
  * Method: PUT
  * URL: /api/taskerTaskTypes/:tasker_id
  * Headers:
      * Content-Type: application/json

## Delete a TaskType
Delete a tasktype that the tasker is no longer willing to perform (deletes the tasktypeId from the TaskerTaskTypes table and should also remove the associated hourlyrate from the TaskerTaskTypes table).

Require Authentication: true

* Request
  * Method: DELETE
  * URL: /api/taskerTaskTypes/:taskType_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json


## Payments (***BONUS***)
Returns the payment details for task by taskId
Require Authentication: true (both the user and tasker can view)

* Request
  * Method: GET
  * URL: /api/payments/:task_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json






