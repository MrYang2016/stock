import React from 'react';
import FundAnalyzer from './FundAnalyzer';
import { PieChart } from 'lucide-react';

const StockDashboard = () => {
  const tabs = [
    { id: 'fund', label: '基金分析', icon: PieChart },
  ];

  return (
    <div className="container-custom">
      {/* Tab 导航 */}
      <div className="mb-6 sm:mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className="flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm border-blue-500 text-blue-600"
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <FundAnalyzer />
    </div>
  );
};

export default StockDashboard;