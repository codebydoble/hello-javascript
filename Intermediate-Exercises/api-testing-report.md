# Exercise 10

| #   | Method | Endpoint   | Status | Result  | Observation                              |
| --- | ------ | ---------- | -----: | ------- | ---------------------------------------- |
| 1   | GET    | `/posts`   |    200 | Success | Returned an array with posts object list |
| 2   | GET    | `/posts/1` |    200 | Success | Return an object with post 1             |
| 3   | POST   | `/posts`   |    201 | Success | Return new post created                  |
| 4   | PUT    | `/posts/1` |    200 | Success | Return complete post updated             |
| 5   | PATCH  | `/posts/1` |    200 | Success | Return field updated                     |
| 6   | DELETE | `/posts/1` |    200 | Success | Return boolean true                      |
| 7   | GET    | `/invalid` |    404 | Error   | Resource not found                       |

## Response test 1

Very large response only some objects shared

Headers
{
Accept:"/"
"User-Agent": "Thunder Client (https://www.thunderclient.com)"
}

Response
[
{
"userId": 1,
"id": 1,
"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
},
{
"userId": 1,
"id": 2,
"title": "qui est esse",
"body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
}, ....
]

## Response test 2

Headers
{
Accept:"/"
"User-Agent": "Thunder Client (https://www.thunderclient.com)"
}

Response

{
"userId": 1,
"id": 1,
"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}

## Response test 3

Headers

{
"Content-Type": "application/json",
Accept: "application/json",
"User-Agent": "Thunder Client (https://www.thunderclient.com)"
}

Body
{
"userId": 1,
"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}

Response
{
"userId": 1,
"id": 101,
"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}

## Response test 4

Headers

{
"Content-Type": "application/json",
Accept: "application/json",
"User-Agent": "Thunder Client (https://www.thunderclient.com)"
}

Body
{
title: "Updated title",
body: "Updated complete body",
userId: 1,
}

Response
{
id: 101,
title: "Updated title",
body: "Updated complete body",
userId: 1,
}

## Response test 5

Headers

{
"Content-Type": "application/json",
}

Body
{
title: "Only the title changed",
}

Response
{
title: "Only the title changed",
}

## Response test 6

Method: Delete

Headers
No

Body
No

## Response test 7

Method: GET

Headers
{
Accept:"/"
"User-Agent": "Thunder Client (https://www.thunderclient.com)"
}

Body
No

Response

404 Error
