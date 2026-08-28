import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login/Login";
import Users from "../pages/Users/Users";

function Home() {
  return <h1>Home</h1>;
}

function Posts() {
  return <h1>Posts</h1>;
}

function ListPosts() {
  return <h1>Lista de Posts</h1>;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Páginas que usam Sidebar + Footer */}
        <Route element={<MainLayout />}>

          <Route path="/home" element={<Home />} />

          <Route path="/posts" element={<Posts />} />

          <Route path="/manage-users" element={<Users />} />

        </Route>

        <Route path="/listar" element={<ListPosts />} />

        {/* Página inexistente */}
        <Route
          path="*"
          element={<h1>Página não encontrada</h1>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;