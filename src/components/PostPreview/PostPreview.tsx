import styled from "styled-components";

interface PostPreviewProps {
    titulo: string;
    descricao: string;
    professor: string;
    data: Date;
}

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1.5px solid gray;
    border-radius: 15px;
    width: 500px;
    height: 250px;
    background-color: white;
    padding: 15px;
    gap: 20px;
    &:active {
        transform: scale(0.98);}
    &:hover {
        border: 1.5px solid var(--azul);}
`;

const PostInfo = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin: 0px 10px;
`;

const Professor = styled.label`
    font-size: 18px;
    color: black;
`;

const Data = styled.label`
    font-size: 16px;
    color: gray;
`;

const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Titulo = styled.label`
    font-size: 26px;
    color: black;
    font-weight: 600;
    margin-bottom: 10px;
`;

const Descricao = styled.p`
    font-size: 20px;
    color: gray;
`;


const PostPreview = ({ titulo, descricao, professor, data }: PostPreviewProps) => {
    return (
        <PostContainer>
            <PostInfo>
                <Professor>{professor}</Professor>
                <Data>{data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Data>
            </PostInfo>
            <PostContent>
                <Titulo>{titulo}</Titulo>
                <Descricao>{descricao}</Descricao>
            </PostContent>    
        </PostContainer>
    )
}

export default PostPreview;