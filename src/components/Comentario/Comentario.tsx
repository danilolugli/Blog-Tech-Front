import "./Comentario.css";

interface ComentarioProps {
    professor: string;
    data: string;
    conteudo: string;
}

const Comentario = ({ professor, data, conteudo }: ComentarioProps) => {
    return (
        <div className="comentario-container">
            <div className="comentario-info">
                <h3 className="comentario-autor">{professor}</h3>
                <p className="comentario-data">{data}</p>
            </div>
            <p className="comentario-conteudo">{conteudo}</p>
        </div>
    )
}

export default Comentario;