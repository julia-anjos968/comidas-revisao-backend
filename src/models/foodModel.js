import prisma from '../utils/prismaClient.js';

export const create = async (data) => {
    return await prisma.food.create({ data });
};

export const findAll = async (filters = {}) => {
    const { name, category, available } = filters;
    const where = {};

    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (category) where.category = { contains: category, mode: 'insensitive' };
    if (available !== undefined) where.available = available;

    return await prisma.food.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
};

export const findById = async (id) => {
    return await prisma.food.findUnique({
        where: { id: parseInt(id) },
    });
};

export const update = async (id, data) => {
    return await prisma.exemplo.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id) => {
    return await prisma.exemplo.delete({
        where: { id: parseInt(id) },
    });
};