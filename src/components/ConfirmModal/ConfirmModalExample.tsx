import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";

export function PostCardExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeletePost() {
    setIsDeleting(true);
    try {
      // await api.delete(`/posts/${postId}`)
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Excluir post</button>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Excluir Post?"
        message="Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        isLoading={isDeleting}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDeletePost}
      />
    </>
  );
}