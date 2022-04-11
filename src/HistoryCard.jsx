import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard({ fullName, age, bloodGroup }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" component="div">
          {fullName}
        </Typography>
        <Typography variant="body2">
          Age : {age}
          <br />
          Blood Group : {bloodGroup}
        </Typography>
      </CardContent>
    </Card>
  );
}
