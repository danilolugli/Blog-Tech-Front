import styled from "styled-components";

interface ComentarioProps {
    professor: string;
    data: Date;
    conteudo: string;
}

const ComentarioContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Linha = styled.hr`
    border: 1px solid var(--azul-mais-claro);
    width: 100%;
`;

const ComentarioInfo = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
`;

const Professor = styled.h3`
    margin: 0;
`;

const Data = styled.p`
    margin: 0;
    font-size: 0.875rem;
    color: #666;
`;

const Conteudo = styled.p`
    margin: 0;
    line-height: 1.5;
`;

const Comentario = ({ professor, data, conteudo }: ComentarioProps) => {
    return (
        <ComentarioContainer>
            <Linha></Linha>
            <ComentarioInfo>
                <Professor>{professor}</Professor>
                <Data>{data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Data>
            </ComentarioInfo>
            <Conteudo>{conteudo}</Conteudo>
        </ComentarioContainer>
    )
}

export default Comentario;