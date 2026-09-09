import Card from "../components/Card";
function Cursos() {
 return (
 <main className="container">
 <h2>Cursos</h2>
 <section className="cards">
 <Card
 titulo="Banco de Dados"
 descricao="Modelagem e SQL."
 />
 <Card
 titulo="Desenvolvimento Web"
 descricao="Aplicações para a web."
 />
 <Card
 titulo="Programação"
 descricao="Lógica e desenvolvimento."
 />
 <Card
 titulo="Engenharia de Software"
 descricao="Processos, requisitos e boas práticas."
 />
 <Card
 titulo="Estrutura de Dados"
 descricao="Listas, pilhas, filas e árvores."
 />
 <Card
 titulo="Desenvolvimento Mobile"
 descricao="Aplicações para Android e iOS."
 />
 </section>
 </main>
 );
}
export default Cursos;