import React from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Label from "components/FormLabel";
import { dateInput } from "@/lib/dateInput";
import { useAppContext } from "context/state";
const AssetForm = ({ handleSubmit, setAsset, asset }) => {
  const {
    userState: { users },
  } = useAppContext();
  const addIssue = () => {
    setAsset({
      ...asset,
      issues: [...asset.issues, { id: asset.issues.length + 1, issue: "" }],
    });
  };

  //   delete courses field
  const deleteissue = (id) => {
    if (asset.issues.map((issue) => issue.id).includes(id)) {
      setAsset({
        ...asset,
        issues: asset.issues.filter((issue) => issue.id !== id),
      });
    }
  };
 
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        overflowY: "auto",

        margin: "auto",
        maxHeight: "100%",
      }}
    >
      <Grid>
        <Grid item xs={6}>
          <Label htmlFor="name" required={true} label="name" />
          <TextField
            id="name"
            placeholder="name"
            value={asset.name}
            onChange={(e) => setAsset({ ...asset, name: e.target.value })}
            sx={{
              marginBottom: "10px",
            }}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <Label htmlFor="value" required={true} label="value" />
          <TextField
            id="value"
            placeholder="value"
            value={asset.value}
            onChange={(e) =>
              setAsset({
                ...asset,
                value: e.target.value,
              })
            }
            sx={{
              marginBottom: "10px",
            }}
            fullWidth
            required
          />
        </Grid>
        {/* <Grid item xs={6}>
          <Label htmlFor="user" required={true} label="user" />
          <TextField
            id="user"
            placeholder="user"
            value={asset.user}
            onChange={(e) =>
              setAsset({
                ...asset,
                user: e.target.value,
              })
            }
            sx={{
              marginBottom: "10px",
            }}
            fullWidth
            required
          />
        </Grid> */}

        <Grid item xs={6}>
          <Label htmlFor="user" required={true} label="Select User" />

          <Select
            select
            id="user"
            variant="outlined"
            label="User"
            value={asset.user}
            onChange={(e) =>
              setAsset({
                ...asset,
                user: e.target.value,
              })
            }
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

        <Grid item xs={6}>
          <Label
            htmlFor="purchase_date"
            required={true}
            label="purchase date"
          />
          <TextField
            type="date"
            id="purchase_date"
            placeholder="purchase_date"
            value={dateInput(asset.purchase_date)}
            onChange={(e) =>
              setAsset({
                ...asset,
                purchase_date: e.target.value,
              })
            }
            sx={{
              marginBottom: "10px",
            }}
            fullWidth
            required
          />
        </Grid>

        {asset.issues.map((issue, i) => (
          <Box bgcolor="#ddd" padding={2} mb={1} borderRadius="2px" key={i}>
            <IconButton
              size="small"
              onClick={() => deleteissue(issue.id)}
              sx={{
                float: "right",
                marginTop: "-16px",
                marginRight: "-15px",
              }}
            >
              <FeatherIcon icon="x" size={16} style={{ color: "red" }} />
            </IconButton>
            <Grid item xs={6}>
              <Label htmlFor="issue" required={true} label="issue " />
              <TextField
                id="issue"
                placeholder="issue"
                value={issue.issue}
                onChange={(e) =>
                  setAsset({
                    ...asset,
                    issues: asset.issues.map((el) => {
                      return {
                        ...el,
                        issue: issue.id === el.id ? e.target.value : el.issue,
                      };
                    }),
                  })
                }
                sx={{
                  marginBottom: "10px",
                }}
                fullWidth
                required
              />
            </Grid>
          </Box>
        ))}

        <Button onClick={addIssue}>Add more</Button>
        <Button variant="contained" color="primary" fullWidth type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default AssetForm;
