import { DivideIcon as LucideIcon } from 'lucide-react';

export interface CompanyData {
  id: string;
  name: string;
  symbol: string;
  description: string;
  color: string;
  icon: LucideIcon;
}