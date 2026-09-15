# Blog Tech - Front-end

Este repositório contém o código-fonte do front-end da aplicação Blog Tech. Desenvolvido com tecnologias modernas, o projeto visa fornecer uma interface rápida, responsiva e de fácil manutenção.

---

## 🛠️ Setup Inicial

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [NPM](https://www.npmjs.com/) (geralmente vem com o Node.js) ou [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (Opcional, para rodar via container)

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd Blog-Tech-Front
```

2. Instale as dependências do projeto:
```bash
npm install
```

3. Configuração de Variáveis de Ambiente:
Crie um arquivo `.env` na raiz do projeto. Você pode se basear em um `.env.example` caso exista. Ele é necessário para configurar as chaves da aplicação (como a URL base da API). Exemplo:
```env
VITE_API_URL=http://localhost:3000/api
```

4. Execute a aplicação em modo de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível através do endereço fornecido pelo Vite no terminal (geralmente `http://localhost:5173`).

---

## 🏗️ Arquitetura da Aplicação

O projeto foi construído utilizando **React 19** com **TypeScript** e empacotado através do **Vite**. A arquitetura segue uma abordagem modular, focada na separação de responsabilidades (SoC), o que facilita a manutenção e escalabilidade.

### Stack Tecnológica Principal
- **Framework/Biblioteca:** React (v19)
- **Linguagem:** TypeScript
- **Bundler/Dev Server:** Vite
- **Roteamento:** React Router DOM (v7)
- **Estilização:** Vanilla CSS (incluindo CSS Modules) e Styled Components
- **Notificações:** React Toastify
- **Ícones:** FontAwesome
- **Testes:** Vitest + React Testing Library + jsdom

### Estrutura de Diretórios (`/src`)

A pasta `/src` organiza a aplicação nas seguintes camadas lógicas:

- **/api:** Configuração centralizada do cliente HTTP (ex: Axios ou interceptores globais do Fetch API) para padronizar a comunicação com o back-end.
- **/assets:** Arquivos estáticos como imagens globais, fundos e SVGs.
- **/components:** Componentes visuais puros e genéricos que são reutilizados em várias partes do sistema (ex: SideBar, ConfirmModal, PostFormModal, PostPreview).
- **/layouts:** Componentes estruturais de layout. O MainLayout, por exemplo, é responsável por envolver as rotas e injetar elementos transversais (como a SideBar) na aplicação.
- **/pages:** Contém as Views da aplicação, agrupadas por domínio ou funcionalidade principal (ex: Aluno, Login, PostManager, Users).
  - **Padrão Controller:** Dentro de cada página, a arquitetura introduz arquivos `.controller.ts` (ex: `Login.controller.ts`). Este padrão extrai a lógica de estado, chamadas de API e regras de negócio do componente React `.tsx`, deixando a camada de visualização limpa e focada apenas na renderização da UI.
- **/routes:** Ponto de entrada do roteamento (`AppRoutes.tsx`), onde são definidas as regras de navegação entre rotas públicas e protegidas.
- **/services:** Camada de acesso a dados. Isola as requisições à API, dividindo-as por contexto (auth, comentario, post, Users). Os controllers consomem esses serviços ao invés de fazerem chamadas diretas, facilitando mockups para testes e manutenções futuras.

---

## 📚 Guia de Uso (Para Desenvolvedores)

### Padrões de Implementação
- **Novos Componentes:** Ao criar um novo componente reutilizável, crie uma pasta dentro de `/components/NomeDoComponente` contendo o arquivo `NomeDoComponente.tsx` e seu respectivo arquivo de estilo `.css` ou `.module.css`.
- **Testes de Componentes:** Cada componente deve possuir testes unitários (ex: `NomeDoComponente.test.tsx`) que garantam que renderizam e operam logicamente via interações de UI com `React Testing Library`.
- **Novas Páginas e Lógica:** Para adicionar uma nova tela, crie a estrutura dentro de `/pages/NomeDaPagina`. Mantenha a interface no `.tsx` e extraia a lógica de negócios e gerenciamento de estado para um arquivo `NomeDaPagina.controller.ts`.
- **Comunicação com o Back-end:** Nunca faça chamadas diretas de requisição nas páginas ou componentes. Qualquer nova chamada de API deve ser criada na pasta `/services`, utilizando o módulo principalizado de `/api`.
- **Estilização:** O projeto suporta abordagens com CSS tradicional e styled-components. Mantenha o padrão da tela/componente na qual estiver trabalhando.

### Scripts Disponíveis
No diretório do projeto, você pode executar:

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Valida o TypeScript (`tsc -b`) e realiza o build otimizado da aplicação para a pasta `dist`.
- `npm run preview`: Inicia um servidor web estático que serve os arquivos gerados pelo comando `build` para que você possa testar a versão de produção localmente.
- `npm run test`: Executa os testes automatizados da aplicação através do Vitest.

---

## 🧪 Testes Automatizados

O projeto utiliza **Vitest** em conjunto com a **React Testing Library** para testes unitários e de integração. 

Para rodar os testes, utilize:
```bash
npm run test
```

Os arquivos de testes são marcados com as extensões `.test.tsx` ou `.test.ts` e ficam geralmente posicionados próximos aos arquivos que estão testando.

---

## 🔄 CI/CD (Integração Contínua)

Existe um fluxo de Continuous Integration via **GitHub Actions**. Sempre que há um `push` ou `pull_request` para a branch principal (`main`), a esteira realiza os seguintes passos automaticamente:
1. Configuração do Node (versão 22.x)
2. Instalação das dependências (`npm ci`)
3. Execução dos Testes (`npm run test`)
4. Build de Imagem Docker do projeto.

Para mais detalhes sobre as regras, verifique o arquivo em `.github/workflows/ci.yml`.

---

## 🐳 Deploy via Docker

A aplicação conta com um arquivo `Dockerfile` na raiz do projeto. Isso permite o empacotamento da aplicação compilada (Vite build) junto de um servidor de hospedagem estática leve (como Nginx) e é usado tanto em processos de CI quanto para implantações conteinerizadas.

Para realizar o build e rodar sua imagem Docker localmente:

1. Gere a imagem:
```bash
docker build -t blog-tech-front:latest .
```

2. Execute o container:
```bash
docker run -p 8080:80 blog-tech-front:latest
```
*(As portas podem variar de acordo com o Nginx ou serviço web definido em seu Dockerfile)*
