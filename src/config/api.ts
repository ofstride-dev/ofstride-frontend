/**
 * Centralized API configuration
 * Defines base URLs and endpoint helpers
 */

// Get environment variables with defaults for development
const getAgentApiBase = (): string => {
  return import.meta.env.VITE_AGENT_API || "http://localhost:5175";
};

const getDataApiBase = (): string => {
  return import.meta.env.VITE_DATA_API || "http://localhost:5175";
};

export const API_CONFIG = {
  agentBase: getAgentApiBase(),
  dataBase: getDataApiBase(),
} as const;

/**
 * Agent API endpoints (uses VITE_AGENT_API)
 * These are endpoints for chat/session management with the LLM agent
 */
export const AGENT_ENDPOINTS = {
  sessionInit: () => `${API_CONFIG.agentBase}/session/init`,
  chat: () => `${API_CONFIG.agentBase}/api/chat`,
} as const;

/**
 * Data API endpoints (uses VITE_DATA_API)
 * These are endpoints for data collection, analytics, and business logic
 */
export const DATA_ENDPOINTS = {
  leads: () => `${API_CONFIG.dataBase}/api/leads`,
  consultant: () => `${API_CONFIG.dataBase}/api/consultant`,
  notify: () => `${API_CONFIG.dataBase}/api/notify`,
  hrHiring: () => `${API_CONFIG.dataBase}/api/hr/hiring`,
  hrCandidate: () => `${API_CONFIG.dataBase}/api/hr/candidate`,
  hrCandidateAnalyze: () => `${API_CONFIG.dataBase}/api/hr/candidate/analyze`,
  chartsOverview: () => `${API_CONFIG.dataBase}/api/charts/overview`,
  chartsAgent: () => `${API_CONFIG.dataBase}/api/charts/agent`,
} as const;

/**
 * Helper function to log API calls in development
 */
export const logApiCall = (endpoint: string, method: string = "GET"): void => {
  if (import.meta.env.DEV) {
    console.debug(`[API] ${method} ${endpoint}`);
  }
};
