import { useEffect, useState } from 'react';
import Comentario from '../../components/Comentario/Comentario';
import './PostDetalhe.css';
import { listarPostsPorId } from './Posts.controller';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { criarComentario, listarComentarios } from './Comentario.controller';
import { getUserById } from '../../services/Users/usersService';
import { toast } from "react-toastify";

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
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [campoComentario, setCampoComentario] = useState("");
    const perfilId = sessionStorage.getItem("perfil");
    const usuario = sessionStorage.getItem("usuario");
    const [user, setUser] = useState<User>();

    useEffect(() =>  {
        buscarPostPorId(Number(postId));
        buscarComentariosPorPostId(Number(postId));
        if (post) buscarUserPorId(Number(post.autor));
    },[])
    
    async function buscarPostPorId(id: number) {
        try {
            const response = await listarPostsPorId(id);
            setPost(response);

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
        const usuarioObj = usuario ? JSON.parse(usuario) : null;
        try {
            const comentario = {conteudo, post_id, autor_id: usuarioObj?.id}
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

  return (
    <>
    <section className="postContainer">
        <header className="headerPost">
            <div className='tituloAndBotoes'>
                <h1 className="titulo">{post?.titulo}</h1>
                <div className='btnsHeader'>
                {perfilId!="1" && (
                    <button className='botaoEditar' title="Editar">
                        <FontAwesomeIcon size="lg" color="var(--azul-mais-claro)" icon={faPencil} />
                    </button> )}

                {perfilId!="1" && (
                    <button className='botaoExcluir' title="Excluir">
                        <FontAwesomeIcon size="lg" color="var(--azul-mais-claro)" icon={faTrash} />
                    </button>)}
                </div>
            </div>

            <div>Professor(a) {user?.nome}</div>
            <div>Publicado em {formatarData(post?.data_atualizacao)}</div>
        </header>

        <hr className='linha' />

        <main className="conteudo">
           {post?.conteudo}
        </main>
        
        <hr className='linha' />

        <div className="comentarios">
            <label className="tituloComentario">Comentários ({comentarios.length})</label>
            <ul className="listaComentarios">
                {comentarios.map((comentario) => (
                <li key={comentario.id}>
                    <Comentario 
                        professor={comentario.autor} 
                        data={formatarData(comentario.data_atualizacao)} 
                        conteudo={comentario.conteudo}>   
                    </Comentario>
                </li>))}
            </ul>
        </div>

        <hr className='linha' />

        <div className='adicionarComentario'>
            <textarea value={campoComentario} onChange={(e) => setCampoComentario(e.target.value)} className='inputComentario' placeholder='Adicionar comentário...' ></textarea>
            <button className='botaoComentario' onClick={() => {
                enviarComentario(campoComentario, Number(postId));
            }}>Enviar</button>
        </div>
    </section>
    </>
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