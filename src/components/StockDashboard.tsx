import React, { useState } from 'react';
import CompanySelector from './CompanySelector';
import StockMetricsCard from './StockMetricsCard';
import { useQuery } from 'react-query';
import { fetchStockMetrics } from '../services/api';
import { CompanyData } from '../types/company';
import { Info } from 'lucide-react';

const StockDashboard = () => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);

  const { data, isLoading, isError, error } = useQuery(
    ['stockMetrics', selectedCompany?.symbol],
    () => selectedCompany ? fetchStockMetrics(selectedCompany.symbol) : null,
    {
      enabled: !!selectedCompany,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const handleCompanySelect = (company: CompanyData) => {
    setSelectedCompany(company);
  };

  return (
    <div className="container-custom">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Company P/E Ratio Tracker</h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-3xl">
          Select a company to view its current price-to-earnings ratio and other key metrics.
          <span className="hidden sm:inline"> The P/E ratio helps investors evaluate a company's relative value compared to its earnings.</span>
        </p>
      </div>

      <CompanySelector onSelectCompany={handleCompanySelect} selectedCompany={selectedCompany} />

      <div className="mt-6 sm:mt-8">
        {selectedCompany ? (
          <div className="fade-in">
            <StockMetricsCard
              company={selectedCompany}
              metrics={data}
              isLoading={isLoading}
              isError={isError}
              error={error as Error}
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-card p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-4">
              <Info className="h-10 w-10 sm:h-12 sm:w-12 text-primary-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No Company Selected</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Please select a company from the options above to view its P/E ratio and other metrics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockDashboard;