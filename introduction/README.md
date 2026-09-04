<img src="" width="50%" height="50%">

## Table of contents
- [Introduction](#introduction) to web based slideshows
- [Features](#features)

## Introduction
These slideshows are intended to show how navigation, message and the presentation layers can be separated from each other. Just like a website has the HTML, CSS and javascript in its structure.  
<html>
<head></head>
<body></body>
</html>
and you only have to add a 
* a style sheet to the HEAD to give the document a look and feel  
* a div with an ID to the body so that you can play with a dom  
* javascript right at the at the end of the body tag to invoke the javascript  
This means that a presentation be quickly made in text and then the other parts 
## Features

A slideshow needs to move forwards and backwards and previous and next buttons make that movement possible 
        ←       1 / 6       →
     Previous             Next

Each slide looks slightly different and markup or markdown controls the presentation 
* COVER >	Opening slide
* AGENDA > 	Presentation contents
* TWO COLUMN >	Side-by-side layouts
* STATISTICS	> cards
* TIMELEINE >	Chronological roadmap
* TEAM >	Team profiles
* THEME > Categories
* QUOTE >  Testimonials/quotes
* CONCLUSION > closing	and credit slide

Content can lolocated in the HTML or javascript. And it can also be in an external file 

## Code
┌──────────────┐
│ OPEN HTML    │
┌──────────────┐
│ OPEN HEAD    │
<link rel="stylesheet" href="./style.css">
│ CLOSE HEAD   │
└──────────────┘
┌──────────────┐
│ OPEN BODY    │
<div id="presentation"></div>
<script  src="./script.js"></script>
│ CLOSE BODY   │
└──────────────┘
│ CLOSE HTML   │
└──────────────┘

__Explanation :)__

To be added
