# Overview

This app, called the Amiibo Collector Suite is a tool for searching, filtering, and collecting well known character figures. The project is built using React and JavaScript and calls the Amiibo REST API, located at https://github.com/N3evin/AmiiboAPI.

# Features

## Current Features

The amiibo are filterable by name and type (of which there are 3: figure, card, and yarn). Users can type the name of the amiibo they want to search for and filter the results by type using a dropdown. The results show in inidvidual components that show the name, image and release date of the amiibo. In addition, users can order the results by release date to see the newest released amiibo towards the top of the page.

## Features in Progress

Currently, I'm working on a feature where users can check a checkbox next to a result to add it to their collection. This will allow collectors to keep track of what amiibo they own through the app.

# Challenges

In the app, one future feature is the ability for a user to add a figure to their "collection". This is done by checking a box next to the respective figure. One challenge I had was moving the checked state from the Card.js component to the app component to "lift state up" so future components could see the which cards were checked and which weren't.
