import { isDevMode } from '@angular/core';

export const environment = {
    production: !isDevMode(),
    apiBaseUrl: isDevMode() ? 'http://localhost:3000/' : 'https://vps-94333546.vps.ovh.net:8080/socialastroapi'
};
