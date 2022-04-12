import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useNavigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";

function UserSelectionScreen(props) {
  const useStyles = makeStyles({
    container: {
      display: "flex",
      justifyContent: "center",
    },
  });

  const classes = useStyles();

  let navigate = useNavigate();

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Box
            className={classes.container}
            sx={{
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Stack spacing={2}>
              <h1>Select a User</h1>

              <ButtonGroup
                orientation="vertical"
                size="large"
                aria-label="vertical outlined button group large"
              >
                <Button
                  key="Doctor"
                  onClick={() => {
                    navigate("/doctor");
                  }}
                >
                  Doctor
                </Button>
                <Button
                  key="Receptionist"
                  onClick={() => {
                    navigate("/receptionist");
                  }}
                >
                  Receptionist
                </Button>
                <Button
                  key="Pharmacy"
                  onClick={() => {
                    navigate("/pharmacy");
                  }}
                >
                  Pharmacy
                </Button>
              </ButtonGroup>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default UserSelectionScreen;
