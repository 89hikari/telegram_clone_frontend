import axios from 'axios';
import { stringify } from 'qs';

export const api = axios.create({
    paramsSerializer: {
        serialize: (params) => stringify(params, { arrayFormat: 'brackets' })
    }
});

export const createBaseUrl = (controller: string, action?: string) => {
    return `${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_URL}/${controller}${action ? `/${action}` : ''}`;
}