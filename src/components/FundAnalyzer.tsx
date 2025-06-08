import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Search, Percent } from 'lucide-react';
import { fetchFundPerformance } from '../services/api';
import FundList from './FundList';

interface PerformanceItem {
  title: string;
  syl: string;
  avg: string;
  hs300: string;
  rank: string;
  sc: string;
  diff: string;
}

const FundAnalyzer: React.FC = () => {
  const [fundCode, setFundCode] = useState('');
  const [searchFundCode, setSearchFundCode] = useState('');

  const { data: performanceData, isLoading, isError, error } = useQuery(
    ['fundPerformance', searchFundCode],
    () => searchFundCode ? fetchFundPerformance(searchFundCode) : null,
    {
      enabled: !!searchFundCode,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const handleSearch = () => {
    if (fundCode.trim()) {
      setSearchFundCode(fundCode.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const performance = performanceData?.Datas || [];

  const renderPerformanceCard = (item: PerformanceItem) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold text-gray-900">{item.title}收益率</h4>
        <div className="flex items-center gap-2">
          <Percent className="w-5 h-5 text-blue-600" />
          <span className={`text-xl font-bold ${Number(item.syl) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {item.syl}%
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-600">同类平均：</span>
          <span className={`font-medium ${Number(item.avg) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {item.avg}%
          </span>
        </div>
        <div>
          <span className="text-gray-600">沪深300：</span>
          <span className={`font-medium ${Number(item.hs300) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {item.hs300}%
          </span>
        </div>
        <div>
          <span className="text-gray-600">同类排名：</span>
          <span className="font-medium text-blue-600">{item.rank}/{item.sc}</span>
        </div>
        <div>
          <span className="text-gray-600">与平均差值：</span>
          <span className={`font-medium ${Number(item.diff) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {item.diff}%
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-custom">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">基金收益率查询</h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-3xl">
          输入基金代码查询基金收益率数据。
        </p>
      </div>

      {/* 基金列表 */}
      <div className="mb-6">
        <FundList />
      </div>

      {/* 搜索区域 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="fundCode" className="block text-sm font-medium text-gray-700 mb-2">
              基金代码
            </label>
            <input
              type="text"
              id="fundCode"
              value={fundCode}
              onChange={(e) => setFundCode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="请输入基金代码，如：004243"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={!fundCode.trim() || isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {isLoading ? '查询中...' : '查询'}
            </button>
          </div>
        </div>
      </div>

      {/* 错误信息 */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">
            {error instanceof Error ? error.message : '查询失败，请检查基金代码后重试'}
          </p>
        </div>
      )}

      {/* 收益率数据展示 */}
      {performance.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {performance.map((item: PerformanceItem, index: number) => (
            <div key={index}>
              {renderPerformanceCard(item)}
            </div>
          ))}
        </div>
      )}

      {/* 空状态 */}
      {!searchFundCode && !isLoading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="flex justify-center mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">开始查询基金收益率</h3>
          <p className="text-gray-600">
            请在上方输入基金代码开始查询收益率数据
          </p>
        </div>
      )}
    </div>
  );
};

export default FundAnalyzer; 