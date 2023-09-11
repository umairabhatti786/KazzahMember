import axios from 'axios';

import {API_URL} from '@env';

const DEMO_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjhjMjZkNTc0NjEwZjEzNGE0ZWI0NWU2ZDU1MTZkZWNkNDE4MzY0ZjI2MDI0Nzk4NWE1YzhjMWIwYzM5MTJjMTJkMzVlZjAwOWUyODVhZmMiLCJpYXQiOjE2NTI3NzExMjguMzc5MTYxLCJuYmYiOjE2NTI3NzExMjguMzc5MTcxLCJleHAiOjE2ODQzMDcxMjguMzY5MDM2LCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.KSkeFxmOaS-MLmHmIUefIUuJla2Aev26e743RnYNXBofx12XI1wk-EVsqL_bZumZRH79mxWoKmeT0GOgXc7E4RCf6aEboajWSaVQZUvvwPrFrBcTeT34nHggv4hj8z5D3AJ1IhCAL5JhE-ey1ceHpFcO7DXpMtNw72rMUelrNLOlBDDVTCF7-asgx7r8-g_I21lyVoj9G7kJoFHN-aHyOoqp7lxAYzoWHrxhbVUzeuWJMo9yDPFP2X_XG-LYyJ_-SgST8qEpQHJBw0mYm9rUpwwUtQsJLlV1SAgS2z019mSKdIcdaUH9r0gAxD-zyRMRaXwU7BIQG4oiRwa_AA8LBmhaUvFQ1KmX8_iuaEe-zo77UlSppd17KmEjJChglaswCkOXOGw_DpM9KNej_cl0EwXSL2R1_vHbFOf-xQxamHjUE3ZT8Cv7S-m42CzMB-arczWqPyxBiCoYQupPWpof1ayyLCK4I_kwLJwt8GVv-MJIAGCgvn5v9xlE_FnUsEyao_fCenwHa4yCWWGpv4t0H3ZZ0pCbx2FMyJtXBGcM-1a74UhwEay2ww0ONzkwNWtqm2sGRFD0huNcM33MJggjctS7B-I6V2X-AfwVQUPVtfqyX2OkkwSyQicX5lITG5qZQX6mHZ3OyDqEoCYJx50sJdWGpZQKVcs5RU7qIVJ4u_Q';

// baseURL: 'https://kazzah-api-gateway.techandover.com/',
export const baseURL = 'https://dev-redesign.kazzah.co.uk/';
// export const baseURL = 'https://sit.kazzah.co.uk/';

export const client = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  responseType: 'json',
});

export const clientJson = axios.create({
  baseURL: baseURL,
});
