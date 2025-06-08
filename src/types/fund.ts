// 基金持仓股票信息
export interface FundStock {
  GPDM: string;        // 股票代码
  GPJC: string;        // 股票简称
  JZBL: string;        // 净值比例
  TEXCH: string;       // 交易所代码
  ISINVISBL: string;   // 是否可见
  PCTNVCHGTYPE: string;// 持仓变化类型
  PCTNVCHG: string;    // 持仓变化
  NEWTEXCH: string;    // 新交易所代码
  INDEXCODE: string;   // 指数代码
  INDEXNAME: string;   // 指数名称
}

// 基金持仓数据
export interface FundPositionData {
  fundStocks: FundStock[];
}

// API 响应结构
export interface FundPositionResponse {
  Datas: FundPositionData;
}

// 基金指标统计
export interface FundMetrics {
  totalStocks: number;           // 总持仓数量
  averagePosition: number;       // 平均持仓比例
  totalPosition: number;         // 总持仓比例
  increaseCount: number;         // 增持数量
  decreaseCount: number;         // 减持数量
  maxPosition: FundStock | null; // 最大持仓
  minPosition: FundStock | null; // 最小持仓
  averageChange: number;         // 平均持仓变化
} 