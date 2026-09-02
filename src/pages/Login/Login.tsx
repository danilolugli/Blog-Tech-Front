import { useState } from "react";
import { toast } from "react-toastify";

import "./Login.css";

import { loginController } from "./Login.controller";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);

            const response = await loginController({
                email,
                senha,
            });

            console.log(response);

            toast.success("Login realizado com sucesso!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                return;
            }

            toast.error("Erro ao realizar login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-image-container">
                <img
                    src="src/assets/logoTexto.jpeg"
                    alt="Imagem logotipo login"
                    className="login-imagem"
                />
            </div>

            <div className="login-form">
                <h1 className="login-title">
                    Login
                </h1>

                <p className="login-subtitle">
                    Entre para gerenciar seu conteúdo educacional
                </p>

                <div className="input-container">
                    <label
                        className="input-label"
                        htmlFor="email"
                    >
                        E-mail
                    </label>

                    <input
                        className="login-input"
                        id="email"
                        type="email"
                        placeholder="professor@blogtech.com.br"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>

                <div className="input-container">
                    <label
                        className="input-label"
                        htmlFor="senha"
                    >
                        Senha
                    </label>

                    <input
                        className="login-input"
                        id="senha"
                        type="password"
                        placeholder="••••••••"
                        value={senha}
                        onChange={(e) =>
                            setSenha(e.target.value)
                        }
                    />
                </div>

                <button
                    className="login-button"
                    type="button"
                    onClick={handleLogin}
                    disabled={
                        loading ||
                        email === "" ||
                        senha === ""
                    }
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </div>
        </div>
    );
};

export default Login;