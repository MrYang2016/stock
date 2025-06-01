import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import StockDashboard from './components/StockDashboard';
import Footer from './components/Footer';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <StockDashboard />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;