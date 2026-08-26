import { useEffect } from "react";
import { PostFormModal } from "./PostFormModal";

// Exemplo: viria do contexto de autenticação
const loggedTeacher = "Prof. Batman";

// Post fake para simular o retorno da API
const fakePost = {
  id: "1",
  title: "Metodologias Ativas em Sala de Aula",
  subject: "História",
  content:
    "A aprendizagem baseada em projetos (ABP) tem se mostrado um dos caminhos mais eficazes para engajar os estudantes contemporâneos. Ao contrário das aulas puramente expositivas, esta abordagem coloca o aluno no papel de pesquisador e solucionador de problemas práticos que afetam sua própria realidade escolar ou comunitária.",
};

// Simula o salvamento
function fakeSubmit(
  values: {
    title: string;
    subject: string;
    content: string;
  },
  postId?: string
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(
        postId ? "Editando post" : "Criando post",
        postId,
        values
      );

      resolve();
    }, 1200);
  });
}

export function PostFormModalExample() {
  useEffect(() => {
    // Guarda o fetch original
    const originalFetch = window.fetch;

    // Substitui o fetch apenas durante o teste
    window.fetch = async (input) => {
      const url = String(input);

      if (url === `/posts/${fakePost.id}`) {
        return new Response(JSON.stringify(fakePost), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      return originalFetch(input);
    };

    // Restaura o fetch original ao sair da página
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: 40,
      }}
    >
      {/* Caso 1: criação — sem postId */}
      <PostFormModal
        authorName={loggedTeacher}
        onSubmit={fakeSubmit}
      />

      {/* Caso 2: edição — com postId */}
      <PostFormModal
        postId={fakePost.id}
        authorName={loggedTeacher}
        onSubmit={fakeSubmit}
      />
    </div>
  );
}