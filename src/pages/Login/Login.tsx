import styled from "styled-components";
import './Login.css';

const LoginContainer = styled.div`
    display: flex;
    width: 30%;
    height: 70%;
    background-color: var(--azul-claro);
    border-radius: 3px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #2626bc;
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
    align-self: flex-start;
`;

const InputEmail = styled.input`
    width: 100%;
    height: 50px;
    border: 1px solid #2626bc;
    padding: 15px;
    font-size: 18px;
    margin-bottom: 20px;
    border-radius: 5px;
`;

const InputSenha = styled.input`
    width: 100%;
    height: 50px;
    border: 1px solid #2626bc;
    padding: 15px;
    font-size: 18px;
    border-radius: 5px;
`;

const BotaoLogin = styled.button`
    width: 75%;
    height: 50px;
    background-color: #2626bc;
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
        <div className="background-login">
            <LoginContainer>
                <Titulo>Login</Titulo>
                <Subtitulo>Entre para gerenciar seu conteúdo educacional</Subtitulo>
                
                <div className="input-container">
                    <LabelInput htmlFor="email">Email</LabelInput>
                    <InputEmail id="email" type="email" placeholder="professor@blogtech.com.br"></InputEmail>
                </div>

                <div className="input-container">
                    <LabelInput htmlFor="senha">Senha</LabelInput>
                    <InputSenha id="senha" type="password" placeholder="••••••••"></InputSenha>
                </div>

                <BotaoLogin>Entrar</BotaoLogin>
                <LinkCadastro href="#">Não possui uma conta? Cadastre-se</LinkCadastro>
            </LoginContainer>       
        </div>
    );  
};

export default Login;