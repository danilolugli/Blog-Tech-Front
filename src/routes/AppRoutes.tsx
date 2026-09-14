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
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
 
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>               
            <Route path="/home" element={<ListarPosts />} />
            <Route path="/post-detalhe/:id" element={<PostDetalhe />} />

            <Route element={<ProtectedRoute allowedRoles={["2", "3"]} />}>
              <Route path="/manager-posts" element={<PostManager/>} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["3"]} />}>
              <Route path="/manager-users" element={<Users />} />
            </Route>
          </Route>
        </Route>

        <Route
          path="*"
          element={<Login />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;