import * as foodModel from "../models/foodModel.js";

const categorias = ["entrada", "prato principal", "sobremesa", "bebida"];

export const getAll = async (req, res) => {
  try {
    const { name, category, available } = req.query;

    if (category) {
      const categoriaBusca = category.toLowerCase().trim();

      const categoriaValida = categorias.some((c) =>
        c.toLowerCase().includes(categoriaBusca),
      );

      if (!categoriaValida) {
        return res.status(400).json({
          status: 400,
          error: "Categoria inválida",
          suggestion: "procure por uma das categorias permitidas",
          categorias,
        });
      }
    }

    let availableFilter;
    if (available !== undefined) {
      availableFilter = available === "true";
    }

    const filters = { name, category, available: availableFilter };

    const foods = await foodModel.findAll(filters);

    if (!foods || foods.length === 0) {
      return res.status(404).json({
        message: "Nenhum registro encontrado.",
      });
    }

    res.status(200).json({
      total: foods.length,
      message: "Lista de comidas disponíveis",
      filters,
      foods,
    });
  } catch (error) {
    console.error("Erro ao buscar:", error);
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "Corpo da requisição vazio. Envie os dados do exemplo!",
      });
    }

    const { name, description, price, category, available } = req.body;

    if (!name)
      return res.status(400).json({ error: "O nome (name) é obrigatório!" });
    if (!description)
      return res.status(400).json({ error: "A descrição (description) é obrigatória!" });
    if (!price)
      return res.status(400).json({ error: "O preço (price) é obrigatório!" });
    if (!category)
      return res.status(400).json({ error: "A categoria (category) é obrigatória!" });

    const categoriaPermitida = category.toLowerCase()

    if(!categorias.includes(categoriaPermitida)) {
        return res.status(400).json({
            error: 'Categoria inválida',
            message: 'Selecione uma das categorias permitidas',
            categorias,
        })
    }

    let availableValue = true;

    if(available !== undefined) {
         if (available !== 'true' && available !== 'false') {
        return res.status(400).json({
            error: 'available deve ser true ou false'
        })
    }

    availableValue =available === 'true'
    }


    const data = await model.create({
      nome,
      descricao,
      ano: parseInt(ano),
      preco: parseFloat(preco),
    });

    res.status(201).json({
      message: "Registro cadastrado com sucesso!",
      data,
    });
  } catch (error) {
    console.error("Erro ao criar:", error);
    res
      .status(500)
      .json({ error: "Erro interno no servidor ao salvar o registro." });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ 
            status: 400,
            success: false,
            error: "O ID enviado não é um número válido." });
    }

    const data = await foodModel.findById(id);
    if (!data) {
      return res
        .status(404)
        .json({
          status: 404,
          success: false,
          message: "Comida não encontrada",
          error: "COMIDA_NOT_FOUND",
          suggestion: ["Verifique se a comida está registrada"],
        });
    }
    res.json({ data });
  } catch (error) {
    console.error("Erro ao buscar:", error);
    res.status(500).json({ error: "Erro ao buscar registro" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "Corpo da requisição vazio. Envie os dados do exemplo!",
      });
    }

    if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

    const exists = await model.findById(id);
    if (!exists) {
      return res
        .status(404)
        .json({ error: "Registro não encontrado para atualizar." });
    }

    const data = await model.update(id, req.body);
    res.json({
      message: `O registro "${data.nome}" foi atualizado com sucesso!`,
      data,
    });
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    res.status(500).json({ error: "Erro ao atualizar registro" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

    const exists = await model.findById(id);
    if (!exists) {
      return res
        .status(404)
        .json({ error: "Registro não encontrado para deletar." });
    }

    await model.remove(id);
    res.json({
      message: `O registro "${exists.nome}" foi deletado com sucesso!`,
      deletado: exists,
    });
  } catch (error) {
    console.error("Erro ao deletar:", error);
    res.status(500).json({ error: "Erro ao deletar registro" });
  }
};