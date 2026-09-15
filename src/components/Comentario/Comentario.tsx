import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import "./Comentario.css";

interface ComentarioProps {
    id: number;
    professor: string;
    data: string;
    conteudo: string;
    podeEditar?: boolean;
    podeExcluir?: boolean;
    onEditar?: (id: number, novoConteudo: string) => void;
    onExcluir?: (id: number) => void;
}

const Comentario = ({ id, professor, data, conteudo, podeEditar, podeExcluir, onEditar, onExcluir }: ComentarioProps) => {
    const [editando, setEditando] = useState(false);
    const [textoEditado, setTextoEditado] = useState(conteudo);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleSalvar = () => {
        if (textoEditado.trim() !== conteudo && onEditar) {
            onEditar(id, textoEditado);
        }
        setEditando(false);
    };

    return (
        <div className="comentario-container">
            <div className="comentario-info">
                <div className="comentario-header-text">
                    <h3 className="comentario-autor">{professor}</h3>
                </div>
                
                <div className="comentario-meta-actions">
                    <span className="comentario-data">{data}</span>
                    <div className="comentario-acoes">
                        {podeEditar && !editando && (
                            <button className="btn-acao-comentario" onClick={() => setEditando(true)} title="Editar">
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                        )}
                        {podeExcluir && !editando && (
                            <button className="btn-acao-comentario btn-excluir-comentario" onClick={() => setIsConfirmModalOpen(true)} title="Excluir">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                title="Excluir comentário"
                message="Tem certeza que deseja excluir este comentário? Essa ação não pode ser desfeita."
                onCancel={() => setIsConfirmModalOpen(false)}
                onConfirm={() => {
                    if (onExcluir) onExcluir(id);
                    setIsConfirmModalOpen(false);
                }}
            />
            
            {editando ? (
                <div className="comentario-edicao">
                    <textarea 
                        className="comentario-textarea"
                        value={textoEditado}
                        onChange={(e) => setTextoEditado(e.target.value)}
                    />
                    <div className="comentario-edicao-acoes">
                        <button className="btn-salvar-edicao" onClick={handleSalvar}>Salvar</button>
                        <button className="btn-cancelar-edicao" onClick={() => { setEditando(false); setTextoEditado(conteudo); }}>Cancelar</button>
                    </div>
                </div>
            ) : (
                <p className="comentario-conteudo">{conteudo}</p>
            )}
        </div>
    )
}

export default Comentario;