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

export interface SalesByCustomer {
  customerId: number;
  customerName: string;
  totalInvoices: number;
  totalRevenue: number;
}

export interface BestSellingItem {
  itemId: number;
  itemCode: string;
  itemName: string;
  categoryName: string;
  totalQtySold: number;
  totalRevenue: number;
}

export interface SalesSummary {
  totalInvoices: number;
  totalRevenue: number;
  salesByCustomer: SalesByCustomer[];
  bestSellingItems: BestSellingItem[];
}