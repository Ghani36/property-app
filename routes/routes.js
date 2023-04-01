const express = require('express')
const router = express.Router();

// Controllers
const { SignUp } = require('../controllers/user')
const { SignIn } = require('../controllers/user')
const { AddCategory } = require('../controllers/categories')
const { upload } = require('../controllers/categories');
const { getCategory } = require('../controllers/categories');
const { getAllCategories } = require('../controllers/categories');
const { updateCategory } = require('../controllers/categories');

router.post('/user/register', SignUp)
router.post('/user/login', SignIn)
router.post('/category/addCategory',upload.single('image') , AddCategory)
router.get('/category/getCategory', getCategory)
router.get('/category/getCategories', getAllCategories)
router.put('/category/updateCategory', updateCategory)


module.exports = router