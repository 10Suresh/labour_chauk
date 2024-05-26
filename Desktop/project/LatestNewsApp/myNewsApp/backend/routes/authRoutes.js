import express from "express";
import { registerUser,getUser,getOne, update,deleteUser, } from "../controllers/authController.js";
import { addCategory ,Allcategory,deleteCategory,updateCatagory,getOneCategory} from "../controllers/categoryControllers.js";
import { addBlog, getOneBlog,getAllBlogs, updateBlog, deleteBlog } from "../controllers/blogControllers.js";
import { userSignIn } from "../controllers/userSignIn.js";
import { deleteBlogSlide, getAllBlogsSlide, getOneBlogSlide, updateBlogSlide,addBlogSlide } from "../controllers/blogSlidControllers.js";
// import { authToken } from "../middleware/authToken.js";
const router = express.Router();

router.post("/register", registerUser);
router.get("/getAlluser", getUser);
router.get('/getOne/:id',getOne);
router.put('/update/:id',update);
router.delete('/delete/:id',deleteUser);
//login route
router.post('/login',userSignIn)
// router.get('/user-details',authToken,userDetails)
//category routes
router.post("/addcategory", addCategory);
router.get("/getAllcategory", Allcategory);
router.get('/getOneCategory/:id',getOneCategory);
router.put('/updateCatagory/:id',updateCatagory);
router.delete('/deleteCategory/:id',deleteCategory);

//Blog router
router.post("/addblog",addBlog);
router.get('/getAllBlog',getAllBlogs);
router.get('/getOneBlog/:id',getOneBlog);
router.put('/updateblog/:id',updateBlog);
router.delete('/deleteblog/:id',deleteBlog);
//Blog Slide route
router.post('addSlideblog',addBlogSlide);
router.get('getAllSlideBlog',getAllBlogsSlide);
router.get('getoneblogslide/:id',getOneBlogSlide);
router.delete("deleteblogslide", deleteBlogSlide);
router.put('updateblogslide',updateBlogSlide);
export default router;
