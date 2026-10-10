export function getQueryParams() {
  return new URLSearchParams(window.location.search);
}

export function getQueryParam(key, defaultValue = "") {
  const params = getQueryParams();
  return params.get(key) ?? defaultValue;
}

export function setQueryParams(params = {}) {
  const searchParams = new URLSearchParams(
    window.location.search
  );

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      searchParams.delete(key);
    } else {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  const newUrl = query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname;

  window.history.replaceState({}, "", newUrl);
}

export function clearQueryParams() {
  window.history.replaceState(
    {},
    "",
    window.location.pathname
  );
}