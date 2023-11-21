import React from "react";

import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
  Modal,
} from "@mui/material/";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmailIcon from "@mui/icons-material/Email";
import DialpadIcon from "@mui/icons-material/Dialpad";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { Formik } from "formik";
import * as Yup from "yup";

import bookingApi from "../../api/booking.api";
import TextInput from "../../components/form/textInput/TextInput";
import { colors } from "../../config/colors";
import Loading from "../../components/Loading";
import AppContext from "../../config/AppContext";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("firstName is required"),
  email: Yup.string().email().required("email address is required"),
  surName: Yup.string().required("surName is required"),
  phoneCountryCode: Yup.string().required("phone country code is required"),
  phone: Yup.number().required("phone number is required"),
  specialRequests: Yup.string(),
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 25,
  p: 4,
  borderRadius: 5,
};

export default function Section3({ Restaurant }) {
  const [open, setOpen] = React.useState(false);
  const [inputError, setInputError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading_api_response, setLoading_api_response] = React.useState(false);

  const {
    dataSection1,
    visitTime,
    setVisitTime,
    CurrentPromotion,
    setCurrentPromotion,
  } = React.useContext(AppContext);

  const handleCloseModal = () => {
    setSuccess(false);
  };

  const handleCloseFailModal = () => {
    setInputError(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (data, values, promotionId) => {
    if (!visitTime || visitTime === "" || visitTime === "Not Availability") {
      setMessage("visit Time not available");
      setInputError(true);
    } else {
      await bookingApi(
        data?.visitDate,
        visitTime,
        data?.partySize,
        values?.firstName,
        values?.surName,
        values?.email,
        values?.phone,
        values?.phoneCountryCode,
        values?.specialRequests,
        values?.ReceiveSmsMarketing,
        values?.ReceiveEmailMarketing,
        values?.ReceiveRestaurantSmsMarketing,
        values?.ReceiveRestaurantEmailMarketing,
        promotionId,
        Restaurant?.AccessedName
      )
        .then((response) => {
          setLoading_api_response(false);
          if (response) {
            console.log(response);
            if (
              response?.data?.status === 200 ||
              response?.data?.status === 201
            ) {
              setInputError(false);
              setMessage(
                response?.data?.message +
                  ". You will soon receive a confirmation email"
              );
              setSuccess(true);
            } else {
              setInputError(true);
              setMessage(
                response?.response?.data?.message === "Forbidden"
                  ? "An error occurred while processing your request, please try again"
                  : response?.response?.data?.message === "NoAvailability"
                  ? "Sorry we don't have availability for these times"
                  : response?.response?.data?.message ===
                    "A credit card token, or a payment is required in order to secure the booking."
                  ? "A credit card token or payment is required to secure the reservation. Please confirm your reservation on site"
                  : response?.response?.data?.message
              );
              setSuccess(false);
            }
          } else {
            setLoading_api_response(true);
          }
        })
        .catch((e) => {
          setInputError(true);
          setSuccess(false);
          setMessage(e?.response?.data?.message);
          console.log(e);
          return e?.response?.data?.message;
        });
    }
  };
  return (
    <Grid
      item
      xs={12}
      sx={{
        margin: 2,
        "--Grid-borderWidth": "1px",
        borderTop: "var(--Grid-borderWidth) solid",
        borderLeft: "var(--Grid-borderWidth) solid",
        borderRight: "var(--Grid-borderWidth) solid",
        borderBottom: "var(--Grid-borderWidth) solid",
        borderColor: "divider",
      }}
    >
      <Grid
        sx={{
          px: { xs: 2, md: 7 },
          pb: { xs: 2, md: 3 },
          textAlign: "justify",
        }}
      >
        <Typography fontSize={18} fontWeight={700}>
          Customer Information
        </Typography>
      </Grid>
      <Grid item sx={{ marginBottom: 1, marginTop: 1 }}>
        {loading_api_response && <Loading isLoading={loading_api_response} />}
      </Grid>
      <Formik
        initialValues={{
          firstName: "",
          surName: "",
          email: "",
          phone: 1,
          phoneCountryCode: "",
          specialRequests: "",
          ReceiveSmsMarketing: false,
          ReceiveEmailMarketing: false,
          ReceiveRestaurantSmsMarketing: false,
          ReceiveRestaurantEmailMarketing: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading_api_response(true);
          console.log(values, dataSection1, CurrentPromotion?.Id);
          await handleSubmit(dataSection1, values, CurrentPromotion?.Id);
          values.firstName = "";
          values.surName = "";
          values.email = "";
          values.phone = 1;
          values.phoneCountryCode = "";
          values.specialRequests = "";
          values.ReceiveSmsMarketing = false;
          values.ReceiveEmailMarketing = false;
          values.ReceiveRestaurantSmsMarketing = false;
          values.ReceiveRestaurantEmailMarketing = false;
          setVisitTime("");
          setCurrentPromotion("");
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
                label={"FirstName"}
                type={"text"}
                placeholder="FirstName"
                fullWidth={true}
                onChange={handleChange("firstName")}
                value={values.firstName}
                name={"firstName"}
                required={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ marginRight: 1 }}>
                      <AccountBoxIcon />
                    </InputAdornment>
                  ),
                }}
                error={
                  errors.firstName && touched.firstName ? errors.firstName : ""
                }
              />
            </Grid>
            <Grid item xs={12} sx={{ margin: 1 }}>
              <TextInput
                label={"SurName"}
                type={"text"}
                placeholder="SurName"
                fullWidth={true}
                onChange={handleChange("surName")}
                value={values.surName}
                name={"surName"}
                required={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ marginRight: 1 }}>
                      <AccountBoxIcon />
                    </InputAdornment>
                  ),
                }}
                error={errors.surName && touched.surName ? errors.surName : ""}
              />
            </Grid>
            <Grid item xs={12} sx={{ margin: 1 }}>
              <TextInput
                label={"Email"}
                type={"text"}
                placeholder="Email"
                fullWidth={true}
                onChange={handleChange("email")}
                value={values.email}
                name={"email"}
                required={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ marginRight: 1 }}>
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                error={errors.email && touched.email ? errors.email : ""}
              />
            </Grid>
            <Grid item xs={12} sx={{ margin: 1 }}>
              <TextInput
                label={"Phone Country Code"}
                type={"text"}
                placeholder="Phone Country Code"
                fullWidth={true}
                onChange={handleChange("phoneCountryCode")}
                value={values.phoneCountryCode}
                name={"phoneCountryCode"}
                required={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ marginRight: 1 }}>
                      <DialpadIcon />
                    </InputAdornment>
                  ),
                }}
                error={
                  errors.phoneCountryCode && touched.phoneCountryCode
                    ? errors.phoneCountryCode
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sx={{ margin: 1 }}>
              <Grid item xs={12} display={"flex"}>
                <TextInput
                  label={"Phone Number"}
                  type={"number"}
                  placeholder="Phone Number"
                  fullWidth={true}
                  onChange={handleChange("phone")}
                  value={values.phone}
                  name={"phone"}
                  required={true}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ marginRight: 1 }}>
                        <ContactPhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={errors.phone && touched.phone ? errors.phone : ""}
                />
                <IconButton
                  aria-label="marketing"
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
                  placeholder="Marketing Options"
                  onClick={() => handleClickOpen()}
                >
                  <NotificationsActiveOutlinedIcon />
                </IconButton>
              </Grid>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Marketing options to customer</DialogTitle>
                <DialogContent>
                  <Grid>
                    <Grid>
                      <Typography>
                        Would you like to receive news and offers from{" "}
                        <strong>{Restaurant?.AccessedName}</strong>
                      </Typography>
                    </Grid>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleChange(
                              "ReceiveRestaurantEmailMarketing"
                            )}
                            id={"ReceiveRestaurantEmailMarketingId"}
                            value={
                              values.ReceiveRestaurantEmailMarketing
                                ? true
                                : false
                            }
                            name={"ReceiveRestaurantEmailMarketing"}
                          />
                        }
                        label="Email"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            id={"ReceiveRestaurantEmailMarketingId"}
                            onChange={handleChange(
                              "ReceiveRestaurantSmsMarketing"
                            )}
                            value={
                              values.ReceiveRestaurantSmsMarketing
                                ? true
                                : false
                            }
                            name={"ReceiveRestaurantSmsMarketing"}
                          />
                        }
                        label="SMS"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid>
                    <Grid>
                      <Typography>
                        Would you like to receive news and offers from{" "}
                        <strong>{Restaurant?.Name}</strong>
                      </Typography>
                    </Grid>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleChange("ReceiveEmailMarketing")}
                            value={values.ReceiveEmailMarketing ? true : false}
                            name={"ReceiveEmailMarketing"}
                            id={"ReceiveEmailMarketingId"}
                          />
                        }
                        label="Email"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleChange("ReceiveSmsMarketing")}
                            value={values.ReceiveSmsMarketing ? true : false}
                            name={"ReceiveSmsMarketing"}
                            id={"ReceiveSmsMarketingId"}
                          />
                        }
                        label="SMS"
                      />
                    </FormGroup>
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
                    Cancel
                  </Button>
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
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item xs={12} sx={{ margin: 1 }}>
              <TextInput
                rows={5}
                multiline={true}
                label={"Special Requests"}
                type={"text"}
                placeholder="Special Requests"
                fullWidth={true}
                onChange={handleChange("specialRequests")}
                value={values.specialRequests}
                name={"specialRequests"}
                required={false}
                error={
                  errors.specialRequests && touched.specialRequests
                    ? errors.specialRequests
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sx={{ margin: 1 }}>
              <Button
                variant="outlined"
                disabled={
                  !values.firstName ||
                  !values.surName ||
                  !values.email ||
                  !values.phone ||
                  !values.phoneCountryCode
                }
                onClick={() => {
                  handleSubmit();
                }}
                sx={{
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
                Submit
              </Button>
            </Grid>
          </Grid>
        )}
      </Formik>
      {success && (
        <Modal
          open={success}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid
            container
            sx={(modalStyle, { backgroundColor: "#3AB37C" })}
            textAlign="center"
            justifyContent={"center"}
            direction="column"
          >
            <Alert
              severity="success"
              sx={{
                backgroundColor: "transparent",
                color: "#fff",
                fontSize: 14,
                fontWeight: "bold",
                letterSpacing: 0.5,
              }}
            >
              {message}
            </Alert>
          </Grid>
        </Modal>
      )}
      {inputError && (
        <Modal
          open={inputError}
          onClose={handleCloseFailModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid
            container
            sx={(modalStyle, { backgroundColor: "#b2102f" })}
            textAlign="center"
            justifyContent={"center"}
            direction="column"
          >
            <Alert
              severity="error"
              sx={{
                backgroundColor: "transparent",
                color: "#fff",
                fontSize: 14,
                fontWeight: "bold",
                letterSpacing: 0.5,
              }}
            >
              {message}
            </Alert>
          </Grid>
        </Modal>
      )}
    </Grid>
  );
}
