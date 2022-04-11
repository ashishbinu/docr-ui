import React, { useState, useEffect } from "react";

import { Box, Button, ButtonGroup, Snackbar, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const getDateString = (dateObj) => {
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate() + 1;
  const year = dateObj.getUTCFullYear();
  return year + "-" + month + "-" + day;
};
function ReceptionistScreen() {
  const [nameValue, setNameValue] = useState("");
  const [dobValue, setDobValue] = useState(null);
  const [isSearchSuccess, setIsSearchSuccess] = useState(false);

  let navigate = useNavigate();

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
          <DatePicker
            label="Date Of Birth"
            views={["day", "month", "year"]}
            value={dobValue}
            onChange={(newValue) => {
              setDobValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div>
        <ButtonGroup
          orientation="vertical"
          size="large"
          aria-label="vertical contained button group large"
        >
          <Stack spacing={2}>
            {isSearchSuccess ? (
              <Button
                key="Search"
                variant="contained"
                onClick={() => {
                  // fetch("someurl.com/patientSearch?name=Sudev&dob=2000-12-02").then((response) => response.json()).then((data) => {
                  //   if ('error' in data) {
                  //     setIsSearchSuccess(false)
                  //     console.log(data.error)
                  // //then show a snackbar that about the error
                  //   }
                  // })
                  console.log(nameValue, getDateString(dobValue));
                }}
              >
                Search
              </Button>
            ) : (
              <>
                <Button
                  key="p_form"
                  onClick={() => {
                    print("something");
                  }}
                >
                  Print Enrollment Form
                </Button>
                <Button
                  key="u_form"
                  onClick={() => {
                    navigate("/receptionist/scanEnrollmentForm");
                  }}
                >
                  Upload Enrollment Form
                </Button>
              </>
            )}
          </Stack>
        </ButtonGroup>
      </div>
    </Box>
  );
}

export default ReceptionistScreen;
