import FullLayout from "@/layouts/FullLayout";
import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Table,
  Button,
} from "@mui/material";
import CourseCard from "components/cards/CourseCard";
import AddCourse from "components/courses/AddCourse";
import Toast from "components/Toast";
import { useAppContext } from "context/state";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Course = () => {
  const {
    courseState: { loading, error, courses },
    courseDispatch,
  } = useAppContext();

  const [course, setCourse] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  let content;
  if (loading) {
    content = <Typography>Loading...</Typography>;
  }
  if (error) {
    content = <Typography>Something went wrong</Typography>;
  }
  if (!loading && !error && courses.length === 0) {
    content = <Typography>Nothing to show</Typography>;
  }
  if (!loading && !error && courses.length) {
    content = courses.map((course, i) => (
      <CourseCard course={course} key={i} courseDispatch={courseDispatch} />
    ));
  }

  useEffect(() => {
    setCourse(content);
  }, [courses]);

  return (
    <FullLayout>
      <Toast />
      <AddCourse open={open} setOpen={setOpen} courses={courses} />
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        Add Course
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Expand</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          {course}
          {/* <TableBody>{tool}</TableBody> */}
        </Table>
      </TableContainer>
    </FullLayout>
  );
};

export default Course;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}