import { Route, Routes } from "react-router";
import AppLayout from "./pages/appLayout/AppLayout";
import Movies from "./pages/myMovies/Movies";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Movies />} />
      </Route>
    </Routes>
  );
}
