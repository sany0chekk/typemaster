import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout.tsx";
import { lazy } from "react";

const HomePage = lazy(() => import("../pages/HomePage.tsx"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
