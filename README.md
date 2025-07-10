# NLW Agents - Server

Projeto desenvolvido durante o evento NLW da Rocketseat.

## Tecnologias utilizadas

- Node.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Fastify
- Zod

## Padrões de projeto

- Arquitetura em camadas (Controller, Service, Repository)
- Injeção de dependências

## Setup e configuração

1. Clone o repositório: `git clone https://github.com/seu-usuario/nlw-agents.git`
2. Instale as dependências: `npm install` ou `yarn install`
3. Configure o arquivo `.env` com as variáveis de ambiente:

```makefile
DB_USER=docker
DB_PASSWORD=docker
DATABASE_URL="postgresql://docker:docker@localhost:5432/agents"
```

4. Inicie o container do PostgreSQL: `docker-compose up`
5. Execute as migrations: `npx drizzle-kit migrate`
6. Inicie o servidor: `npm run dev` ou `yarn dev`

## Observações

- Certifique-se de ter o Docker instalado e configurado corretamente.
- Verifique se o arquivo `.env` está configurado corretamente antes de executar o servidor.

## Licença

MIT License.
