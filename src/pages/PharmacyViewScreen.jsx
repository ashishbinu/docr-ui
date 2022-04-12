import { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import "./styles/Doctor.css";

const PharmacyViewScreen = () => {
  const [prescription, setPrescription] = useState({});

  const pricolor = "#eeeeee";
  const secolor = "#dddddd";

  useEffect(async () => {
    const response = await fetch(
      "https://run.mocky.io/v3/87f7df37-6fcb-4335-8010-8514235749fd"
      // TODO: change this with real api from server
    );
    const medicationDetails = await response.json();
    console.log(medicationDetails);
    setPrescription(medicationDetails);
  }, []);

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
        <h1>Patient Prescription</h1>
      </div>
      <div>
        {prescription.prescription?.map((med, mindex) => {
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
    </div>
  );
};

export default PharmacyViewScreen;
