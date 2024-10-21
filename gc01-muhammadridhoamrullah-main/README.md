[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15153276&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

List of available endpoints:

<!-- --LOGIN DAN REGISTER -->

post /register
post /login

<!-- --LOGIN DAN REGISTER -->

<!-- --PUB -->

get /cuisines/pub
get /cuisines/:id/pub

<!-- --PUB -->

<!-- --CUISINES -->

post /cuisines
get /cuisines

get /cuisines/:id
put /cuisines/:id
delete /cuisines/:id

<!-- --CUISINES -->

<!-- --CATEGORIES -->

post /categories
get /categories
put /categories/:id
delete /categories/:id

<!-- --CATEGORIES -->

<!-- --UPLOAD IMAGE -->

patch /cuisineImage/:id

<!-- --UPLOAD IMAGE -->

1. POST /register

Request:

headers:

{
"Authorization": "Bearer ${accesToken}"
}

body:

{
"email": "ridhoamrullah99@gmail.com",
"password": "1234567890",
"phoneNumber: "085363508580",
"address": "Jalan Pemuda",
"username": "ridhoamrullah"
}

Response: (201 - Created)

{
"id": 1,
"email": "ridhoamrullah99@gmail.com",
"phoneNumber: "085363508580",
"address": "Jalan Pemuda",
"username": "ridhoamrullah",
"createdAt": "2024-06-01T01:33:15.785Z",
"updatedAt": "2024-06-01T01:33:15.785Z"
}

Response( 400 - Bad Request)

{
"message":
"Email harus diisi!"
}
OR
{
"message":
"Email harus valid!"
}
OR
{
"message":
"Email sudah terdaftar!"
}
OR
{
"message":
"Password harus diisi!"
}
OR
{
"message":
"Minamal 5 karakter"
}
OR
{
"message":
"Phone Number harus diisi!"
}
OR
{
"message":
"Address harus diisi!"
}

Response (401 - Unauthorized)

{
"message": "INVALID USERNAME/PASSWORD, PLEASE LOGIN FIRST"
}

Response(403 - Forbidden)

{
"message": "YOU HAVE NO ACCESS"
}

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}

2.POST /login

Request:

body:

{
"email": "ridhoamrullah99@gmail.com",
"password": "1234567890"
}

Response: (200 - OK)

{
"accest_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3MjA1ODIyfQ.pHMAnjGnUZBKZvUDAmEipO_W7-EaGQXIozX-CdMfLi4"
}

Response(400 - Bad Request)

{
"message: "EMAIL OR PASSWORD IS REQUIRED"
}

Response(401 - UNAUTHORIZED)

{
"message": "INVALID USERNAME/PASSWORD, PLEASE LOGIN FIRST"
}

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}

3.GET /cuisines/pub

Response: (200 - OK)

[
{
"id": 1,
"name": "Ayam Gulai",
"description": "Ayam dikasih gulai",
"price": 15000,
"imgUrl": "https://i.ytimg.com/vi/qSUb_JIQGW0/maxresdefault.jpg",
"categoryId": 1,
"authorId": 1,
"createdAt": "2024-05-28T09:44:52.527Z",
"updatedAt": "2024-05-28T09:44:52.527Z"
},
{
"id": 3,
"name": "Rendang",
"description": "Rendang ya rendang",
"price": 12000,
"imgUrl": "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
"categoryId": 1,
"authorId": 1,
"createdAt": "2024-05-28T10:12:11.942Z",
"updatedAt": "2024-05-28T10:12:11.942Z"
},
dst ...
]

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}

4.GET /cuisines/:id/pub

Response: (200 - OK)

[
{
"id": 1,
"name": "Ayam Gulai",
"description": "Ayam dikasih gulai",
"price": 15000,
"imgUrl": "https://i.ytimg.com/vi/qSUb_JIQGW0/maxresdefault.jpg",
"categoryId": 1,
"authorId": 1,
"createdAt": "2024-05-28T09:44:52.527Z",
"updatedAt": "2024-05-28T09:44:52.527Z"
}
]

Response(404 - DATA NOT FOUND)

{
"message": "Error not found"
}

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}

5.POST /cuisines

Request:

headers:

{
"Authorization": "Bearer ${accesToken}"
}

body:

{
"name" : "Rendang",
"description": "Rendang padang",
"price": 25000,
"imgUrl": "gambarrendang.com",
"categoryId": 1,
"authorId": 1
}

Response( 400 - Bad Request)

{
"message":
"name harus diisi!"
}
OR
{
"message":
"description harus diisi!"
}
OR
{
"message":
"price harus diisi!"
}
OR
{
"message":
"imgUrl harus diisi!"
}
OR
{
"message":
"categoryId 5 karakter"
}
OR
{
"message":
"authorId harus diisi!"
}

