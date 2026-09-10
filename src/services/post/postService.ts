import { api } from "../../api/api";

interface ListarPostParams {
    paginaAtual: number;
    itensPagina: number;
}

interface ListarPostPesquisaParams {
    paginaAtual: number;
    itensPagina: number;
    pesquisa: string;
}

export interface PostPayload {
    titulo: string;
    conteudo: string;
    disciplina: string;
    autor: number;
}

export function listarTodosPosts(data: ListarPostParams) {
    const params = new URLSearchParams({
        paginaAtual: data.paginaAtual.toString(),
        itensPagina: data.itensPagina.toString()
    });

    return api(`/posts?${params.toString()}`, {
        method: "GET",
    });
}

export function pesquisarPosts(data: ListarPostPesquisaParams) {
    const params = new URLSearchParams({
        paginaAtual: data.paginaAtual.toString(),
        itensPagina: data.itensPagina.toString(),
        pesquisa: data.pesquisa.toString()
    });

    return api(`/posts/search?${params.toString()}`, {
        method: "GET",
    });
}
    
export function listarPostsId(id: number) {
    const token = sessionStorage.getItem("token");

    return api(`/posts/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });}

export function criarPost(payload: PostPayload) {
    return api("/posts", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function getPostById(id: number) {
    return api(`/posts/${id}`, {
        method: "GET",
    });
}

export function editarPost(id: number, payload: PostPayload) {
    return api(`/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
}

export function deletarPost(id: number, autor: number) {
    return api(`/posts/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            autor: autor
        }),
    });
}