import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import styles from "./UserFormModal.module.css";

interface UserFormModalProps {
  isOpen: boolean;
  userId?: string;
  onClose: () => void;

  onSubmit: (
    values: {
      nome: string;
      email: string;
      cpf: string;
      perfil: string;
    },
    userId?: string
  ) => Promise<void> | void;
}

export function UserFormModal({
  isOpen,
  userId,
  onClose,
  onSubmit,
}: UserFormModalProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [perfil, setPerfil] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!userId;

  const perfis = [
    "Aluno",
    "Professor",
    "Administrador",
  ];

  // Limpa o formulário e carrega o usuário caso seja edição
  useEffect(() => {
    if (!isOpen) return;

    setNome("");
    setEmail("");
    setCpf("");
    setPerfil("");
    setError("");

    if (!isEditing || !userId) {
      return;
    }

    setLoading(true);

    fetch(`/usuarios/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o usuário.");
        }

        return response.json();
      })
      .then((user) => {
        setNome(user.nome);
        setEmail(user.email);
        setCpf(user.cpf);
        setPerfil(user.perfil);
      })
      .catch(() => {
        setError("Não foi possível carregar o usuário.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isOpen, isEditing, userId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !nome.trim() ||
      !email.trim() ||
      !cpf.trim() ||
      !perfil ||
      saving
    ) {
      return;
    }

    setSaving(true);

    try {
      await onSubmit(
        {
          nome,
          email,
          cpf,
          perfil,
        },
        userId
      );

      onClose();
    } catch {
      setError("Não foi possível salvar o usuário.");
    } finally {
      setSaving(false);
    }
  }

  const formIsValid =
    nome.trim() !== "" &&
    email.trim() !== "" &&
    cpf.trim() !== "" &&
    perfil !== "";

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div className={styles.modal}>
        <h2>
          {isEditing ? "Editar Usuário" : "Criar Usuário"}
        </h2>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {loading ? (
          <p>Carregando usuário...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="nome">
                Nome do Usuário
              </label>

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(event) =>
                  setNome(event.target.value)
                }
                placeholder="Digite o nome do usuário..."
                disabled={saving}
                autoFocus
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">
                E-mail do Usuário
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Digite o e-mail do usuário..."
                disabled={saving}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="cpf">
                CPF do Usuário
              </label>

              <input
                id="cpf"
                type="text"
                value={cpf}
                onChange={(event) =>
                  setCpf(event.target.value)
                }
                placeholder="Digite o CPF do usuário..."
                disabled={saving}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="perfil">
                Perfil
              </label>

              <select
                id="perfil"
                value={perfil}
                onChange={(event) =>
                  setPerfil(event.target.value)
                }
                disabled={saving}
              >
                <option value="">
                  Selecione um perfil
                </option>

                {perfis.map((perfil) => (
                  <option key={perfil} value={perfil}>
                    {perfil}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
                disabled={saving}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={!formIsValid || saving}
              >
                {saving
                  ? "Salvando..."
                  : isEditing
                  ? "Salvar Alterações"
                  : "Salvar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}