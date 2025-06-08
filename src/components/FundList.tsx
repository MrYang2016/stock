import React from 'react';
import { useQuery } from 'react-query';
import { fetchFundList } from '../services/api';

interface Fund {
  id: number;
  code: string;
  name: string;
  type: string;
  yield1N: string;
  yieldY: string;
}

interface FundListResponse {
  data: Fund[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const FundList: React.FC = () => {
  const { data, isLoading, isError } = useQuery<FundListResponse>(
    ['fundList', 1],
    () => fetchFundList(1, 10),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">加载基金列表失败，请稍后重试</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">基金列表</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">基金代码</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">基金名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">基金类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">近1年收益率</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">今年以来收益率</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data.map((fund) => (
              <tr key={fund.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fund.code}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fund.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fund.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`${Number(fund.yield1N) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fund.yield1N}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`${Number(fund.yieldY) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fund.yieldY}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundList; 