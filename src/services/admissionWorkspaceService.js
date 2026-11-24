import { ADMISSION_WORKSPACE_KEY, initialAdmissionWorkspace } from '../data/admissionWorkspace';

const clone = (value) => JSON.parse(JSON.stringify(value));

function getStorageKey(tenantKey) {
  return `${ADMISSION_WORKSPACE_KEY}:${tenantKey || 'default'}`;
}

export function normalizeAdmissionWorkspace(value) {
  const saved = value ?? {};
  const fallback = clone(initialAdmissionWorkspace);

  // Keep newly added collections available when a browser has an older saved workspace.
  return {
    ...fallback,
    ...saved,
    applications: Array.isArray(saved.applications) ? saved.applications : fallback.applications,
    invoices: Array.isArray(saved.invoices) ? saved.invoices : fallback.invoices,
    tariffs: Array.isArray(saved.tariffs) ? saved.tariffs : fallback.tariffs,
    schedules: Array.isArray(saved.schedules) ? saved.schedules : fallback.schedules,
    reRegistrations: Array.isArray(saved.reRegistrations) ? saved.reRegistrations : fallback.reRegistrations,
    capacities: Array.isArray(saved.capacities) ? saved.capacities : fallback.capacities,
    results: { ...fallback.results, ...(saved.results ?? {}) },
    resultCorrectionRequests: Array.isArray(saved.resultCorrectionRequests) ? saved.resultCorrectionRequests : fallback.resultCorrectionRequests,
    selectionHistory: Array.isArray(saved.selectionHistory) ? saved.selectionHistory : fallback.selectionHistory,
    paymentHistory: Array.isArray(saved.paymentHistory) ? saved.paymentHistory : fallback.paymentHistory,
  };
}

// This tenant-scoped storage boundary can be replaced by API calls when admission endpoints exist.
export function loadAdmissionWorkspace(tenantKey) {
  try {
    const raw = window.localStorage.getItem(getStorageKey(tenantKey));
    return normalizeAdmissionWorkspace(raw ? JSON.parse(raw) : null);
  } catch {
    return normalizeAdmissionWorkspace(null);
  }
}

export function saveAdmissionWorkspace(tenantKey, value) {
  try {
    window.localStorage.setItem(getStorageKey(tenantKey), JSON.stringify(normalizeAdmissionWorkspace(value)));
    return true;
  } catch {
    return false;
  }
}
