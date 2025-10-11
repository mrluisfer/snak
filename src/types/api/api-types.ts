export type ApiExampleResponse = {
    message: string;
    status: 1 | 0;
    title: string;
};

export type ApiFood = {
    id: number;
    name: string;
    description: string;
    price: number;
};
export type ApiFoodResponse = {
    status: 1 | 0;
    data: Array<ApiFood>;
};

export type ApiUser = {
    id: number;
    created_at: string | null;
    updated_at: string | null;
    name: string;
    email: string;
    email_verified_at: null | string | Date;
    role: string;
    id_last_address: number | null;
};

export type ApiAddress = {
    id: number;
    user_id: number;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    latitude: string | null;
    longitude: string | null;
    created_at: string;
    updated_at: string;
};
