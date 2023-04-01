const Category = require('../models/categories');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/categories')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

const AddCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const category = await Category.findOne({ name }).exec();
        if (category) {
            return res.status(400).json({ status: "error", message: 'Category already exists!' });
        }

        const newCategory = new Category({
            name,
            image: req.file.path
        });

        await newCategory.save();

        res.json({
            status: "ok",
            message: 'Category stored successfully!'
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", message: error.message });
    }
};

const getCategory = async (req, res) => {
    const { categoryId } = req.query; // Get the category ID from the URL parameters

    try {
        const category = await Category.findOne({ _id: categoryId });
        res.status(200).json({status: "ok", data: category });
    } catch (err) {
        res.status(500).json({status: "error", message: err.message});
    }
}

const getAllCategories = async (req, res) => {
    try {
        const data = await Category.find().sort({ "_id": -1 })
        res.status(200).json({ data, status: "ok" });
    } catch (err) {
        res.status(500).json({ message: `${err}`, status: "error" });
    }
};

const updateCategory = async (req, res) => {
    try {
        const data = await Category.findOneAndUpdate(
            { _id: req.body._id },
            req.body
        );
        res.status(200).json({ message: "Category Updated", status: "ok" });
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    upload,
    AddCategory,
    getCategory,
    getAllCategories,
    updateCategory
};
