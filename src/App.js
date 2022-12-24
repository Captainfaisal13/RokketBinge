import Heading from "./components/heading";
import BottonNav from "./components/bottomnav";
import Movies from "./components/movies";
import Series from "./components/series";
import Trending from "./components/trending";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Home from "./components/home";
import Search from "./components/search";
import Item from "./components/item";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Gudea", "Gudea"],
    },
  });
  return (
    <BrowserRouter>
      <Heading />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Trending />} />
          <Route path="movies" element={<Movies />} />
          <Route path="series" element={<Series />} />
          <Route path="search" element={<Search />} />
          <Route path=":type/:id" element={<Item />} />
        </Route>
      </Routes>
      <ThemeProvider theme={theme}>
        <BottonNav />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
