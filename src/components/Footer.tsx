import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 sm:py-6">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-0">
            &copy; {new Date().getFullYear()} StockMetrics. All rights reserved.
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Powered by <a href="https://finnhub.io" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Finnhub</a>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 text-xs text-gray-400 text-center">
          Data provided for informational purposes only. Not financial advice.
        </div>
      </div>
    </footer>
  );
};

export default Footer;