import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

const LoginForm = ({ setLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "gethugothemes" && password === "kitkat") {
      setLogin(true);
      localStorage.setItem("login", true);
    }
  };
  return (
    <Grid container spacing={4} height={"80vh"}>
      <Grid
        item
        sm={8}
        sx={{
          margin: "auto",
          backgroundColor: "white",
          paddingRight: "32px",
          paddingBottom: "32px",
        }}
      >
        <Typography variant="h1">Welcome to Admin Panel</Typography>
        <Typography variant="p">
          Please enter your login credentials to view your medical reports
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "50px" }}
          >
            Sign In
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
