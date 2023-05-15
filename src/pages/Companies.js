import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  InputLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import "../styles/companies.css";
import CustomDialog from "../components/CustomDialog";
import {
  addCompany,
  deleteCompany,
  editCompany,
  fetchCompanies,
} from "../api/companiesAPI";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/auth/authSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";

let validationSchema = Yup.object().shape({
  input: Yup.string()
    .required("Company name is Required")
    .min(3, "Company name must be at least 3 characters long"),
});
const Companies = (props) => {
  //State >>
  const [addValue, setAddValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [errors, setErrors] = useState(null);
  const [rows, setRows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page:
      searchParams.get("page") && parseInt(searchParams.get("page")) > 0
        ? parseInt(searchParams.get("page"))
        : 1,
  });
  const [rowCountState, setRowCountState] = React.useState(
    rows?.itemCount || 0
  );

  //Hooks >>
  const { token } = useSelector(getAuth);
  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rows?.itemCount !== undefined ? rows?.itemCount : prevRowCountState
    );
  }, [rows?.itemCount, setRowCountState]);

  //Constants >>
  const columns = React.useMemo(
    () => [
      { field: "companyId", headerName: "ID", minWidth: 100, flex: 0.3 },
      {
        field: "companyName",
        headerName: "Company name",
        minWidth: 80,
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        minWidth: 100,
        flex: 0.4,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() =>
              openEdit(params.row.companyId, params.row.companyName)
            }
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => openDelete(params.row.companyId)}
          />,
        ],
      },
    ],
    []
  );

  //Functions >>

  // -- Fetch/Update Functions
  const fetchData = async (page = 1, pageSize = 5) => {
    await fetchCompanies(token.id_token, page, pageSize).then((companies) => {
      if (companies?.items?.length > 0) {
        setRows(companies);
        setPaginationModel({
          pageSize: companies.pageSize,
          page: companies.pageIndex - 1,
        });
      } else if (companies?.pageIndex > companies?.pageCount) {
        fetchData(companies?.pageCount, pageSize);
        setSearchParams("page=" + companies?.pageCount);
      }
      setLoading(false);
    });
  };
  const paginationModelChange = async (pagination) => {
    setLoading(true);
    setSearchParams("page=" + (pagination.page + 1));
    await fetchData(pagination.page + 1, pagination.pageSize);
    setPaginationModel(pagination);
    setLoading(false);
  };

  // -- Add Company
  const handleAddCompany = async () => {
    setLoading(true);
    const valid = await validationSchema
      .validate({ input: addValue })
      .then((res) => {
        return { success: true, ...res };
      })
      .catch((err) => {
        return { success: false, ...err };
      });
    if (valid.success) {
      setErrors(null);
      await addCompany(addValue, token.id_token).then((res) => {
        if (res && res.data) {
          fetchData(paginationModel.page + 1, paginationModel.pageSize);
          closeAdd();
          toast.success("Successfully added company");
        } else {
          toast.error(res.response.data.title);
        }
      });
    } else {
      toast.error(valid.message);
      setErrors(valid.message);
    }
    setLoading(false);
  };
  const renderAddActions = () => {
    return (
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button onClick={closeAdd}>Cancel</Button>
        <Button
          disabled={loading}
          onClick={handleAddCompany}
          variant="contained"
          sx={{ width: 160 }}
          color="success"
        >
          {loading ? <CircularProgress size={16} /> : "Add Company"}
        </Button>
      </Box>
    );
  };
  const openAdd = () => {
    setAddValue("");
    setAddOpen(true);
  };
  const closeAdd = () => {
    setSelectedId(null);
    setAddOpen(false);
    setErrors(null);
  };

  // -- Delete Company
  const handleDeleteCompany = async () => {
    setLoading(true);
    await deleteCompany(selectedId, token.id_token).then((res) => {
      if (res) {
        fetchData(paginationModel.page + 1, paginationModel.pageSize);
        closeDelete();
        toast.success("Successfully deleted company");
      } else {
        toast.error(res.response.data.title);
      }
      setLoading(false);
    });
  };
  const renderDeleteActions = () => {
    return (
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button onClick={closeDelete}>Cancel</Button>
        <Button
          disabled={loading}
          onClick={handleDeleteCompany}
          variant="contained"
          sx={{ width: 160 }}
          color="error"
        >
          {loading ? <CircularProgress size={16} /> : "Delete"}
        </Button>
      </Box>
    );
  };
  const openDelete = (id) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };
  const closeDelete = () => {
    setDeleteOpen(false);
  };

  // -- Edit Company
  const handleEditCompany = async () => {
    setLoading(true);
    const valid = await validationSchema
      .validate({ input: editValue })
      .then((res) => {
        return { success: true, ...res };
      })
      .catch((err) => {
        return { success: false, ...err };
      });
    if (valid.success) {
      setErrors(null);
      await editCompany(editValue, selectedId, token.id_token).then((res) => {
        if (res && res.data) {
          fetchData(paginationModel.page + 1, paginationModel.pageSize);
          closeEdit();
          toast.success("Successfully edited company");
        } else {
          toast.error(res.response.data.title);
        }
      });
    } else {
      toast.error(valid.message);
      setErrors(valid.message);
    }
    setLoading(false);
  };
  const renderEditActions = () => {
    return (
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button onClick={closeEdit}>Cancel</Button>
        <Button
          disabled={loading}
          onClick={handleEditCompany}
          variant="contained"
          sx={{ width: 160 }}
          color="success"
        >
          {loading ? <CircularProgress size={16} /> : "Apply Changes"}
        </Button>
      </Box>
    );
  };
  const openEdit = (id, value) => {
    setEditValue(value);
    setSelectedId(id);
    setEditOpen(true);
  };
  const closeEdit = () => {
    setEditOpen(false);
    setSelectedId(null);
    setErrors(null);
  };

  return (
    <div>
      <Toolbar />

      {/* Create Button >> */}
      <Button
        onClick={openAdd}
        className="btn"
        variant="contained"
        size="large"
      >
        Create/New
      </Button>

      {/* Data List >> */}
      <DataGrid
        sx={{ height: 600 }}
        paginationMode="server"
        paginationModel={paginationModel}
        rowCount={rowCountState}
        onPaginationModelChange={paginationModelChange}
        loading={loading}
        rows={rows?.items ?? []}
        getRowId={(row) => row.companyId}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
      />

      {/* Dialogs >> */}
      <CustomDialog
        height="20%"
        open={deleteOpen}
        handleClose={closeDelete}
        title="Are you sure?"
        actions={renderDeleteActions}
      >
        <Box>
          Are you sure you want to delete company "
          {
            rows?.items?.find((item) => item.companyId === selectedId)
              ?.companyName
          }
          "?
        </Box>
      </CustomDialog>
      <CustomDialog
        open={addOpen}
        handleClose={closeAdd}
        title="Add Company"
        actions={renderAddActions}
      >
        <Box style={{ position: "relative" }}>
          <InputLabel>Company name</InputLabel>
          <Input
            sx={{ width: { lg: "50%", md: "70%", xs: "100%" } }}
            placeholder="Name..."
            value={addValue}
            error={errors ? true : false}
            onChange={(e) => setAddValue(e.target.value ?? "")}
          />
          {errors && (
            <Typography sx={{ fontSize: 12 }} className="errorMsg">
              {errors}
            </Typography>
          )}
        </Box>
      </CustomDialog>
      <CustomDialog
        open={editOpen}
        handleClose={closeEdit}
        title="Edit Company"
        actions={renderEditActions}
      >
        <Box style={{ position: "relative" }}>
          <InputLabel>Company name</InputLabel>
          <Input
            sx={{ width: { lg: "50%", md: "70%", xs: "100%" } }}
            placeholder="Name..."
            value={editValue}
            error={errors ? true : false}
            onChange={(e) => setEditValue(e.target.value)}
          />
          {errors && (
            <Typography sx={{ fontSize: 12 }} className="errorMsg">
              {errors}
            </Typography>
          )}
        </Box>
      </CustomDialog>
    </div>
  );
};
export default Companies;
