export interface Order {
    id?: number;
    user_id: number;
    status: string;
    total: number;
    created_at?: Date;
    updated_at?: Date;
}
