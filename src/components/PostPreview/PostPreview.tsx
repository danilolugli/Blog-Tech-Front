import './PostPreview.css';

interface PostPreviewProps {
    titulo: string;
    descricao: string;
    professor: string;
    data: string;
}

const PostPreview = ({ titulo, descricao, professor, data }: PostPreviewProps) => {
    return (
        <div className="postContainer">
            <div className="postInfo">
                <label className="professor">{professor}</label>
                <label className="data">{data}</label>
            </div>
            <div className="postContent">
                <label className="titulo">{titulo}</label>
                <p className="descricao">{descricao}</p>
            </div>
        </div>
    );
};

export default PostPreview;