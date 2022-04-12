import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Snackbar,
  TextField,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const getDateString = (dateObj) => {
  const month = dateObj.getMonth() + 1; //months from 1-12
  const day = dateObj.getDate().toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  return year + "-" + month + "-" + day;
};
function ReceptionistScreen() {
  const [nameValue, setNameValue] = useState("");
  const [dobValue, setDobValue] = useState(null);
  const [isSearchSuccess, setIsSearchSuccess] = useState(true);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("lorem");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
                  fetch(
                    `https://docr-sih.herokuapp.com/patientSearch?name=${nameValue}&dob=${getDateString(
                      dobValue
                    )}`
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      if ("error" in data) {
                        setIsSearchSuccess(false);
                        console.log(data.error);
                        setSeverity("error");
                        setMessage("Patient is not found in the database");
                        setOpen(true);
                        //then show a snackbar that about the error
                      } else {
                        setIsSearchSuccess(true);
                        console.log(data.status);
                        setSeverity("success");
                        setMessage(
                          "Patient is found in the database"
                        );
                        setOpen(true);
                      }
                    });
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={severity}
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
            </Snackbar>
          </Stack>
        </ButtonGroup>
      </div>
    </Box>
  );
}

export default ReceptionistScreen;
