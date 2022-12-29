import Axios from "@/lib/axios";

import FormModal from "components/Modal";
import { useAppContext } from "context/state";
import { useState } from "react";
import CourseForm from "../form/CourseForm";

const AddCourse = ({ open, setOpen }) => {
  const {
    userState: { users },
    toastDispatch,
    courseDispatch,
  } = useAppContext();
  const [course, setCourse] = useState({
    platform: "",
    course: [
      {
        id: 1,
        name: "",
        prize: null,
        user: [],
        purchase_date: Date,
        expire_date: Date,
      },
    ],
    credential: {
      website: "",
      email: "",
      password: "",
    },
  });

  // reset course
  const reset = () => {
    setCourse({
      ...course,
      platform: "",
      course: [
        {
          name: "",
          prize: null,
          user: [],
          purchase_date: Date,
          expire_date: Date,
        },
      ],
      credential: {
        website: "",
        email: "",
        password: "",
      },
    });
  };
  //   add course
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post("course", {
      course,
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      courseDispatch({
        type: "ADD_COURSE",
        payload: course,
      });
      toastDispatch({
        type: "TOAST",
        message: "Added Successfuly",
      });
    }
  };

  return (
    <FormModal width={400} open={open} setOpen={setOpen} reset={reset}>
      <CourseForm
        handleSubmit={handleSubmit}
        course={course}
        setCourse={setCourse}
        users={users}
      />
    </FormModal>
  );
};

export default AddCourse;
