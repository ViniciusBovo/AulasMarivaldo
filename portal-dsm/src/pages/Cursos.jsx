import { useEffect, useState } from "react";
import {
  listarCursos,
  cadastrarCurso,
  atualizarCurso,
  excluirCurso,
} from "../api/api";
import "./Cursos.css";

const FORM_VAZIO = { nome: "", descricao: "" };

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [form, setForm] = useState(FORM_VAZIO);
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  // Toda vez que este número muda, a lista é buscada de novo na API
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    let ativo = true;
    listarCursos()
      .then((dados) => {
        if (!ativo) return;
        setCursos(dados);
        setErro("");
      })
      .catch((e) => {
        if (ativo) setErro(e.message);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, [versao]);

  function recarregar() {
    setVersao((v) => v + 1);
  }

  function alterarCampo(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setForm(FORM_VAZIO);
  }

  async function salvar(e) {
    e.preventDefault();
    setErro("");
    try {
      if (editandoId) {
        await atualizarCurso(editandoId, form); // PUT
      } else {
        await cadastrarCurso(form); // POST
      }
      cancelarEdicao();
      recarregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  function iniciarEdicao(curso) {
    setEditandoId(curso.id);
    setForm({
      nome: curso.nome,
      descricao: curso.descricao ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function excluir(curso) {
    if (!window.confirm(`Excluir o curso ${curso.nome}?`)) return;
    setErro("");
    try {
      await excluirCurso(curso.id); // DELETE
      if (editandoId === curso.id) cancelarEdicao();
      recarregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <main className="container">
      <h2>Cursos</h2>

      <form className="form-curso" onSubmit={salvar}>
        <h3>{editandoId ? "Editar curso" : "Novo curso"}</h3>

        <label>
          Nome
          <input
            name="nome"
            value={form.nome}
            onChange={alterarCampo}
            required
          />
        </label>

        <label>
          Descrição
          <textarea
            name="descricao"
            rows={3}
            maxLength={255}
            value={form.descricao}
            onChange={alterarCampo}
          />
        </label>

        <div className="acoes">
          <button type="submit">
            {editandoId ? "Salvar alterações" : "Cadastrar curso"}
          </button>
          {editandoId && (
            <button
              type="button"
              className="btn-secundario"
              onClick={cancelarEdicao}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {erro && (
        <p className="mensagem-erro" role="alert">
          {erro}
        </p>
      )}

      {carregando ? (
        <p>Carregando cursos…</p>
      ) : cursos.length === 0 ? (
        <p>Nenhum curso cadastrado. Preencha o formulário para cadastrar o primeiro.</p>
      ) : (
        <section className="cards">
          {cursos.map((curso) => (
            <article className="card" key={curso.id}>
              <h3>{curso.nome}</h3>
              {curso.descricao && <p>{curso.descricao}</p>}
              <div className="acoes">
                <button type="button" onClick={() => iniciarEdicao(curso)}>
                  Editar
                </button>
                <button
                  type="button"
                  className="btn-perigo"
                  onClick={() => excluir(curso)}
                >
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Cursos;