import axios from 'axios';
import { StockMetrics } from '../types/metrics';
import { FundPositionResponse, FundMetrics, FundStock } from '../types/fund';

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

// 基金API配置
const fundHeaders = {
  validmark:
    'aKVEnBbJF9Nip2Wjf4de/fSvA8W3X3iB4L6vT0Y5cxvZbEfEm17udZKUD2qy37dLRY3bzzHLDv+up/Yn3OTo5Q==',
};

const deviceId = '874C427C-7C24-4980-A835-66FD40B67605';
const version = '6.5.5';
const baseData = {
  product: 'EFund',
  deviceid: deviceId,
  MobileKey: deviceId,
  plat: 'Iphone',
  PhoneType: 'IOS15.1.0',
  OSVersion: '15.5',
  version,
  ServerVersion: version,
  Version: version,
  appVersion: version,
};

// 获取基金持仓信息
export const fetchFundPosition = async (fundCode: string): Promise<FundPositionResponse> => {
  try {
    const response = await axios.get('https://fundmobapi.eastmoney.com/FundMNewApi/FundMNInverstPosition', {
      headers: fundHeaders,
      params: {
        ...baseData,
        FCODE: fundCode,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching fund position:', error);
    throw new Error('Failed to fetch fund position. Please check the fund code and try again.');
  }
};

// 计算基金指标
export const calculateFundMetrics = (fundStocks: FundStock[]): FundMetrics => {
  if (!fundStocks || fundStocks.length === 0) {
    return {
      totalStocks: 0,
      averagePosition: 0,
      totalPosition: 0,
      increaseCount: 0,
      decreaseCount: 0,
      maxPosition: null,
      minPosition: null,
      averageChange: 0,
    };
  }

  const positions = fundStocks.map(stock => Number(stock.JZBL)).filter(pos => !isNaN(pos));
  const changes = fundStocks.map(stock => Number(stock.PCTNVCHG)).filter(change => !isNaN(change));

  const totalPosition = positions.reduce((sum, pos) => sum + pos, 0);
  const averagePosition = positions.length > 0 ? totalPosition / positions.length : 0;

  const increaseCount = fundStocks.filter(stock => stock.PCTNVCHGTYPE === '增持').length;
  const decreaseCount = fundStocks.filter(stock => stock.PCTNVCHGTYPE === '减持').length;

  const maxPosition = fundStocks.reduce((max, stock) =>
    Number(stock.JZBL) > Number(max?.JZBL || 0) ? stock : max, fundStocks[0] || null);

  const minPosition = fundStocks.reduce((min, stock) =>
    Number(stock.JZBL) < Number(min?.JZBL || Infinity) ? stock : min, fundStocks[0] || null);

  const averageChange = changes.length > 0 ? changes.reduce((sum, change) => sum + change, 0) / changes.length : 0;

  return {
    totalStocks: fundStocks.length,
    averagePosition,
    totalPosition,
    increaseCount,
    decreaseCount,
    maxPosition,
    minPosition,
    averageChange,
  };
};

// 获取基金收益率数据
export const fetchFundPerformance = async (fundCode: string) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3004';

    const response = await axios.get(`${baseUrl}/stock/fund-performance`, {
      params: {
        fundCode: fundCode,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching fund performance:', error);
    throw new Error('Failed to fetch fund performance. Please check the fund code and try again.');
  }
};

export const fetchFundList = async (page: number, pageSize: number) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3004';

  const response = await fetch(`${baseUrl}/stock/fund-list?page=${page}&pageSize=${pageSize}`);
  if (!response.ok) {
    throw new Error('Failed to fetch fund list');
  }
  return response.json();
};