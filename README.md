# Portal DSM

Aplicação web com **CRUD completo de Alunos e Cursos**. O front-end é feito em **React**, a API em **Node.js + Express** e os dados ficam em um banco **MySQL**, gerenciado pelo **phpMyAdmin** (XAMPP).

## Funcionalidades

- **Alunos:** listar, cadastrar, editar e excluir. O e-mail é único.
- **Cursos:** listar, cadastrar, editar e excluir. O nome do curso é único.
- Validação dos dados na API e mensagens de erro exibidas na tela (por exemplo, "E-mail já cadastrado.").
- Navegação entre as páginas Início, Alunos, Cursos e Sobre.

## Tecnologias

| Camada | Tecnologias |
|--------|-------------|
| Front-end | React 19, Vite, React Router |
| Back-end | Node.js, Express 5, mysql2, cors, dotenv |
| Banco de dados | MySQL / MariaDB (via XAMPP) |
| Ferramentas | phpMyAdmin, Postman, Git |

## Como funciona

```
React (localhost:5173)  --fetch-->  API Express (localhost:3000)  --mysql2-->  MySQL (localhost:3306)
                                                                                      ^
                                                                          phpMyAdmin (localhost/phpmyadmin)
```

O React não fala direto com o banco. Ele chama a API, e a API executa as consultas no MySQL. O phpMyAdmin é usado apenas para criar e conferir o banco.

## Estrutura do projeto

```
AulasMarivaldo/
├── database/
│   └── portal_dsm.sql          # script que cria o banco, as tabelas e dados de exemplo
├── portal-dsm/                 # front-end (React + Vite)
│   └── src/
│       ├── api/api.js          # funções que chamam a API
│       ├── components/         # Header, Navbar, Footer, Card
│       └── pages/              # Home, Alunos, Cursos, Sobre
└── portal-dsm-backend/         # back-end (Node + Express)
    ├── server.js               # inicia o servidor
    ├── .env.example            # modelo das variáveis de ambiente
    └── src/
        ├── config/database.js  # conexão com o MySQL
        ├── routes/             # rotas (usuarioRoutes, cursoRoutes)
        ├── controllers/        # validações e respostas HTTP
        └── models/             # consultas SQL
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recente)
- [XAMPP](https://www.apachefriends.org/) com Apache e MySQL
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/) (opcional, para testar a API)

## Como rodar

### 1. Clonar o repositório

```bash
git clone https://github.com/ViniciusBovo/AulasMarivaldo.git
cd AulasMarivaldo
```

### 2. Ligar o MySQL

Abra o **XAMPP Control Panel** e clique em **Start** nas linhas de **Apache** e **MySQL**. Os dois devem ficar verdes.

### 3. Criar o banco de dados

1. Acesse `http://localhost/phpmyadmin`.
2. Abra a aba **Importar**, escolha o arquivo `database/portal_dsm.sql` e clique em **Importar**.
   (Alternativa: abra a aba **SQL**, cole o conteúdo do arquivo e clique em **Executar**.)

Isso cria o banco `portal_dsm` com as tabelas `usuarios` (alunos) e `cursos`, já com alguns dados de exemplo. O script pode ser executado mais de uma vez sem duplicar os dados.

### 4. Configurar o back-end

```bash
cd portal-dsm-backend
npm install
```

Crie o arquivo `.env` a partir do modelo:

```bash
copy .env.example .env      # Windows
cp .env.example .env        # Linux / macOS
```

Confira os valores. O padrão do XAMPP já funciona:

```env
PORTA=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=portal_dsm
```

Se você definiu senha para o usuário `root` do MySQL, coloque em `DB_PASSWORD`.

### 5. Iniciar a API

Ainda na pasta `portal-dsm-backend`:

```bash
node server.js
```

O terminal deve mostrar:

```
Servidor rodando em http://localhost:3000
```

Para conferir, abra `http://localhost:3000/` no navegador. Deve aparecer uma mensagem dizendo que o backend está funcionando. **Deixe esse terminal aberto** enquanto usa o site.

### 6. Iniciar o front-end

Em **outro terminal**:

```bash
cd portal-dsm
npm install
npm run dev
```

Abra o endereço que o Vite mostrar, normalmente `http://localhost:5173`, e acesse as páginas **Alunos** e **Cursos**.

### Ordem de inicialização

1. MySQL ligado no XAMPP
2. API (`node server.js`)
3. Front-end (`npm run dev`)

## Banco de dados

**usuarios** (alunos)

| Coluna | Tipo | Regras |
|--------|------|--------|
| id | INT | chave primária, auto incremento |
| nome | VARCHAR(100) | obrigatório |
| email | VARCHAR(150) | obrigatório, único |

