import { useState, useEffect } from "react";
import {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} from "../../services/Users/usersService";
import { ValidationError } from "../Login/Login.controller";

export type UserRole = "Aluno" | "Professor" | "Administrador";

export interface IUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

interface RawUser {
    id: number;
    nome: string;
    cpf?: string;
    email: string;
    senha: string;
    perfil_id: string;
}

export interface CreateUserFormValues {
    nome: string;
    email: string;
    cpf: string;
    perfil: string;
}

const PERFIL_MAP: Record<string, UserRole> = {
    "1": "Aluno",
    "2": "Professor",
    "3": "Administrador",
};

const PERFIL_ID_MAP = Object.fromEntries(
    Object.entries(PERFIL_MAP).map(([id, role]) => [role, Number(id)])
) as Record<UserRole, number>;

function mapUser(raw: RawUser): IUser {
    return {
        id: raw.id,
        name: raw.nome,
        email: raw.email,
        role: PERFIL_MAP[raw.perfil_id] ?? "Aluno",
    };
}

export async function getUsersController(): Promise<IUser[]> {
    const response: RawUser[] = await getUsers();
    return response.map(mapUser);
}

const ITEMS_PER_PAGE = 5;

export function useUsersPage() {
    const [usersList, setUsersList] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("Todos os Papéis");
    const [currentPage, setCurrentPage] = useState(1);

    const [prevSearch, setPrevSearch] = useState(search);
    const [prevRoleFilter, setPrevRoleFilter] = useState(roleFilter);

    // ajuste de estado derivado durante o render (evita o aviso de
    // "cascading renders" que dava com useEffect + setState)
    if (search !== prevSearch || roleFilter !== prevRoleFilter) {
        setPrevSearch(search);
        setPrevRoleFilter(roleFilter);
        setCurrentPage(1);
    }

    async function reloadUsers() {
        setIsLoading(true);
        setLoadError(null);

        try {
            const users = await getUsersController();
            setUsersList(users);
        } catch (error) {
            setLoadError(
                error instanceof Error
                    ? error.message
                    : "Erro ao carregar usuários."
            );
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        reloadUsers();
    }, []);

    const filteredUsers = usersList.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());

        const matchesRole =
            roleFilter === "Todos os Papéis" || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    const totalPages = Math.max(
        1,
        Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
    );

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    function goToPreviousPage() {
        setCurrentPage((page) => Math.max(1, page - 1));
    }

    function goToNextPage() {
        setCurrentPage((page) => Math.min(totalPages, page + 1));
    }

    return {
        isLoading,
        loadError,
        search,
        setSearch,
        roleFilter,
        setRoleFilter,
        currentPage,
        totalPages,
        filteredUsers,
        paginatedUsers,
        goToPreviousPage,
        goToNextPage,
        reloadUsers,
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
    return usuario.id;
}

export async function createUserController(
    values: CreateUserFormValues
): Promise<IUser> {
    const nome = values.nome.trim();
    const email = values.email.trim();
    const cpf = values.cpf.trim();
    const perfil = values.perfil as UserRole;

    if (!nome) {
        throw new ValidationError("Informe o nome do usuário.");
    }

    if (!email || !email.includes("@")) {
        throw new ValidationError("Informe um e-mail válido.");
    }

    if (!cpf) {
        throw new ValidationError("Informe o CPF do usuário.");
    }

    if (!PERFIL_ID_MAP[perfil]) {
        throw new ValidationError("Selecione um perfil válido.");
    }

    const usuario_solicitante = getLoggedUserId();

    const response: RawUser = await createUser({
        nome,
        email,
        cpf,
        perfil_id: PERFIL_ID_MAP[perfil],
        usuario_solicitante,
    });

    return mapUser(response);
}

export async function getUserByIdController(
    id: string
): Promise<CreateUserFormValues> {
    const raw: RawUser = await getUserById(Number(id));

    return {
        nome: raw.nome,
        email: raw.email,
        cpf: raw.cpf ?? "",
        perfil: PERFIL_MAP[raw.perfil_id] ?? "Aluno",
    };
}

export async function editUserController(
    id: string,
    values: CreateUserFormValues
): Promise<IUser> {
    const nome = values.nome.trim();
    const email = values.email.trim();
    const cpf = values.cpf.trim();
    const perfil = values.perfil as UserRole;

    if (!nome) {
        throw new ValidationError("Informe o nome do usuário.");
    }

    if (!email || !email.includes("@")) {
        throw new ValidationError("Informe um e-mail válido.");
    }

    if (!PERFIL_ID_MAP[perfil]) {
        throw new ValidationError("Selecione um perfil válido.");
    }

    const response: RawUser = await updateUser(Number(id), {
        nome,
        email,
        cpf,
        perfil_id: PERFIL_ID_MAP[perfil],
    });

    return mapUser(response);
}

export async function deleteUserController(id: number): Promise<void> {
    await deleteUser(id);
}