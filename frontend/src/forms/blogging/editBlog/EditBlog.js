import React, { useEffect, useState } from "react";
import "../createBlog/createBlog.scss";
import { useNavigate, useParams } from "react-router-dom";
import "./editBlog.scss";
import { editBlogGetAPI, editBlogUpdateAPI } from "../../../API/allAPI";
// import "./createBlog.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    oldImage: "",
  });
  const [error, setError] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    onLoading();
  }, []);

  const onLoading = async () => {
    try {
      const response = await editBlogGetAPI(id);
      let blog = response.data;
      setFormData({
        title: blog.title,
        content: blog.content,
        category: blog.category,
        oldImage: blog.image,
      });
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error creating post:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validation();
  };

  const handleImageChange = (e) => {
    try {
      const files = e.target.files[0];

      if (files) {
        const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"];

        if (acceptedTypes.includes(files.type)) {
          // Files type is allowed
          if (files.size > 2 * 1024 * 1024) {
            return setError({
              ...error,
              image: "*File size cannot exceed than 2MB",
            });
          }
          setError({
            ...error,
            image: "",
          });
          setImage(files);
          const urls = URL.createObjectURL(files);
          setImageURL(urls);
          setFormData({ ...formData, oldImage: "" });
        } else {
          // File type is not allowed
          alert("* Only PNG, JPG, and JPEG file types are allowed.");
        }
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  const validation = () => {
    setError((prevError) => ({
      ...prevError,
      title:
        formData.title.length > 150
          ? "* Cannot exceed more than 150 characters"
          : "",
      content:
        formData.content.length > 5000
          ? "* Cannot exceed more than 5000 characters"
          : "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error.title !== "" || error.content !== "" || error.image !== "") {
      alert("Cannot submit data with an error");
      return;
    }
    const allData = new FormData();
    allData.append("title", formData.title);
    allData.append("content", formData.content);
    allData.append("category", formData.category);
    allData.append("oldImage", formData.oldImage);
    allData.append("image", image);

    try {
      const response = await editBlogUpdateAPI(id, allData);
      if (response.data) {
        alert("Updated Succesfully");
        navigate("/");
      }

      // Optionally, reset the form fields after successful submission
      setFormData({
        title: "",
        content: "",
        category: "",
        oldImage: "",
      });
      setImage("");
      setImageURL("");
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error creating post:", error);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
      <div className="editblog">
        <div className="card">
          <h2>Edit Blog</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {imageURL && <img src={imageURL} alt="blogimage" />}
            {formData.oldImage && (
              <img
                src={"http://localhost:8081/" + formData.oldImage}
                alt="oldimage"
              />
            )}
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              label="Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <div className="error">{error.title && error.title}</div>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </Button>
            <div className="error">{error.image && error.image}</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Content"
              type="text"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              multiline
            />
            <div className="error">{error.content && error.content}</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              label="Category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
            <Button variant="contained" type="submit">
              SUBMIT
            </Button>
          </form>
        </div>
      </div>
  );
}

export default EditBlog;
