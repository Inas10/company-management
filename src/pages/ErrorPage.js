import { Box, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ErrorPage = (props) => {
  //Hooks >>
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 10 }}>
      <Toolbar />
      <h1>404 Error</h1>
      <h1>Page Not Found</h1>
      <Box>
        <Button
          onClick={() => navigate("")}
          className="btn"
          variant="contained"
          size="large"
        >
          Go back
        </Button>
      </Box>
    </Box>
  );
};
export default ErrorPage;
