import Comentario from '../../components/Comentario/Comentario';
import './PostDetalhe.css';

const PostDetalhe: React.FC = () =>  {
  return (
    <section className="postContainer">
        <header className="headerPost">
            <h1 className="titulo">Metodologias Ativas em Sala de Aula</h1>
            <div>Professor(a) Clodoaldo Rodriguez</div>
            <div>Publicado em: {new Date().toLocaleDateString()}</div>
        </header>

        <hr className='linha' />

        <main className="conteudo">
            A aprendizagem baseada em projetos (ABP) tem se mostrado um dos caminhos mais eficazes para engajar os estudantes contemporâneos. Ao contrário das aulas puramente expositivas, esta abordagem coloca o aluno no papel de pesquisador e solucionador de problemas práticos que afetam sua própria realidade escolar ou comunitária.
            Implementar essa dinâmica exige do educador um papel de mediação constante. O planejamento inicial deve conter objetivos pedagógicos claros, mas também flexibilidade suficiente para acomodar os caminhos autônomos que as equipes escolhem durante a coleta de dados e elaboração dos protótipos de solução.
            No final do semestre, os resultados obtidos pelas turmas costumam surpreender: além de consolidarem o conhecimento teórico das disciplinas integradas, os estudantes desenvolvem soft-skills fundamentais, como escuta ativa, gestão de tempo, inteligência socioemocional e oratória aplicada durante as apresentações finais de seus projetos.
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

export default PostDetalhe;