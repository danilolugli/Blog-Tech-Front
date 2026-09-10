import { listarPostsId, listarTodosPosts, pesquisarPosts } from "../../services/post/postService";

interface ListarPostParams {
    paginaAtual: number;
    itensPagina: number;
}

interface ListarPostPesquisaParams {
    paginaAtual: number;
    itensPagina: number;
    pesquisa: string;
}

export async function listarPosts(data: ListarPostParams) {    
    const pagina = data.paginaAtual > 0 ? data.paginaAtual : 1;
    const itens = data.itensPagina > 0 ? data.itensPagina : 6;

    return listarTodosPosts({ paginaAtual: pagina, itensPagina: itens });
}

export async function listarPostsPesquisa(data: ListarPostPesquisaParams) { 
    const pagina = data.paginaAtual > 0 ? data.paginaAtual : 1;
    const itens = data.itensPagina > 0 ? data.itensPagina : 6;

    return pesquisarPosts({ paginaAtual: pagina, itensPagina: itens, pesquisa: data.pesquisa });
}

export async function listarPostsPorId(id: number) {
     
    return listarPostsId(id);
}