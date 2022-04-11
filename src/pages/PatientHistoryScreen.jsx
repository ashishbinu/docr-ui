import { useEffect, useState } from "react";
import BasicCard from "../BasicCard.jsx";
// import HistoryCard from "../HistoryCard.jsx";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const PatientHistoryScreen = () => {
  const [patientDetails, setPatientDetails] = useState({});

  useEffect(async () => {
    const response = await fetch(
      "https://run.mocky.io/v3/3943527e-1538-48ab-9714-7e5a150307b0"
      // "https://docr-sih.herokuapp.com/doctor/"
    );
    const details = await response.json();
    console.log(details);
    setPatientDetails(details);
  }, []);

  return (
    <List>
      <ListItem disablePadding>
        <h1>Patient Details</h1>
      </ListItem>

      <ListItem disablePadding>
        <BasicCard
          fullName={patientDetails.full_name}
          age={patientDetails.age}
          bloodGroup={patientDetails.blood_type}
        />
      </ListItem>

      <ListItem disablePadding>
        <h2>History</h2>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="Spam" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default PatientHistoryScreen;

/* {{...patientDetails.history}.map((item) => 
      (
      <div>
        <h3>item.date</h3>
        <h3>item.diagnosis</h3>
      <div/>)
      )}*/
