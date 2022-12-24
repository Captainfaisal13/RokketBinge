import React from "react";
import { Pagination } from "@mui/material";

const Pages = ({ page, setPage, count }) => {
  return (
    <Pagination
      variant="outlined"
      sx={{ button: { color: "#ffffff", borderColor: "white" } }}
      count={count}
      color="primary"
      page={page}
      onChange={(e, n) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setPage(n);
      }}
    />
  );
};

export default Pages;
