import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonSideBar from '../ButtonSideBar/ButtonSideBar';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faClipboard, 
    faHouse, 
    faUsers, 
    faBars, 
    faXmark, 
    faRightFromBracket 
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";

const SideBarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-family: Merriweather, Arial, sans-serif;
  background-color: var(--azul-mais-escuro);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
    padding-top: 80px; /* 60px da MobileHeader + respiro */
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const MobileHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    align-items: center;
    gap: 12px;
    padding: 0 15px;
    box-sizing: border-box;
    background-color: var(--azul-mais-escuro);
    z-index: 1001;
  }
`;

const MobileHeaderTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: var(--azul-mais-claro);
  font-family: Arial, sans-serif;
`;

const MobileToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-color: var(--azul-mais-escuro);
  border: 1px solid var(--azul-mais-claro);
  border-radius: 5px;
  cursor: pointer;
`;

const SideBarTitle = styled.label`
  font-size: 26px;
  font-weight: 700;
  color: var(--azul-mais-claro);
  margin: 0px 10px;
  font-family: Arial, sans-serif;
`;

const SideBarList = styled.ul`
  display: flex;
  flex-direction: column;
  color: black;
  font-size: 20px;
  list-style: none;
  margin: 30px 0px 0px 0px;
  padding: 0px;
  align-items: center;
  width: 100%;
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid rgba(226, 235, 255, 0.15);
`;

const UserSimpleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 4px;
  text-align: left;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Arial, sans-serif;
`;

const UserRole = styled.span`
  font-size: 12px;
  color: #94a3b8;
  font-family: Arial, sans-serif;
`;

const BotaoSair = styled.button`
  height: 40px;
  width: 100%;
  background-color: transparent;
  color: var(--azul-mais-claro);
  border: 1px solid rgba(226, 235, 255, 0.25);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 0px 14px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  border-radius: 8px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;

  &:hover {
    color: white;
    background-color: #ef4444;
    border-color: #ef4444;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const UserIcon = styled(FontAwesomeIcon)`
  color: var(--azul-mais-claro);
`;

const SidebarHeaderInternal = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

function getRoleLabel(perfilId: string) {
    switch (perfilId) {
        case "3":
            return "Administrador";
        case "2":
            return "Professor";
        case "1":
            return "Aluno";
        default:
            return "Usuário";
    }
}

const SideBar: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    let usuarioLogado: { nome?: string; email?: string; perfil_id?: string } = {};
    try {
        const rawUser = sessionStorage.getItem("usuario");
        if (rawUser) {
            usuarioLogado = JSON.parse(rawUser);
        }
    } catch {
        // Fallback silencioso
    }

    const perfil = String(usuarioLogado.perfil_id || sessionStorage.getItem("perfil") || "1");
    const roleLabel = getRoleLabel(perfil);
    const nomeExibicao = usuarioLogado.nome || roleLabel;

    return (
        <>
            <MobileHeader>
                <MobileToggleButton onClick={() => setIsOpen((prev) => !prev)}>
                    <FontAwesomeIcon
                        icon={isOpen ? faXmark : faBars}
                        size="lg"
                        color="var(--azul-mais-claro)"
                    />
                </MobileToggleButton>
                <img src={logo} alt="Logo BlogTech" className="mobile-header-logo" />
                <MobileHeaderTitle>BlogTech</MobileHeaderTitle>
            </MobileHeader>

            <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />

            <SideBarContainer $isOpen={isOpen}>
                <SidebarHeaderInternal className="sidebar-header">
                    <img src={logo} alt="Logo BlogTech" className="sidebar-logo" />
                    <SideBarTitle>BlogTech</SideBarTitle>
                </SidebarHeaderInternal>

                <SideBarList>
                    <ButtonSideBar onClick={() => {navigate("/home")}}>
                        <UserIcon icon={faHouse} size="lg" />
                        Home
                    </ButtonSideBar>

                    {perfil !== "1" && (
                    <ButtonSideBar onClick={() => {navigate("/manager-posts")}}>
                        <UserIcon icon={faClipboard} size="lg" />
                        Posts
                    </ButtonSideBar>)}

                    {perfil === "3" && (    
                    <ButtonSideBar onClick={() => {navigate("/manager-users")}}>
                        <UserIcon icon={faUsers} size="lg" />
                        Usuários
                    </ButtonSideBar>)}
                </SideBarList>

                <SidebarFooter>
                    <UserSimpleInfo>
                        <UserName title={nomeExibicao}>{nomeExibicao}</UserName>
                        <UserRole>{roleLabel}</UserRole>
                    </UserSimpleInfo>

                    <BotaoSair onClick={() => {
                        sessionStorage.clear();
                        navigate("/login");
                    }}>
                        <UserIcon icon={faRightFromBracket} />
                        Sair
                    </BotaoSair>
                </SidebarFooter>
            </SideBarContainer>
        </>
    );
};

export default SideBar;