import Axios from "@/lib/axios";
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import Label from "components/FormLabel";
import FormModal from "components/Modal";
import { useAppContext } from "context/state";
import React, { useState } from "react";

const SingleCourseUpdateForm = ({ open, setOpen, singleCourse }) => {
  const {
    toastDispatch,
    userState: { users },
    courseDispatch,
  } = useAppContext();
  const [course, setCourse] = useState({
    name: singleCourse.name,
    user: singleCourse.user,
    prize: singleCourse.prize,
  });
  // reset course
  const reset = () => {
    setCourse({
      ...course,
      name: singleCourse.name,
      user: singleCourse.user,
      prize: singleCourse.prize,
    });
  };
  const handleToolUser = (e) => {
    setCourse((course) => ({
      ...course,
      user: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await Axios.patch(`course/course/${singleCourse._id}`, {
      course,
    });

    if (res.status === 200) {
      courseDispatch({
        type: "UPDATE_SINGLE_COURSE",
        payload: {
          name: course.name,
          user: course.user,
          prize: course.prize,
        },
        id: singleCourse._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Update Successfuly",
      });

      setOpen(false);
      reset();
    }
  };
  return (
    <FormModal width={400} open={open} setOpen={setOpen} reset={reset}>
      <form onSubmit={handleUpdate}>
        <Grid item xs={6}>
          <Label htmlFor="course" required={true} label="Organization name" />
          <TextField
            id="course"
            placeholder="course"
            value={course.name}
            onChange={(e) =>
              setCourse({
                ...course,
                name: e.target.value,
              })
            }
            sx={{
              marginBottom: "10px",
            }}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <Label htmlFor="user" required={true} label="Select User" />

          <Select
            select
            id="user"
            variant="outlined"
            label="User"
            multiple={true}
            value={course.user}
            onChange={(e) => handleToolUser(e)}
            placeholder="Select User"
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>
              <em>Users</em>
            </MenuItem>
            {users.map((user, i) => (
              <MenuItem value={user.name} key={i}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Button variant="contained" color="primary" fullWidth type="submit">
          Update
        </Button>
      </form>
    </FormModal>
  );
};

export default SingleCourseUpdateForm;
