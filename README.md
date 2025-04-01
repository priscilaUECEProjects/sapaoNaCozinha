🐸🍳 Sapão na Cozinha
Plataforma para auxiliar trabalhadores autônomos do ramo alimentício

📌 Sobre o Projeto
A Sapão na Cozinha é uma aplicação desenvolvida para facilitar a vida de profissionais do ramo alimentício, permitindo:
✔️ Armazenar receitas e organizar ingredientes
✔️ Calcular automaticamente as quantidades de ingredientes
✔️ Sugerir um preço de venda com base no Custo de Mercadoria Vendida (CMV) e no markup informado pelo usuário

🚀 Tecnologias Utilizadas
O projeto foi desenvolvido utilizando as seguintes tecnologias:

📌 Front-end:
React + Vite

Tailwind CSS

Axios

📌 Back-end:
Node.js

Express.js

Prisma ORM

PostgreSQL

🔧 Como Rodar o Projeto
📌 Pré-requisitos:
Antes de começar, certifique-se de ter instalado:

Node.js

PostgreSQL

Um gerenciador de pacotes (npm ou yarn)

📌 Passo a Passo

1️⃣ Clone o repositório:
sh
Copy
Edit
git clone https://github.com/seu-usuario/sapao-na-cozinha.git

2️⃣ Acesse o diretório do projeto:
sh
Copy
Edit
cd sapao-na-cozinha

3️⃣ Instale as dependências:
sh
Copy
Edit
npm install

4️⃣ Configure o banco de dados:
Crie um arquivo .env na raiz do projeto e adicione as configurações do seu PostgreSQL:

env
Copy
Edit
DATABASE_URL=postgresql://usuario:senha@localhost:5432/seu_banco
Depois, rode as migrations para criar as tabelas:

sh
Copy
Edit
npx prisma migrate dev

5️⃣ Inicie o servidor back-end:
sh
Copy
Edit
npm run dev

6️⃣ Acesse o front-end e inicie o projeto:
sh
Copy
Edit
cd frontend
npm install
npm run dev

O projeto estará rodando em http://localhost:5173 🚀

📜 Licença
Este projeto é open-source e está sob a licença MIT.
 
