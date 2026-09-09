function Home() {
    return (
      <>
        <section className="hero container">
          <h1>Portal DSM</h1>
          <p>Desenvolvimento de Sistemas</p>
        </section>
  
        <main className="container">
          <h2>Início</h2>
          <p>
            Bem-vindo ao Portal DSM! Aqui você encontra tudo sobre o curso,
            os alunos e as disciplinas do 4º semestre.
          </p>
  
          <div className="cards">
            <div className="card">
              <h3>Alunos</h3>
              <p>Conheça a turma e acompanhe informações dos estudantes.</p>
              <button className="btn">Ver alunos</button>
            </div>
  
            <div className="card">
              <h3>Cursos</h3>
              <p>Veja as disciplinas e conteúdos programáticos do semestre.</p>
              <button className="btn">Ver cursos</button>
            </div>
  
            <div className="card">
              <h3>Sobre</h3>
              <p>Saiba mais sobre o projeto e o curso de DSM.</p>
              <button className="btn">Saiba mais</button>
            </div>
          </div>
        </main>
      </>
    );
  }
  
  export default Home;