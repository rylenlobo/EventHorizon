import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RouterLink from "../components/RouterLink";
import sfit_logo from "../assets/sfit-logo.png";
import { useState } from "react";
import { auth } from "../firebase/firbaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    }
  }, [error]);

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} square>
          <Box
            sx={{
              my: 8,
              mx: { xs: 3, md: 12 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, width: 60, height: 60 }} src={sfit_logo} />

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                variant="outlined"
                error={error}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                error={error}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <LoadingButton
                fullWidth
                loading={loading}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => signInWithEmailAndPassword(email, password)}
              >
                Sign In
              </LoadingButton>
              <Grid container direction={{ xs: "column", md: "row" }}>
                <Grid item xs justifyContent="space-between">
                  <RouterLink>
                    <Link variant="body2">Forgot password?</Link>
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink to="/signup">
                    <Link variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </RouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
}
