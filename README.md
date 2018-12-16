# IronRoom

## What is it?

IronRoom is an online escape room. You first create a team and then you join enter some rooms. Each room has a tech problem and when you solve it, you go to next room.

You can visit an online version of the project here: https://ironroom.herokuapp.com



## How to execute the project?

To initiliase the project on your computer
```
$ git clone https://github.com/ironhack-berlin-2018-october-ft/ironroom.git
$ cd ironroom
$ npm install
```

To start the project
```
$ npm run dev
```

## How to code a new room?

Let's say you would like to add an extra room "`/rooms/carrot`" where the user has to send a "`orange`" in an input field.

First, you have to update the file `data/rooms.json` to insert one object.

**`data/rooms.json`**
```json
[
  // ...
  {
    "url": "/rooms/carrot",
    "hints": [
      {
        "timeInMin": 2,
        "text": "What is the color of a carrot?"
      },
      {
        "timeInMin": 5,
        "text": "Have you tried 'orange'"
      }
    ]
  }
]
```

Then, you can create some routes in `routes/rooms.js`. When the user gives the right answer, you can rely on the middleware `redirectToNextRoom` that redirects to the next room.

**`routes/rooms.js`**

```js
// ...
router.get('/carrot', (req, res, next) => {
  res.render('rooms/carrot')
})

router.post('/carrot', (req, res, next) => {
  let color = (req.body.color + "").toLowerCase()
  if (color !== 'orange')
    res.render('rooms/carrot')
  else {
    redirectToNextRoom(req, res, next)
  }
})
```

Finally, don't forget to add the views.

**`views/rooms/carrot.hbs`**

```hbs
My color is:
<form method="post">
  <input type="text" name="color">
</form>
```