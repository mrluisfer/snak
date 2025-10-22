export type ApiFood = {
    id: number;
    name: string;
    description: string;
    price: number;
};

export type ApiResponse<T> = {
    data: T;
    error?: string;
    status: number;
}
