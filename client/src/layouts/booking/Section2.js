import React from "react";

import { Grid, Typography } from "@mui/material/";

import getPromotions from "../../api/promotions.api";
import TablePromotions from "../../components/tables/Table";

export default function Section2({ Restaurant }) {
  const [allPromotions, setAllPromotions] = React.useState([]);

  React.useEffect(() => {
    const getAllPromotion = async () => {
      await getPromotions(Restaurant?.AccessedName).then((res) => {
        if (res?.data?.length > 0) {
          setAllPromotions(res?.data);
        } else {
          setAllPromotions([]);
        }
      });
    };
    getAllPromotion();
  }, []);

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
      <Grid
        sx={{
          px: { xs: 2, md: 7 },
          pb: { xs: 2, md: 3 },
          textAlign: "justify",
        }}
      >
        <Typography fontSize={18} fontWeight={700}>
          Promotions availables
        </Typography>
      </Grid>
      <Grid
        sx={{ px: { xs: 2, md: 5 }, pb: { xs: 2, md: 3 } }}
        container
        justifyContent="space-between"
      >
        <TablePromotions rows={allPromotions} />
      </Grid>
    </Grid>
  );
}
