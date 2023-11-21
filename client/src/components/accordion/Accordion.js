import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import getSettingsApi from "../../api/settings";
import { Paper, Grid } from "@mui/material";
import TableServices from "../tables/TableServices";
import AppContext from "../../config/AppContext";

export default function SimpleAccordion() {
  const [policy, setPolicy] = React.useState("");
  const [settings, setSettings] = React.useState();
  const { ActualData_AccessedName } = React.useContext(AppContext);

  React.useEffect(() => {
    const getSettings = async () => {
      await getSettingsApi(ActualData_AccessedName).then((res) => {
        if (res?.data) {
          setSettings(res?.data);
          setPolicy(res?.data?.PrivacyPolicy);
        } else setPolicy("");
      });
    };
    getSettings();
  });

  return (
    <Paper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography fontWeight={700} fontSize={18}>
            Settings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid flexDirection={"row"} sx={{ margin: 1 }}>
            <Typography fontSize={14}>
              <strong>Max Online Party Size : </strong>
              {settings?.MaxOnlinePartySize}
            </Typography>
          </Grid>
          <Grid flexDirection={"row"} sx={{ margin: 1 }}>
            <Typography fontSize={14}>
              <strong>Min Online Party Size : </strong>
              {settings?.MinOnlinePartySize}
            </Typography>
          </Grid>
          <Grid flexDirection={"row"} sx={{ margin: 1 }}>
            <Typography fontSize={14}>
              <strong>Online Party Size Default : </strong>
              {settings?.OnlinePartySizeDefault}
            </Typography>
          </Grid>
          <Grid flexDirection={"row"} sx={{ margin: 1 }}>
            <Typography fontSize={14}>
              <strong>Maximum Function Party Size : </strong>
              {settings?.MaximumFunctionPartySize}
            </Typography>
          </Grid>
          <Grid flexDirection={"row"} sx={{ margin: 1 }}>
            <Typography fontSize={14}>
              <strong>Accept Bookings Days In Advance : </strong>
              {settings?.AcceptBookingsDaysInAdvance}
            </Typography>
          </Grid>
          <Grid flexDirection={"row"} sx={{ margin: 1 }}>
            <Typography fontSize={14}>
              <strong>Min Time Before Online Cut Off : </strong>
              {settings?.MinTimeBeforeOnlineCutOff}
            </Typography>
          </Grid>
          <Grid>
            <Typography fontSize={16} margin={2}>
              <strong>Services : </strong>
            </Typography>
            <TableServices rows={settings?.Services} />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight={700} fontSize={18}>
            Privacy policy
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {policy ? (
            <span>{policy}</span>
          ) : (
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}
