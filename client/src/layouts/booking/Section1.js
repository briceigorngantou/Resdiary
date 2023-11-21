import React from "react";

import { Button, Grid, InputAdornment, Typography } from "@mui/material";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as Yup from "yup";

import TextInput from "../../components/form/textInput/TextInput";
import TimeSelect from "../../components/form/textInput/TimeSelect";
import { colors } from "../../config/colors";
import searchAvailabilityApi from "../../api/searchAvailability";
import AppContext from "../../config/AppContext";
import Loading from "../../components/Loading";

export default function Section1({ Restaurant }) {
  const [open, setOpen] = React.useState(false);
  const [disabledTimeSelect, setDisabledTimeSelect] = React.useState(true);
  const [timeAvailable, setTimeAvailable] = React.useState([]);
  const { setDataSection1, visitTime } = React.useContext(AppContext);
  const [loading_api_response, setLoading_api_response] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = Yup.object().shape({
    visitDate: Yup.date().required("Visit date is required"),
    partySize: Yup.number()
      .min(1, "Min party size is 1")
      .max(
        Restaurant?.MaxCovers ? Restaurant?.MaxCovers : 6,
        `Max party size is ${Restaurant?.MaxCovers ? Restaurant?.MaxCovers : 6}`
      )
      .required("PartySize number is required"),
  });

  const searchAvailability = async (values) => {
    await searchAvailabilityApi(
      values.visitDate,
      values.partySize,
      Restaurant?.AccessedName
    )
      .then((response) => {
        setLoading_api_response(false);
        if (response?.data) {
          setOpen(false);
          setTimeAvailable(response?.data?.AvailableDates[0]?.AvailableTimes);
          setDisabledTimeSelect(false);
        } else {
          setOpen(true);
        }
      })
      .catch((e) => {
        return e?.response?.data?.message;
      });
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        margin: 2,
        padding: 3,
        "--Grid-borderWidth": "1px",
        borderTop: "var(--Grid-borderWidth) solid",
        borderLeft: "var(--Grid-borderWidth) solid",
        borderRight: "var(--Grid-borderWidth) solid",
        borderBottom: "var(--Grid-borderWidth) solid",
        borderColor: "divider",
      }}
    >
      <Grid item sx={{ marginBottom: 1, marginTop: 1 }}>
        {loading_api_response && <Loading isLoading={loading_api_response} />}
      </Grid>
      <Grid
        sx={{
          px: { xs: 2, md: 7 },
          pb: { xs: 2, md: 3 },
          textAlign: "justify",
        }}
      >
        <Typography fontSize={18} fontWeight={700}>
          Booking Information
        </Typography>
      </Grid>
      <Formik
        initialValues={{
          visitDate: "",
          partySize: 1,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const start = new Date(values?.visitDate);
          const yyyy = start?.getFullYear().toString();
          const mm = (start?.getMonth() + 1).toString();
          const dd = start?.getDate().toString();
          const date = `${yyyy}-${mm}-${dd}`;
          setLoading_api_response(true);
          values["visitTime"] = visitTime;
          values["visitDate"] = date;
          console.log(values);
          setDataSection1(values);
          await searchAvailability(values);
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <Grid
            sx={{ px: { xs: 2, md: 5 }, pb: { xs: 2, md: 3 } }}
            container
            justifyContent="space-between"
          >
            <Grid item xs={12} sx={{ margin: 1 }}>
              <TextInput
                label={"Visit Date"}
                placeholder="Visit Date"
                type={"date"}
                fullWidth={true}
                onChange={handleChange("visitDate")}
                value={values.visitDate}
                name={"visitDate"}
                required={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ marginRight: 1 }}>
                      <CalendarMonthIcon />
                    </InputAdornment>
                  ),
                }}
                error={
                  errors.visitDate && touched.visitDate ? errors.visitDate : ""
                }
              />
            </Grid>
            <Grid item xs={12} sx={{ margin: 1 }}>
              <TextInput
                label={"Party Size"}
                type={"number"}
                minValue={1}
                maxValue={Restaurant?.MaxCovers}
                onChange={handleChange("partySize")}
                value={values.partySize}
                name={"partySize"}
                required={true}
                fullWidth={true}
                error={
                  errors.partySize && touched.partySize ? errors.partySize : ""
                }
              />
            </Grid>
            <Grid item xs={12} sx={{ margin: 1 }}>
              <TimeSelect
                timesAvailable={
                  timeAvailable && timeAvailable.length > 0
                    ? timeAvailable
                    : null
                }
                width={"100%"}
                disabled={disabledTimeSelect}
              />
            </Grid>

            <Grid item xs={12} sx={{ margin: 1 }}>
              <Button
                startIcon={<ContentPasteSearchOutlinedIcon />}
                disabled={!values.visitDate || !values.partySize}
                onClick={() => {
                  handleSubmit();
                }}
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
                Search Availability
              </Button>
            </Grid>
          </Grid>
        )}
      </Formik>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Not Time Available </DialogTitle>
        <DialogContent>
          <Grid>Sorry we don't have availability for these times</Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
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
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
