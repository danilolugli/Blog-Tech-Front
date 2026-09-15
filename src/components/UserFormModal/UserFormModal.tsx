import { useEffect, useState, useRef } from "react";
import type { FormEvent } from "react";
import styles from "./UserFormModal.module.css";
import { toast } from "react-toastify";
import { getUserByIdController } from "../../pages/Users/Users.controller";

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
  const [isClosing, setIsClosing] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const touchStartY = useRef(0);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setTranslateY(0);
    }, 300);
  };

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
    setIsClosing(false);
    setTranslateY(0);

    if (!isEditing || !userId) {
      return;
    }

    setLoading(true);

    getUserByIdController(userId)
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

    if (!nome.trim() || !email.trim() || !cpf.trim() || !perfil || saving) {
      return;
    }

    setSaving(true);

    try {
      await onSubmit({ nome, email, cpf, perfil }, userId);

      toast.success(
        isEditing
          ? "Usuário atualizado com sucesso!"
          : "Usuário criado com sucesso!"
      );

      handleClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.warning(error.message);
      } else {
        toast.error(
          "Infelizmente tivemos um erro na conexão com a API. Tente novamente."
        );
      }
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

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.scrollTop === 0) {
        touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === 0) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    if (diff > 0) {
      setTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY.current === 0) return;
    if (translateY > 100) {
      handleClose();
    } else {
      setTranslateY(0);
    }
    touchStartY.current = 0;
  };

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.fadeOut : ''}`}
      onClick={(event) => {
        if (event.target === event.currentTarget && !saving) {
          handleClose();
        }
      }}
    >
      <div 
        className={`${styles.modal} ${isClosing ? styles.slideDown : ''}`}
        style={{ transform: translateY > 0 ? `translateY(${translateY}px)` : undefined, transition: translateY > 0 ? 'none' : 'transform 0.3s ease-out' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
                onClick={handleClose}
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
                    : "Criar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}