import { api } from "../../api/api";
   
export interface CriarComentario {
    conteudo: string;
    post_id: number;
    autor_id: number;
}

export function listar(postId: number) {
    return api(`/posts/${postId}/comentarios`, {
        method: "GET"
    });}

export function criar(comentario: CriarComentario) {
    return api("/comentarios", {
        method: "POST",
        body: JSON.stringify(comentario),
    });
}

export function editar(id: number, conteudo: string) {
    return api(`/comentarios/${id}`, {
        method: "PUT",
        body: JSON.stringify({ conteudo }),
    });
}

export function excluir(id: number, usuario_solicitante: number) {
    return api(`/comentarios/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ usuario_solicitante })
    });
}