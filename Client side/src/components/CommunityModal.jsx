import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { tokens } from "../theme";
import { Fragment, useState } from "react";

const nodesColors = [
  "gray",
  "yellow",
  "red",
  "green",
  "blue",
  "pink",
  "orange",
  "brown",
];
const colors = tokens();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: colors.primary[500],
  border: `1px solid ${colors.grey[100]}`,
  borderRadius: "4px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    setCurrentComm(props.data[e.target.value - 1]);
  };
  const handleClose = () => setOpen(false);
  const [currentComm, setCurrentComm] = useState({ group: -1, data: [] });

  return (
    <Fragment>
      {props.data.map((com) => (
        <span key={com.group}>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontWeight: "bold",
            }}
            value={com.group}
            onClick={handleOpen}
          >
            {" "}
            {com.group + " - " + nodesColors[com.group]}{" "}
          </Button>
          &nbsp;&nbsp;
        </span>
      ))}
      <Modal hideBackdrop open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 200 }}>
          <h2>Community {currentComm.group}</h2>
          <p>Europe : {currentComm.data["Europe"]}%</p>
          <p>Americas : {currentComm.data["Americas"]}%</p>
          <p>Asia : {currentComm.data["Asia"]}%</p>
          <p>Africa : {currentComm.data["Africa"]}%</p>
          <p>Oceania : {currentComm.data["Oceania"]}%</p>
          <p>{currentComm.data["Total"]} countries</p>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontWeight: "bold",
            }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
}

export default function CommunityModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: 3,
          height: 30,
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        Stats
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 400 }}>
          <h2>Communities Stats</h2>
          <p>Modularity - {props.modularity.toFixed(4)} </p>
          <p>Enter the community group button to see all the details.</p>
          <ChildModal data={props.data} />
        </Box>
      </Modal>
    </div>
  );
}
