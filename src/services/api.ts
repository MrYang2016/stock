import axios from 'axios';
import { StockMetrics } from '../types/metrics';

const API_KEY = 'd0u5nt9r01qn5fk3b3pgd0u5nt9r01qn5fk3b3q0';
const BASE_URL = 'https://finnhub.io/api/v1';

// Function to fetch stock metrics
export const fetchStockMetrics = async (symbol: string): Promise<StockMetrics> => {
  try {
    const response = await axios.get(`${BASE_URL}/stock/metric`, {
      params: {
        symbol,
        metric: 'all',
        token: API_KEY
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching stock metrics:', error);
    throw new Error('Failed to fetch stock metrics. Please try again later.');
  }
};