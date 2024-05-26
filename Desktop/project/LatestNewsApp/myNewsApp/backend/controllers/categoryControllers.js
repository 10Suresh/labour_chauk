
import Category from '../models/categoryModel.js';
export const addCategory = async (req, res) => {
	try {
		const { catName } = req.body;
		const existingCategory = await Category.findOne({ catName });
		if (existingCategory) {
			return res.status(400).json({ error: 'category is already exist' });
		}
		const newCategory = new Category({ catName });
		await newCategory.save();
		res.status(200).json({ message: 'category created successfully' ,newCategory});
	} catch (error) {
		console.error('Error create category:', error);
		res.status(500).json({ error: 'An error occurred while createing  category' });
	}
};

export const Allcategory = async (req, res) => {
	try {
		const CategoryData = await Category.find();
		res.status(200).json({ message: 'Category fetch successfully', CategoryData });
	} catch (error) {
		console.error('Error fetch Category:', error);
		res.status(500).json({ error: 'An error occurred while fetch Category' });
	}
};

export const getOneCategory = async (req, res) => {
	try {
		const id = req.params.id;
		const CategoryExist = await Category.findById(id);
		if (!CategoryExist) {
			return res.status(400).json({ error: 'Category not found' });
		}
		res.status(200).json({ message: 'Category fetch successfully', CategoryExist });
	} catch (error) {
		console.error('Error fetch Category:', error);
		res.status(500).json({ error: 'An error occurred while fetch Category' });
	}
};
export const updateCatagory = async (req, res) => {
	try {
		const id = req.params.id;
		const CategoryExist = await Category.findById(id);
		if (!CategoryExist) {
			return res.status(400).json({ error: 'Category not found' });
		}
		const updatedData = await Category.findByIdAndUpdate(id, req.body,{new:true});
        res.status(200).json({message:'Update Data successfully',updatedData})
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetch Category' });
	}
};
export const deleteCategory = async (req, res) => {
	try {
		const id = req.params.id;
		const CategoryExist = await Category.findById(id);
		if (!CategoryExist) {
			return res.status(400).json({ error: 'Category not found' });
		}
		const deleteData = await Category.findByIdAndDelete(id);
        res.status(200).json({message:'Deleted Data successfully'})
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetch Category' });
	}
};
