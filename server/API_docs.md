# Share-a-ride App Server

Share-a-ride App is an application to share and book rides. This app has :

- RESTful endpoint for admins, users, and rides CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

&nbsp;

## Rides

### GET /rides

> Get all rides

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": 1,
    "startLocation": "Jakarta",
    "destination": "Bandung",
    "departureTime": "2023-05-10T10:00:00.000Z",
    "arrivalTime": "2023-05-10T13:00:00.000Z",
    "price": 75000,
    "seats": 3,
    "createdBy": 1,
    "VehicleId": 1,
    "createdAt": "2023-05-06T09:20:14.194Z",
    "updatedAt": "2023-05-06T09:20:14.194Z"
  },
  {
    "id": <ride id>,
    "startLocation": <ride origin>,
    "destination": <ride destination>,
    "departureTime": <ride departure time>,
    "arrivalTime": <ride estimated arrival time>,
    "price": <ride price>,
    "seats": <ride seats left>,
    "createdBy": <creator (user) id>,
    "VehicleId": <creator's vehicle id>,
    "createdAt": "2023-05-06T09:20:14.194Z",
    "updatedAt": "2023-05-06T09:20:14.194Z"
  }
]
```

---

### GET /rides/:id

> Get ride by id

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
    "id": <ride id>,
    "startLocation": <ride origin>,
    "destination": <ride destination>,
    "departureTime": <ride departure time>,
    "arrivalTime": <ride estimated arrival time>,
    "price": <ride price>,
    "seats": <ride seats left>,
    "createdBy": <creator (user) id>,
    "VehicleId": <creator's vehicle id>,
    "createdAt": "2023-05-06T09:20:14.194Z",
    "updatedAt": "2023-05-06T09:20:14.194Z",
    "UserRides": [
      {
        "id": <userRide id>,
        "UserId": <user id>,
        "RideId": <ride id>,
        "status": <userRide status>
      },
    ]
}
```

_Response (404 - Not Found)_

```
{
  "message": "Data not found"
}
```

---

### POST /rides

> Create new ride

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "startLocation": "<ride origin>",
  "destination": "<ride destination>",
  "departureTime": "<ride departure time>",
  "arrivalTime": "<ride estimated arrival time>",
  "price": "<ride price per passenger>",
  "seats": "<number of seats available>",
}
```

_Response (201 - Created)_

```
{
  message: "New ride with <ride id> created"
}
```

_Response (400 - Bad Request)_

```
{
  "message": <validation error> || "You need to register a vehicle to create ride"
}
```

---

### DELETE /rides/:id

> Delete ride with "id"

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  message: "Ride with id <ride id> deleted"
}
```

_Response (404 - Not Found)_

```
{
  "message": "Data not found"
}
```

---

### PATCH /rides/:id

> Edit user ride payment status with userRideId "id" //deprecated

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
    <user ride id>,
    [
        {
            "id": <user ride id>,
            "UserId": <user id>,
            "RideId": <ride id>,
            "paymentStatus": "paid",
            "createdAt": "2023-05-06T09:20:14.203Z",
            "updatedAt": "2023-05-07T14:55:02.724Z"
        }
    ]
]
```

---

### PUT /rides/:id

> Edit ride with "id"

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "startLocation": "<ride origin>",
  "destination": "<ride destination>",
  "departureTime": "<ride departure time>",
  "arrivalTime": "<ride estimated arrival time>",
  "price": "<ride price per passenger>",
  "seats": "<number of seats available>",
}
```

_Response (200 - OK)_

```
{
  message: "Ride with id <ride id> updated"
}
```

_Response (400 - Bad Request)_

```
{
  "message": <validation error>
}
```

_Response (404 - Not Found)_

```
{
  "message": "Data not found"
}
```

---

### POST /rides/:generate-midtrans-token

> Generate midtrans token and url for payment purposes and confirm booking

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "token": "<midtrans token>",
  "redirect_url": "<midtrans url>"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "You are already a booked"
}
```

---

### POST /rides/order/:id

> Create new order for ride with ride id "id"

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (201 - Created)_

```
{
  message: "Order received"
}
```

_Response (404 - Not Found)_

```
{
  "message": "Data not found"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "You have ordered this ride" || "The ride is fully booked"
}
```

---

### DELETE /rides/order/:id

> Cancel order with "id"

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  message: "Order is cancelled"
}
```

_Response (404 - Not Found)_

```
{
  "message": "Data not found"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "Forbidden"
}
```

---

&nbsp;

## Users

### POST /users/register

> Register new User

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": "<user name>",
  "email": "<user email>",
  "password": "<user password>",
  "phoneNumber": "<user phone number>",
  "photo": "<user photo>",
  "idCardImg": "<user id card photo>",
}
```

_Response (201 - Created)_

```
{
  message: "User <name> has succesfully registered"
}
```

---

### POST /users/login

> User login

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<user email>",
  "password": "<user password>",
}
```

_Response (200 - OK)_

```
{
  "access_token": "<access_token>",
  "name": "<user username>",
  "email": "<user email>",
  "phoneNumber": "<user phone number>",
  "photo": "<user photo>",
  "rating": "<user rating>"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Email is required" || "Password is required"
}
```

_Response (401 - Unauthorized)_

```
{
  "message": "Email / Password is wrong"
}
```

---

## GET /users/rides

