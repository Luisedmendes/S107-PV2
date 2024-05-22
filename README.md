# Projeto S107

Este repositório contém o código para a matéria S107. O projeto consiste em um sistema simples com testes unitários e um pipeline de CI/CD.

## Sistema

O sistema é uma aplicação simples construída com Node.js. Ele inclui uma série de testes unitários para garantir a correta funcionalidade do código.

## Pipeline de CI/CD

O pipeline de CI/CD é configurado para executar sempre que um novo código é enviado para o repositório. O pipeline executa as seguintes etapas:

1. **Testes**: Executa todos os testes unitários no código.
2. **Build**: Constrói a aplicação para prepará-la para a implantação.
3. **Notificação**: Envia um e-mail de notificação após a conclusão bem-sucedida do pipeline.

O pipeline é configurado para usar o `nodemailer` para enviar o e-mail de notificação. O endereço de e-mail do destinatário é armazenado como um segredo no GitHub Actions.

## Configuração

Para configurar o pipeline para o seu próprio uso, você precisará fornecer o seguinte segredo através das configurações do seu repositório no GitHub:

- `API_URL`: A URL da API que a aplicação irá consumir.
- `EMAIL`: O endereço de e-mail usado para enviar notificações.
- `PASSWORD`: A senha do endereço de e-mail usado para enviar notificações (gerar senha no my account na google).
- `RECIPIENT_EMAIL`: O endereço de e-mail para o qual a notificação será enviada.
- `MYSQL_DATABASE`: O nome do banco de dados MySQL.
- `MYSQL_ROOT_PASSWORD`: A senha root do MySQL.
- `REDIS_HOST`: O host do Redis.
- `MYSQL_PASSWORD`: A senha do usuário MySQL.
- `MYSQL_PORT`: A porta do MySQL.
- `MYSQL_HOST`: O host do MySQL.
- `MYSQL_USER`: O usuário do MySQL.
- `NODE_ENV`: O ambiente Node.js (por test, development, production).
- `PORT`: A porta em que a aplicação irá rodar.
- `REDIS_PASSWORD`: A senha do Redis.
- `REDIS_PORT`: A porta do Redis.
- `REDIS_PREFIX`: O prefixo do Redis.

## Rodando a API
Para instalar as dependências e iniciar a API, siga os seguintes passos:

Instale as dependências do projeto com o comando npm install.
Inicie a API com o comando yarn dev.

Rodar testes com comando yarn test

## Rotas
Aqui estão as rotas disponíveis na API:

POST /users: Cria um novo usuário.

GET /users: Lista todos os usuários.

GET /users/:id: Mostra os detalhes de um usuário específico.

PUT /users/:id: Atualiza os detalhes de um usuário específico.

DELETE /users/:id: Deleta um usuário específico.

