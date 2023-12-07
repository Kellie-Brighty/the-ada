import React from "react";
import Header from "./components/Header";
import HeroSection from "./pages/HeroSection";
import { Route, Routes } from "react-router-dom";
import Stakepage from "./pages/Stakepage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <>
      {/* <NetworkSwitch open={openNetworkSwitch} setOpen={setOpenNetworkSwitch} /> */}
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/stake" element={<Stakepage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </>
  );
}

export default App;
