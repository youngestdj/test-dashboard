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
