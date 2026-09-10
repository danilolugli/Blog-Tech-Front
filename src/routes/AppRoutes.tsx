import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login/Login";
import Users from "../pages/Users/Users";
import ListarPosts from "../pages/Aluno/ListarPosts";
import PostDetalhe from "../pages/Aluno/PostDetalhe";
import PostManager from "../pages/PostManager/PostManager";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Páginas que usam Sidebar */}
        <Route element={<MainLayout />}>

          <Route path="/home" element={<ListarPosts />} />

          {/* <Route path="/manage-posts" element={<ManagePosts />} /> */}

          <Route path="/post-detalhe" element={<PostDetalhe />} />

          <Route path="/manager-users" element={<Users />} />

          <Route path="/manager-posts" element={<PostManager/>} />

        </Route>


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