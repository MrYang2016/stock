import React from 'react';
import { ArrowUpRight, ArrowDownRight, AlertCircle, Loader2 } from 'lucide-react';
import { CompanyData } from '../types/company';
import { StockMetrics } from '../types/metrics';

interface StockMetricsCardProps {
  company: CompanyData;
  metrics: StockMetrics | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const StockMetricsCard: React.FC<StockMetricsCardProps> = ({
  company,
  metrics,
  isLoading,
  isError,
  error,
}) => {
  if (isLoading) {
    return (
      <div className={`company-card company-card-${company.id} p-4 sm:p-6`}>
        <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center" style={{ color: company.color }}>
            <company.icon size={24} className="sm:hidden" />
            <company.icon size={32} className="hidden sm:block" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{company.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{company.symbol}</p>
          </div>
        </div>
        <div className="space-y-4 sm:space-y-6">
          <div className="h-20 sm:h-24 flex items-center justify-center">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary-500 animate-spin" />
            <span className="ml-2 text-sm sm:text-base text-gray-600">Loading metrics...</span>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`company-card company-card-${company.id} p-4 sm:p-6`}>
        <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center" style={{ color: company.color }}>
            <company.icon size={24} className="sm:hidden" />
            <company.icon size={32} className="hidden sm:block" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{company.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{company.symbol}</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-start">
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-error-500 mr-2 flex-shrink-0" />
          <div>
            <h4 className="text-xs sm:text-sm font-medium text-error-600 mb-1">Error loading data</h4>
            <p className="text-xs sm:text-sm text-gray-600">{error?.message || 'An unexpected error occurred.'}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return null;
  }

  const peRatio = metrics.metric?.peBasicExclExtraTTM;
  const isPeRatioHigh = peRatio > 20;

  return (
    <div className={`company-card company-card-${company.id} p-4 sm:p-6`}>
      <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center" style={{ color: company.color }}>
          <company.icon size={24} className="sm:hidden" />
          <company.icon size={32} className="hidden sm:block" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{company.name}</h3>
          <p className="text-xs sm:text-sm text-gray-500">{company.symbol}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <p className="metric-label">P/E Ratio (TTM)</p>
          {peRatio ? (
            <div className="flex items-end space-x-2">
              <p className="metric-value text-xl sm:text-2xl lg:text-3xl">{peRatio.toFixed(2)}</p>
              <div className={`flex items-center ${isPeRatioHigh ? 'text-warning-500' : 'text-success-500'}`}>
                {isPeRatioHigh ? (
                  <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </div>
            </div>
          ) : (
            <p className="metric-value text-xl sm:text-2xl lg:text-3xl text-gray-400">N/A</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {isPeRatioHigh
              ? 'Higher than average P/E ratio'
              : 'Within normal P/E ratio range'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <p className="metric-label">EPS (TTM)</p>
          {metrics.metric?.epsBasicExclExtraItemsTTM ? (
            <p className="metric-value text-xl sm:text-2xl lg:text-3xl">
              ${metrics.metric.epsBasicExclExtraItemsTTM.toFixed(2)}
            </p>
          ) : (
            <p className="metric-value text-xl sm:text-2xl lg:text-3xl text-gray-400">N/A</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Earnings per share, trailing twelve months
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <p className="metric-label">Market Cap</p>
          {metrics.metric?.marketCapitalization ? (
            <p className="metric-value text-xl sm:text-2xl lg:text-3xl">
              ${(metrics.metric.marketCapitalization / 1000).toFixed(2)}B
            </p>
          ) : (
            <p className="metric-value text-xl sm:text-2xl lg:text-3xl text-gray-400">N/A</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Total market value of the company
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <p className="metric-label">ROE (TTM)</p>
          {metrics.metric?.roeTTM ? (
            <p className="metric-value text-xl sm:text-2xl lg:text-3xl">
              {metrics.metric.roeTTM.toFixed(2)}%
            </p>
          ) : (
            <p className="metric-value text-xl sm:text-2xl lg:text-3xl text-gray-400">N/A</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Return on equity, trailing twelve months
          </p>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">What does this mean?</h4>
        <p className="text-xs sm:text-sm text-gray-600">
          <span className="sm:hidden">
            The P/E ratio shows how much investors pay for $1 of earnings.
            {peRatio && (isPeRatioHigh ? ` High ratio (${peRatio.toFixed(2)}) suggests growth expectations.` : ` Moderate ratio (${peRatio.toFixed(2)}) suggests reasonable valuation.`)}
          </span>
          <span className="hidden sm:inline">
            The P/E ratio shows how much investors are willing to pay for $1 of earnings.
            {peRatio ? (
              isPeRatioHigh ? (
                ` ${company.name}'s current P/E ratio of ${peRatio.toFixed(2)} is relatively high, 
                suggesting investors expect strong future growth.`
              ) : (
                ` ${company.name}'s current P/E ratio of ${peRatio.toFixed(2)} is moderate, 
                suggesting the stock may be reasonably valued relative to earnings.`
              )
            ) : (
              ' P/E ratio data is currently unavailable for this company.'
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default StockMetricsCard;