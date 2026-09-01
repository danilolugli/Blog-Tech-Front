import {
    login,
    type LoginRequest
} from "../../services/auth/authService";

export async function loginController(data: LoginRequest) {
    const email = data.email.trim();
    const senha = data.senha.trim();

    if (!email) {
        throw new Error("Informe o e-mail.");
    }

    if (!senha) {
        throw new Error("Informe a senha.");
    }

    if (!email.includes("@")) {
        throw new Error("Informe um e-mail válido.");
    }

    const response = await login({
        email,
        senha,
    });

    return response;
}