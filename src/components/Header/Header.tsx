import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    display: flex;
    padding: 20px;
    width: 100%;
    font-family: Merriweather;
    background-color: #fafaff;
`;

const HeaderTitle = styled.h1`
    font-weight: 700;
    color: #3730a3;
    margin-left: 6%;
`;

const HeaderList = styled.ul`
    display: flex;
    flex-direction: row;
    color: black;
    font-size: 20px;
    list-style: none;
    margin: 5px 40px;
    flex-wrap: wrap;
    align-content: center;
`;

const HeaderActions = styled(HeaderList)`
    margin-left: auto;
`;

const HeaderLink = styled.li`
    margin: 30px;
    cursor: pointer;
`;

const BotaoIcone = styled.button`
    width: 40px;
    height: 40px;
    border: 0;
    margin: 15px;
`;

const BotaoSair = styled.button`
    width: 70px;
    height: 40px;
    padding: 0;
    background-color: #3730a3;
    color: #fafaff;
    border: 0;
    margin: 15px;
`;

const Header: React.FC = () => {
        return (
        <HeaderContainer>
            <HeaderTitle>Blog Tech Challenge</HeaderTitle>

            <HeaderList>
                <HeaderLink>Início</HeaderLink>
                <HeaderLink>Painel</HeaderLink>
                <HeaderLink>Admin</HeaderLink>
            </HeaderList>

            <HeaderActions>
                <BotaoIcone>Lupa</BotaoIcone>
                <BotaoIcone>Tema</BotaoIcone>
                <img src="" />
                <BotaoSair>Sair</BotaoSair>
            </HeaderActions>
        </HeaderContainer>
    );
};

export default Header;
