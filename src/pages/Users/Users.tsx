import { useState } from "react";
import "./Users.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { UserFormModal } from "../../components/UserFormModal/UserFormModal";
import { createUserController, deleteUserController, editUserController, useUsersPage } from "./Users.controller";
import { toast } from "react-toastify";

function Users() {
  const {
    isLoading,
    loadError,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    currentPage,
    totalPages,
    filteredUsers,
    paginatedUsers,
    goToPreviousPage,
    goToNextPage,
    reloadUsers
  } = useUsersPage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  function handleAddUser() {
    setSelectedUserId(undefined);
    setIsModalOpen(true);
  }

  function handleEditUser(id: number) {
    setSelectedUserId(String(id));
    setIsModalOpen(true);
  }

  async function handleSaveUser(
    values: { nome: string; email: string; cpf: string; perfil: string },
    userId?: string
  ) {
    if (userId) {
      await editUserController(userId, values);
    } else {
      await createUserController(values);
    }

    await reloadUsers();
  }

  function handleDeleteUser(id: number) {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  }

  async function confirmDeleteUser() {
    if (userToDelete === null) return;

    setIsDeleting(true);

    try {
      await deleteUserController(userToDelete);
      toast.success("Usuário excluído com sucesso!");

      setIsDeleteModalOpen(false);
      setUserToDelete(null);

      await reloadUsers();
    } catch (error) {
      if (error instanceof Error) {
        toast.warning(error.message);
      } else {
        toast.error(
          "Infelizmente tivemos um erro na conexão com a API. Tente novamente."
        );
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <div className="users-title">
          <h1>Gerenciar Usuários</h1>
          <p>Administre professores, adicione novos educadores ou estudantes.</p>
        </div>

        <button type="button" className="add-user-button" onClick={handleAddUser}>
          <span>+</span>
          Novo
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

        <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
          <option>Todos os Papéis</option>
          <option>Professor</option>
          <option>Aluno</option>
          <option>Administrador</option>
        </select>
      </div>

      <UserFormModal
        isOpen={isModalOpen}
        userId={selectedUserId}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveUser}
      />

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
        {isLoading && <p className="empty-state">Carregando usuários...</p>}
        {!isLoading && loadError && <p className="empty-state">{loadError}</p>}

        {!isLoading && !loadError && (
          <>
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
                {paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`role-badge ${user.role === "Professor" ? "teacher" : "student"
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

            {filteredUsers.length > 0 && (
              <div className="pagination">
                <button type="button" onClick={goToPreviousPage} disabled={currentPage === 1}>
                  Anterior
                </button>
                <span className="pagination-info">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  type="button"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Users;