function Alunos() {
    const alunos = [
      { nome: "Maria Silva", turma: "4º DSM", status: "Ativo" },
      { nome: "João Pereira", turma: "4º DSM", status: "Ativo" },
      { nome: "Ana Costa", turma: "4º DSM", status: "Ativo" },
      { nome: "Pedro Santos", turma: "4º DSM", status: "Ativo" },
      { nome: "Julia Oliveira", turma: "4º DSM", status: "Ativo" },
      { nome: "Lucas Almeida", turma: "4º DSM", status: "Ativo" },
    ];
  
    return (
      <main className="container">
        <h2>Alunos</h2>
        <p>Área dos alunos do DSM. Confira a turma do 4º semestre.</p>
  
        <div className="cards">
          {alunos.map((aluno, index) => (
            <div className="card" key={index}>
              <h3>{aluno.nome}</h3>
              <p>Turma: {aluno.turma}</p>
              <p>Status: {aluno.status}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }
  
  export default Alunos;