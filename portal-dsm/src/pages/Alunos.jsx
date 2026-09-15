import { useEffect, useState } from "react";
import { listarUsuarios } from "../api/api";

function Alunos() {
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    listarUsuarios()
      .then((dados) => setUsuarios(dados))
      .catch((erro) => console.error(erro));
  }, []);
  return (
    <main className="container">
      <h2>Alunos</h2>
      {usuarios.map((usuario) => (
        <p key={usuario.id}>
          {usuario.nome} - {usuario.email}
        </p>
      ))}
    </main>
  );
}
export default Alunos;
