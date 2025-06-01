import React from 'react';
import { CompanyData } from '../types/company';
import { companies } from '../data/companies';

interface CompanySelectorProps {
  onSelectCompany: (company: CompanyData) => void;
  selectedCompany: CompanyData | null;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({ onSelectCompany, selectedCompany }) => {
  return (
    <div>
      {/* Mobile: Horizontal Scroll */}
      <div className="sm:hidden">
        <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2 space-x-3">
          {companies.map((company) => (
            <button
              key={company.symbol}
              onClick={() => onSelectCompany(company)}
              className={`company-card company-card-${company.id} p-4 flex flex-col items-center flex-shrink-0 w-28
                ${selectedCompany?.symbol === company.symbol ? 'ring-2 ring-primary-500' : ''}
              `}
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-2"
                style={{ color: company.color }}
              >
                <company.icon size={28} />
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{company.name}</h3>
              <p className="text-xs text-gray-500">{company.symbol}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {companies.map((company) => (
          <button
            key={company.symbol}
            onClick={() => onSelectCompany(company)}
            className={`company-card company-card-${company.id} p-4 flex flex-col items-center
              ${selectedCompany?.symbol === company.symbol ? 'ring-2 ring-primary-500' : ''}
            `}
          >
            <div
              className="w-16 h-16 flex items-center justify-center mb-2"
              style={{ color: company.color }}
            >
              <company.icon size={36} />
            </div>
            <h3 className="font-medium text-gray-900">{company.name}</h3>
            <p className="text-sm text-gray-500">{company.symbol}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompanySelector;