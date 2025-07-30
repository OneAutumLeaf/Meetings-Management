// validators/teamGroup.validator.js
import { body, param, query } from "express-validator";

export const validateCreateOrUpdate = [
  // groupName is required only on creation
  body("groupName")
    .if(body("teamGroupHdrId").not().exists())
    .notEmpty()
    .withMessage("Group name is required for new groups."),
  body("teamEmployeeIds")
    .optional()
    .isArray()
    .withMessage("teamEmployeeIds must be an array."),
];

export const validateListHeaders = [
  query("GroupName").optional().isString(),
  query("Status").optional().isString(),
];

export const validateListDetails = [
  param("hdrId").notEmpty().withMessage("Header ID is required in URL path."),
];

export const validateActionById = [
  param("hdrId").notEmpty().withMessage("Header ID is required in URL path."),
];

export const validateEmployeeAction = [
  param("hdrId").notEmpty().withMessage("Header ID is required in URL path."),
  body("teamGroupDtlId")
    .notEmpty()
    .withMessage("teamGroupDtlId is required in the body."),
];
