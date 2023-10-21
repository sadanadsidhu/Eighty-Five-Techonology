import React, { useState } from "react";
import "./createBlog.scss";
import { createBlogAPI } from "../../../API/allAPI";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

function CreateBlog({ userid, handleClose, onLoading }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  ///// validation usestate
  const [error, setError] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState("");

  const [submitState, setSubmitState] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error.title !== "" || error.content !== "" || error.image !== "") {
      alert("Cannot submit data with an error");
      return;
    }

    const allData = new FormData();
    allData.append("userid", userid);
    allData.append("title", formData.title);
    allData.append("content", formData.content);
    allData.append("category", formData.category);
    allData.append("image", image);

    try {
      const response = await createBlogAPI(allData);
      if (response.data) {
        handleClose();
        onLoading();
      }
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error sending data:", error);
    }
    // Optionally, reset the form fields after successful submission
    setFormData({
      title: "",
      content: "",
      category: "",
    });
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
        } else {
          alert("Only PNG, JPG, and JPEG file types are allowed.");
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
          ? "*Cannot exceed more than 10 characters"
          : "",
      content:
        formData.content.length > 5
          ? "*Cannot exceed more than 5000 characters"
          : "",
    }));
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
    <div className="createpost">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {imageURL && <img src={imageURL} alt="blogimage" />}
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
          fullWidth
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
          Create Post
        </Button>
      </form>
    </div>
  );
}

export default CreateBlog;
