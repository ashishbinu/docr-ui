import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionSummary,
  Card,
  CardContent,
  Button,
  Modal,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./styles/Doctor.css";

function Doctor() {
  const [patientDetails, setPatientDetails] = useState({});
  const imageInput = useRef(null);
  const [presImg, setPresImg] = useState(null);

  // Modal variables
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalres, setModalres] = useState([]);
  const modalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const pricolor = "#eeeeee";
  const secolor = "#dddddd";

  useEffect(async () => {
    const response = await fetch("https://docr-sih.herokuapp.com/");
    const details = await response.json();
    console.log(details);
    setPatientDetails(details);

    console.log("image input", imageInput);
    console.log("prescription imgage", presImg);
  }, [presImg]);

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      const url = URL.createObjectURL(img);

      const formData = new FormData();
      formData.append("image", img);
      formData.append("id", 300);
      formData.append("source", "doctor");
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(
        "http://docr-sih.herokuapp.com/getOCR",
        //TODO: change url to latest
        options
      );
      const data = await response.json();
      console.log("===================================");
      console.log("GET POST DATA,", data);
      console.log("===================================");

      // const data = ["Paracetamol", "100mg", "1-0-1", "1 week"]

      // console.log("image url ",url)
      setOpen(true);
      setModalres(data.ocr);
      setPresImg(url);
    }
  };

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
              ref={imageInput}
              type="file"
              name="presc-box"
              id="presc"
              accept="image/jpeg, image/png"
              onChange={onImageChange}
              hidden
            />{" "}
            Upload Prescription
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalstyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Prescription Uploaded
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Name: {modalres[0]}
                <br />
                Dosage: {modalres[1]}
                <br />
                Routine: {modalres[2]}
                <br />
                Duration: {modalres[3]}
              </Typography>
            </Box>
          </Modal>
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
