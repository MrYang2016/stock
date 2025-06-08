export interface StockMetric {
  peBasicExclExtraTTM?: number;
  epsBasicExclExtraItemsTTM?: number;
  marketCapitalization?: number;
  roe5Y?: number;
  roeRfy?: number;
  roeTTM?: number;
  // Add other metrics as needed
}

export interface StockMetrics {
  metric?: StockMetric;
  series?: Record<string, any>;
  metricType?: string;
  symbol?: string;
}