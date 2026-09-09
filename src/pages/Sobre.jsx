function Sobre() {
    const info = [
      {
        titulo: "O Curso",
        texto: "Desenvolvimento de Sistemas (DSM) forma profissionais para criar, testar e manter aplicações web, mobile e desktop.",
      },
      {
        titulo: "A Turma",
        texto: "Estamos no 4º semestre, aprendendo tecnologias modernas de front-end e back-end, incluindo React.",
      },
      {
        titulo: "O Projeto",
        texto: "Este Portal DSM foi desenvolvido como projeto prático da disciplina, unindo React, CSS e boas práticas de front-end.",
      },
    ];
  
    return (
      <main className="container">
        <h2>Sobre</h2>
        <p>
          Conheça mais sobre o curso de Desenvolvimento de Sistemas e o
          propósito deste projeto.
        </p>
  
        <div className="cards">
          {info.map((item, index) => (
            <div className="card" key={index}>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }
  
  export default Sobre;