**cursos**

| Coluna | Tipo | Regras |
|--------|------|--------|
| id | INT | chave primária, auto incremento |
| nome | VARCHAR(100) | obrigatório, único |
| descricao | VARCHAR(255) | opcional |

## API

URL base: `http://localhost:3000`

### Alunos

| Método | Rota | Descrição | Corpo (JSON) |
|--------|------|-----------|--------------|
| GET | `/usuarios` | Lista todos os alunos | — |
| GET | `/usuarios/:id` | Busca um aluno | — |
| POST | `/usuarios` | Cadastra um aluno | `{ "nome": "Ana Souza", "email": "ana@exemplo.com" }` |
| PUT | `/usuarios/:id` | Atualiza um aluno | `{ "nome": "Ana Souza", "email": "ana@exemplo.com" }` |
| DELETE | `/usuarios/:id` | Exclui um aluno | — |

### Cursos

| Método | Rota | Descrição | Corpo (JSON) |
|--------|------|-----------|--------------|
| GET | `/cursos` | Lista todos os cursos | — |
| GET | `/cursos/:id` | Busca um curso | — |
| POST | `/cursos` | Cadastra um curso | `{ "nome": "Redes de Computadores", "descricao": "Protocolos e infraestrutura." }` |
| PUT | `/cursos/:id` | Atualiza um curso | `{ "nome": "Redes de Computadores", "descricao": "Novo texto." }` |
| DELETE | `/cursos/:id` | Exclui um curso | — |

### Códigos de resposta

| Código | Quando acontece |
|--------|-----------------|
| 200 | Consulta, atualização ou exclusão realizada |
| 201 | Registro criado |
| 400 | Campo obrigatório ausente (nome, e-mail) |
| 404 | Registro ou rota não encontrada |
| 409 | E-mail ou nome de curso já cadastrado |
| 500 | Erro interno (por exemplo, falha na conexão com o banco) |

As respostas de erro seguem o formato `{ "erro": "mensagem" }`.

## Testando com o Postman

1. Com a API rodando, crie uma requisição para uma das rotas acima.
2. Nos métodos **POST** e **PUT**, abra a aba **Body**, escolha **raw** e o formato **JSON**, e cole o corpo de exemplo.
3. Teste também os erros: POST sem `nome` (400), e-mail repetido (409) e um `id` que não existe (404).

## Solução de problemas

| Problema | Causa provável | O que fazer |
|----------|----------------|-------------|
| phpMyAdmin mostra "Nenhuma conexão pôde ser feita" | MySQL desligado | Clique em **Start** no MySQL, no XAMPP. Se não subir, veja se outro MySQL do Windows está usando a porta 3306. |
| Tela mostra "Não foi possível conectar à API" | API desligada ou em outra porta | Rode `node server.js` e confira `PORTA=3000` no `.env`. |
| "Rota não encontrada." | Servidor antigo rodando ou arquivos de rota ausentes | Pare o servidor (Ctrl+C), confira os arquivos em `src/routes` e rode `node server.js` de novo. |
| "Erro ao listar ..." e o terminal cita `doesn't exist` | Tabela não criada | Importe o `database/portal_dsm.sql` no phpMyAdmin. |
| Terminal mostra `Access denied` | Usuário ou senha do banco incorretos | Ajuste `DB_USER` e `DB_PASSWORD` no `.env`. |
| Terminal mostra `Unknown database` | Banco não existe ou nome diferente | Crie o banco e confira o `DB_NAME` no `.env`. |
| Terminal mostra `ECONNREFUSED` | MySQL desligado ou `localhost` resolvendo para IPv6 | Ligue o MySQL. Se continuar, troque `DB_HOST` por `127.0.0.1`. |
| Terminal mostra `EADDRINUSE` | Porta 3000 já está em uso | Feche o servidor anterior ou use `netstat -ano \| findstr :3000` e `taskkill /PID <número> /F`. |
| Alterei o back-end e nada mudou | O Node não recarrega sozinho | Reinicie com Ctrl+C e `node server.js`. |

## Observações

- Na interface, "Alunos" corresponde à tabela `usuarios` e à rota `/usuarios`.
- O endereço da API está definido em `portal-dsm/src/api/api.js` (`API_URL`). Se mudar a porta da API, altere aqui também.
- O arquivo `.env` guarda as credenciais do banco e **não deve ser versionado**. Use o `.env.example` como modelo.

## Scripts do front-end

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Visualiza a versão de produção localmente |
| `npm run lint` | Verifica o código com o ESLint |

## Ideias para evoluir o projeto

- Relacionar alunos e cursos (matrículas).
- Busca e filtros nas listagens.
- Autenticação de usuários.
