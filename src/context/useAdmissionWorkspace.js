import { useEffect, useState } from 'react';
import { loadAdmissionWorkspace, normalizeAdmissionWorkspace, saveAdmissionWorkspace } from '../services/admissionWorkspaceService';

export function useAdmissionWorkspace(tenantKey = 'default') {
  const [workspace, setWorkspace] = useState(() => loadAdmissionWorkspace(tenantKey));

  useEffect(() => {
    setWorkspace(loadAdmissionWorkspace(tenantKey));
  }, [tenantKey]);

  const updateWorkspace = (update) => {
    setWorkspace((current) => {
      // Resolve updates against the latest snapshot before persisting cross-module changes.
      const next = normalizeAdmissionWorkspace(typeof update === 'function' ? update(current) : update);
      saveAdmissionWorkspace(tenantKey, next);
      return next;
    });
  };

  return [workspace, updateWorkspace];
}
