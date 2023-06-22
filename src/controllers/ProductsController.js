import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createProduct(req, res) {
    try {
      const { nome_produto, quantidade, valor } = req.body;

      let product = await prisma.product.findUnique({
        where: { nome_produto },
      });

      if (product) {
        return res.json({ error: "Produto Já existe" });
      }

      product = await prisma.product.create({
        data: {
          nome_produto,
          quantidade,
          valor,
        },
      });

      return res.json(product);
    } catch (error) {
      return res.json({ error });
    }
  },

  async findAllProducts(req, res) {
    try {
      const products = await prisma.product.findMany();
      return res.json(products);
    } catch (error) {
      return res.json({ error });
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { nome_produto, quantidade, valor } = req.body;

      let product = await prisma.product.findUnique({
        where: { id: Number(id) },
      });

      if (!product)
        return res.json({ error: "Não foi possivel encontrar esse usuario" });

      product = await prisma.product.update({
        where: { id: Number(id) },
        data: { nome_produto, quantidade, valor },
      });
      return res.json(product);
    } catch (error) {
      return res.json({ error });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
      });

      if (!product) {
        return res.json({ error: "Não foi possível encontrar esse Produto" });
      }

      await prisma.product.delete({ where: { id: Number(id) } });

      return res.json({ message: "Produto deletado" });
    } catch (error) {
      return res.json({ error });
    }
  },
};
