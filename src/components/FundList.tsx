import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchFundList } from '../services/api';
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Fund {
  id: number;
  code: string;
  name: string;
  type: string;
  yield1N: string;
  yield3N: string;
  yield5N: string;
}

interface FundListResponse {
  data: Fund[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const FundList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError } = useQuery<FundListResponse>(
    ['fundList', currentPage],
    () => fetchFundList(currentPage, pageSize),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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

  const renderFundCard = (fund: Fund) => (
    <div key={fund.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-base font-medium text-gray-900">{fund.name}</h3>
          <p className="text-sm text-gray-500">{fund.code}</p>
        </div>
        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{fund.type}</span>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-3">
        <div>
          <p className="text-xs text-gray-500 mb-1">近1年收益率</p>
          <div className="flex items-center">
            <span className={`text-sm font-medium ${Number(fund.yield1N) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fund.yield1N}%
            </span>
            {Number(fund.yield1N) >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-600 ml-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-600 ml-1" />
            )}
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">近3年收益率</p>
          <div className="flex items-center">
            <span className={`text-sm font-medium ${Number(fund.yield3N) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fund.yield3N}%
            </span>
            {Number(fund.yield3N) >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-600 ml-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-600 ml-1" />
            )}
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">近5年收益率</p>
          <div className="flex items-center">
            <span className={`text-sm font-medium ${Number(fund.yield5N) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fund.yield5N}%
            </span>
            {Number(fund.yield5N) >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-600 ml-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-600 ml-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">基金列表</h2>

      {/* 移动端：卡片布局 */}
      <div className="sm:hidden space-y-3">
        {data?.data.map(renderFundCard)}
      </div>

      {/* 桌面端：表格布局 */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">基金代码</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">基金名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">基金类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">近1年收益率</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">近3年收益率</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">近5年收益率</th>
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
                  <span className={`${Number(fund.yield3N) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fund.yield3N}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`${Number(fund.yield5N) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fund.yield5N}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页控件 */}
      {data && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
          <div className="text-sm text-gray-700">
            显示第 {(currentPage - 1) * pageSize + 1} 到 {Math.min(currentPage * pageSize, data.total)} 条，共 {data.total} 条
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-700">
              第 {currentPage} 页，共 {data.totalPages} 页
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data.totalPages}
              className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundList; 