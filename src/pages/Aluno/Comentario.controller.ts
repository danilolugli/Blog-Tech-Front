import type { CriarComentario } from "../../services/comentario/comentarioService";
import { criar, listar, editar, excluir } from "../../services/comentario/comentarioService";

export async function listarComentarios(postId: number) {
    return listar(postId);  
}

export async function criarComentario(comentario: CriarComentario) {  
    return criar(comentario);
}

export async function editarComentario(id: number, conteudo: string) {
    return editar(id, conteudo);
}

export async function excluirComentario(id: number, usuario_solicitante: number) {
    return excluir(id, usuario_solicitante);
}