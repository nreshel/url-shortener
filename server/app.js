const express = require('express');
const firebase = require('firebase');
const shortid = require('shortid');
const validurl = require('valid-url');
const admin = require('./db.js');
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());

app.get('/', (req, res) => {
  var posts = []
  firebase.database().ref(`/links/`).once('value', snap => {
    posts.push({
      ...snap.val()
    })
    res.send(posts)
  })
});

app.get('/:shortUrl', async (req, res) => {
  console.log(req.params.shortUrl)
  return firebase.database().ref('/links/').orderByChild('shortLink').equalTo(req.params.shortUrl).once("child_added", snapshot => {
      firebase.database().ref(`/links/${snapshot.key}`).update({
        clicks: snapshot.val().clicks + 1
      })
      res.redirect(snapshot.val().longLink)
    });
})

app.post('/', async (req, res) => {
  let link = await req.body;
  if(validurl.isUri(link.longLink)) {
    firebase.database().ref('/links/').push().set({
      longLink: req.body.longLink,
      shortLink: shortid.generate(),
      clicks: 0
    })
  }
  res.send(link)
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});