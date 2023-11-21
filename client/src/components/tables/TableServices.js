import * as React from "react";
import { styled } from "@mui/material/styles";
import { Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

export default function TableServices({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Service Id</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Time From</StyledTableCell>
            <StyledTableCell align="center">Last Booking Time</StyledTableCell>
            <StyledTableCell align="center">Time Slot Interval</StyledTableCell>
            <StyledTableCell align="center">
              Online Booking CutOff
            </StyledTableCell>
            <StyledTableCell align="center">
              Min Time Before Online CutOff
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <StyledTableRow key={row?.ServiceId}>
                <StyledTableCell component="th" scope="row">
                  {row?.ServiceId}
                </StyledTableCell>
                <StyledTableCell align="center">{row?.Name}</StyledTableCell>
                <StyledTableCell align="center">{row.TimeFrom}</StyledTableCell>
                <StyledTableCell align="center">
                  {row?.LastBookingTime}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.TimeSlotInterval}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.OnlineBookingCutOff}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.MinTimeBeforeOnlineCutOff}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
