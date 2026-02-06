import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.comida.createMany({
        data: [
            {
                nome: 'Pizza Calabresa',
                descricao: 'Pizza com calabresa fatiada e cebola',
                categoria: 'Pizza',
                preco: 45.0,
            },
            {
                nome: 'Hambúrguer Artesanal',
                descricao: 'Hambúrguer 180g com cheddar e pão brioche',
                categoria: 'Lanche',
                preco: 32.0,
            },
            {
                nome: 'Lasanha Bolonhesa',
                descricao: 'Lasanha com molho bolonhesa e queijo gratinado',
                categoria: 'Massas',
                preco: 28.0,
            },
            {
                nome: 'Sushi Combo 20 peças',
                descricao: 'Combo variado com sashimi, uramaki e hossomaki',
                categoria: 'Japonesa',
                preco: 60.0,
            },
            {
                nome: 'Açaí na Tigela',
                descricao: 'Açaí com banana, granola e leite condensado',
                categoria: 'Sobremesa',
                preco: 18.0,
            },
            {
                nome: 'Coxinha de Frango',
                descricao: 'Coxinha recheada com frango cremoso',
                categoria: 'Salgado',
                preco: 8.0,
            },
            {
                nome: 'Salada Caesar',
                descricao: 'Salada com frango grelhado, croutons e molho caesar',
                categoria: 'Salada',
                preco: 22.0,
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
