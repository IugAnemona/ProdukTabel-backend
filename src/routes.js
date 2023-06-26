import { Router } from "express";

import ProductsController from "./controllers/ProductsController.js";

const router = Router();

router.post("/product", ProductsController.createProduct);
router.get("/products", ProductsController.findAllProducts);
router.put("/product/:id", ProductsController.updateProduct);
router.delete("/product/:id", ProductsController.deleteProduct);

export { router };
