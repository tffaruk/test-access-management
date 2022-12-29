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
import UserUpdate from "components/form/UserUpdate";
import { useAppContext } from "context/state";
import Axios from "@/lib/axios";
import Delete from "components/Delete";

const UserCard = ({ user }) => {
  const {
    toolState: { tools },
    userDispatch,
    courseState: { courses },
    assetState: { assets },
  } = useAppContext();
  const [open, setOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { filterUserState, filterDisPatch, toastDispatch } = useAppContext();
  const handleExpand = (expand, id) => {
    userDispatch({
      type: "EXPAND_USER",
      expand: expand,
      id: id,
    });
  };

  const handleOpen = (id) => {
    setOpen(true);

    filterDisPatch({
      type: "SINGLE_USER",
      id: id,
    });
  };

  // delete user
  const deleteUser = async () => {
    const res = await Axios.delete(`user/${user._id}`);
    if (res.status === 200) {
      userDispatch({
        type: "DELETE_USER",
        id: user._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Delete Usear Successfully",
      });
      setIsDeleteModal(false);
    }
  };

  return (
    <TableBody key={user._id}>
      {/* // delete modal */}
      <Delete
        open={isDeleteModal}
        setOpen={setIsDeleteModal}
        item={user.name}
        handleDelete={deleteUser}
      />
      {filterUserState.users.length > 0 && (
        <UserUpdate
          users={filterUserState.users[0]}
          setOpen={setOpen}
          open={open}
          userDispatch={userDispatch}
        />
      )}
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleExpand(!user.expand, user.id)}
          >
            <FeatherIcon
              icon={user.expand ? "minus-square" : "square"}
              style={{ color: "#ddd" }}
            />
          </IconButton>
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>{user.depertment}</TableCell>
        <TableCell>{user.designation}</TableCell>
        <TableCell>
          {" "}
          <IconButton size="small" onClick={() => handleOpen(user._id)}>
            <FeatherIcon icon="edit" style={{ color: "green" }} />
          </IconButton>
        </TableCell>
        <TableCell>
          {" "}
          <IconButton size="small" onClick={() => setIsDeleteModal(true)}>
            <FeatherIcon icon="trash" style={{ color: "red" }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={8}
        >
          <Collapse in={user.expand} timeout="auto" unmountOnExit>
            {/* tools */}
            <Grid>
              <Typography variant="h3">Tools:</Typography>
              {tools.map((tool, i) => (
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4" key={i}>
                    {tool.name}:
                  </Typography>
                  {user.tools &&
                    tool.organization
                      .filter((org) => user.tools.includes(org.unique_id))
                      .map((user, key) => (
                        <p key={`user-${key}`} style={{ marginLeft: "10px" }}>
                          {user.name},
                        </p>
                      ))}
                </Grid>
              ))}
            </Grid>
            {/* courses */}
            <Grid>
              <Typography variant="h3">Courses:</Typography>
              {courses.map((course, i) => (
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4" key={i}>
                    {course.platform}:
                  </Typography>
                  {user.courses &&
                    course.course
                      .filter((el) => user.courses.includes(el.unique_id))
                      .map((user, key) => (
                        <p key={`user-${key}`} style={{ marginLeft: "10px" }}>
                          {user.name},
                        </p>
                      ))}
                </Grid>
              ))}
            </Grid>
            {/* courses */}
            <Grid>
              <Typography variant="h3">Assets:</Typography>

              {user.assets &&
                assets
                  .filter((asset) => asset._id === user.assets)
                  .map((el, i) => <Grid key={i}>Device: {el.name}</Grid>)}
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default UserCard;
