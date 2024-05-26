import slugify from 'slugify';
import SlideData from '../models/slideData.js';
import fs from "fs";
import formidable from 'formidable';

export const addBlogSlide = async (req, res) => {
  const form = new formidable.IncomingForm();
  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send({ error: 'Error parsing form data' });
      }
      const getSingleValueFromArray = (value) => {
        if (Array.isArray(value) && value.length > 0) {
          return value[0];
        }
        return value;
      };
      const date = getSingleValueFromArray(fields.date);
      const postTitle = getSingleValueFromArray(fields.postTitle);
      const description = getSingleValueFromArray(fields.description);
      const category = getSingleValueFromArray(fields.category); 
      const editorContent = fields.editorContent; 
      const thumbnail = files.thumbnail;
      switch (true) {
        case !thumbnail:
          return res.status(400).send({ error: 'Thumbnail is Required' }); 
        case thumbnail.size > 10000000:
          return res.status(400).send({ error: 'Thumbnail should be less than 10mb' }); 
      }
      if (typeof postTitle !== 'string' || postTitle.trim().length === 0) {
        return res.status(400).send({ error: 'Invalid postTitle' }); 
      }
      if (thumbnail.size > 10000000) { 
        return res.status(400).send({ error: 'Thumbnail should be less than 10mb' }); 
      }
      const thumbnailData = fs.readFileSync(thumbnail.path); 
      const thumbnailContentType = thumbnail.type; 
      const newBlog = new SlideData({
        date,
        slug: slugify(postTitle),
        postTitle,
        description,
        editorContent,
        category,
        thumbnail: {
          data: thumbnailData,
          contentType: thumbnailContentType
        }
      });
      await newBlog.save();
      res.status(200).json({ message: 'Blog created successfully', newBlog });
    });
  } catch (error) {
    console.error('Error creating Blog:', error);
    res.status(500).json({ error: 'An error occurred while creating Blog' });
  }
};

export const getAllBlogsSlide = async (req, res) => {
  try {
    const blogs = await SlideData.find();
    res.status(200).json({ message: 'Blogs fetched successfully', blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'An error occurred while fetching blogs' });
  }
};


export const getOneBlogSlide = async (req, res) => {
  try {
    const id = req.params.id;
    const BlogExist = await SlideData.findById(id);
    if (!BlogExist) {
      return res.status(404).json({ error: 'Blog not found' }); // Changed status code to 404
    }
    res.status(200).json({ message: 'Blog fetch successfully', BlogExist });
  } catch (error) {
    console.error('Error fetch Blog:', error);
    res.status(500).json({ error: 'An error occurred while fetch Blog' });
  }
};

export const updateBlogSlide = async (req, res) => {
  try {
    const id = req.params.id;
    const BlogExist = await SlideData.findById(id);
    if (!BlogExist) {
      return res.status(404).json({ error: 'Blog not found' }); // Changed status code to 404
    }
    const updatedData = await SlideData.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Update Data successfully', updatedData });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching Blog' }); // Corrected typo
  }
};

export const deleteBlogSlide = async (req, res) => {
  try {
    const id = req.params.id;
    const BlogExist = await SlideData.findById(id);
    if (!BlogExist) {
      return res.status(404).json({ error: 'Blog not found' }); // Changed status code to 404
    }
    await SlideData.findByIdAndDelete(id); // No need to store result in deleteData variable
    res.status(200).json({ message: 'Deleted Data successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching Blog' }); // Corrected typo
  }
};
