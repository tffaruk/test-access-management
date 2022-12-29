import Axios from "@/lib/axios";
import FormModal from "components/Modal";
import { useAppContext } from "context/state";

import { useState } from "react";
import ToolForm from "../form/ToolForm";

const AddTool = ({ open, setOpen }) => {
  const { toastDispatch, toolDispatch } = useAppContext();
  const [tool, setTool] = useState({
    name: "",
    prize: "",
    organization: [
      {
        name: "",
        user: [],
        id: 1,
      },
    ],
  });

  const reset = () => {
    setTool({
      ...tool,
      name: "",
      prize: "",
      organization: [
        {
          name: "",
          user: [],
          id: 1,
        },
      ],
    });
  };

  //   add tool
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post("tool", {
      tool,
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      toolDispatch({
        type: "ADD_TOOL",
        payload: tool,
      });
      toastDispatch({
        type: "TOAST",
        message: "Add Successfully",
      });
    }
  };

  return (
    <FormModal width={400} open={open} setOpen={setOpen} reset={reset}>
      <ToolForm tool={tool} setTool={setTool} handleSubmit={handleSubmit} />
    </FormModal>
  );
};

export default AddTool;
