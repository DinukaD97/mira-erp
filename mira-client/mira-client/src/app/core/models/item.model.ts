export interface Category {
  id: number;
  name: string;
  isActive: boolean;
}

export interface Unit {
  id: number;
  name: string;
  isActive: boolean;
}

export interface Item {
  id: number;
  code: string;
  name: string;
  categoryId: number;
  categoryName: string;
  unitId: number;
  unitName: string;
  costPrice: number;
  salePrice: number;
  stockQty: number;
  reorderLevel: number;
  isActive: boolean;
}

export interface CreateItem {
  code: string;
  name: string;
  categoryId: number;
  unitId: number;
  costPrice: number;
  salePrice: number;
  reorderLevel: number;
}

export interface UpdateItem extends CreateItem {
  isActive: boolean;
}