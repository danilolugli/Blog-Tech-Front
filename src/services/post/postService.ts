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

export function listarPostsUseCase(data: ListarPostParams) {
    const params = new URLSearchParams({
        paginaAtual: data.paginaAtual.toString(),
        itensPagina: data.itensPagina.toString()
    });

    const token = sessionStorage.getItem("token");

    return api(`/posts?${params.toString()}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function pesquisarPosts(data: ListarPostPesquisaParams) {
    const params = new URLSearchParams({
        paginaAtual: data.paginaAtual.toString(),
        itensPagina: data.itensPagina.toString(),
        pesquisa: data.pesquisa.toString()
    });

    const token = sessionStorage.getItem("token");

    return api(`/posts/search?${params.toString()}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });}

export function criarPost() {}

export function editarPost() {}

export function deletarPost() {}