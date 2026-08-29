import { useState } from "react";
import "./Users.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { UserFormModal } from "../../components/UserFormModal/UserFormModal";

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
    email: "lucas.andrade@gmail.com",
    role: "Aluno",
  },
  {
    id: 5,
    name: "Juliana Santos",
    email: "juliana.santos@gmail.com",
    role: "Aluno",
  },
  {
    id: 6,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@gmail.com",
    role: "Aluno",
  },
];

function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos os Papéis");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const filteredUsers = usersList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "Todos os Papéis" ||
      user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Abrir modal para criar usuário
  function handleAddUser() {
    setSelectedUserId(undefined);
    setIsModalOpen(true);
  }

  // Abrir modal para editar usuário
  function handleEditUser(id: number) {
    setSelectedUserId(String(id));
    setIsModalOpen(true);
  }

  // Salvar usuário
  async function handleSaveUser(
    values: {
      nome: string;
      email: string;
      cpf: string;
      perfil: string;
    },
    userId?: string
  ) {
    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    console.log(
      userId
        ? "Editando usuário"
        : "Criando usuário",
      userId,
      values
    );
  }

  // Abre confirmação de exclusão
  function handleDeleteUser(id: number) {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  }

  // Confirma exclusão
  async function confirmDeleteUser() {
    if (userToDelete === null) {
      return;
    }

    setIsDeleting(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      console.log("Excluir usuário:", userToDelete);

      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="users-page">

      <div className="users-header">
        <div className="users-title">
          <h1>Gerenciar Usuários</h1>

          <p>
            Administre professores, adicione novos
            educadores ou estudantes.
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
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <select
          value={roleFilter}
          onChange={(event) =>
            setRoleFilter(event.target.value)
          }
        >
          <option>Todos os Papéis</option>
          <option>Professor</option>
          <option>Aluno</option>
        </select>
      </div>

      {/* Modal de criar / editar */}
      <UserFormModal
        isOpen={isModalOpen}
        userId={selectedUserId}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveUser}
      />

      {/* Modal de confirmação de exclusão */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Excluir Usuário?"
        message="Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        isLoading={isDeleting}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={confirmDeleteUser}
      />

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
                      onClick={() =>
                        handleEditUser(user.id)
                      }
                      title="Editar usuário"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        handleDeleteUser(user.id)
                      }
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
                <td
                  colSpan={4}
                  className="empty-state"
                >
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