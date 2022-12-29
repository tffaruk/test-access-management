import { useAppContext } from "context/state";
import { useState } from "react";
import {
  Collapse,
  TableCell,
  TableRow,
  IconButton,
  TableBody,
  Typography,
  Grid,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";

import FeatherIcon from "feather-icons-react";
import Axios from "@/lib/axios";
import CourseUpdate from "components/courses/UpdateCourse";
import SingleCourseUpdateForm from "components/form/SingleCourseUpdateForm";
import Delete from "components/Delete";

const CourseCard = ({ course }) => {
  const [open, setOpen] = useState(false);
  const [courseFrom, setCourseForm] = useState(false);
  const [singleDeleteModal, setSingleDeleteModal] = useState(false);
  const [courseDeleteModal, setCourseDeleteModal] = useState(false);
  const [item, setItem] = useState({
    id: null,
    name: "",
  });
  const {
    courseDispatch,
    toastDispatch,
    userState: { users },
    filterCoursesState: { courses: filterCourses, course: singleCourse },
    filterCoursesDisPatch,
  } = useAppContext();

  // expand card
  const handleExpand = (expand, id) => {
    courseDispatch({
      type: "EXPAND_COURSE",
      expand: expand,
      id: id,
    });
  };

  // open form modal
  const handleOpen = (id) => {
    if (id === course._id) {
      setOpen(true);
      filterCoursesDisPatch({
        type: "SINGLE_COURSES",
        id: course._id,
      });
    } else {
      setCourseForm(true);
      filterCoursesDisPatch({
        type: "SINGLE_COURSE_ITEM",
        id: course._id,
        courseId: id,
      });
    }
  };

  // delete corse
  const deleteCorse = async (id) => {
    const res = await Axios.delete(`course/${course._id}`);

    if (res.status === 200) {
      courseDispatch({
        type: "DELETE_COURSE",
        id: course._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Delete Successfuly",
      });
      setCourseDeleteModal(false);
    }
  };
  // deletel single course
  const deleteSingleCourse = async () => {
    const res = await Axios.patch(`course/course/delete/${course._id}`, {
      id: item.id,
    });

    if (res.status === 200) {
      courseDispatch({
        type: "DELETE_SINGLE_COURSE",
        id: item.id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Delete Successfuly",
      });
      setSingleDeleteModal(false);
    }
  };

  const deleteData = (id, name) => {
    setItem({
      ...item,
      name: name,
      id: id,
    });
    if (id !== course._id) {
      setSingleDeleteModal(true);
    } else {
      setCourseDeleteModal(true);
    }
  };
  return (
    <TableBody key={course._id}>
      {filterCourses.length > 0 && (
        <CourseUpdate
          courses={filterCourses[0]}
          setOpen={setOpen}
          open={open}
        />
      )}
      {/* // delete modal */}
      <Delete
        open={item.id !== course._id ? singleDeleteModal : courseDeleteModal}
        setOpen={
          item.id !== course._id ? setSingleDeleteModal : setCourseDeleteModal
        }
        item={item.name}
        handleDelete={item.id !== course._id ? deleteSingleCourse : deleteCorse}
      />
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleExpand(!course.expand, course._id)}
          >
            <FeatherIcon
              icon={course.expand ? "minus-square" : "square"}
              style={{ color: "#ddd" }}
            />
          </IconButton>
        </TableCell>
        <TableCell>{course.platform}</TableCell>
        <TableCell>{course.credential.website}</TableCell>
        <TableCell>{course.credential.email}</TableCell>
        <TableCell>{course.credential.password}</TableCell>

        <TableCell>
          {" "}
          <IconButton size="small" onClick={() => handleOpen(course._id)}>
            <FeatherIcon icon="edit" style={{ color: "green" }} />
          </IconButton>
        </TableCell>
        <TableCell>
          {" "}
          <IconButton
            size="small"
            onClick={() => deleteData(course._id, course.name)}
          >
            <FeatherIcon icon="trash" style={{ color: "red" }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={8}
        >
          <Collapse in={course.expand} timeout="auto" unmountOnExit>
            {singleCourse.length > 0 && (
              <SingleCourseUpdateForm
                width={400}
                open={courseFrom}
                setOpen={setCourseForm}
                singleCourse={singleCourse[0]}
              />
            )}

            <Typography variant="h3">Courses:</Typography>
            {course.course.map((courseData, i) => (
              <Grid
                key={i}
                sx={{
                  backgroundColor: "#ddd",
                  marginBottom: "10px",
                  padding: "15px",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                  }}
                >
                  {" "}
                  <Typography variant="h4" mr={3}>
                    Course Name:{" "}
                    <span style={{ marginLeft: "10px" }}>
                      {courseData.name}
                    </span>
                  </Typography>{" "}
                </Grid>

                <Typography mt="10px">
                  Users:
                  {users
                    .filter((user) =>
                      user.courses.includes(courseData.unique_id)
                    )
                    .map((user, i) => (
                      <span style={{ marginLeft: "10px" }} key={i}>
                        {user.name},
                      </span>
                    ))}
                </Typography>

                <Typography mt="15px">Prize: {courseData.prize}</Typography>

                <Grid mt="15px">
                  <IconButton
                    size="small"
                    onClick={() => handleOpen(courseData._id)}
                  >
                    <FeatherIcon icon="edit" style={{ color: "green" }} />
                  </IconButton>{" "}
                  <IconButton
                    size="small"
                    onClick={() => deleteData(courseData._id, courseData.name)}
                  >
                    <FeatherIcon icon="trash" style={{ color: "red" }} />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default CourseCard;
