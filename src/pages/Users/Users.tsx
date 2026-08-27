import { useState } from "react";
import "./Users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Professor" | "Aluno";
}

const usersList: User[] = [
  {
    id: 1,
    name: "Prof. Mariana Lemos",
    email: "mariana.lemos@escola.edu.br",
    role: "Professor",
  },
  {
    id: 2,
    name: "Prof. Antônio Silva",
    email: "antonio.silva@escola.edu.br",
    role: "Professor",
  },
  {
    id: 3,
    name: "Profª. Clara Nunes",
    email: "clara.nunes@escola.edu.br",
    role: "Professor",
  },
  {
    id: 4,
    name: "Lucas Andrade",
    email: "lucas.andrade@escola.edu.br",
    role: "Aluno",
  },
  {
    id: 5,
    name: "Juliana Santos",
    email: "juliana.santos@escola.edu.br",
    role: "Aluno",
  },
  {
    id: 6,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@escola.edu.br",
    role: "Aluno",
  },
];

function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos os Papéis");

  const filteredUsers = usersList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "Todos os Papéis" ||
      user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  function handleAddUser() {
    console.log("Adicionar usuário");
  }

  function handleEditUser(id: number) {
    console.log("Editar usuário:", id);
  }

  function handleDeleteUser(id: number) {
    console.log("Excluir usuário:", id);
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <div className="users-title">
          <h1>Gerenciar Usuários</h1>

          <p>
            Administre professores, adicione novos educadores ou estudantes.
          </p>
        </div>

        <button
          type="button"
          className="add-user-button"
          onClick={handleAddUser}
        >
          <span>+</span>
          Adicionar Usuário
        </button>
      </div>

      <div className="users-filters">
        <div className="search-box">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          value={roleFilter}
          onChange={(event) => setRoleFilter(event.target.value)}
        >
          <option>Todos os Papéis</option>
          <option>Professor</option>
          <option>Aluno</option>
        </select>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Papel</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={`role-badge ${
                      user.role === "Professor"
                        ? "teacher"
                        : "student"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                        type="button"
                        className="edit-button"
                        onClick={() => handleEditUser(user.id)}
                        title="Editar usuário"
                        >
                        <FontAwesomeIcon icon={faPen} />
                    </button>

                    <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Excluir usuário"
                        >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="empty-state">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;