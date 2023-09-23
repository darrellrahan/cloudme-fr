import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import Reset from "./Reset";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Dashboard />} />
        <Route path="login" element={<Auth type="login" />} />
        <Route path="register" element={<Auth type="register" />} />
        <Route path="reset" element={<Reset />} />
        <Route path="folder/:folderId" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
