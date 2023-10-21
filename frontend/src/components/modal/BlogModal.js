import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CreateBlog from "../../forms/blogging/createBlog/CreateBlog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./blogmodal.scss";

export default function BlogModal({ userid, onLoading }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="blogmodal">
      <div>
        <Button onClick={handleOpen} className="button">
          <AddCircleOutlineIcon /> Add New Post
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{maxHeight:"95vh",overflowY:"scroll",width:'80vw'}}>
          <CreateBlog
            userid={userid}
            handleClose={handleClose}
            onLoading={onLoading}
          />
        </div>
      </Modal>
    </div>
  );
}
