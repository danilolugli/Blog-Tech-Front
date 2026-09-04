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

            setTimeout(() => {
                toast.success("Login realizado com sucesso!", {
                    autoClose: 3000,
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
                    src="src/assets/fundo-login.png"
                    alt="Imagem logotipo login"
                    className="login-imagem login-imagem-desktop"
                />
                <img
                    src="src/assets/fundo-login-mobile.png"
                    alt="Imagem logotipo login"
                    className="login-imagem login-imagem-mobile"
                />

                <div className="login-image-text">
                    <h3 className="title-imagem">
                        Transforme a aprendizagem em uma jornada diária.
                    </h3>

                    <p className="description">
                        Crie salas de aula vibrantes, troque experiências reais e dê voz
                        aos seus melhores projetos educacionais.
                    </p>
                </div>

                <div className="login-mobile-banner">
                    <img
                        src="src/assets/logo.png"
                        alt="Imagem logotipo login"
                        className="login-logo-img login-logo-img--mobile"
                    />
                    <span className="login-mobile-banner-title">
                        EduBlog Mobile
                    </span>
                </div>
            </div>

            <div className="login-form">
                <div className="login-header">
                    <img src="src/assets/logo.png"
                        alt="Imagem logotipo login"
                        className="login-logo-img" />
                    <h1 className="login-title">
                        Blog Tech
                    </h1>
                </div>

                <p className="login-subtitle">
                    Bem-vindo! Por favor, insira suas credenciais.
                </p>

                <h1 className="login-mobile-title">
                    Entrar
                </h1>

                <p className="login-mobile-subtitle">
                    Seja bem-vindo de volta ao seu espaço.
                </p>

                <div className="input-container">
                    <label
                        className="input-label"
                        htmlFor="email"
                    >
                        Seu E-mail
                    </label>

                    <input
                        className="login-input"
                        id="email"
                        type="email"
                        placeholder="nome@escola.edu.br"
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
                        placeholder="Insira sua senha"
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