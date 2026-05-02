export interface PurchaseItem {
  id: number;
  itemId: number;
  itemName: string;
  itemCode: string;
  qty: number;
  unitCost: number;
  lineTotal: number;
}

export interface Purchase {
  id: number;
  invoiceNo: string;
  supplierId: number;
  supplierName: string;
  invoiceDate: string;
  totalAmount: number;
  remark: string;
  createdAt: string;
  items: PurchaseItem[];
}

export interface CreatePurchaseItem {
  itemId: number;
  qty: number;
  unitCost: number;
}

export interface CreatePurchase {
  invoiceNo: string;
  supplierId: number;
  invoiceDate: string;
  remark: string;
  items: CreatePurchaseItem[];
}