import express from "express";
const router = express.Router();

import { MenuController } from "../../controllers/menu.controller.js";

import {
  validateCreateOrUpdateMenu,
  validateGetMenuTreeStructure,
  validateDeleteMenu,
} from "../../validators/menu.validator.js";

import { validateRequest } from "../../middleware/validation/validateRequest.middleware.js";

router.post(
  "/manage",
  validateCreateOrUpdateMenu,
  validateRequest,
  MenuController.create
);
router.get(
  "/menus",
  validateGetMenuTreeStructure,
  validateRequest,
  MenuController.get
);
router.post(
  "/delete",
  validateDeleteMenu,
  validateRequest,
  MenuController.remove
);

export default router;
