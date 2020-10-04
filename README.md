# Overview

This app, called the Amiibo Collector Suite, is a tool for searching, filtering, and collecting well known character figures. This JavaScript project is built on React and calls the Amiibo REST API, located at https://github.com/N3evin/AmiiboAPI.

The link to see the project is here (not mobile optimized yet): https://dakshin22.github.io/amiibo-suite/

# Features

Note: This app is still a work in progress. It will be more polished and will have additional features in the future.

## Current Features

The amiibo are filterable by name and type (of which there are 3: figure, card, and yarn). Users can type the name of the amiibo they want to search for and filter the results by type using a dropdown. The results show in inidvidual components, called `Cards` (`Card.js`), that show the name, image and release date of the amiibo. 

In addition, users can order the results by release date to see the newest released amiibo towards the top of the page.

Users can also see a circular progress bar in the app, which shows the user how much amiibo (out of the total number of amiibo) that they have collected 

The app now allows users to add items to their "collection", which provides functionality to keep track of which items they have collected. You can check/uncheck items to add/remove them to your collection.

## Features in Progress

The main focus currently is mobile optimization.

# Challenges

In the app, one future feature is the ability for a user to add a figure to their "collection". This is done by checking a box next to the respective figure. One challenge I had was moving the checked state from the `Card.js` component to the app component to "lift state up" so future components could see which cards were checked and which weren't.
