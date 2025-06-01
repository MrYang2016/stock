import React from 'react';
import { BarChart3 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">StockMetrics</h1>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Real-time P/E Ratios
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;