import type { CriarComentario } from "../../services/comentario/comentarioService";
import { criar, listar } from "../../services/comentario/comentarioService";

export async function listarComentarios(postId: number) {
    return listar(postId);  
}

export async function criarComentario(comentario: CriarComentario) {  
    return criar(comentario);
}