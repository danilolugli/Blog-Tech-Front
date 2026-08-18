import styled from "styled-components";

const FooterContainer = styled.footer`
    display: flex;
    // height: 10%;
    background-color: #fafaff;
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
    color: #2626bc;
    left: 0;
    font-weight: 500;
`;

const Frase = styled.h2`
    font-weight: 300;
    font-size: 20px;
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
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterList>
                <li> <TituloFooter>BlogTechChallenge</TituloFooter> </li>
                <li> <Frase>2026 Blog Tech Challenge. Capacitando a próxima geração de acadêmicos.</Frase> </li>
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