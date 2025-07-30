// apis/teamGroup.api.js
import { js2xml } from "xml-js";

/**
 * Helper to build the XML payload for employees.
 * @param {Array<string>} employeeIds - Array of employee IDs.
 * @returns {string} - XML string.
 */
const buildEmployeeXml = (employeeIds = []) => {
  if (!employeeIds || employeeIds.length === 0) {
    return "<root></root>";
  }
  const dtl = employeeIds.map(id => ({ EmpID: { _text: id } }));
  const xmlObject = {
    _declaration: { _attributes: { version: "1.0", encoding: "utf-8" } },
    root: {
      T_TrnEmployee_Dtl: dtl,
    },
  };
  return js2xml(xmlObject, { compact: true, spaces: 0 });
};

// --- API Methods ---

/**
 * Creates a new team group.
 * Corresponds to TeamGroup_Insert job (creation part).
 */
export const create = (client, payload) => {
  const { groupName, teamEmployeeIds, logUserId, cmpId } = payload;
  const xmlEmployee = buildEmployeeXml(teamEmployeeIds);
  return client.post("/TeamGroup_Insert", null, {
    params: {
      HdrId: "",
      GroupName: groupName,
      XmlEmployee: xmlEmployee,
      LogUserId: logUserId,
      CMPID: cmpId,
    },
  });
};

/**
 * Modifies an existing team group.
 * Corresponds to TeamGroup_Insert job (modification part).
 */
export const modify = (client, payload) => {
  const { teamGroupHdrId, teamEmployeeIds, logUserId, cmpId } = payload;
  const xmlEmployee = buildEmployeeXml(teamEmployeeIds);
  return client.post("/TeamGroup_Modify", null, {
    params: {
      HdrId: teamGroupHdrId, // Mapped from HdrId for consistency
      TeamGroup_HdrID: teamGroupHdrId,
      XmlEmployee: xmlEmployee,
      LogUserId: logUserId,
      CMPID: cmpId,
    },
  });
};

/**
 * Activates a team group.
 */
export const activate = (client, payload) =>
  client.post("/TeamGroup_Activation", null, { params: payload });

/**
 * Discontinues a team group.
 */
export const discontinue = (client, payload) =>
  client.post("/TeamGroup_Discontinue", null, { params: payload });

/**
 * Activates a single employee within a team group.
 */
export const activateEmployee = (client, payload) =>
  client.post("/TeamGroup_Employee_Activation", null, { params: payload });

/**
 * Discontinues a single employee within a team group.
 */
export const discontinueEmployee = (client, payload) =>
  client.post("/TeamGroup_Employee_Discontinue", null, { params: payload });

/**
 * Fetches the list of team group headers.
 */
export const fetchHdrList = (client, params) =>
  client.get("/TeamGroup_Hdr_List", { params });

/**
 * Fetches the list of team group details (employees).
 */
export const fetchDtlList = (client, params) =>
  client.get("/TeamGroupDtl_List", { params });