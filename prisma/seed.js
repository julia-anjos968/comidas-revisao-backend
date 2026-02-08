import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed...');

  await prisma.food.createMany({
    data: [
      {
        name: 'Hambúrguer Artesanal',
        description: 'Pão brioche, carne 180g, queijo cheddar e molho da casa',
        price: 29.9,
        category: 'prato principal',
        available: true,
      },
      {
        name: 'Pizza Margherita',
        description: 'Molho de tomate, muçarela, manjericão fresco e azeite',
        price: 42.0,
        category: 'prato principal',
        available: true,
      },
      {
        name: 'Risoto de Cogumelos',
        description: 'Risoto cremoso com cogumelos frescos e parmesão',
        price: 36.5,
        category: 'prato principal',
        available: true,
      },
      {
        name: 'Pastel de Queijo',
        description: 'Pastel crocante recheado com muçarela (2 unidades)',
        price: 15.0,
        category: 'entrada',
        available: true,
      },
      {
        name: 'Bolinho de Bacalhau',
        description: 'Porção com 6 bolinhos tradicionais',
        price: 26.0,
        category: 'entrada',
        available: true,
      },
      {
        name: 'Salada Caesar',
        description: 'Alface americana, frango grelhado, croutons e molho caesar',
        price: 24.0,
        category: 'entrada',
        available: true,
      },
      {
        name: 'Cheesecake de Frutas Vermelhas',
        description: 'Cheesecake cremoso com calda artesanal',
        price: 18.0,
        category: 'sobremesa',
        available: true,
      },
      {
        name: 'Brownie com Sorvete',
        description: 'Brownie de chocolate servido com sorvete de creme',
        price: 20.0,
        category: 'sobremesa',
        available: true,
      },
      {
        name: 'Refrigerante Lata',
        description: 'Coca-Cola, Guaraná ou Sprite (350ml)',
        price: 6.0,
        category: 'bebida',
        available: true,
      },
      {
        name: 'Chá Gelado de Limão',
        description: 'Chá gelado natural com limão e hortelã',
        price: 8.5,
        category: 'bebida',
        available: true,
      },
    ],
  });

  console.log('✅ Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });