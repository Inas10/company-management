import React, { useEffect, useState } from "react";
import CompaniesDND from "../components/DragAndDrop/CompaniesDND";
import { Box, CircularProgress, Toolbar } from "@mui/material";
import { fetchCompanies } from "../api/companiesAPI";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/auth/authSlice";
import { drawerWidth } from "../components/NavMenu";

const DragAndDrop = () => {
  //State >>
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const { token } = useSelector(getAuth);
  const fetchData = async (page = 1, pageSize = 20) => {
    await fetchCompanies(token.id_token, page, pageSize).then((companies) => {
      if (companies?.items?.length > 0) {
        setCompanies(companies?.items);
      }
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      <Toolbar />
      {loading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: drawerWidth,
            right: 0,
            margin: "auto",
          }}
        />
      ) : (
        companies && <CompaniesDND companies={companies} />
      )}
    </Box>
  );
};

export default DragAndDrop;
