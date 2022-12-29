import Axios from "@/lib/axios";
import { dateInput } from "@/lib/dateInput";
import { Button, TextField, Grid, Select, MenuItem } from "@mui/material";
import Label from "components/FormLabel";
import FormModal from "components/Modal";
import { useAppContext } from "context/state";

import React, { useState } from "react";

const UserUpdate = ({ open, setOpen, userDispatch, users }) => {
  const { toastDispatch } = useAppContext();
  const [user, setUser] = useState({
    name: users.name,
    email: users.email,
    depertment: users.depertment,
    designation: users.designation,
    phone: users.phone,
    joining_date: users.joining_date,
  });
  const reset = () => {
    setUser({
      ...user,
      name: users.name,
      email: users.email,
      depertment: users.depertment,
      designation: users.designation,
      phone: users.phone,
      joining_date: new Date(users.joining_date).toLocaleDateString("en-CA"),
    });
  };
  //   add user
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await Axios.patch(`user/${users._id}`, {
      ...user,
      id: users.id,
    });
    if (res.status === 200) {
      userDispatch({
        type: "UPDATE_USER",
        payload: user,
        id: users._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Update User Successfully",
      });
      reset();
      setOpen(false);
    }
  };

  return (
    <FormModal width={400} open={open} setOpen={setOpen} reset={reset}>
      <form onSubmit={handleUpdate}>
        <Grid>
          <Grid item xs={6}>
            <Label htmlFor="name" required={true} label="name" />
            <TextField
              id="name"
              placeholder="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
              type="name"
            />
          </Grid>
          <Grid item xs={6}>
            <Label htmlFor="email" required={true} label="Email" />
            <TextField
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6}>
            <Label htmlFor="phone" required={true} label="Phone" />
            <TextField
              id="phone"
              placeholder="phone"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6}>
            <Label
              htmlFor="designation"
              required={true}
              label="Select designation"
            />
            <TextField
              sx={{
                marginBottom: "10px",
              }}
              onChange={(e) =>
                setUser({ ...user, designation: e.target.value })
              }
              value={user.designation}
              displayEmpty
              fullWidth
              placeholder="Designation"
            />
          </Grid>
          <Grid item xs={6}>
            <Label
              htmlFor="depertment"
              required={true}
              label="Select depertment"
            />
            <Select
              sx={{
                marginBottom: "10px",
              }}
              onChange={(e) => setUser({ ...user, depertment: e.target.value })}
              value={user.depertment}
              displayEmpty
              fullWidth
              placeholder="Select Depertment"
            >
              <MenuItem value="" disabled>
                <em>Depertment</em>
              </MenuItem>
              <MenuItem value="dvelopment">Dvelopment</MenuItem>
              <MenuItem value="designing">Designing</MenuItem>
              <MenuItem value="marketing">Marketing</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6}>
            <Label
              htmlFor="joining_date"
              required={true}
              label="Joining_date"
            />
            <TextField
              id="joining_date"
              placeholder="joining_date"
              type="date"
              defaultValue={dateInput(user.joining_date)}
              onChange={(e) =>
                setUser({ ...user, joining_date: e.target.value })
              }
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
            />
          </Grid>

          <Button variant="contained" color="primary" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </FormModal>
  );
};

export default UserUpdate;
