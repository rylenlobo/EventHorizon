import React from "react";
import { Typography, Box, Button } from "@mui/material";
import need_login from "../assets/login.svg";
import { useNavigate } from "react-router-dom";

const NeedToLogin = () => {
  const navigate = useNavigate();
  return (
    <div>
      <img src={need_login} alt="No results found" width="280" height="280" />
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography align="center" variant="h6">
          You need to Sign In
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Go to sign in{" "}
        </Button>
      </Box>
    </div>
  );
};

export default NeedToLogin;
