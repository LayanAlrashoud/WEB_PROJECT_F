# University Guide Website

## Overview

This project is a website that offers detailed information about three universities located in Riyadh city. It provides insights into the available majors, cafes and restaurants, and student clubs to help prospective students make informed choices about which colleges they want to attend.

## Links
- **Presentation**:https://www.canva.com/design/DAGGIPItorE/3QGxi_1NTsbU6U_kmhx_VA/view?utm_content=DAGGIPItorE&utm_campaign=designshare&utm_medium=link&utm_source=editor(#)
- **Demo**: https://drive.google.com/file/d/1ck6R-ktB9oB5Y5xwQXiBT5FFGawOpuAN/view?usp=sharing(#)
- **Flowchart**: ![Flowchart](public/assets/web.drawio.png)

## Features

- **University Information**: Detailed descriptions and images of the universities.
- **Majors**: List of majors offered by each university.
- **Cafes and Restaurants**: Information on dining options available on campus.
- **Clubs**: Overview of student clubs and organizations.
  
## Setup:
### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

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
    
## Dependencies

### This project relies on the following libraries and frameworks:

- connect-mongo: Used to store session data in MongoDB, ensuring sessions persist across server restarts.
- dotenv: Loads environment variables from a .env file into process.env, making it easier to manage configuration settings.
- ejs: Embedded JavaScript templates, used as the templating engine to render HTML pages on the server side.
- express: A minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications.
- express-session: Middleware for managing sessions in Express applications, used for storing session data on the server side.
- mongoose: Library for MongoDB and Node.js, providing schema-based solution to model application data.
- multer: Middleware for uploading files.
- passport: Middleware for authentication in Node.js applications, used to authenticate requests.
- passport-google-oauth20: A Passport strategy for authenticating with Google using the OAuth 2.0 API, allowing users to log in with their Google account.
- nodemon: A tool that helps develop Node.js applications by automatically restarting the server when file changes are detected.
  
### Cloning the Repository

Clone the repository from GitHub:

```bash
git clone https://github.com/LayanAlrashoud/WEB_PROJECT_F.git
cd WEB_PROJECT_F
```

## Routers
The following are the key routes used in the application:

### Home Page
The main landing page of the application.
``` javascript
app.get('/', (req, res) => {
    res.render('index');
});
```
### Google Authentication: Initiates Google authentication.
``` javascript
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
```
### Google Callback: Handles the callback after Google has authenticated the user.
``` javascript
app.get('/google/callback', 
  passport.authenticate('google', { 
      failureRedirect: '/login-failure',
      successRedirect: '/'
  })
);
```
``` javascript
### Login Failure: Redirects here if authentication fails.
app.get('/login-failure', (req, res) => {
    res.send('Something went wrong');
});
```
``` javascript
### University Pages: Routes for each university page.
app.use('/nora', noraRoutes); 
app.use('/imam', imamRoutes);
app.use('/saud', saudRoutes);
```
### Unishop Routes: Routes for managing university shops.
``` javascript
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
```
## Screenshots:
- **Homepage**: ![Homepage](public/assets/HomepageScreenshot.png)
- **PNU Page**: ![PNU](public/assets/PNUScreenshot.png)
- **Explore Section**: ![EXPLORE](public/assets/exploreScreenshot.png)

## Future Work
Expand University Coverage: Include all universities in Saudi Arabia, offering comprehensive information about their majors, cafes, restaurants, and clubs.

## Resources
- https://youtu.be/zBTPDAh8ABM?si=aT_f9nl4U9vRx7oq(#)
- https://youtu.be/BDo1lgaZuII?si=ZQWtFhBAIWnxdIzi(#)
## Team Members:
1.	Shahad Almutairi
2.	Lyane Alrashoud
3.	Shatha Alyousef

