import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostCard({ data, userid }) {
  const navigate = useNavigate();
  const Edit = () => {
    if (data.userid !== userid) {
      return alert("You do not have permission to edit this post");
    }
    navigate(`/editblog/${data.id}`);
  };

  const Delete = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8081/blog/${data.id}`,
        { userid }
      );

      // Handle the response, e.g., show a success message
      alert(response.data.message);
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error creating post:", error);
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: "50px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={data.title}
        subheader={data.createdAt}
      />
      <CardMedia
        component="img"
        height="194"
        image={"http://localhost:8081/" + data.image}
        alt={data.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.content}
        </Typography>
      </CardContent>
      <button onClick={Edit}>Edit</button>
      <button onClick={Delete}>Delete</button>
    </Card>
  );
}
