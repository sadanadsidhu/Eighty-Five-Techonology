import axios from "axios";

export const HomepageAPI = async () => {
  try {
    const response = await axios.get(`http://localhost:8081/blog/getallblogs`);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

export const SignUpAPI = async (formData) => {
  try {
    // Send the form data to your API endpoint using Axios
    const response = await axios.post(
      "http://localhost:8081/auth/signup",
      formData
    );
    return response;
  } catch (error) {
    // Handle errors, e.g., display an error message
    console.error("Error sending data:", error);
  }
};

export const LogInAPI = async (formData) => {
  try {
    // Send the form data to your API endpoint using Axios
    const response = await axios.post(
      "http://localhost:8081/auth/login",
      formData
    );
    return response;
  } catch (error) {
    // Handle errors, e.g., display an error message
    console.error("Error sending data:", error);
  }
};

export const editBlogGetAPI = async (id) => {
  try {
    // Send the form data to your API endpoint using Axios
    const response = await axios.get(`http://localhost:8081/blog/${id}`);
    return response;
  } catch (error) {
    // Handle errors, e.g., display an error message
    console.error("Error sending data:", error);
  }
};

export const editBlogUpdateAPI = async (id,allData) => {
  try {
    // Send the form data to your API endpoint using Axios
    // const response = await axios.get(`http://localhost:8081/blog/${id}`);
    const response = await axios.put(
        `http://localhost:8081/blog/${id}`,
        allData
      );
    return response;
  } catch (error) {
    // Handle errors, e.g., display an error message
    console.error("Error sending data:", error);
  }
};

export const createBlogAPI = async (allData) => {
      try {
        const response = await axios.post(
          `http://localhost:8081/blog/addBlog`,
          allData
        );
    return response;
  } catch (error) {
    // Handle errors, e.g., display an error message
    console.error("Error sending data:", error);
  }
};
