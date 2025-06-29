//import { z } from "zod";

//const CategoriaSchema = z.object({
//  id_categoria: z.number().int().positive().optional(),
//  nome: z.string(),
//  id_restaurante: z.number().int().positive(),
//});
//
//const CategoriaController = {
//  async create(req, res) {
//    try {
//      CategoriaSchema.parse(req.body);
//      res.status(201).json({ message: "Categoria criada com sucesso" });
//    } catch (error) {
//      if (error instanceof z.ZodError) {
//        return res.status(400).json({
//          message: "Erro de validação",
//          errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
//        });
//      }
//      res.status(500).send({ message: error.message });
//    }
//  },
//  async update(req, res) {
//    try {
//      const { id_categoria } = req.params;
//      CategoriaSchema.partial().parse(req.body);
//      res.status(200).json({ message: `Categoria ${id_categoria} atualizada com sucesso` });
//    } catch (error) {
//     res.status(500).send({ message: error.message });
//    }
//  },
//  async get(req, res) {
//    try {
//      const data = [
//        { id_categoria: 1, nome: "Sushi", id_restaurante: 1 },
//       { id_categoria: 2, nome: "Porções", id_restaurante: 2 },
//      ];
//      res.status(200).json({ data, message: "Categorias listadas com sucesso" });
//    } catch (error) {
//      res.status(500).json({ message: error.message });
//    }
//  },
//};

// src/controllers/categoria.controller.js
import { z } from "zod";
import { findAll, create, update, remove } from '../models/categoriaModel.js';

// Schema de validação
const categoriaSchema = z.object({
  id_categoria: z.number().int().positive().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  id_restaurante: z.number().int().positive(),
});

export const getCategorias = async (req, res) => {
  try {
    const categorias = await findAll();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao listar categorias" });
  }
};

export const createCategoria = async (req, res) => {
  try {
    const categoriaData = categoriaSchema.parse(req.body);
    const novaCategoria = await create(categoriaData);
    res.status(201).json({ message: "Categoria criada com sucesso"});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao criar categoria" });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const categoriaData = categoriaSchema.partial().parse(req.body);
    await update(id_categoria, categoriaData);
    res.status(200).json({ message: `Categoria ${id_categoria} atualizada com sucesso` });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao atualizar categoria" });
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    await remove(id_categoria);
    res.status(200).json({ message: `Categoria ${id_categoria} deletada com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao deletar categoria" });
  }
};