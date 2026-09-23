import { useEffect, useState } from "react";
import {
  listarUsuarios,
  cadastrarUsuario,
  atualizarUsuario,
  excluirUsuario,
} from "../api/api";
import "./Alunos.css";

const FORM_VAZIO = { nome: "", email: "" };

function Alunos() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(FORM_VAZIO);
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  // Toda vez que este número muda, a lista é buscada de novo na API
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    let ativo = true;
    listarUsuarios()
      .then((dados) => {
        if (!ativo) return;
        setUsuarios(dados);
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
        await atualizarUsuario(editandoId, form); // PUT
      } else {
        await cadastrarUsuario(form); // POST
      }
      cancelarEdicao();
      recarregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  function iniciarEdicao(usuario) {
    setEditandoId(usuario.id);
    setForm({
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function excluir(usuario) {
    if (!window.confirm(`Excluir o aluno ${usuario.nome}?`)) return;
    setErro("");
    try {
      await excluirUsuario(usuario.id); // DELETE
      if (editandoId === usuario.id) cancelarEdicao();
      recarregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <main className="container">
      <h2>Alunos</h2>

      <form className="form-aluno" onSubmit={salvar}>
        <h3>{editandoId ? "Editar aluno" : "Novo aluno"}</h3>

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
          E-mail
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={alterarCampo}
            required
          />
        </label>

        <label>
          Telefone
          <input
            name="telefone"
            value={form.telefone}
            onChange={alterarCampo}
          />
        </label>

        <div className="acoes">
          <button type="submit">
            {editandoId ? "Salvar alterações" : "Cadastrar aluno"}
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
        <p>Carregando alunos…</p>
      ) : usuarios.length === 0 ? (
        <p>Nenhum aluno cadastrado. Preencha o formulário para cadastrar o primeiro.</p>
      ) : (
        <section className="cards">
          {usuarios.map((usuario) => (
            <article className="card" key={usuario.id}>
              <h3>{usuario.nome}</h3>
              <p>{usuario.email}</p>
              {usuario.telefone && <p>{usuario.telefone}</p>}
              <div className="acoes">
                <button type="button" onClick={() => iniciarEdicao(usuario)}>
                  Editar
                </button>
                <button
                  type="button"
                  className="btn-perigo"
                  onClick={() => excluir(usuario)}
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

export default Alunos;