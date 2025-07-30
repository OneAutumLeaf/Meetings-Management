// controllers/teamGroup.controller.js
import { TeamGroupService } from "../services/teamGroup.service.js";
import { successResponse, errorResponse } from "../helpers/response.helper.js";
import { handleControllerError } from "../helpers/errorHandler.helper.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Builds a payload with common user and company details.
 */
const buildPayload = (req) => ({
  ...req.body,
  ...req.params,
  TeamGroup_HdrID: req.params.hdrId || req.body.teamGroupHdrId,
  LogUserId: req.user?.emp_code, // from authMiddleware
  CMPID: req.user?.cmp_id, // from authMiddleware
});

export const TeamGroupController = {
  createOrUpdate: async (req, res) => {
    try {
      const payload = buildPayload(req);
      const result = await TeamGroupService.createOrUpdate(payload);

      // The API returns a result object with a string like "true. ..."
      const resultKey = payload.teamGroupHdrId
        ? "TeamGroup_ModifyResult"
        : "TeamGroup_InsertResult";
      if (result?.data?.[resultKey]?.startsWith("true.")) {
        return successResponse(
          res,
          MESSAGES.DEFAULT.SAVED,
          result.data,
          payload.teamGroupHdrId ? 200 : 201
        );
      }
      return errorResponse(
        res,
        result?.data?.[resultKey] || MESSAGES.DEFAULT.FAILED,
        400
      );
    } catch (err) {
      return handleControllerError(res, err);
    }
  },

  listHeaders: async (req, res) => {
    try {
      const params = { ...req.query, CMPID: req.user?.cmp_id };
      const result = await TeamGroupService.listHeaders(params);
      const data = result?.data?.TeamGroup_Hdr_ListResult;

      if (data) {
        return successResponse(res, MESSAGES.DEFAULT.FETCHED, data);
      }
      return errorResponse(res, MESSAGES.DEFAULT.NOT_FOUND, 404);
    } catch (err) {
      return handleControllerError(res, err);
    }
  },

  listDetails: async (req, res) => {
    try {
      const params = {
        TeamGroup_HdrID: req.params.hdrId,
        Status: req.query.status || "A",
      };
      const result = await TeamGroupService.listDetails(params);
      const data = result?.data?.TeamGroupDtl_ListResult;

      if (data) {
        return successResponse(res, MESSAGES.DEFAULT.FETCHED, data);
      }
      return errorResponse(res, MESSAGES.DEFAULT.NOT_FOUND, 404);
    } catch (err) {
      return handleControllerError(res, err);
    }
  },

  // Generic handler for simple POST actions like activate/discontinue
  _handlePostAction:
    (serviceMethod, resultKey, successMessage) => async (req, res) => {
      try {
        const payload = buildPayload(req);
        const result = await serviceMethod(payload);
        const data = result?.data?.[resultKey];

        if (data) {
          return successResponse(res, successMessage, data);
        }
        return errorResponse(res, MESSAGES.DEFAULT.FAILED, 400);
      } catch (err) {
        return handleControllerError(res, err);
      }
    },

  // Wire up the generic handler to specific actions
  activate: (req, res) =>
    TeamGroupController._handlePostAction(
      TeamGroupService.activate,
      "TeamGroup_ActivationResult",
      "Group activated successfully."
    )(req, res),
  discontinue: (req, res) =>
    TeamGroupController._handlePostAction(
      TeamGroupService.discontinue,
      "TeamGroup_DiscontinueResult",
      "Group discontinued successfully."
    )(req, res),
  activateEmployee: (req, res) =>
    TeamGroupController._handlePostAction(
      TeamGroupService.activateEmployee,
      "TeamGroup_Employee_ActivationResult",
      "Employee activated successfully."
    )(req, res),
  discontinueEmployee: (req, res) =>
    TeamGroupController._handlePostAction(
      TeamGroupService.discontinueEmployee,
      "TeamGroup_Employee_DiscontinueResult",
      "Employee discontinued successfully."
    )(req, res),
};
