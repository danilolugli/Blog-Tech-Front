import { useState } from "react";
import "./PostManager.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { PostFormModal } from "../../components/PostFormModal/PostFormModal";
import {
    createPostController,
    deletePostController,
    editPostController,
    usePostsPage,
    type PostFormValues,
} from "./PostManager.controller";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 5;

function PostManager() {
    const {
        postsList,
        isLoading,
        loadError,
        search,
        setSearch,
        currentPage,
        goToPreviousPage,
        goToNextPage,
        reloadPosts,
    } = usePostsPage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string>();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);

    const [isDeleting, setIsDeleting] = useState(false);

    const MESES_ABREVIADOS = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez",
    ];

    function handleAddPost() {
        setSelectedPostId(undefined);
        setIsModalOpen(true);
    }

    function handleEditPost(id: number) {
        setSelectedPostId(String(id));
        setIsModalOpen(true);
    }

    async function handleSavePost(
        values: { title: string; content: string; subject: string },
        postId?: string
    ) {
        const postValues: PostFormValues = {
            titulo: values.title,
            conteudo: values.content,
            disciplina: values.subject,
        };

        if (postId) {
            await editPostController(Number(postId), postValues);
        } else {
            await createPostController(postValues);
        }

        await reloadPosts();
    }

    function handleDeletePost(id: number) {
        setPostToDelete(id);
        setIsDeleteModalOpen(true);
    }

    async function confirmDeletePost() {
        if (postToDelete === null) return;

        setIsDeleting(true);

        try {
            await deletePostController(postToDelete);
            toast.success("Post excluído com sucesso!");

            setIsDeleteModalOpen(false);
            setPostToDelete(null);

            await reloadPosts();
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

    const isLastPage = postsList.length < ITEMS_PER_PAGE;

    function formatarData(isoDate: string): string {
        const data = new Date(isoDate);

        const dia = data.getDate();
        const mes = MESES_ABREVIADOS[data.getMonth()];
        const ano = data.getFullYear();

        return `${dia} de ${mes}, ${ano}`;
    }

    return (
        <div className="post-page">
            <div className="post-header">
                <div className="post-title">
                    <h1>Gerenciar Posts</h1>
                    <p>Acompanhe, edite ou remova as publicações do Blog</p>
                </div>

                <button type="button" className="add-post-button" onClick={handleAddPost}>
                    <span>+</span>
                    Novo
                </button>
            </div>

            <div className="post-filters">
                <div className="search-box">
                    <span className="search-icon">⌕</span>
                    <input
                        type="text"
                        placeholder="Buscar por título..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
            </div>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Excluir Post?"
                message="Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita."
                confirmText="Excluir"
                cancelText="Cancelar"
                variant="danger"
                isLoading={isDeleting}
                onCancel={() => {
                    setIsDeleteModalOpen(false);
                    setPostToDelete(null);
                }}
                onConfirm={confirmDeletePost}
            />

            <PostFormModal
                isOpen={isModalOpen}
                postId={selectedPostId}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSavePost}
            />

            <div className="post-table-container">
                {isLoading && <p className="empty-state">Carregando Posts...</p>}
                {!isLoading && loadError && <p className="empty-state">{loadError}</p>}

                {!isLoading && !loadError && (
                    <>
                        <table className="post-table">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Autor</th>
                                    <th>Data de Publicação</th>
                                    <th>Disciplina</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {postsList.map((post) => (
                                    <tr key={post.id}>
                                        <td>{post.titulo}</td>
                                        <td>{post.autor}</td>
                                        <td>{formatarData(post.dataCriacao)}</td>
                                        <td>{post.disciplina}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    type="button"
                                                    className="edit-button"
                                                    onClick={() => handleEditPost(post.id)}
                                                    title="Editar post"
                                                >
                                                    <FontAwesomeIcon icon={faPen} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="delete-button"
                                                    onClick={() => handleDeletePost(post.id)}
                                                    title="Excluir post"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {postsList.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="empty-state">
                                            Nenhum post encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {postsList.length > 0 && (
                            <div className="pagination">
                                <button type="button" onClick={goToPreviousPage} disabled={currentPage === 1}>
                                    Anterior
                                </button>
                                <span className="pagination-info">Página {currentPage}</span>
                                <button type="button" onClick={goToNextPage} disabled={isLastPage}>
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

export default PostManager;