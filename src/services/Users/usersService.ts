import { api } from "../../api/api";

export interface CreateUserPayload {
    nome: string;
    email: string;
    cpf: string;
    perfil_id: number;
    usuario_solicitante: number;
}

export interface UpdateUserPayload {
    nome: string;
    email: string;
    perfil_id: number;
    cpf?: string;
}

export function getUsers() {
    return api("/usuarios", {
        method: "GET",
    });
}

export function getUserById(id: number) {
    return api(`/usuarios/${id}`, { method: "GET" });
}

export function createUser(payload: CreateUserPayload) {
    return api("/usuarios", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function updateUser(id: number, payload: UpdateUserPayload) {
    return api(`/usuarios/editar/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
}

export function deleteUser(id: number) {
    return api(`/usuarios/${id}`, {
        method: "DELETE",
    });
}