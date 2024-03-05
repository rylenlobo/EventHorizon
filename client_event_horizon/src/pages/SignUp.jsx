import { useContext, useState, useEffect } from "react";
import Image from "mui-image";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { signUpContext } from "../context/SignUpContext";
import { Outlet } from "react-router-dom";
import id_scan from "../assets/id_scan.jpg";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export default function SignUp() {
  const { stepCount, setStepCount } = useContext(signUpContext);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/signup":
        setStepCount(1);
        break;
      case "/signup/2":
        setStepCount(2);
        break;
      case "/signup/3":
        setStepCount(3);
        break;
      default:
        setStepCount(0);
    }
  }, [location, setStepCount]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Step {stepCount} of 3</Typography>
        <Outlet />
      </Box>
    </Container>
  );
}

export const ScanIdCard = () => {
  const { photoURL, setPhotoURL } = useContext(signUpContext);

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    setPhotoURL(image.webPath);
  };

  return (
    <>
      <Box>
        <Typography variant="h6" align="left" my={2} mb={1}>
          Scan your SFIT ID to autofill your personal details
        </Typography>
        <Image src={id_scan} duration={0} sx={{ borderRadius: 2 }} />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => takePicture()}
        >
          Use Camera
        </Button>
      </Box>
    </>
  );
};

export const ConfirmDetails = () => {
  return <></>;
};

export const SignUpForm = () => {
  const { email, password, setEmail, setPassword } = useContext(signUpContext);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (email && password) {
      navigate("/signup/2");
    }
  };

  return (
    <Box component="form" noValidate sx={{ mt: 5 }} onSubmit={handleSubmit}>
      <Typography sx={{ fontWeight: 600, fontSize: 15 }} align="center" mb={3}>
        Create an account using you SFIT email and password
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            error={emailError}
            helperText={emailError ? "Email is required" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MailOutlineRoundedIcon />
                </InputAdornment>
              ),
            }}
            required
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={passwordError}
            helperText={passwordError ? "Password is required" : ""}
            fullWidth
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <KeyRoundedIcon />
                </InputAdornment>
              ),
            }}
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        endIcon={<ArrowForwardIosRoundedIcon />}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Continue
      </Button>
    </Box>
  );
};
