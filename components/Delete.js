import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import FormModal from "./Modal";

const Delete = ({ open, setOpen, item, handleDelete }) => {
  return (
    <FormModal open={open} setOpen={setOpen} width={400}>
      <Typography textAlign="center" paragraph={true} sx={{ fontSize: "18px" }}>
        Are you sure delete <span style={{ fontWeight: 600 }}>{item}</span>?
      </Typography>
      <Grid textAlign="center">
        <Button onClick={handleDelete} variant="outlined" color="danger">
          Delete
        </Button>
        <Button
          onClick={() => setOpen(false)}
          variant="contained"
          sx={{ marginLeft: "10px" }}
          color="success"
        >
          cancel
        </Button>
      </Grid>
    </FormModal>
  );
};

export default Delete;
