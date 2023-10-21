const blogController = require("../controllers/blogController");
const uploadImage = require("../utils/uploadImage");
const blogrouter = require("express").Router();

//userrouter
blogrouter.post("/addBlog", uploadImage, blogController.addBlog);

blogrouter.get("/getallblogs", blogController.getAllBlogs);

blogrouter.post("/:id", blogController.deleteBlog);

blogrouter.get("/:id", blogController.getOneBlog);

blogrouter.put("/:id",uploadImage, blogController.updateBlog);

module.exports = blogrouter;
