import mongoose from "mongoose";
import slugify from "slugify";

const slideCrouselSchema = new mongoose.Schema({
  date:{
    type:String
  },
  thumbnail: {
    data: Buffer,
    contentType: String
  },
  postTitle: {
    type: String,
    maxlength: [100, "postTitle cannot exceed 100 characters"],
    required: [true, "Please enter a postTitle"]
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
    required: [true, "Please enter a description"]
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  editorContent: {
    type: String,
    required: [true, "Please enter editorContent"]
  },
  category: {
    type: mongoose.ObjectId,
    ref: 'Category',
    // type: String,
    // required: [true, "Category is required"]
  },
  status: {
    type: String,
    enum: ['Published', 'Scheduled','Draft','Deleted'],
    default: 'Draft',
  },
},{timestamps:true});

slideCrouselSchema.pre('save', function(next) {
  if (!this.isModified('title')) {
    return next();
  }
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Slide = mongoose.model('Slide', slideCrouselSchema);

export default Slide;
