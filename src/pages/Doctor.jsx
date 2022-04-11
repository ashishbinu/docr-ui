import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./styles/Doctor.css";

function Doctor() {
  const [patientDetails, setPatientDetails] = useState({});

  const pricolor = "#eeeeee";
  const secolor = "#dddddd";

  useEffect(async () => {
    const response = await fetch("https://docr-sih.herokuapp.com/");
    const details = await response.json();
    console.log(details);
    setPatientDetails(details);
  }, []);

  const history = patientDetails.history;
  console.log(history);

  return (
    <div className="Doctor">
      <div
        className="doc-page-header"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="patient-deets">
          <h1>{patientDetails.full_name}</h1>
          <p>Age: {patientDetails.age}</p>
          <p>Blood Group: {patientDetails.blood_type}</p>
        </div>
        <div className="upload-button-container">
          <Button
            variant="outlined"
            color="primary"
            sx={{
              margin: "1rem",
            }}
            component="label"
          >
            {" "}
            <input
              type="file"
              name="presc-box"
              id="presc"
              accept="image/jpeg, image/png"
              hidden
            />{" "}
            Upload Prescription
          </Button>
        </div>
      </div>

      <h2>History</h2>
      {history?.map((item, index) => {
        const meds = item.prescription;
        console.log(meds);
        return (
          <Accordion
            key={index}
            className="hist-container"
            sx={{
              backgroundColor: pricolor,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="hist-content"
            >
              <div className="hist-header">
                <h3>{item.diagnosis}</h3>
                <h5>{item.date}</h5>
              </div>
            </AccordionSummary>
            <h3
              style={{
                fontWeight: "normal",
                textAlign: "left",
              }}
            >
              Prescription
            </h3>
            <div>
              {meds?.map((med, mindex) => {
                return (
                  <Card
                    key={mindex}
                    sx={{
                      backgroundColor: secolor,
                      textAlign: "left",
                    }}
                    className="med-card"
                  >
                    <CardContent>
                      <h4> {med.name} </h4>
                      <p> {med.dosage} </p>
                      <p> {med.routine} </p>
                      <p> {med.duration} </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Accordion>
        );
      })}
    </div>
  );
}

export default Doctor;
