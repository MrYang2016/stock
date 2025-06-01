export interface StockMetric {
  peBasicExclExtraTTM?: number;
  epsBasicExclExtraItemsTTM?: number;
  marketCapitalization?: number;
  // Add other metrics as needed
}

export interface StockMetrics {
  metric?: StockMetric;
  series?: Record<string, any>;
  metricType?: string;
  symbol?: string;
}