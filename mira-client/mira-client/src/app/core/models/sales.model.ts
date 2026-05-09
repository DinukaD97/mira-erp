export interface SalesItem {
  id: number;
  itemId: number;
  itemName: string;
  itemCode: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Sale {
  id: number;
  invoiceNo: string;
  customerId: number;
  customerName: string;
  invoiceDate: string;
  totalAmount: number;
  remark: string;
  createdAt: string;
  items: SalesItem[];
}

export interface CreateSalesItem {
  itemId: number;
  qty: number;
  unitPrice: number;
}

export interface CreateSale {
  invoiceNo: string;
  customerId: number;
  invoiceDate: string;
  remark: string;
  items: CreateSalesItem[];
}