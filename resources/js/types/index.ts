import type { ApiFood } from './api/api-types';

export type CartItem = ApiFood & { quantity?: number };
