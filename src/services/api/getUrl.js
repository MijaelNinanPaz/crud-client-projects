const url = import.meta.env.VITE_URL_BACKEND;
export const getUrl = (src) => `${url}/${src}`;