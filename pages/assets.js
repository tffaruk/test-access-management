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
import AddAsset from "components/assets/AddAssets";
import AssetCard from "components/cards/AssetCard";
import Toast from "components/Toast";
import { useAppContext } from "context/state";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Assets = () => {
  const {
    assetState: { loading, error, assets },
    assetDispatch,
  } = useAppContext("login");

  const [assetData, setAssetData] = useState();
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
  if (!loading && !error && assets.length === 0) {
    content = <Typography>Nothing to show</Typography>;
  }
  if (!loading && !error && assets.length) {
    content = assets.map((asset, i) => (
      <AssetCard asset={asset} key={i} assetDispatch={assetDispatch} />
    ));
  }

  useEffect(() => {
    setAssetData(content);
  }, [assets]);

  return (
    <FullLayout>
      <Toast />
      <AddAsset open={open} setOpen={setOpen} />
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        Add Assets
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Expand</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          {assetData}
          {/* <TableBody>{tool}</TableBody> */}
        </Table>
      </TableContainer>
    </FullLayout>
  );
};

export default Assets;
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
