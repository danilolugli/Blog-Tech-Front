import styled from "styled-components";

interface PostPreviewProps {
    titulo: string;
    descricao: string;
}

const Titulo = styled.label`
    font-size: 26px;
    color: black;
    font-weight: 600;
`;

const Descricao = styled.p`
    font-size: 20px;
    color: gray;
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    justify-content: center;
    border: 1px solid var(--azul);
    border-radius: 15px;
    width: 500px;
    height: 250px;
    background-color: white;
    padding: 15px;
`;

const PostPreview = ({ titulo, descricao }: PostPreviewProps) => {
    return (
        <PostContainer>
              <Titulo>{titulo}</Titulo>
              <Descricao>{descricao}</Descricao>
        </PostContainer>
    )
}

export default PostPreview;