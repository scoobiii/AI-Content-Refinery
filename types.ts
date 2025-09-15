export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface UserAnswer {
  question: string;
  answer: string;
}

export interface ChartDataItem {
  name: string;
  [key: string]: string | number;
}

export interface AnalysisResult {
  refinedContent: string;
  generatedQuestions: string[];
  glossary: GlossaryItem[];
  userAnswers: UserAnswer[];
  energyFlows: string;
  chartData: ChartDataItem[];
}

export type Tab = 'refined' | 'questions' | 'glossary' | 'answers' | 'flows' | 'viz';