import { useState } from 'react';
import Comentario from '../../components/Comentario/Comentario';
import './PostDetalhe.css';
import { listarPostsPorId } from './Posts.controller';
import { useParams } from 'react-router-dom';

export interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  disciplina: string;
  data_criacao: string;
  data_atualizacao: string;
  autor: string;
}

const PostDetalhe: React.FC = () =>  {
    const [post, setPost] = useState<Post>();
    const { id } = useParams();
    buscarPostPorId(Number(id));
    
    async function buscarPostPorId(id: number) {
        try {
            const response = await listarPostsPorId(id);
            setPost(response);

        } catch (error) {
            console.error("Erro ao buscar posts:", error);
        }
    }

  return (
    <section className="postContainer">
        <header className="headerPost">
            <h1 className="titulo">{post?.titulo}</h1>
            <div>Professor(a) {post?.autor}</div>
            <div>Publicado em {formatarData(post?.data_atualizacao)}</div>
        </header>

        <hr className='linha' />

        <main className="conteudo">
           {post?.titulo}
        </main>
        
        <hr className='linha' />

        <div className="comentarios">
            <label className="tituloComentario">Comentários (3)</label>
            <ul className="listaComentarios">
                <li>
                    <Comentario professor={'Jubileu Jeferson'} data={new Date()} conteudo={'Gostei'}></Comentario>
                </li>
                <li>
                    <Comentario professor={'Felipe Massa'} data={new Date()} conteudo={'Conteúdo ágil!'}></Comentario>
                </li>
                <li>
                    <Comentario professor={'Donald Trump'} data={new Date()} conteudo={'Nice'}></Comentario>
                </li>
            </ul>
        </div>

        <hr className='linha' />

        <div className='adicionarComentario'>
            <textarea className='inputComentario' placeholder='Adicionar comentário...' ></textarea>
            <button className='botaoComentario'>Enviar</button>
        </div>
    </section>
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