import "./App.css";
import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import ResearchPage from "./pages/ResearchPage";
import SearchResultPage from "./pages/SearchResultPage";
import MyDrawer from "./components/MyDrawer";
import { ThemeProvider } from "@mui/material/styles";
import myTheme from "./Theme";

// Create a new context
export const mysearchContext = createContext();

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTypechecked, setSearchTypechecked] = useState(false);
  return (
    // theme is default prop name here
    <ThemeProvider theme={myTheme}>
      <mysearchContext.Provider
        value={{
          searchTerm,
          setSearchTerm,
          searchTypechecked,
          setSearchTypechecked,
        }}
      >
        <Routes>
          <Route path="/" element={<MyDrawer />}>
            {/* Nested routes */}
            <Route index element={<ResearchPage />} />
            <Route path="/researchpage" element={<ResearchPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/searchResultPage" element={<SearchResultPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </mysearchContext.Provider>
    </ThemeProvider>
  );
}

export default App;
