const API_URL = import.meta.env.VITE_API_URL;

export async function api(
    endpoint: string,
    options?: RequestInit
) {
    console.log("API URL:", API_URL);
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Erro na conexão com a API"
        );
    }

    return data;
}