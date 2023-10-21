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
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";

export default function PostCard({ data, userid, onLoading }) {
  const navigate = useNavigate();

  //// Formatting Date----------
  const date = new Date(data.createdAt);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const formattedDate = `${year}-${month}-${day.toString().padStart(2, "0")}`;
  //--------------------------------

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
      const result = response.data;
      console.log("result", result);
      if (result.status === "success") {
        alert(result.message); // Displaying a success alert.
        onLoading();
      } else {
        alert(result.message); // Displaying an error alert.
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: "50px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            S
          </Avatar>
        }
        title={data.title}
        subheader={formattedDate}
      />
      <CardMedia
        component="img"
        height="194"
        image={"http://localhost:8081/" + data.image}
        alt={data.title}
      />
      <CardContent
        style={{
          maxHeight: "100px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ whiteSpace: "normal" }}
        >
          {data.content}
        </Typography>
      </CardContent>
      {/* <button onClick={Edit}>Edit</button> */}
      <Stack direction="row" spacing={2} padding={2}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          size="small"
          onClick={Edit}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          size="small"
          onClick={Delete}
        >
          Delete
        </Button>
      </Stack>
      {/* <button onClick={Delete}>Delete</button> */}
    </Card>
  );
}
