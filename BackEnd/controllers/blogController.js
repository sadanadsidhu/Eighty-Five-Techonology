const db = require("../models");

//create main Model
const Blog = db.blogs;

//main work

// 1.create blog
const addBlog = async (req, res) => {
  let info = {
    userid: req.body.userid,
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    image: req.file.path,
  };

  const blog = await Blog.create(info);
  res.status(200).send(blog);
};

//2. get all blogs

const getAllBlogs = async (req, res) => {
  let blogs = await Blog.findAll();
  res.status(200).send(blogs);
};

// 3. Delete blog

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.body.userid;

    // Validate blogId and userId here, e.g., check if they exist and are valid.

    const blog = await Blog.findOne({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.userid !== userId) {
      return (
        res
          // .status(403)
          .json({ message: "You don't have permission to delete the post" })
      );
    }

    await Blog.destroy({ where: { id: blogId } });
    return res.status(200).json({ message: "Blog Deleted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 4. Get Single Blog

const getOneBlog = async (req, res) => {
  let id = req.params.id;
  let blog = await Blog.findOne({
    where: { id: id },
  });
  res.status(200).send(blog);
};

//5. update blog
const updateBlog = async (req, res) => {
  try {
    const { oldImage, userid, title, content, category } = req.body;
    let image = oldImage;

    if (req.file && req.file.path) {
      image = req.file.path;
    }

    const id = req.params.id;

    // Check if the blog exists before attempting an update
    const existingBlog = await Blog.findByPk(id);
    if (!existingBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    const info = {
      userid,
      title,
      content,
      category,
      image,
    };

    const [numAffectedRows, affectedRows] = await Blog.update(info, {
      where: { id },
    });

    if (numAffectedRows > 0) {
      res.status(200).send({
        message: "Blog updated successfully",
        updatedBlog: affectedRows,
      });
    } else {
      res.status(404).send({ message: "Blog not updated, please try again" });
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  addBlog,
  getAllBlogs,
  deleteBlog,
  getOneBlog,
  updateBlog,
};
