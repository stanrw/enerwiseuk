export interface TrustStats {
  assessments: string;
  savings: string;
  installers: string;
  treesPlanted: string;
}

export interface ChatMessage {
  id: number;
  message: string;
  isFromUser: boolean;
  timestamp: Date;
}

export interface AssessmentResult {
  property: any;
  assessment: any;
  installers: any[];
}

export interface SystemRecommendation {
  type: string;
  recommended: boolean;
  cost: number;
  annualSavings: number;
  paybackPeriod: number;
  specifications: Record<string, any>;
  roi: number;
}
