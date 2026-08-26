import styled from "styled-components";

const FooterContainer = styled.footer`
    display: flex;
    background-color: var(--azul-mais-escuro);
    width: 100%;
`;

const FooterList = styled.ul`
    display: flex;
    list-style: none;   
    align-items: flex-start;
    flex-direction: column;
    margin-left: 5%;
`;

const TituloFooter = styled.h3`
    font-size: 32px;
    color: var(--azul-mais-claro);
    left: 0;
    font-weight: 500;
`;

const Frase = styled.h2`
    font-weight: 300;
    font-size: 20px;
    color: var(--azul-mais-claro);
`;

const FooterListTwo = styled.ul`
    display: flex;
    list-style: none;   
    align-items: flex-start;
    flex-direction: row;
    align-items: center;
    margin-left: 5%;
`;

const TextoFooter = styled.h4`
    color: black;
    font-weight: 400;
    margin: 5px 25px;
    font-size: 20px;
    color: var(--azul-mais-claro);
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterList>
                <li> <TituloFooter>BlogTech</TituloFooter> </li>
                <li> <Frase>2026 BlogTech. Capacitando a próxima geração de acadêmicos.</Frase> </li>
            </FooterList>

            <FooterListTwo>
                <li><TextoFooter>Política de Privacidade</TextoFooter></li>
                <li><TextoFooter>Termos de Serviço</TextoFooter></li>
                <li><TextoFooter>Contatos</TextoFooter></li>
                <li><TextoFooter>História</TextoFooter></li>
            </FooterListTwo>        
        </FooterContainer>
    );  
};

export default Footer;