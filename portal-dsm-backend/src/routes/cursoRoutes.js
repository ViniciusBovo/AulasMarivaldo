const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");

router.get("/cursos", cursoController.listarCursos);
router.get("/cursos/:id", cursoController.buscarCurso);
router.post("/cursos", cursoController.cadastrarCurso);
router.put("/cursos/:id", cursoController.atualizarCurso);
router.delete("/cursos/:id", cursoController.excluirCurso);

module.exports = router;