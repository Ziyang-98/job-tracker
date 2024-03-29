import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({ snackbarProps, alertProps, message }) => {
  return (
    <Snackbar
      {...snackbarProps}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert {...alertProps}>{message}</Alert>
    </Snackbar>
  );
};

export default Notification;
