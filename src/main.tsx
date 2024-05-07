import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import Home from "./pages/index.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero.tsx";
import ExtractPage from "./pages/extractPage";
import ResizePage from "./pages/resizePdf";
import MergePdf from "./pages/mergePdf";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home}>
          <Route path="" Component={Hero} />
        </Route>
        <Route path="pages" Component={Home}>
          <Route path="extract" Component={ExtractPage} />
          <Route path="delete" Component={ExtractPage} />
        </Route>
        <Route path="/pdf" Component={Home}>
          <Route path="resize" Component={ResizePage} />
          <Route path="merge" Component={MergePdf} />
        </Route>
        <Route path="*" element={<div>404 page not found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
