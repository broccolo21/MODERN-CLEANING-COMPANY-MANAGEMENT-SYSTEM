export interface Client {
  id: string;
  name: string;
  type: 'business' | 'residential';
  email: string;
  phone: string;
  address: string;
  vatNumber?: string;
  contactPerson?: string;
  serviceFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  status: 'active' | 'inactive';
  contractStart: Date;
  contractEnd?: Date;
  nextService?: Date;
  lastService?: Date;
  notes?: string;
}