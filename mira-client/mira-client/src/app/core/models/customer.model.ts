export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface UpdateCustomer extends CreateCustomer {
  isActive: boolean;
}