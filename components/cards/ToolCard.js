import {
  Collapse,
  TableCell,
  TableRow,
  IconButton,
  TableBody,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { useAppContext } from "context/state";
import Axios from "@/lib/axios";
import OrganiztionUpdateForm from "components/form/OrganiztionUpdateForm";
import ToolUpdate from "components/tools/UpdateTool";
import Delete from "components/Delete";

const ToolCard = ({ tool }) => {
  const [open, setOpen] = useState(false);
  const [orgFrom, setOrgForm] = useState(false);
  const [orgDeleteModal, setOrgDeleteModal] = useState(false);
  const [toolDeleteModal, setToolDeleteModal] = useState(false);

  const [item, setItem] = useState({
    id: null,
    name: "",
  });
  const {
    toolDispatch,
    filterOrganizationDisPatch,
    filterOrganizationState: { organization: filterOrg, tools: filterTool },
    toastDispatch,
    userState: { users },
  } = useAppContext();

  // expand card
  const handleExpand = (expand, id) => {
    toolDispatch({
      type: "EXPAND_TOOL",
      expand: expand,
      id: id,
    });
  };

  // open form modal
  const handleOpen = (id) => {
    if (id === tool._id) {
      setOpen(true);
      filterOrganizationDisPatch({
        type: "SINGLE_TOOL",
        id: tool._id,
      });
    }
    //  else {
    //   setOrgForm(true);
    //   filterOrganizationDisPatch({
    //     type: "SINGLE_ORGANIZATION",
    //     toolId: tool._id,
    //     orgId: id,
    //   });
    // }
  };

  // delete tool
  const deletetool = async () => {
    const res = await Axios.delete(`tool/${tool._id}`);

    if (res.status === 200) {
      toolDispatch({
        type: "DELETE_TOOL",
        id: tool._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Delete Tool",
      });
      setToolDeleteModal(false);
    }
  };
  // const deleteOrg = async () => {
  //   console.log(item.id);
  //   const res = await Axios.patch(`tool/organization/delete/${tool._id}`, {
  //     id: item.id,
  //   });

  //   if (res.status === 200) {
  //     toolDispatch({
  //       type: "DELETE_ORG",
  //       id: item.id,
  //     });
  //     toastDispatch({
  //       type: "TOAST",
  //       message: "Delete Organization",
  //     });
  //     setOrgDeleteModal(false);
  //   }
  // };
  // setDelete data
  const deleteData = (id, name) => {
    setItem({
      ...item,
      name: name,
      id: id,
    });
    setToolDeleteModal(true);
    // if (id !== tool._id) {
    //   setOrgDeleteModal(true);
    // } else {
    //   setToolDeleteModal(true);
    // }
  };
  return (
    <TableBody key={tool._id}>
      {/* // delete modal */}
      {/* <Delete
        open={item.id !== tool._id ? orgDeleteModal : toolDeleteModal}
        setOpen={item.id !== tool._id ? setOrgDeleteModal : setToolDeleteModal}
        item={item.name}
        handleDelete={item.id !== tool._id ? deleteOrg : deletetool}
      /> */}
      <Delete
        open={toolDeleteModal}
        setOpen={setToolDeleteModal}
        item={item.name}
        handleDelete={deletetool}
      />

      {filterTool.length > 0 && (
        <ToolUpdate
          tools={filterTool[0]}
          setOpen={setOpen}
          open={open}
          toolDispatch={toolDispatch}
        />
      )}
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleExpand(!tool.expand, tool._id)}
          >
            <FeatherIcon
              icon={tool.expand ? "minus-square" : "square"}
              style={{ color: "#ddd" }}
            />
          </IconButton>
        </TableCell>
        <TableCell>{tool.name}</TableCell>
        <TableCell>{tool.prize}</TableCell>

        <TableCell>
          {" "}
          <IconButton size="small" onClick={() => handleOpen(tool._id)}>
            <FeatherIcon icon="edit" style={{ color: "green" }} />
          </IconButton>
        </TableCell>
        <TableCell>
          {" "}
          <IconButton
            size="small"
            onClick={() => deleteData(tool._id, tool.name)}
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
          <Collapse in={tool.expand} timeout="auto" unmountOnExit>
            {/* {filterOrg.length > 0 && (
              <OrganiztionUpdateForm
                width={400}
                open={orgFrom}
                setOpen={setOrgForm}
                filterOrg={filterOrg[0]}
              />
            )} */}

            {tool.organization.map((org, i) => (
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
                    Organization: {org.name}
                  </Typography>{" "}
                </Grid>
                <Typography mt="10px">
                  Users:
                  {users
                    .filter((user) => org.user.includes(user._id))
                    .map((user, i) => (
                      <span style={{ marginLeft: "10px" }} key={i}>
                        {user.name},
                      </span>
                    ))}
                </Typography>

                {/* <Grid mt="10px">
                  <IconButton size="small" onClick={() => handleOpen(org._id)}>
                    <FeatherIcon icon="edit" style={{ color: "green" }} />
                  </IconButton>{" "}
                  <IconButton
                    size="small"
                    onClick={() => deleteData(org.unique_id, org.name)}
                  >
                    <FeatherIcon icon="trash" style={{ color: "red" }} />
                  </IconButton>
                </Grid> */}
              </Grid>
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default ToolCard;
