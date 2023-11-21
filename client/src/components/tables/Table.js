import * as React from "react";
import { styled } from "@mui/material/styles";
import { Table, Grid, Button, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { colors } from "../../config/colors";
import AppContext from "../../config/AppContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TablePromotions({ rows }) {
  const [open, setOpen] = React.useState(false);
  const [promotion, setPromotion] = React.useState();
  const dateNow = new Date();
  const { setCurrentPromotion } = React.useContext(AppContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (row) => {
    setPromotion(row);
    setOpen(true);
  };

  const handleSubmit = () => {
    setCurrentPromotion(promotion);
    handleClose();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">FullPrice</StyledTableCell>
            <StyledTableCell align="center">Start Date</StyledTableCell>
            <StyledTableCell align="center">End Date</StyledTableCell>
            <StyledTableCell align="center">Start Time</StyledTableCell>
            <StyledTableCell align="center">End Time</StyledTableCell>
            <StyledTableCell align="center">Party Size Limit</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(
            (row) =>
              +new Date(row?.ValidityPeriods[0]?.EndDate) > +dateNow && (
                <StyledTableRow key={row?.Id}>
                  <StyledTableCell component="th" scope="row">
                    {row?.Name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.Description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.FullPrice}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.ValidityPeriods[0]?.StartDate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.ValidityPeriods[0]?.EndDate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.ValidityPeriods[0]?.StartTime}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.ValidityPeriods[0]?.EndTime}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.PartySizeLimit}
                  </StyledTableCell>
                  <IconButton
                    aria-label="view"
                    textAlign={"center"}
                    size={"small"}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      color: colors.black,
                      borderColor: colors.black,
                      backgroundColor: colors.white,
                      ":hover": {
                        color: colors.white,
                        borderColor: colors.black,
                        backgroundColor: colors.black,
                      },
                    }}
                    placeholder="Use Promotion"
                    onClick={() => handleClickOpen(row)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </StyledTableRow>
              )
          )}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Promotion Confirm </DialogTitle>
        <DialogContent>
          <Grid>
            Would you like to continue with the promotion{" "}
            <strong>{promotion?.Name}</strong> ?
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              margin: 1,
              color: colors.black,
              borderColor: colors.black,
              backgroundColor: colors.white,
              ":hover": {
                color: colors.white,
                borderColor: colors.black,
                backgroundColor: colors.black,
              },
            }}
          >
            No
          </Button>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            sx={{
              margin: 1,
              color: colors.white,
              borderColor: colors.black,
              backgroundColor: colors.black,
              ":hover": {
                color: colors.black,
                borderColor: colors.black,
                backgroundColor: colors.white,
              },
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
