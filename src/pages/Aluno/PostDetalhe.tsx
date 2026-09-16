import { useEffect, useState, useRef } from 'react';
import Comentario from '../../components/Comentario/Comentario';
import './PostDetalhe.css';
import { listarPostsPorId } from './Posts.controller';
import { useParams, useNavigate } from 'react-router-dom';
import { criarComentario, listarComentarios, editarComentario, excluirComentario } from './Comentario.controller';
import { getUserById } from '../../services/Users/usersService';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPen, faTrash, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';
import { PostFormModal } from '../../components/PostFormModal/PostFormModal';
import { editPostController, deletePostController } from '../PostManager/PostManager.controller';

export interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  disciplina: string;
  data_criacao: string;
  data_atualizacao: string;
  autor: string;
}

export interface Comentario {
    id: number,
    conteudo: string,
    post_id: number,
    data_criacao: string,
    data_atualizacao: string,
    autor: string
}

export interface User {
    id: number,
    nome: string,
    email: string,
    senha: string,
    perfil_id: string,
    cpf: string
}

const PostDetalhe: React.FC = () =>  {
    const [post, setPost] = useState<Post>();
    const { id: postId } = useParams();
    const navigate = useNavigate();
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [campoComentario, setCampoComentario] = useState("");
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuario") || "{}");
    const perfilLogado = sessionStorage.getItem("perfil");
    const [user, setUser] = useState<User>();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const podeEditarPost = perfilLogado === "3" || (perfilLogado === "2" && Number(post?.autor) === usuarioLogado?.id);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    async function handleSavePost(values: { title: string; content: string; subject: string }, id?: string) {
        if (!id) return;
        try {
            await editPostController(Number(id), { titulo: values.title, conteudo: values.content, disciplina: values.subject });
            toast.success("Post atualizado com sucesso!");
            buscarPostPorId(Number(id));
            setIsEditModalOpen(false);
        } catch (error) {
            toast.error("Erro ao atualizar post.");
        }
    }

    async function confirmDeletePost() {
        setIsDeleting(true);
        try {
            await deletePostController(Number(postId));
            toast.success("Post excluído com sucesso!");
            navigate(-1);
        } catch (error) {
            toast.error("Erro ao excluir post.");
        } finally {
            setIsDeleting(false);
            setIsDeleteModalOpen(false);
        }
    }

    useEffect(() =>  {
        buscarPostPorId(Number(postId));
        buscarComentariosPorPostId(Number(postId));
    },[])
    
    async function buscarPostPorId(id: number) {
        try {
            const response = await listarPostsPorId(id);
            setPost(response);
            if (response?.autor) {
                buscarUserPorId(Number(response.autor));
            }
        } catch (error) {
            console.error("Erro ao buscar post por id:", error);
        }
    }

    async function buscarComentariosPorPostId(id: number) {
        try {
            const response = await listarComentarios(id);
            setComentarios(response);

        } catch (error) {
            console.error("Erro ao buscar comentários por postId:", error);
        }
    }

    async function enviarComentario(conteudo: string, post_id: number) { 
        try {
            const comentario = {conteudo, post_id, autor_id: usuarioLogado?.id}
            await criarComentario(comentario);
            await buscarComentariosPorPostId(Number(postId));
            setCampoComentario("")
            toast.success("Comentário criado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar comentário:", error);
        }
    }

    async function buscarUserPorId(autorId: number) {
        try {
            const response = await getUserById(autorId);
            setUser(response)

        } catch (error) {
            console.error("Erro ao buscar usuário por id:", error);
        }
    }

    async function handleEditarComentario(id: number, novoConteudo: string) {
        try {
            await editarComentario(id, novoConteudo);
            toast.success("Comentário editado com sucesso!");
            buscarComentariosPorPostId(Number(postId));
        } catch (error) {
            console.error("Erro ao editar comentário", error);
            toast.error("Erro ao editar o comentário.");
        }
    }

    async function handleExcluirComentario(id: number) {
        try {
            await excluirComentario(id, usuarioLogado?.id);
            toast.success("Comentário excluído com sucesso!");
            buscarComentariosPorPostId(Number(postId));
        } catch (error) {
            console.error("Erro ao excluir comentário", error);
            toast.error("Erro ao excluir o comentário.");
        }
    }

function parseInlineMarkdown(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let lastIdx = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIdx) {
            parts.push(text.slice(lastIdx, match.index));
        }
        const token = match[0];
        if (token.startsWith("**") && token.endsWith("**")) {
            parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
        } else if (token.startsWith("*") && token.endsWith("*")) {
            parts.push(<em key={key++}>{token.slice(1, -1)}</em>);
        }
        lastIdx = regex.lastIndex;
    }
    if (lastIdx < text.length) {
        parts.push(text.slice(lastIdx));
    }
    return parts.length > 0 ? parts : [text];
}