> Get logged in user's rides

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": 2,
    "UserId": 1,
    "RideId": 1,
    "status": "pending",
    "createdAt": "2023-05-06T09:20:14.203Z",
    "updatedAt": "2023-05-06T09:20:14.203Z",
    "Ride": {
      "id": 1,
      "startLocation": "Jakarta",
      "destination": "Bandung",
      "departureTime": "2023-05-10T10:00:00.000Z",
      "arrivalTime": "2023-05-10T13:00:00.000Z",
      "price": 75000,
      "seats": 3,
      "createdBy": 1,
      "VehicleId": 1,
      "createdAt": "2023-05-06T09:20:14.194Z",
      "updatedAt": "2023-05-06T09:20:14.194Z"
    }
  },
  {
    "id": "<user ride id>",
    "UserId": "<current user id>",
    "RideId": "<ride id>",
    "status": "<ride payment status>",
    "createdAt": "2023-05-06T09:20:14.203Z",
    "updatedAt": "2023-05-06T09:20:14.203Z",
    "Ride": {
      "id": "<ride id>",
      "startLocation": "<ride origin>",
      "destination": "<ride destination>",
      "departureTime": "<ride departure time>",
      "arrivalTime": "<ride estimated arrival time>",
      "price": <ride price>,
      "seats": <number of seats available>,
      "createdBy": <creator (user) id>,
      "VehicleId": <creator (user)'s vehicle id'>,
      "createdAt": "2023-05-06T09:20:14.194Z",
      "updatedAt": "2023-05-06T09:20:14.194Z"
    }
  },
]
```

---

### PATCH /users/rate/:id

> Rate another user with "id"

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "rating": "<inputted rating>",
}
```

_Response (200 - OK)_

```
{
  "message": "Rated <user name> with <rating> successfully",
}
```

_Response (404 - Not Found)_

```
{
  "message": "Data not found"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "You cannot rate yourself" || "Rating must be between 1-5"
}
```

---

&nbsp;

## Admins

### POST /admin/register

> Register new Admin

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": "<admin name>",
  "email": "<admin email>",
  "password": "<admin password>"
}
```

_Response (201 - Created)_

```
{
  message: "Admin <name> has succesfully registered"
}
```

---

### POST /admin/login

> Admin login

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<admin email>",
  "password": "<admin password>",
}
```

_Response (200 - OK)_

```
{
  "access_token": "<admin access_token>"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Email is required" || "Password is required"
}
```

_Response (401 - Unauthorized)_

```
{
  "message": "Email / Password is wrong"
}
```

---

### GET /admin/users

> Get all users

_Request Header_

```
{
  "access_token": "<admin access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": 1,
    "name": "Andi Susanto",
    "email": "andisusanto@contoh.com",
    "phoneNumber": "555-1234",
    "photo": "https://contoh.com/andisusanto.png",
    "idCardImg": "https://contoh.com/andisusanto-id.png",
    "rating": 5,
    "status": "unverified",
    "createdAt": "2023-05-06T09:20:14.053Z",
    "updatedAt": "2023-05-06T09:20:14.053Z"
  },
  {
    "id": <user id>,
    "name": "<user name>",
    "email": "<user email>",
    "phoneNumber": "<user phone number>",
    "photo": "<user photo>",
    "idCardImg": "<user id card image>",
    "rating": <user rating>,
    "status": "<user status>",
    "createdAt": "2023-05-06T09:20:14.053Z",
    "updatedAt": "2023-05-06T09:20:14.053Z"
  }
]
```

---

### GET /admin/users/:id

> Get user by "id"

_Request Header_

```
{
  "access_token": "<admin access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
    "id": <user id>,
    "name": "<user name>",
    "email": "<user email>",
    "phoneNumber": "<user phone number>",
    "photo": "<user photo>",
    "idCardImg": "<user id card image>",
    "rating": <user rating>,
    "status": "<user status>",
    "createdAt": "2023-05-06T09:20:14.053Z",
    "updatedAt": "2023-05-06T09:20:14.053Z"
  }
```

_Response (404 - Not Found)_

```
{
  "message": "Data not found"
}
```

---

### PATCH /admin/users/:userId

> Change status of user with <userId>

_Request Header_

```
{
  "access_token": "<admin access token>"
}
```

_Request Body_

```
{
  "status": "<new status>"
}
```

_Response (200 - OK)_

```
{
    "message": "Status of user with id <user id> has been changed to <status>"
  }
```

_Response (404 - Not Found)_

```
{
  "message": "Data not found"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "No changes has been made"
}
```

---

### GET /admin/rides

> Get all rides for admin

_Request Header_

```
{
  "access_token": "<admin access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": 1,
    "startLocation": "Jakarta",
    "destination": "Bandung",
    "departureTime": "2023-05-10T10:00:00.000Z",
    "arrivalTime": "2023-05-10T13:00:00.000Z",
    "price": 75000,
    "seats": 3,
    "createdBy": 1,
    "VehicleId": 1,
    "createdAt": "2023-05-06T09:20:14.194Z",
    "updatedAt": "2023-05-06T09:20:14.194Z"
  },
  {
    "id": <ride id>,
    "startLocation": <ride origin>,
    "destination": <ride destination>,
    "departureTime": <ride departure time>,
    "arrivalTime": <ride estimated arrival time>,
    "price": <ride price>,
    "seats": <ride seats left>,
    "createdBy": <creator (user) id>,
    "VehicleId": <creator's vehicle id>,
    "createdAt": "2023-05-06T09:20:14.194Z",
    "updatedAt": "2023-05-06T09:20:14.194Z"
  }
]
```

---

### DELETE /admin/rides/:id

> Delete ride with "id"

_Request Header_

```
{
  "access_token": "<admin access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  message: "Ride with id <ride id> deleted"
}
```

_Response (404 - Not Found)_

```
{
  "message": "Data not found"
}
```

---

## Global Errors

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "Forbidden"
}
```

_Response (400 - Bad request)_

```
{
  "message": "Access Token Missing"
}
```
