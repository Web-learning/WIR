<img src="https://github.com/user-attachments/assets/752dc7f1-7186-4559-8a1f-244485827d53" width="50%" height="50%">

## Table of contents
- [Introduction](#introduction)
- [Features](#features)
- [Schema](#schema) 
- [Notable](#notable)
- [Explanation](#explanation)

## Introduction
This is a simple two color banner that I put together for a non existent organisation. The banner runs on the top of the page and consists of a root folder, blocks, colours, gradients, buttons and hyperlinks. 
## Features
- The background colours in the banner are located in the root folder. Changing the primary and secondary colours changes the whole banner
- The banner has three navigation buttons. These colours are also based on the root folder.
## Schema
```
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
```
## Notable
``` html
<horizontalnav>
      <!-- Always visible items in the nav bar -->
      <h1>
        Wikipedian
        <span>Alliance</span>
      </h1>

      <!-- The hamburger menu -->
      <label for="menu" tabindex="0">    
        <div class="patty">
        Before<br>During<br>After
        </div>
      </label>
      <input id="menu" type="checkbox" />
      <!-- The collapsable menu -->
      <ul>
        <li><a href="">Before</a></li>
        <li><a href="">During </a></li>
        <li><a href="">After</a></li>
      </ul>
    </horizontalnav>
```
---
__Explanation :)__

- __[Weblearning](https://weblearning.co.za/blog/4-months-into-wir/)__ - How to create a banner
