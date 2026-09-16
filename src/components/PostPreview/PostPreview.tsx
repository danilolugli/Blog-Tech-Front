import './PostPreview.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface PostPreviewProps {
    titulo: string;
    descricao: string;
    professor: string;
    disciplina?: string;
    data: string;
}

const PostPreview = ({ titulo, descricao, professor, disciplina, data }: PostPreviewProps) => {
    // Pegar a primeira letra do professor para o Avatar
    const inicial = professor ? professor.charAt(0).toUpperCase() : '?';

    return (
        <div className="postPreview-container">
            <div className="postPreview-header">
                <div className="postPreview-author-info">
                    <div className="postPreview-avatar">{inicial}</div>
                    <label className="postPreview-professor">{professor}</label>
                </div>
                {disciplina && <span className="postPreview-badge">{disciplina}</span>}
            </div>
            
            <div className="postPreview-content">
                <h2 className="postPreview-titulo">{titulo}</h2>
                <p className="postPreview-descricao">{descricao}</p>
            </div>

            <div className="postPreview-footer">
                <div className="postPreview-data">
                    <FontAwesomeIcon icon={faCalendarDays} className="calendar-icon" />
                    <span>{data}</span>
                </div>
                <div className="postPreview-read-more">
                    Ler artigo <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        </div>
    );
};

export default PostPreview;