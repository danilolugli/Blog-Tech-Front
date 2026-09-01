import styled from 'styled-components';
import './ListarPosts.css';
import { PostFormModal } from '../../components/PostFormModal/PostFormModal';
import PostPreview from '../../components/PostPreview/PostPreview';
import { faChevronLeft, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListarPosts: React.FC = () =>  {
  return (
    <>
      <h1>Posts Recentes</h1>
      <header className='containerPesquisa'>   
        <FontAwesomeIcon icon={faMagnifyingGlass} className='iconePesquisa' />
        <input type="text" placeholder="Busque por palavras-chave" className="inputPesquisa" />
      </header>
      
      <div className='btnCriarPost'>
        <PostFormModal authorName={''} onSubmit={function (values: { title: string; content: string; subject: string; }, postId?: string): Promise<void> | void {
          throw new Error('Function not implemented.');
        } }></PostFormModal>
      </div>

      <ul className='listaPosts'>
        <li>
          <PostPreview titulo={'10 Dinâmicas de Grupo Práticas para Voltar às Aulas com Energia'} 
          descricao={'Descubra dinâmicas de acolhimento fáceis de aplicar no ensino fundamental e médio. Promova a empatia e quebre o gelo nos primeiros dias do semestre letivo com material de apoio exclusivo.'} 
          professor={'Prof Rúlio Jubarte'} 
          data={new Date()} />
        </li>
        <li>
          <PostPreview titulo={'10 Dinâmicas de Grupo Práticas para Voltar às Aulas com Energia'}
          descricao={'Descubra dinâmicas de acolhimento fáceis de aplicar no ensino fundamental e médio. Promova a empatia e quebre o gelo nos primeiros dias do semestre letivo com material de apoio exclusivo.'} 
          professor={'Prof Rúlio Jubarte'} 
          data={new Date()} />
        </li>
        <li>
          <PostPreview titulo={'10 Dinâmicas de Grupo Práticas para Voltar às Aulas com Energia'}
          descricao={'Descubra dinâmicas de acolhimento fáceis de aplicar no ensino fundamental e médio. Promova a empatia e quebre o gelo nos primeiros dias do semestre letivo com material de apoio exclusivo.'} 
          professor={'Prof Rúlio Jubarte'} 
          data={new Date()} />
        </li>
        <li>
          <PostPreview titulo={'10 Dinâmicas de Grupo Práticas para Voltar às Aulas com Energia'} 
          descricao={'Descubra dinâmicas de acolhimento fáceis de aplicar no ensino fundamental e médio. Promova a empatia e quebre o gelo nos primeiros dias do semestre letivo com material de apoio exclusivo.'} 
          professor={'Prof Rúlio Jubarte'} 
          data={new Date()} />
        </li>
        <li>
          <PostPreview titulo={'10 Dinâmicas de Grupo Práticas para Voltar às Aulas com Energia'}
          descricao={'Descubra dinâmicas de acolhimento fáceis de aplicar no ensino fundamental e médio. Promova a empatia e quebre o gelo nos primeiros dias do semestre letivo com material de apoio exclusivo.'} 
          professor={'Prof Rúlio Jubarte'} 
          data={new Date()} />
        </li>
        <li>
          <PostPreview titulo={'10 Dinâmicas de Grupo Práticas para Voltar às Aulas com Energia'}
          descricao={'Descubra dinâmicas de acolhimento fáceis de aplicar no ensino fundamental e médio. Promova a empatia e quebre o gelo nos primeiros dias do semestre letivo com material de apoio exclusivo.'} 
          professor={'Prof Rúlio Jubarte'} 
          data={new Date()} />
        </li>
      </ul>

      <nav className='paginacao'>
        <button><FontAwesomeIcon icon={faChevronLeft} /></button>

        <ul className='numerosPagina'>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>

        <button><FontAwesomeIcon icon={faChevronRight} /></button>
      </nav>
    </>
  );
}

export default ListarPosts;