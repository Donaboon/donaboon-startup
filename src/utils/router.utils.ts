export const buildRoute = (
  route: string,
  options?: {
    language?: string;
    saveSearchParams?: boolean;
  }
) => {
  const language = options?.language?.toLowerCase();
  const saveSearchParams = options?.saveSearchParams;

  const query = window.location.search;

  if (!language) return route;

  if (route[0] !== '/') {
    route = `/${route}`;
  }

  return `/${[language, ...route.split('/').slice(1)].join('/')}${
    saveSearchParams ? query : ''
  }`;
};
