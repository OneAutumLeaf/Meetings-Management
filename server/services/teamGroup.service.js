// services/teamGroup.service.js
import { getApiClient } from "../utils/apiClientRegistry.js";
import * as teamGroupApi from "../apis/teamGroup.api.js";

const client = getApiClient("default");

const TeamGroupService = {
  /**
   * Creates or updates a team group based on the presence of `teamGroupHdrId`.
   */
  createOrUpdate: (payload) => {
    if (payload.teamGroupHdrId) {
      return teamGroupApi.modify(client, payload);
    }
    return teamGroupApi.create(client, payload);
  },

  /**
   * Activates a team group.
   */
  activate: (payload) => teamGroupApi.activate(client, payload),

  /**
   * Discontinues a team group.
   */
  discontinue: (payload) => teamGroupApi.discontinue(client, payload),

  /**
   * Activates a single employee in a group.
   */
  activateEmployee: (payload) => teamGroupApi.activateEmployee(client, payload),

  /**
   * Discontinues a single employee from a group.
   */
  discontinueEmployee: (payload) => teamGroupApi.discontinueEmployee(client, payload),

  /**
   * Fetches team group headers.
   */
  listHeaders: (params) => teamGroupApi.fetchHdrList(client, params),

  /**
   * Fetches team group details.
   */
  listDetails: (params) => teamGroupApi.fetchDtlList(client, params),
};

export { TeamGroupService };