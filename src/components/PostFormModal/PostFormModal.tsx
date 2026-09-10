import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import styles from "./PostFormModal.module.css";
import { getPostByIdController } from "../../pages/PostManager/PostManager.controller";

interface PostFormModalProps {
  isOpen: boolean;
  postId?: string;
  onClose: () => void;
  onSubmit: (
    values: {
      title: string;
      content: string;
      subject: string;
    },
    postId?: string
  ) => Promise<void> | void;
}

interface UsuarioLogado {
  nome: string;
}

function getLoggedUserName(): string {
  const raw = sessionStorage.getItem("usuario");

  if (!raw) {
    return "";
  }

  const usuario: UsuarioLogado = JSON.parse(raw);
  return usuario.nome;
}

export function PostFormModal({
  isOpen,
  postId,
  onClose,
  onSubmit,
}: PostFormModalProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!postId;
  const authorName = getLoggedUserName();

  const subjects = [
    "Matemática", "Português", "Literatura", "Redação", "Inglês",
    "Espanhol", "História", "Geografia", "Filosofia", "Sociologia",
    "Física", "Química", "Biologia", "Ciências", "Artes",
    "Educação Física", "Informática", "Programação", "Robótica",
    "Educação Financeira",
  ];

  
  useEffect(() => {
    if (!isOpen) return;

    setTitle("");
    setSubject("");
    setContent("");
    setError("");

    if (!isEditing || !postId) {
        return;
    }

    setLoading(true);

    getPostByIdController(postId)
        .then((post) => {
            setTitle(post.title);
            setSubject(post.subject);
            setContent(post.content);
        })
        .catch(() => {
            setError("Não foi possível carregar o post.");
        })
        .finally(() => {
            setLoading(false);
        });
}, [isOpen, isEditing, postId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !subject || !content.trim() || saving) {
      return;
    }

    setSaving(true);

    try {
      await onSubmit({ title, subject, content }, postId);
      onClose();
    } catch {
      setError("Não foi possível salvar o post.");
    } finally {
      setSaving(false);
    }
  }

  const formIsValid =
    title.trim() !== "" && subject !== "" && content.trim() !== "";

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
        <h2>{isEditing ? "Editar Conteúdo" : "Criar Conteúdo"}</h2>

        {error && <div className={styles.error}>{error}</div>}

        {loading ? (
          <p>Carregando post...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="title">Título do Post</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Digite o título do post..."
                disabled={saving}
                autoFocus
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="subject">Matéria</label>
              <select
                id="subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                disabled={saving}
              >
                <option value="">Selecione uma matéria</option>
                {subjects.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="author">Autor</label>
              <input id="author" type="text" value={authorName} disabled />
            </div>

            <div className={styles.field}>
              <label htmlFor="content">Conteúdo do Post</label>
              <textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Escreva o conteúdo do seu post..."
                disabled={saving}
              />
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
                  : "Publicar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}