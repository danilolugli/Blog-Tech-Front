import { useState } from "react";
import { toast } from "react-toastify";

import "./Login.css";

import { loginController } from "./Login.controller";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
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

            sessionStorage.setItem(
                "usuario",
                JSON.stringify(response.usuario)
            );

            toast.success("Login realizado com sucesso!", {
                autoClose: 3000,
            });
            setTimeout(() => {
                toast.info("Direcionando para a tela inicial", {
                    autoClose: 3500,
                    onClose: () => {
                        navigate("/listar");
                    },
                });
            }, 100);
            
        } catch (error) {
            if (error instanceof Error) {
                toast.warning(error.message);
            } else {
                toast.error("Infelizmente tivemos um erro na conexão com a API. Tente novamente.");
            }
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