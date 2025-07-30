// routes/protected/teamGroup.routes.js
import express from "express";
import { TeamGroupController } from "../../controllers/teamGroup.controller.js";
import { validateRequest } from "../../middleware/validation/validateRequest.middleware.js";
import {
  validateCreateOrUpdate,
  validateListHeaders,
  validateListDetails,
  validateActionById,
  validateEmployeeAction,
} from "../../validators/teamGroup.validators.js";

const router = express.Router();

// Create a new team group
router.post(
  "/",
  validateCreateOrUpdate,
  validateRequest,
  TeamGroupController.createOrUpdate
);

// Update an existing team group
router.put(
  "/:hdrId",
  validateCreateOrUpdate,
  validateRequest,
  TeamGroupController.createOrUpdate
);

// List all team group headers
router.get(
  "/",
  validateListHeaders,
  validateRequest,
  TeamGroupController.listHeaders
);

// List details (employees) of a specific team group
router.get(
  "/:hdrId/details",
  validateListDetails,
  validateRequest,
  TeamGroupController.listDetails
);

// Activate a team group
router.post(
  "/:hdrId/activate",
  validateActionById,
  validateRequest,
  TeamGroupController.activate
);

// Discontinue a team group
router.post(
  "/:hdrId/discontinue",
  validateActionById,
  validateRequest,
  TeamGroupController.discontinue
);

// Activate an employee in a group
router.post(
  "/:hdrId/employee/activate",
  validateEmployeeAction,
  validateRequest,
  TeamGroupController.activateEmployee
);

// Discontinue an employee from a group
router.post(
  "/:hdrId/employee/discontinue",
  validateEmployeeAction,
  validateRequest,
  TeamGroupController.discontinueEmployee
);

export default router;
