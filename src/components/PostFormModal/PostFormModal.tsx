import { useEffect, useState } from "react";
import type { FormEvent } from "react"
import styles from "./PostFormModal.module.css";

interface PostFormModalProps {
  postId?: string;
  authorName: string;
  onSubmit: (
    values: {
      title: string;
      content: string;
      subject: string;
    },
    postId?: string
  ) => Promise<void> | void;
}

export function PostFormModal({
  postId,
  authorName,
  onSubmit,
}: PostFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!postId;

  const subjects = [
    "Matemática",
    "Português",
    "Literatura",
    "Redação",
    "Inglês",
    "Espanhol",
    "História",
    "Geografia",
    "Filosofia",
    "Sociologia",
    "Física",
    "Química",
    "Biologia",
    "Ciências",
    "Artes",
    "Educação Física",
    "Informática",
    "Programação",
    "Robótica",
    "Educação Financeira",
  ];

  // Abre o modal e, caso seja edição, busca os dados do post
  useEffect(() => {
  if (!isOpen || !isEditing || !postId) return;

  fetch(`/posts/${postId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar o post.");
      }

      return response.json();
    })
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

  function openModal(value: boolean) {
    if (value) {
      setTitle("");
      setSubject("");
      setContent("");
      setError("");

      if (isEditing) {
        setLoading(true);
      }
    }

    setIsOpen(value);
  }

  // Salva o formulário
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !subject || !content.trim() || saving) {
      return;
    }

    setSaving(true);

    try {
      await onSubmit(
        {
          title,
          subject,
          content,
        },
        postId
      );

      openModal(false);
    } catch {
      setError("Não foi possível salvar o post.");
    } finally {
      setSaving(false);
    }
  }

  const formIsValid =
    title.trim() !== "" &&
    subject !== "" &&
    content.trim() !== "";

  return (
    <>
      <button
        type="button"
        className={styles.triggerButton}
        onClick={() => {
          openModal(true);
        }}
      >
        {isEditing ? "Editar Post" : "Novo Post"}
      </button>

      {isOpen && (
        <div
          className={styles.overlay}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              openModal(false);
            }
          }}
        >
          <div className={styles.modal}>
            <h2>
              {isEditing ? "Editar Conteúdo" : "Criar Conteúdo"}
            </h2>

            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            {loading ? (
              <p>Carregando post...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <label htmlFor="title">
                    Título do Post
                  </label>

                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                      setTitle(event.target.value)
                    }
                    placeholder="Digite o título do post..."
                    disabled={saving}
                    autoFocus
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="subject">
                    Matéria
                  </label>

                  <select
                    id="subject"
                    value={subject}
                    onChange={(event) =>
                      setSubject(event.target.value)
                    }
                    disabled={saving}
                  >
                    <option value="">
                      Selecione uma matéria
                    </option>

                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="author">
                    Autor
                  </label>

                  <input
                    id="author"
                    type="text"
                    value={authorName}
                    disabled
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="content">
                    Conteúdo do Post
                  </label>

                  <textarea
                    id="content"
                    value={content}
                    onChange={(event) =>
                      setContent(event.target.value)
                    }
                    placeholder="Escreva o conteúdo do seu post..."
                    disabled={saving}
                  />
                </div>

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => {
                      openModal(false);
                    }}
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
      )}
    </>
  );
}