import { reset, seed } from 'drizzle-seed'
import { stdout } from 'process'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

// Ele reseta o banco e depois faz o seed do banco -> Criação de tabelas de exemplo
await reset(db, { schema })
await db.execute('TRUNCATE TABLE "questions" CASCADE;')
await db.execute('TRUNCATE TABLE "rooms" CASCADE;')

await seed(db, schema).refine(f => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 10,
    },
  }
})

// Desconecta do banco para não rodar o script para sempre
await sql.end()

stdout.write(`Database seeded\n`)
