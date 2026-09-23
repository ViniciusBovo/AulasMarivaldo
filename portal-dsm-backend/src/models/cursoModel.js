const pool = require("../config/database");

async function listarCursos() {
  const [cursos] = await pool.query("SELECT * FROM cursos ORDER BY nome");
  return cursos;
}

async function buscarCurso(id) {
  const [cursos] = await pool.query("SELECT * FROM cursos WHERE id = ?", [id]);
  return cursos[0];
}

async function adicionarCurso(nome, descricao) {
  const [resultado] = await pool.query(
    "INSERT INTO cursos (nome, descricao) VALUES (?, ?)",
    [nome, descricao]
  );
  return {
    id: resultado.insertId,
    nome,
    descricao,
  };
}

async function atualizarCurso(id, nome, descricao) {
  const [resultado] = await pool.query(
    "UPDATE cursos SET nome = ?, descricao = ? WHERE id = ?",
    [nome, descricao, id]
  );
  if (resultado.affectedRows === 0) {
    return null;
  }
  return buscarCurso(id);
}

async function excluirCurso(id) {
  const [resultado] = await pool.query("DELETE FROM cursos WHERE id = ?", [id]);
  return resultado.affectedRows > 0;
}

module.exports = {
  listarCursos,
  buscarCurso,
  adicionarCurso,
  atualizarCurso,
  excluirCurso,
};