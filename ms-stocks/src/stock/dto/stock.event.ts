import { Stock } from "../entities/stock.entity";

export class StockEvent {
    timestamp: Date = new Date();
    userId: number;
    demmande: "create" | "update" | "delete";
    data: Partial<Stock>;
}
