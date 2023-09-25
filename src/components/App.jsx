import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import Incoming from "./Incoming";
import Outgoing from "./Outgoing";
import Reset from "./Reset";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Dashboard />} />
        <Route path="incoming" element={<Incoming />} />
        <Route path="incoming/:folderId" element={<Incoming />} />
        <Route path="outgoing" element={<Outgoing />} />
        <Route path="outgoing/:folderId" element={<Outgoing />} />
        <Route path="login" element={<Auth type="login" />} />
        <Route path="register" element={<Auth type="register" />} />
        <Route path="reset" element={<Reset />} />
      </Route>
    </Routes>
  );
}

export default App;
