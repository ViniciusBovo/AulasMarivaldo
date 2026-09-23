const API_URL = "http://localhost:3000";

// Função única que faz a chamada e trata os erros de forma padronizada.
async function requisitar(caminho, opcoes) {
  let resposta;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, opcoes);
  } catch {
    throw new Error(
      "Não foi possível conectar à API. Confira se o backend está rodando."
    );
  }

  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    // O backend responde { erro: "mensagem" } nos casos de 400, 404, 409 e 500
    throw new Error(dados.erro || "Erro ao comunicar com o servidor.");
  }
  return dados;
}

const JSON_HEADERS = { "Content-Type": "application/json" };

// ---------- Usuários (alunos) ----------
export function listarUsuarios() {
  return requisitar("/usuarios");
}

export function cadastrarUsuario(usuario) {
  return requisitar("/usuarios", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(usuario),
  });
}

export function atualizarUsuario(id, usuario) {
  return requisitar(`/usuarios/${id}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(usuario),
  });
}

export function excluirUsuario(id) {
  return requisitar(`/usuarios/${id}`, { method: "DELETE" });
}

// ---------- Cursos ----------
export function listarCursos() {
  return requisitar("/cursos");
}

export function cadastrarCurso(curso) {
  return requisitar("/cursos", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(curso),
  });
}

export function atualizarCurso(id, curso) {
  return requisitar(`/cursos/${id}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(curso),
  });
}

export function excluirCurso(id) {
  return requisitar(`/cursos/${id}`, { method: "DELETE" });
}