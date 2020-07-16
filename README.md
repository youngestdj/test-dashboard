# test-dashboard

### Docs

#### Register user

`POST /api/user/signup`

##### Request body

```
{
	"email": "user@email.com",
	"firstname": "Just",
	"lastname": "doit"
}
```

##### Response

```
{
  "message": "You have signed up successfully.",
  "user": {
    "id": 1,
    "firstname": "Just",
    "lastname": "doit",
    "email": "lol@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0Nzg0MDI2LCJleHAiOjE1OTQ4NzA0MjZ9.Si_8a1gKrkkdN966e60xy6N-2yEYluGVnsyziy0gGoE"
}
```

#### Take test

`POST api/test`

##### Request headers

`Authorization`: `token`

##### Request body

```
{
	"answer": "correct"
}
```

##### Response

```
{
  "message": "All tests passed.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTQ4NTA0NDcsImV4cCI6MTU5NDkzNjg0N30.RSo0qN6s1GzPx3qUJA5J9iDzfPGqfpP8Nmvhh5J9whU"
}
```

#### Edit profile

`PATCH api/editprofile`

##### Request headers

`Authorization`: `token`
##### Request body
`password`, String
`address`, String
`gender` String (male|female|other)
`birthCert` file (jpg|jpeg|png)

##### Response
```
{
  "message": "Profile updated successfully!",
  "user": {
    "address": "Funny str",
    "gender": "male"
  }
}
```
