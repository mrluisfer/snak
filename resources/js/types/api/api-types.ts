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
