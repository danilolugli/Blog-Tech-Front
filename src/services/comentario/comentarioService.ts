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