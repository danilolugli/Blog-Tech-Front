import styled from 'styled-components';
import './ListarPosts.css';
import { PostFormModal } from '../../components/PostFormModal/PostFormModal';
import PostPreview from '../../components/PostPreview/PostPreview';


const ListarPosts: React.FC = () =>  {
  return (
    <>
      <h1>Posts Recentes</h1>
        <input type="text" placeholder="Busque por palavras-chave" className="inputPesquisa" />

        <PostFormModal authorName={''} onSubmit={function (values: { title: string; content: string; subject: string; }, postId?: string): Promise<void> | void {
        throw new Error('Function not implemented.');
      } }></PostFormModal>

        <ul className='listaPosts'>
          <li>
            <PostPreview titulo={'10 Dinâmicas de Grupo Práticas para Voltar às Aulas com Energia'} 
            descricao={'Descubra dinâmicas de acolhimento fáceis de aplicar no ensino fundamental e médio. Promova a empatia e quebre o gelo nos primeiros dias do semestre letivo com material de apoio exclusivo.'} />
          </li>
          <li>
            <PostPreview titulo={'10 Dinâmicas de Grupo Práticas para Voltar às Aulas com Energia'} 
            descricao={'Descubra dinâmicas de acolhimento fáceis de aplicar no ensino fundamental e médio. Promova a empatia e quebre o gelo nos primeiros dias do semestre letivo com material de apoio exclusivo.'} />
          </li>
          <li>
            <PostPreview titulo={'10 Dinâmicas de Grupo Práticas para Voltar às Aulas com Energia'} 
            descricao={'Descubra dinâmicas de acolhimento fáceis de aplicar no ensino fundamental e médio. Promova a empatia e quebre o gelo nos primeiros dias do semestre letivo com material de apoio exclusivo.'} />
          </li>
             <li>
            <PostPreview titulo={'10 Dinâmicas de Grupo Práticas para Voltar às Aulas com Energia'} 
            descricao={'Descubra dinâmicas de acolhimento fáceis de aplicar no ensino fundamental e médio. Promova a empatia e quebre o gelo nos primeiros dias do semestre letivo com material de apoio exclusivo.'} />
          </li>
          <li>
            <PostPreview titulo={'10 Dinâmicas de Grupo Práticas para Voltar às Aulas com Energia'} 
            descricao={'Descubra dinâmicas de acolhimento fáceis de aplicar no ensino fundamental e médio. Promova a empatia e quebre o gelo nos primeiros dias do semestre letivo com material de apoio exclusivo.'} />
          </li>
          <li>
            <PostPreview titulo={'10 Dinâmicas de Grupo Práticas para Voltar às Aulas com Energia'} 
            descricao={'Descubra dinâmicas de acolhimento fáceis de aplicar no ensino fundamental e médio. Promova a empatia e quebre o gelo nos primeiros dias do semestre letivo com material de apoio exclusivo.'} />
          </li>
        </ul>
    </>
  );
}

export default ListarPosts;