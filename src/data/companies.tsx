import React from 'react';
import { Apple, Cpu, ShoppingCart, BarChart, Search } from 'lucide-react';
import { CompanyData } from '../types/company';

// Define company data
export const companies: CompanyData[] = [
  {
    id: 'apple',
    name: 'Apple',
    symbol: 'AAPL',
    description: 'Technology company that designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories.',
    color: '#000000',
    icon: Apple
  },
  {
    id: 'tesla',
    name: 'Tesla',
    symbol: 'TSLA',
    description: 'Electric vehicle and clean energy company that designs and manufactures electric cars, battery energy storage, solar panels, and related products.',
    color: '#e82127',
    icon: Cpu
  },
  {
    id: 'amazon',
    name: 'Amazon',
    symbol: 'AMZN',
    description: 'Multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    color: '#ff9900',
    icon: ShoppingCart
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    symbol: 'MSFT',
    description: 'Technology company that develops, licenses, and supports software, services, devices, and solutions worldwide.',
    color: '#00a4ef',
    icon: BarChart
  },
  {
    id: 'google',
    name: 'Google',
    symbol: 'GOOGL',
    description: 'Multinational technology company specializing in Internet-related services and products, including online advertising technologies, search engine, and cloud computing.',
    color: '#4285f4',
    icon: Search
  }
];