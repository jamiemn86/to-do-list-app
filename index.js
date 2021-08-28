// To do list CRUD application exercise briefing:
// # To Do List Application
// DONE
// # Home Page DONE
// There should be a form at the bottom of the home page DONE
// that takes a "task" input and submits it to "/create-to-do-list-item" DONE
// List to do list items that have been created. DONE
// Every to do list item should have a "delete" button next to it DONE

// that when pressed deletes the item and brings the user
// back to the home page.
// # Extra
// Allow the user to update any to do list item.

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const Publication = require('./models/publication');

const app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (request, response, next) => {
  Publication.find({})
    .then((publication) => {
      response.render('home', { publication });
      console.log(publication);
    })
    .catch((error) => {
      next(error);
    });
});

app.post('/create-to-do-list-item', (request, response, next) => {
  const title = request.body.title;
  const task = request.body.task;
  // const { title, url } = request.body;
  Publication.create({
    title,
    task
  })
    .then((publication) => {
      response.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(3000);
  console.log('Listening on port 3000 :)');
});
