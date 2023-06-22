const url = import.meta.env.VITE_URL_BACKEND_CONTRACTORS;
export const getUrl = (src) => `${url}/${src}`;