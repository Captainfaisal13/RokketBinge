// import React from "react";
import { TextField, IconButton } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import SearchIcon from "@mui/icons-material/Search";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MovieSearch from "./moviesSearch";
import SeriesSearch from "./seriesSearch";

const Search = () => {
  const [search, setSearch] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [value, setValue] = React.useState("1");
  const [page, setPage] = React.useState(1);

  const handleChange = (event, newValue) => {
    if (search) {
      setPage(1);
    }
    setValue(newValue);
  };

  return (
    <section className=" text-white font-gudea font-bold bg-gradient-to-r from-[#000] to-[#283747] mt-16 pb-24">
      <div className="xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-xl mx-auto s:max-w-sm xs:max-w-l xs:px-10 xs:pt-5 min-h-screen">
        <h1 className="xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl s:text-3xl xs:text-xl text-left pt-10 pl-5 pb-3 xs:pb-2 xs:pl-0 xs:pt-0">
          Search
        </h1>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            if (search.length > 0) {
              setPage(1);
              setQuery(search);
            }
          }}
          className="flex gap-4 pl-5 xs:pl-0"
        >
          <TextField
            // autocomplete="off"
            placeholder="Search Your Shows"
            style={{ border: "white", color: "white" }}
            // color="success"
            fullWidth
            id="standard-bare"
            variant="outlined"
            inputProps={{
              style: {
                color: "white",
              },
            }}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchRounded style={{ color: "#848484" }} />
                </IconButton>
              ),
            }}
            sx={{
              "& fieldset": { border: "none" },
            }}
            onChange={(e) => {
              setSearch(e.target.value);
              // console.log(search);
            }}
          />
          <button className=" bg-white py-4 px-8 rounded-lg">
            <SearchIcon className=" text-[#111622]" />
          </button>
        </form>
        <Box
          sx={{ width: "100%", typography: "body1" }}
          className="pl-5 xs:pl-0"
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "transparent" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  style={{ color: "white" }}
                  label="Search Movies"
                  value="1"
                />
                <Tab
                  style={{ color: "white" }}
                  label="Search Series"
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel sx={{ padding: "0" }} value="1">
              {query && (
                <MovieSearch query={query} setPage={setPage} page={page} />
              )}
            </TabPanel>
            <TabPanel value="2">
              {query && (
                <SeriesSearch query={query} setPage={setPage} page={page} />
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </section>
  );
};

export default Search;
