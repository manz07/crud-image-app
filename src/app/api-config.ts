import { environment } from "../environment/env";

const BASE_URL_KUCING = environment.apiKucingUrl;

export const API_CONFIG = {
    KUCING: {
        BASE: BASE_URL_KUCING,
        ALL: `${BASE_URL_KUCING}/cat`,
        BY_ID: (id: string) => `${BASE_URL_KUCING}/cat/${id}`,
        CREATE: `${BASE_URL_KUCING}/cat`,
        IMPORT: `${BASE_URL_KUCING}/cat/import`,
        SAVE_ALL: `${BASE_URL_KUCING}/cat/save`,
        UPDATE: `${BASE_URL_KUCING}/cat`
    }
}