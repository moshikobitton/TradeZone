import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Audit from "./scenes/audit";
import Histogram from "./scenes/histogram";
import Bar from "./scenes/bar";
import News from "./scenes/news";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Network from "./scenes/network";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useCurrentTheme } from "./theme";
import Context from "./scenes/global/Context";
import Login from "./components/Login";
import Register from "./components/Register";
import Favorites from "./components/Favorites";
import TimelineComponent from "./scenes/timeline";

function App() {
  const [theme] = useCurrentTheme();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ThemeProvider theme={theme}>
      <Context>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/audit" element={<Audit />} />
              <Route path="/news" element={<News />} />
              <Route path="/register" element={<Register />} />
              <Route path="/histogram" element={<Histogram />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/network" element={<Network />} />
              <Route path="/login" element={<Login />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/timeline" element={<TimelineComponent />} />
            </Routes>
          </main>
        </div>
      </Context>
    </ThemeProvider>
  );
}

export default App;
