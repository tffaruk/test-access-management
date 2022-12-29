// import AdminPage from "@/layouts/AdminPage";
import FullLayout from "@/layouts/FullLayout";
import {
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import UserCard from "components/cards/UserCard";
import UserForm from "components/form/UserForm";
import Toast from "components/Toast";
import { useAppContext } from "context/state";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

// import useUser from "hooks/useShowcase";
// import { Suspense } from "react";

const User = () => {
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);

  const {
    userState: { loading, error, users },

    userDispatch,
  } = useAppContext();
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
  if (!loading && !error && users.length === 0) {
    content = <Typography>Nothing to show</Typography>;
  }
  if (!loading && !error && users.length) {
    content = users.map((user, i) => <UserCard user={user} key={i} />);
  }

  useEffect(() => {
    setUser(content);
  }, [users]);

  return (
    <FullLayout>
      <Toast />
      {/* insert user */}
      <UserForm
        open={open}
        setOpen={setOpen}
        userDispatch={userDispatch}
        users={users}
      />

      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Expand</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Depertment</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          {user}
          {/* <TableBody>{user}</TableBody> */}
        </Table>
      </TableContainer>
    </FullLayout>
  );
};
export default User;
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
