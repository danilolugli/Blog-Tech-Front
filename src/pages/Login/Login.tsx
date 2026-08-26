import styled from "styled-components";
import './Login.css';

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const LoginImagem = styled.div`
    display: flex;
    align-items: center;
    width: 45%;
    height: 100%;
    background-color: rgb(247, 247, 247);
`;

const LoginForm = styled.div`
    display: flex;
    width: 55%;
    height: 100%;
    background-color: var(--azul-claro);
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 5% auto;
`;

const Titulo = styled.h1`
    font-size: 32px;
    font-weight: 500;
    margin: 40px 0 10px;
`;

const Subtitulo = styled.label`
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
    color: black;
`;

const LabelInput = styled.label`
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 5px;
    color: black;
`;

const InputEmail = styled.input`
    width: 70%;
    height: 50px;
    border: 1px solid  var(--azul);
    padding: 15px;
    font-size: 18px;
    margin-bottom: 20px;
    border-radius: 5px;
`;

const InputSenha = styled.input`
    width: 70%;
    height: 50px;
    border: 1px solid  var(--azul);
    padding: 15px;
    font-size: 18px;
    border-radius: 5px;
`;

const BotaoLogin = styled.button`
    width: 52.5%;
    height: 50px;
    background-color: var(--azul-mais-escuro);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    margin: 20px;
`;

const LinkCadastro = styled.a`
    font-size: 16px;
    color: #2626bc;
    text-decoration: underline;
    margin: 10px 0 30px;
`;

const Login: React.FC = () => {
    return (  
        <LoginContainer className="login-container">
            <LoginImagem>
                <img src="src/assets/logoTexto.jpeg" alt="Imagem logotipo login" className="login-imagem" />
            </LoginImagem>
        
            <LoginForm>
                <Titulo>Login</Titulo>
                <Subtitulo>Entre para gerenciar seu conteúdo educacional</Subtitulo>
                
                <div className="input-container">
                    <LabelInput htmlFor="email">E-mail</LabelInput>
                    <InputEmail id="email" type="email" placeholder="professor@blogtech.com.br"></InputEmail>
                </div>

                <div className="input-container">
                    <LabelInput htmlFor="senha">Senha</LabelInput>
                    <InputSenha id="senha" type="password" placeholder="••••••••"></InputSenha>
                </div>

                <BotaoLogin>Entrar</BotaoLogin>
                <LinkCadastro href="#">Não possui uma conta? Cadastre-se</LinkCadastro>
            </LoginForm>  
            
        </LoginContainer>
    );  
};

export default Login;