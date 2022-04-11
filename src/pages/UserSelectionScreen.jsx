import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { makeStyles } from '@mui/styles';

const buttons = [
  <Button
    onClick={() => {
      alert('clicked');
    }}

    key="Doctor">Doctor</Button>,
  <Button
    key="Receptionist">Receptionist</Button>,
  <Button key="Pharmacy">Pharmacy</Button>,
];

function UserSelectionScreen() {

  const useStyles = makeStyles({
    container: {
      display: "flex",
      justifyContent: "center",
    },
  });

  const classes = useStyles();


  return (
    <>

    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Box className={classes.container}
          sx={{
            flexDirection: { xs: 'column', md: 'row' },

          }}
        >

          <h1>Select a User</h1>

          <ButtonGroup
            orientation="vertical"
            size="large"
            aria-label="vertical outlined button group large"
          >
            {buttons}
          </ButtonGroup>

        </Box>

      </Grid>

    </Grid>
    </>

  );
}


export default UserSelectionScreen