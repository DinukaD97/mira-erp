export interface StockReportItem {
  itemId: number;
  itemCode: string;
  itemName: string;
  categoryName: string;
  unitName: string;
  totalPurchased: number;
  totalSold: number;
  currentStock: number;
  reorderLevel: number;
  stockStatus: string;
}