const express = require('express');
const router = express.Router();
const Unishop = require('../models/unishop');
const multer = require('multer');
const fs = require('fs');

// إعداد رفع الصور 
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: storage,
}).single('Image');


// Get add shop page
router.get('/add', (req, res) => {
    res.render('add_shops', { title: "Add Shops" });
});

// إضافة متجر جديد
router.post('/add', upload, async (req, res) => {
    try {
        const newShop = new Unishop({
            Name: req.body.Name,
            Discribtion: req.body.Discribtion,
            Location: req.body.Location,
            University: req.body.University,
            Image: req.file.filename,
        });

        await newShop.save();
        req.session.message = {
            type: 'success',
            message: 'Shop added successfully'
        };
        res.redirect('/admin');
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});


router.get('/', async (req, res) => {
    try {
        const shops = await Unishop.find();
        res.render('admin', { title: 'Admin Page', shops: shops });
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});

// Get edit shop page
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;

    Unishop.findById(id)
        .then(shop => {
            if (!shop) {
                return res.redirect('/admin');
            }
            res.render('edit_shops', {
                title: 'Edit Shop',
                shop: shop,
            });
        })
        .catch(err => {
            console.error(err);
            return res.redirect('/admin');
        });
});



// Update shop details
router.post('/update/:id', upload, async (req, res) => {
    const id = req.params.id;
    let new_image = '';

    try {
        if (req.file) {
            new_image = req.file.filename;
            try {
                await fs.unlink(`./uploads/${req.body.old_image}`);
            } catch (err) {
                console.error(err);
            }
        } else {
            new_image = req.body.old_image;
        }

        const updatedShop = await Unishop.findByIdAndUpdate(id, {
            Name: req.body.Name,
            Discribtion: req.body.Discribtion,
            Location: req.body.Location,
            University: req.body.University,
            Image: new_image,
        }, { new: true });

        if (!updatedShop) {
            req.session.message = {
                type: 'danger',
                message: 'Shop not found'
            };
            return res.redirect('/admin');
        }

        req.session.message = {
            type: 'success',
            message: 'Shop updated successfully'
        };
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        req.session.message = {
            type: 'danger',
            message: err.message
        };
        res.redirect('/admin');
    }
});



router.get('/delete/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const result = await Unishop.findByIdAndDelete(id);
        
        if (result && result.Image != '') {
            try {
                fs.unlinkSync('./uploads/' + result.Image);  // إضافة '/' قبل اسم الملف
            } catch (err) {
                console.log(err);
            }
        }

        req.session.message = {
            type: 'info',
            message: 'Shop deleted successfully'
        };
        res.redirect('/admin');
    } catch (err) {
        res.json({ message: err.message });
    }
});


module.exports = router;