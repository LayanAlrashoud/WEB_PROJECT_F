# University Guide Website

## Overview

This project is a website that offers detailed information about three universities located in Riyadh city. It provides insights into the available majors, cafes and restaurants, and student clubs to help prospective students make informed choices about which colleges they want to attend.

## Links
- **Flowchart**: [Link to Flowchart](#)
- **Presentation**:https://www.canva.com/design/DAGGFNbphGo/ypFqstIFIaWnFRZ_TUNNTQ/view?utm_content=DAGGFNbphGo&utm_campaign=designshare&utm_medium=link&utm_source=editor#9(#)
- **Demo**: [Link to Demo](#)
## Features

- **University Information**: Detailed descriptions and images of the universities.
- **Majors**: List of majors offered by each university.
- **Cafes and Restaurants**: Information on dining options available on campus.
- **Clubs**: Overview of student clubs and organizations.
##Setup:
### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Cloning the Repository

Clone the repository from GitHub:

```bash
git clone https://github.com/LayanAlrashoud/WEB_PROJECT_F.git
cd WEB_PROJECT_F

Routers
The following are the key routes used in the application:

Home Page: The main landing page of the application.
app.get('/', (req, res) => {
    res.render('index');
});
Google Authentication: Initiates Google authentication.
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

Google Callback: Handles the callback after Google has authenticated the user.
app.get('/google/callback', 
  passport.authenticate('google', { 
      failureRedirect: '/login-failure',
      successRedirect: '/'
  })
);
Login Failure: Redirects here if authentication fails.
app.get('/login-failure', (req, res) => {
    res.send('Something went wrong');
});
University Pages: Routes for each university page.
app.get('/imamu', (req, res) => {
    res.render('imamu');
});

app.get('/ksu', (req, res) => {
    res.render('ksu');
});

app.get('/pnu', (req, res) => {
    res.render('pnu');
});

Unishop Routes: Routes for managing university shops.

//To get a shop:

router.get('/add', (req, res) => {
    res.render('add_shops', { title: "Add Shops" });
});

//To add new shop

router.post('/add', upload, async (req, res) => {
    const newShop = new Unishop({
        Name: req.body.Name,
        Discribtion: req.body.Discribtion,
        Location: req.body.Location,
        University: req.body.University,
        Image: req.file.filename,
    });
    await newShop.save();
    res.redirect('/admin');
});

// Admin page displaying all shops
router.get('/', async (req, res) => {
    const shops = await Unishop.find();
    res.render('admin', { title: 'Admin Page', shops: shops });
});

// Get edit shop page
router.get('/edit/:id', (req, res) => {
    Unishop.findById(req.params.id)
      .then(shop => {
          res.render('edit_shops', { title: 'Edit Shop', shop: shop });
      });
});

// Update shop details
router.post('/update/:id', upload, async (req, res) => {
    const updatedShop = {
        Name: req.body.Name,
        Discribtion: req.body.Discribtion,
        Location: req.body.Location,
        University: req.body.University,
        Image: req.file ? req.file.filename : req.body.old_image,
    };
    await Unishop.findByIdAndUpdate(req.params.id, updatedShop);
    res.redirect('/admin');
});
//To delete shop
router.get('/delete/:id', async (req, res) => {
    await Unishop.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
});
## Technologies Used

- **Frontend**:
  - HTML
  - CSS
  - JavaScript

- **Backend**:
  - Node.js
  - Express.js

- **Database**:
  - MongoDB

- **Authentication**:
  - Passport.js


##Future Work
Expand University Coverage: Include all universities in Saudi Arabia, offering comprehensive information about their majors, cafes, restaurants, and clubs.
##Screenshots:


##Team Members:
1.	Shahad Almutairi
2.	Lyane Alrashoud
3.	Shatha Alyousef
