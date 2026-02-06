import prisma from '../utils/prismaClient.js';

export const create = async (data) => {
    return await prisma.comida.create({ data });
};

export const findAll = async (filters = {}) => {
    const { nome, descricao, categoria, preco } = filters;
    const where = {};

    if (nome) where.nome = { contains: nome, mode: 'insensitive' };
    if (descricao) where.descricao = { contains: descricao, mode: 'insensitive' };
    if (categoria) where.categoria = { contains: categoria, mode: 'insensitive' };
    if (preco !== undefined) where.preco = parseFloat(preco);

    return await prisma.comida.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
};

export const findById = async (id) => {
    return await prisma.comida.findUnique({
        where: { id: parseInt(id) },
    });
};

export const update = async (id, data) => {
    return await prisma.comida.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id) => {
    return await prisma.comida.delete({
        where: { id: parseInt(id) },
    });
};