Response(403 - Forbidden)

{
"message": "YOU HAVE NO ACCESS"
}

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}

6.GET /cuisines

Request:

headers:

{
"Authorization": "Bearer ${accesToken}"
}

Response(200 - OK)

[
{
"id": 1,
"name": "Ayam Gulai",
"description": "Ayam dikasih gulai",
"price": 15000,
"imgUrl": "https://i.ytimg.com/vi/qSUb_JIQGW0/maxresdefault.jpg",
"categoryId": 1,
"authorId": 1,
"createdAt": "2024-05-28T09:44:52.527Z",
"updatedAt": "2024-05-28T09:44:52.527Z"
},
{
"id": 3,
"name": "Rendang",
"description": "Rendang ya rendang",
"price": 12000,
"imgUrl": "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
"categoryId": 1,
"authorId": 1,
"createdAt": "2024-05-28T10:12:11.942Z",
"updatedAt": "2024-05-28T10:12:11.942Z"
},
dst ...
]

Response(403 - Forbidden)

{
"message": "YOU HAVE NO ACCESS"
}

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}

7.GET /cuisines/:id

Request:

headers:

{
"Authorization": "Bearer ${accesToken}"
}

Response: (200 - OK)

[
{
"id": 1,
"name": "Ayam Gulai",
"description": "Ayam dikasih gulai",
"price": 15000,
"imgUrl": "https://i.ytimg.com/vi/qSUb_JIQGW0/maxresdefault.jpg",
"categoryId": 1,
"authorId": 1,
"createdAt": "2024-05-28T09:44:52.527Z",
"updatedAt": "2024-05-28T09:44:52.527Z"
}
]

Response(403 - Forbidden)

{
"message": "YOU HAVE NO ACCESS"
}

Response(404 - DATA NOT FOUND)

{
"message": "Error not found"
}

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}

8.PUT /cuisines/:id

Request:

headers:

{
"Authorization": "Bearer ${accesToken}"
}

Response(200 - OK)

{
"name" : "Rendang Daging",
"description": "Rendang padang Asli",
"price": 25000,
"imgUrl": "gambarrendang.com",
"categoryId": 1,
"authorId": 1
}

Response( 400 - Bad Request)

{
"message":
"name harus diisi!"
}
OR
{
"message":
"description harus diisi!"
}
OR
{
"message":
"price harus diisi!"
}
OR
{
"message":
"imgUrl harus diisi!"
}
OR
{
"message":
"categoryId 5 karakter"
}
OR
{
"message":
"authorId harus diisi!"
}

Response(403 - Forbidden)

{
"message": "YOU HAVE NO ACCESS"
}

Response(404 - DATA NOT FOUND)

{
"message": "Error not found"
}

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}

9.DELETE /cuisines/:id

Request:

headers:

{
"Authorization": "Bearer ${accesToken}"
}

Response(200 - OK)

{
message: `Rendang daging success to delete`
}

Response(403 - Forbidden)

{
"message": "YOU HAVE NO ACCESS"
}

Response(404 - DATA NOT FOUND)

{
"message": "Error not found"
}

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}

10.POST /categories

Request:

body:

{
"name": "Gulai"
}

Response( 400 - Bad Request)

{
"message":
"name harus diisi!"
}

Response(403 - Forbidden)

{
"message": "YOU HAVE NO ACCESS"
}

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}

11.GET /categories

Request:

headers:

{
"Authorization": "Bearer ${accesToken}"
}

Response(200 - OK)
[
{
"name": "Gulai",
"name": "Balado"
}
]

Response(403 - Forbidden)

{
"message": "YOU HAVE NO ACCESS"
}

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}

12.PUT /categories/:id

Request:

headers:

{
"Authorization": "Bearer ${accesToken}"
}

Response(200 - OK)

{
"name" : "Balado Extra"
}

Response( 400 - Bad Request)

{
"message":
"name harus diisi!"
}

Response(403 - Forbidden)

{
"message": "YOU HAVE NO ACCESS"
}

Response(404 - DATA NOT FOUND)

{
"message": "Error not found"
}

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}

13.DELETE /categories/:id

Request:

headers:

{
"Authorization": "Bearer ${accesToken}"
}

Response(200 - OK)

{
message: `Gulai success to delete`
}

Response(403 - Forbidden)

{
"message": "YOU HAVE NO ACCESS"
}

Response(404 - DATA NOT FOUND)

{
"message": "Error not found"
}

Response(500 - Internal Server Error)

{
"message": "Internal Server Error"
}
