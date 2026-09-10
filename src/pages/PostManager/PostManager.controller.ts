import { useState, useEffect } from "react";
import {
    listarTodosPosts,
    pesquisarPosts,
    criarPost,
    editarPost,
    deletarPost,
    type PostPayload,
    getPostById,
} from "../../services/post/postService";
import { ValidationError } from "../Login/Login.controller";

export interface IPost {
    id: number;
    titulo: string;
    conteudo: string;
    disciplina: string;
    autor: string;
    dataCriacao: string;
    dataAtualizacao: string;
}

export interface PostFormModalValues {
    title: string;
    content: string;
    subject: string;
}

interface RawPost {
    id: number;
    titulo: string;
    conteudo: string;
    disciplina: string;
    autor: string;
    data_criacao: string;
    data_atualizacao: string;
}

function mapPost(raw: RawPost): IPost {
    return {
        id: raw.id,
        titulo: raw.titulo,
        conteudo: raw.conteudo,
        disciplina: raw.disciplina,
        autor: raw.autor,
        dataCriacao: raw.data_criacao,
        dataAtualizacao: raw.data_atualizacao,
    };
}

interface LoggedUser {
    id: number;
}

function getLoggedUserId(): number {
    const raw = sessionStorage.getItem("usuario");

    if (!raw) {
        throw new ValidationError(
            "Usuário não autenticado. Faça login novamente."
        );
    }

    const usuario: LoggedUser = JSON.parse(raw);
    console.log("usuario id: " + usuario.id)
    return usuario.id;
}

const ITEMS_PER_PAGE = 5;

export function usePostsPage() {
    const [postsList, setPostsList] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [prevSearch, setPrevSearch] = useState(search);
    if (search !== prevSearch) {
        setPrevSearch(search);
        setCurrentPage(1);
    }

    async function reloadPosts() {
        setIsLoading(true);
        setLoadError(null);

        try {
            const response: RawPost[] = search.trim()
                ? await pesquisarPosts({
                      paginaAtual: currentPage,
                      itensPagina: ITEMS_PER_PAGE,
                      pesquisa: search.trim(),
                  })
                : await listarTodosPosts({
                      paginaAtual: currentPage,
                      itensPagina: ITEMS_PER_PAGE,
                  });

            setPostsList(response.map(mapPost));
        } catch (error) {
            setLoadError(
                error instanceof Error
                    ? error.message
                    : "Erro ao carregar posts."
            );
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        reloadPosts();
    }, [currentPage, search]);

    function goToPreviousPage() {
        setCurrentPage((page) => Math.max(1, page - 1));
    }

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    return {
        postsList,
        isLoading,
        loadError,
        search,
        setSearch,
        currentPage,
        goToPreviousPage,
        goToNextPage,
        reloadPosts,
    };
}

export interface PostFormValues {
    titulo: string;
    conteudo: string;
    disciplina: string;
}

function validatePostValues(values: PostFormValues) {
    const titulo = values.titulo.trim();
    const conteudo = values.conteudo.trim();
    const disciplina = values.disciplina.trim();

    if (!titulo) {
        throw new ValidationError("Informe o título do post.");
    }

    if (!conteudo) {
        throw new ValidationError("Informe o conteúdo do post.");
    }

    if (!disciplina) {
        throw new ValidationError("Informe a disciplina do post.");
    }

    return { titulo, conteudo, disciplina };
}

export async function createPostController(
    values: PostFormValues
): Promise<IPost> {
    const { titulo, conteudo, disciplina } = validatePostValues(values);
    const autor = getLoggedUserId();

    const payload: PostPayload = { titulo, conteudo, disciplina, autor };
    const response: RawPost = await criarPost(payload);

    return mapPost(response);
}

export async function getPostByIdController(
    id: string
): Promise<PostFormModalValues> {
    const raw: RawPost = await getPostById(Number(id));

    return {
        title: raw.titulo,
        content: raw.conteudo,
        subject: raw.disciplina,
    };
}

export async function editPostController(
    id: number,
    values: PostFormValues
): Promise<IPost> {
    const { titulo, conteudo, disciplina } = validatePostValues(values);
    const autor = getLoggedUserId();

    const payload: PostPayload = { titulo, conteudo, disciplina, autor };
    const response: RawPost = await editarPost(id, payload);

    return mapPost(response);
}

export async function deletePostController(id: number): Promise<void> {
    const autor = getLoggedUserId();
    await deletarPost(id, autor);
}