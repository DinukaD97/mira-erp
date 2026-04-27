export interface LocationModel {
  id: number;
  code: string;
  name: string;
  remark: string;
  isActive: boolean;
}

export interface CreateLocation {
  code: string;
  name: string;
  remark: string;
}

export interface UpdateLocation extends CreateLocation {
  isActive: boolean;
}