import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout.tsx";
import { lazy } from "react";
import { useAuth } from "../firebase/authContext.tsx";
import PageLoader from "../loaders/PageLoader.tsx";

const HomePage = lazy(() => import("../pages/HomePage.tsx"));

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
