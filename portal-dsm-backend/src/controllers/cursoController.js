const cursoModel = require("../models/cursoModel");

async function listarCursos(req, res) {
  try {
    const cursos = await cursoModel.listarCursos();
    res.json(cursos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao listar cursos." });
  }
}

async function buscarCurso(req, res) {
  try {
    const curso = await cursoModel.buscarCurso(req.params.id);
    if (!curso) {
      return res.status(404).json({ erro: "Curso não encontrado." });
    }
    res.json(curso);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar curso." });
  }
}

async function cadastrarCurso(req, res) {
  try {
    const nome = req.body.nome?.trim();
    const descricao = req.body.descricao ?? null;
    if (!nome) {
      return res.status(400).json({ erro: "O nome do curso é obrigatório." });
    }
    const curso = await cursoModel.adicionarCurso(nome, descricao);
    res.status(201).json(curso);
  } catch (erro) {
    console.error(erro);
    if (erro.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ erro: "Já existe um curso com esse nome." });
    }
    res.status(500).json({ erro: "Erro ao cadastrar curso." });
  }
}

async function atualizarCurso(req, res) {
  try {
    const nome = req.body.nome?.trim();
    const descricao = req.body.descricao ?? null;
    if (!nome) {
      return res.status(400).json({ erro: "O nome do curso é obrigatório." });
    }
    const curso = await cursoModel.atualizarCurso(req.params.id, nome, descricao);
    if (!curso) {
      return res.status(404).json({ erro: "Curso não encontrado." });
    }
    res.json(curso);
  } catch (erro) {
    console.error(erro);
    if (erro.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ erro: "Já existe um curso com esse nome." });
    }
    res.status(500).json({ erro: "Erro ao atualizar curso." });
  }
}

async function excluirCurso(req, res) {
  try {
    const excluido = await cursoModel.excluirCurso(req.params.id);
    if (!excluido) {
      return res.status(404).json({ erro: "Curso não encontrado." });
    }
    res.json({ mensagem: "Curso excluído com sucesso." });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao excluir curso." });
  }
}

module.exports = {
  listarCursos,
  buscarCurso,
  cadastrarCurso,
  atualizarCurso,
  excluirCurso,
};