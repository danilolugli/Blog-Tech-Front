import './ListarPosts.css';
import PostPreview from '../../components/PostPreview/PostPreview';
import { faChevronLeft, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { listarPosts } from './Posts.controller';
import { pesquisarPosts } from '../../services/post/postService';
import { useNavigate } from 'react-router-dom';

export interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  disciplina: string;
  data_criacao: string;
  data_atualizacao: string;
  autor: string;
}

const ListarPosts: React.FC = () =>  {
    const [posts, setPosts] = useState<Post[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        buscarPosts();
    }, []);

    async function buscarPosts(pagina?: number) {
      try {
        const response = await listarPosts({
            paginaAtual: pagina || paginaAtual,
            itensPagina: 6
        });

        setPosts(response);
        setPaginaAtual(pagina || paginaAtual);

      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    }

    async function buscarPostsPesquisa(palavraBusca?: string) {
        try {
            const response = await pesquisarPosts({
                paginaAtual: 1,
                itensPagina: 6,
                pesquisa: palavraBusca ? palavraBusca : ''
            });

            setPosts(response);
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
        }
    }

  return (
    <section className='listarPostsContainer'>
      <h1 className='titulo'>Posts Recentes</h1>
      
      <header className='headerPosts'>
        <div className='containerPesquisa'>   
          <FontAwesomeIcon icon={faMagnifyingGlass} className='iconePesquisa' />
          <input type="text" placeholder="Busque por palavras-chave" className="inputPesquisa" 
          onChange={(e) => {
            buscarPostsPesquisa(e.target.value);
          }} />
        </div>
      </header>

      {posts.length === 0 ? (
        <div className="empty-state-posts">
          Nenhum resultado encontrado
        </div>
      ) : (
        <ul className='listaPosts'>
          {posts.map((post) => (
            <li key={post.id} onClick={() => {navigate(`/post-detalhe/${post.id}`)}}>
              <PostPreview titulo={post.titulo} 
              descricao={post.conteudo} 
              professor={post.autor} 
              data={formatarData(post.data_atualizacao)} />
            </li>
          ))}
        </ul>
      )}

      <nav className='paginacao'>
        <button disabled={paginaAtual==1} onClick={() => {
          buscarPosts(paginaAtual - 1);
        }}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <label className='numeroPagina'>Página {paginaAtual}</label>

        <button disabled={posts.length < 6} onClick={() => {
          buscarPosts(paginaAtual + 1);
        }}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </nav>
    </section>
  );
}

export function formatarData(data: string): string {
    const date = new Date(data);

    return date.toLocaleDateString("pt-BR");
}

export default ListarPosts;