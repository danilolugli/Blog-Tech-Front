import './PostPreview.css';

interface PostPreviewProps {
    titulo: string;
    descricao: string;
    professor: string;
    data: string;
}

const PostPreview = ({ titulo, descricao, professor, data }: PostPreviewProps) => {
    return (
        <div className="postPreview-container">
            <div className="postPreview-info">
                <label className="postPreview-professor">{professor}</label>
                <label className="postPreview-data">{data}</label>
            </div>
            <div className="postPreview-content">
                <label className="postPreview-titulo">{titulo}</label>
                <p className="postPreview-descricao">{descricao}</p>
            </div>
        </div>
    );
};

export default PostPreview;