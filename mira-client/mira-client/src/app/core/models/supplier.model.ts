export interface Supplier {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateSupplier {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface UpdateSupplier extends CreateSupplier {
  isActive: boolean;
}