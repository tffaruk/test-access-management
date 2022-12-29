import Axios from "@/lib/axios";
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import Label from "components/FormLabel";
import FormModal from "components/Modal";
import { useAppContext } from "context/state";
import React, { useState } from "react";

const OrganiztionUpdateForm = ({ open, setOpen, filterOrg }) => {
  const {
    userState: { users },
    toolDispatch,
    toastDispatch,
  } = useAppContext();
  const [organization, setOrganizatiion] = useState({
    name: filterOrg.name,
    user: filterOrg.user,
    unique_id: filterOrg.unique_id,
  });
  // reset organization
  const reset = () => {
    setOrganizatiion({
      ...organization,
      name: filterOrg.name,
      user: filterOrg.user,
    });
  };
  const handleToolUser = (e) => {
    setOrganizatiion((organization) => ({
      ...organization,
      user: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await Axios.patch(`tool/organization/${filterOrg._id}`, {
      organization,
    });

    if (res.status === 200) {
      toolDispatch({
        type: "UPDATE_ORG",
        payload: {
          name: organization.name,
          user: organization.user,
        },
        id: filterOrg._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Update Successfully",
      });

      setOpen(false);
      reset();
    }
  };
  return (
    <FormModal width={400} open={open} setOpen={setOpen} reset={reset}>
      <form onSubmit={handleUpdate}>
        <Grid item xs={6}>
          <Label
            htmlFor="organization"
            required={true}
            label="Organization name"
          />
          <TextField
            id="organization"
            placeholder="organization"
            value={organization.name}
            onChange={(e) =>
              setOrganizatiion({
                ...organization,
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
            value={organization.user}
            onChange={(e) => handleToolUser(e)}
            placeholder="Select User"
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>
              <em>Users</em>
            </MenuItem>
            {users.map((user, i) => (
              <MenuItem value={user._id} key={i}>
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

export default OrganiztionUpdateForm;
