import prisma from '../utils/prismaClient.js';

export const create = async (data) => {
    return await prisma.food.create({ 
        data: {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            category: data.category, 
            available: data.available ?? true,
        },
    });
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
    return await prisma.food.update({
        where: { id: parseInt(id) },
        data: {
            ...(data.name && { name: data.name }),
            ...(data.description && { description: data.description }),
            ...(data.price !== undefined && { price: data.price }),
            ...(data.category && { category: data.category }),
            ...(data.available !== undefined && { available: data.available }),
        }
    });
};

export const remove = async (id) => {
    return await prisma.food.delete({
        where: { id: parseInt(id) },
    });
};