function renderFormattedContent(content: string) {
    if (!content) return null;

    const lines = content.split(/\r?\n/);
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    function flushList() {
        if (currentList.length > 0) {
            elements.push(
                <ul key={`ul-${elements.length}`} className="postBulletList">
                    {currentList.map((item, idx) => (
                        <li key={idx}>{parseInlineMarkdown(item)}</li>
                    ))}
                </ul>
            );
            currentList = [];
        }
    }

    lines.forEach((rawLine, idx) => {
        const line = rawLine.trim();

        if (line.startsWith("* ") || line.startsWith("- ")) {
            currentList.push(line.slice(2));
            return;
        }

        flushList();

        if (!line) {
            return;
        }

        if (line.startsWith("### ")) {
            elements.push(
                <h3 key={`h3-${idx}`} className="postHeading3">
                    {line.slice(4)}
                </h3>
            );
        } else if (line.startsWith("## ")) {
            elements.push(
                <h2 key={`h2-${idx}`} className="postHeading2">
                    {line.slice(3)}
                </h2>
            );
        } else if (line.startsWith("# ")) {
            elements.push(
                <h1 key={`h1-${idx}`} className="postHeading1">
                    {line.slice(2)}
                </h1>
            );
        } else if (line === "---" || line === "***") {
            elements.push(<hr key={`hr-${idx}`} className="postSectionDivider" />);
        } else {
            elements.push(
                <p key={`p-${idx}`} className="postParagraph">
                    {parseInlineMarkdown(line)}
                </p>
            );
        }
    });

    flushList();

    return elements;
}

  return (
    <div className="postContainer">
      <div className="postArticleWrapper">
        <header className="headerPost">
            {post?.disciplina && (
                <span className="postDisciplinaBadge">{post.disciplina}</span>
            )}

            <div className='tituloAndBotoes'>
                <h1 className="titulo">{post?.titulo}</h1>
                <div className="post-actions-container">
                    {podeEditarPost && (
                        <div className="dropdown-container" ref={menuRef}>
                            <button className="botaoAcao" onClick={() => setIsMenuOpen(!isMenuOpen)} title="Opções">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                            {isMenuOpen && (
                                <div className="dropdown-menu">
                                    <button className="dropdown-item" onClick={() => { setIsEditModalOpen(true); setIsMenuOpen(false); }}>
                                        <FontAwesomeIcon icon={faPen} /> Editar
                                    </button>
                                    <button className="dropdown-item delete" onClick={() => { setIsDeleteModalOpen(true); setIsMenuOpen(false); }}>
                                        <FontAwesomeIcon icon={faTrash} /> Excluir
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    <button className="botaoAcao" onClick={() => navigate(-1)} aria-label="Voltar" title="Fechar">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </div>

            <PostFormModal
                isOpen={isEditModalOpen}
                postId={postId}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleSavePost}
            />

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Excluir Post"
                message="Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita."
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeletePost}
                isLoading={isDeleting}
            />

            <div className="postMeta">
                <div className="postMetaText">
                    <div className="postAuthorRow">
                        <span className="postAuthorName">{user?.nome || post?.autor || "Autor"}</span>
                        <span className={`postRoleBadge ${user?.perfil_id === "3" ? "admin" : "professor"}`}>
                            {user?.perfil_id === "3" ? "Administrador(a)" : "Professor(a)"}
                        </span>
                    </div>
                    <span className="postDate">
                        Publicado em {formatarData(post?.data_atualizacao || post?.data_criacao)}
                    </span>
                </div>
            </div>
        </header>

        <hr className='linha' />

        <article className="conteudo">
           {renderFormattedContent(post?.conteudo || "")}
        </article>
        
        <hr className='linha' />

        <section className="comentarios">
            <label className="tituloComentario">Comentários ({comentarios.length})</label>
            <ul className="listaComentarios">
                {comentarios.map((comentario) => {
                    const ehProprioComentario = comentario.autor === usuarioLogado.nome;
                    const ehPostDoProfessor = post?.autor === usuarioLogado.nome && perfilLogado === "2";
                    const ehAdmin = perfilLogado === "3";
                    
                    const temPermissao = ehProprioComentario || ehAdmin || ehPostDoProfessor;

                    return (
                        <li key={comentario.id}>
                            <Comentario 
                                id={comentario.id}
                                professor={comentario.autor} 
                                data={formatarData(comentario.data_atualizacao)} 
                                conteudo={comentario.conteudo}
                                podeEditar={temPermissao}
                                podeExcluir={temPermissao}
                                onEditar={handleEditarComentario}
                                onExcluir={handleExcluirComentario}
                            />   
                        </li>
                    );
                })}
            </ul>
        </section>

        <hr className='linha' />

        <div className='adicionarComentario'>
            <textarea 
                value={campoComentario} 
                onChange={(e) => setCampoComentario(e.target.value)} 
                className='inputComentario' 
                placeholder='Escreva um comentário...' 
            />
            <button 
                className='botaoComentario' 
                onClick={() => {
                    enviarComentario(campoComentario, Number(postId));
                }}
            >
                Enviar
            </button>
        </div>
      </div>
    </div>
  )
};

export function formatarData(data?: string): string {
    if (data) {
        const date = new Date(data);
        return date.toLocaleDateString("pt-BR");
    }

    return new Date().toLocaleDateString("pt-BR");
}

export default PostDetalhe;