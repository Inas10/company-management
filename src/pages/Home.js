import { Box, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginUser, refreshTokenSetup } from "../redux/auth/authSlice";

import { useGoogleLogin } from "react-use-googlelogin";

const Home = (props) => {
  //Constants >>
  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });
  //Functions >>
  const handleSignIn = async () => {
    const googleUser = await signIn(); // if you need immediate access to `googleUser`, get it from signIn() directly
    dispatch(loginUser(googleUser));
    dispatch(refreshTokenSetup(googleUser));
  };

  //Hooks >>
  const dispatch = useDispatch();

  return (
    <Box>
      <Toolbar />
      <Typography paragraph>
        Ovo je aplikacija za menadzment kompanija, molim vas ulogujte se preko
        googla
      </Typography>
      <Box>
        <Button
          onClick={handleSignIn}
          variant="contained"
          size="medium"
          color="primary"
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};
export default Home;
