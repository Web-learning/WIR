/* =========================
:root
 │
 ├── Defines your primary and secondary colours
 ├── Defines your shadow
 └── Defines the background image
          │
       .hero
          │
          ├── displays the background
          ├── centres it
          ├── makes it cover the area
          └── applies the sepia/saturation effect

========================= */

:root {
  --primary: #0818E0;
  --secondary:#E81020;
  --shadow: 0 4px 15px rgba(83, 97, 116, 0.5);
  --globe: #ccc;
  --dark: #BD3417; 
  --cream: #DF7B61;
  --white: #ffffff;
  --bg: linear-gradient( 45deg, var(--primary) 0%, var(--secondary) 100%);
  --bgimage: linear-gradient(
          110deg,
          rgba(224, 85, 45, 0.1) 5%,
          rgba(224, 85, 45, 0.4) 20%,
          rgba(224, 85, 45, 0.9) 90%
        ),      
url("https://upload.wikimedia.org/wikipedia/commons/0/03/Wikify_Conference_Cover.jpg");

}

/*Horizontal Navigation */
horizontalnav {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  padding: 1rem 2rem;
  background: var(--bg);
  box-shadow: var(--shadow);
  z-index: 10;
}

horizontalnav h1 {
  font-size: clamp(1.3rem, 3vw, 2rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--white);
}

horizontalnav h1 span {
  display: inline-block;
  color: var(--secondary);
  font-family: Georgia, "Times New Roman", serif;
  font-style: italic;
}

/* Hamburger */
horizontalnav label {
  display: none;
  cursor: pointer;
  font-size: 1.7rem;
  padding: 0.3rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

#menu {
  display: none;
}

/* Navigation links */

horizontalnav ul {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
}

horizontalnav a {
  display: block;
  padding: 0.65rem 1rem;
  color: var(--white);
  text-decoration: none;
  font-weight: 600;
  border-radius: 6px;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

horizontalnav a:hover,
nav a:focus {
  background: var(--secondary);
  color: var(--dark);
  transform: translateY(-2px);
  outline: none;
}

/* Mobile navigation */

@media (max-width: 700px) {
  horizontalnav {
    flex-wrap: wrap;
    padding: 1rem 1.25rem;
  }

  horizontalnav label {
    display: block;
  }

  horizontalnav ul {
    display: none;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    padding-top: 1rem;
    gap: 0.25rem;
  }

  horizontalnav ul li {
    width: 52%;
  }

  #menu:checked ~ ul {
    display: flex;
  }
  
}

/* Small screens */

@media (max-width: 400px) {
  horizontalnav h1 {
    max-width: 75%;
    line-height: 1.2;
  }

  horizontalnav h1 span {
    display: block;
  }
}

/* -------------------------
   PLAQUE SHAPE
-------------------------- */

.patty {
  position: absolute;
  top: 28px;
  right: 28px;
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background:var(--secondary);
  border: 5px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 11px;
  font-weight: bold;
  line-height: 1.3;
  box-shadow:
    0 6px 16px rgba(0,0,0,0.3);
}



.presentation {
  width: 100vw;
  height: 100vh;
  background: var(--bg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}



    .content {
      position: relative;
      z-index: 5;
      width: 62%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 8% 6%;
    }


/* =========================
Typography
========================= */
    .eyebrow {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 28px;
      color:var(--white);
      font-size: clamp(10px, 1vw, 15px);
      font-weight: 700;
      letter-spacing: 0.28em;
      text-transform: uppercase;
    }

    .eyebrow::before {
      content: "";
      width: 42px;
      height: 2px;
      background:var(--white);;
        }



    h1 a {
      max-width: 850px;
      font-family: "DM Serif Display", Georgia, serif;
      font-size: clamp(48px, 7vw, 110px);
      line-height: 0.94;
      font-weight: 400;
      letter-spacing: -0.025em;
      color: var(--primary);
      text-decoration: none;
    }



h1 a:hover {
      color: var(--secondary);
      text-decoration: none;
      font-weight: 800;

}


    h1 span {
      display: block;
      color: var(--secondary);
    }

    .subtitle {
      max-width: 560px;
      margin-top: 34px;
      font-size: clamp(12px, 1.2vw, 18px);
      line-height: 1.7;
      color: var(--secondary);
      font-weight: 800;
    }

    .bottom-line {
  position: absolute;
  right: 6%;
  bottom: 7%;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 10px 16px;
  color: var(--white);
  background-color: var(--primary);
  font-size: clamp(12px, 0.8vw, 13px);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
    .bottom-line .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--white);
    }


/* =========================
Visual Elements
========================= */

 
    .globe {
      position: absolute;
      width: 42%;
      aspect-ratio: 1;
      right: -12%;
      top: -25%;
      border-radius: 50%;
      background: var(--globe);
      opacity: 0.85;
      box-shadow: var(--shadow);
 
    }

/* Large decorative letter */
    .watermark {
      position: absolute;
      z-index: 2;
      right: -8%;
      top: -8%;
      font-family: "DM Serif Display", Georgia, serif;
      font-size: clamp(180px, 30vw, 500px);
      line-height: 1;
      color: var(--primary); 
      user-select: none;
    }


    @media (max-width: 700px) {
      .heritage-image {
        inset: 0;
        opacity: 0.22;
      }

      .content {
        width: 90%;
        padding: 8%;
      }

    }

