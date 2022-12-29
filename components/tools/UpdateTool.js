import Axios from "@/lib/axios";
import FormModal from "components/Modal";
import { useAppContext } from "context/state";
import { useState } from "react";
import ToolForm from "../form/ToolForm";

const ToolUpdate = ({ open, setOpen, tools }) => {
  const { toastDispatch, toolDispatch } = useAppContext();
  //   call users

  const [tool, setTool] = useState({
    name: tools.name,
    prize: tools.prize,
    organization: tools.organization,
  });
  // add new  organization field

  //   reset tool
  const reset = () => {
    setTool({
      ...tool,
      name: tool.name,
      prize: tool.prize,
      organization: tool.organization,
    });
  };
  console.log(tool);
  //   add tool
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await Axios.patch(`tool/${tools._id}`, {
      tool: {
        ...tool,
        organization: tool.organization.map((d) => {
          return {
            ...d,
            unique_id: tool.name + d.name,
          };
        }),
      },
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      toolDispatch({
        type: "UPDATE_TOOL",
        payload: tool,
        id: tools._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Update Successfully",
      });
    }
  };

  return (
    <FormModal width={400} open={open} setOpen={setOpen} reset={reset}>
      <ToolForm handleSubmit={handleUpdate} tool={tool} setTool={setTool} />
    </FormModal>
  );
};

export default ToolUpdate;
