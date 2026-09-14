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
  const token = sessionStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Rota inicial */}
        <Route path="/" element={<Login/>} />

        {/* Página de login */}
        <Route path="/login" element={<Login />} />
 
        { token && 
          (<Route element={<MainLayout />} >               

          <Route path="/home" element={<ListarPosts />} />

          <Route path="/post-detalhe/:id" element={<PostDetalhe />} />

          <Route path="/manager-users" element={<Users />} />

          <Route path="/manager-posts" element={<PostManager/>} />

        {/* Página inexistente */}
        </Route>)}

        <Route
          path="*"
          element={<Login />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;