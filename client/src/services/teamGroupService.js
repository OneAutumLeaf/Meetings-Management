// src/services/teamGroupService.js
import apiClient from './api';
import { js2xml } from 'xml-js';

const buildEmployeeXml = (employeeIds = []) => {
  if (!employeeIds || employeeIds.length === 0) {
    return "<root></root>";
  }
  const dtl = employeeIds.map(id => ({ EmpID: { _text: id.split('-')[0] } }));
  const xmlObject = {
    _declaration: { _attributes: { version: "1.0", encoding: "utf-8" } },
    root: { T_TrnEmployee_Dtl: dtl },
  };
  return js2xml(xmlObject, { compact: true, spaces: 0 });
};

// --- Default values that were previously in getAuthInfo ---
const LOG_USER_ID = "TestUser";
const CMP_ID = "1";

export const teamGroupService = {
  /**
   * Fetches headers. CMPID is now added automatically.
   */
  fetchHeaders: (params) => apiClient.get("/TeamGroup_Hdr_List", {
    params: { ...params, CMPID: CMP_ID }
  }),

  /**
   * Fetches details.
   */
  fetchDetails: (params) => apiClient.get("/TeamGroupDtl_List", { params }),

  /**
   * Creates a group. LogUserId and CMPID are now added automatically.
   */
  create: (payload) => {
    const { groupName, teamEmployeeIds } = payload;
    const xmlEmployee = buildEmployeeXml(teamEmployeeIds);
    return apiClient.post("/TeamGroup_Insert", null, {
      params: {
        HdrId: "",
        GroupName: groupName,
        XmlEmployee: xmlEmployee,
        LogUserId: LOG_USER_ID,
        CMPID: CMP_ID,
      },
    });
  },

  /**
   * Modifies a group. LogUserId and CMPID are now added automatically.
   */
  modify: (payload) => {
    const { teamGroupHdrId, teamEmployeeIds } = payload;
    const xmlEmployee = buildEmployeeXml(teamEmployeeIds);
    return apiClient.post("/TeamGroup_Modify", null, {
      params: {
        TeamGroup_HdrID: teamGroupHdrId,
        XmlEmployee: xmlEmployee,
        LogUserId: LOG_USER_ID,
        CMPID: CMP_ID,
      },
    });
  },

  /**
   * Discontinues a group. LogUserId and CMPID are now added automatically.
   */
  discontinue: (payload) => {
    const { TeamGroup_HdrID } = payload;
    return apiClient.post("/TeamGroup_Discontinue", null, {
      params: {
        TeamGroup_HdrID,
        LogUserId: LOG_USER_ID,
        CMPID: CMP_ID,
      },
    });
  },

  /**
   * Discontinues an employee from a group. LogUserId and CMPID are now added automatically.
   */
  discontinueEmployee: (payload) => {
    const { TeamGroup_DtlID } = payload;
    return apiClient.post("/TeamGroup_Employee_Discontinue", null, {
      params: {
        TeamGroup_DtlID,
        LogUserId: LOG_USER_ID,
        CMPID: CMP_ID,
      },
    });
  },
  
  fetchAllEmployees: () => {
    const allEmployees = [
        { id: "emp1", name: "0100006577-SUJIT KUMAR SHAW" },
        { id: "emp2", name: "0100105366-SAYANI CHATTERJEE" },
        { id: "emp3", name: "0100089658-SREEPURNA CHAKRABORTY" },
        { id: "emp4", name: "0100101775-Avirup Chakraborty" },
        { id: "emp5", name: "0100002343-DEBABRATA GUHA" },
        { id: "emp6", name: "0100003423-JOY BHATTACHARYA" },
    ];
    return Promise.resolve({ data: allEmployees });
  }
};