import React from "react";
import { useState } from "react";

import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { Button, ButtonGroup } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Stack from "@mui/material/Stack";

function ReceptionistSceen() {
  const [nameValue, setNameValue] = useState("");
  const [dobValue, setDobValue] = useState("");

  const buttons = [
    <Button
      key="Search"
      onClick={() => {
        console.log(nameValue, dobValue);
      }}
    >
      Search
    </Button>,
    <Button key="p_form">Print Enrollment Form</Button>,
    <Button key="u_form">Upload Enrollment Form</Button>,
  ];

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="name"
          onChange={(e) => setNameValue(e.target.value)}
          label="Name"
        />
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="For desktop"
              minDate={new Date("2017-01-01")}
              onChange={(newValue) => {
                setDobValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </div>
      <div>
        <ButtonGroup
          orientation="vertical"
          size="large"
          aria-label="vertical outlined button group large"
        >
          {buttons}
        </ButtonGroup>
      </div>
    </Box>
  );
}

export default ReceptionistSceen;
