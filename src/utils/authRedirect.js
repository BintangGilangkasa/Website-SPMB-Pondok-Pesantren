export function getPostLoginPath(location, fallbackPath) {
  const returnLocation = location.state?.from;
  if (!returnLocation?.pathname) return fallbackPath;

  return `${returnLocation.pathname}${returnLocation.search || ''}${returnLocation.hash || ''}`;
}
