const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/usersController');

// router.get('/', usersController.index); 
router.get('/all',usersController.all);

// router.get('/login', usersController.login);
// router.post('/login',usersController.processLogin);

// router.get('/logout', usersController.logout);

// router.get('/register',  usersController.signup);
// router.post('/register', usersController.saveUser);

router.get('/profile/:id/', usersController.profile);
// router.get('/edit/:id', authMiddleware, adminMiddleware,usersController.edit);
// router.put('/edit/:id',adminMiddleware, upload.single('avatar'), validateEditForm, usersController.actualizar)

// router.post('/delete/:id',adminMiddleware, upload.single('avatar'), usersController.eliminar)

module.exports = router;