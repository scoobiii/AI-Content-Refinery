import React from 'react';

type IconProps = {
  className?: string;
};

export const BrainCircuitIcon: React.FC<IconProps> = ({ className = "w-16 h-16 text-sky-400" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5a3 3 0 1 0-5.993.142" /><path d="M18 5a3 3 0 1 0-5.993.142" /><path d="M12 19a3 3 0 1 0 5.993-.142" /><path d="M6 19a3 3 0 1 0 5.993-.142" /><path d="M12 12a3 3 0 1 0-5.993.142" /><path d="M18 12a3 3 0 1 0-5.993.142" /><path d="M12 5a3 3 0 1 0-5.993.142" /><path d="M18 5a3 3 0 1 0-5.993.142" /><path d="M12 19a3 3 0 1 0 5.993-.142" /><path d="M6 19a3 3 0 1 0 5.993-.142" /><path d="M12 12a3 3 0 1 0-5.993.142" /><path d="M18 12a3 3 0 1 0-5.993.142" /><path d="M12 8V5" /><path d="M12 19v-3" /><path d="M15 12h3" /><path d="M6 12h3" /><path d="m15.5 15.5-2-2" /><path d="m8.5 8.5-2-2" /><path d="m8.5 15.5 2-2" /><path d="m15.5 8.5-2 2" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9L12 21l1.9-4.8 4.8-1.9-4.8-1.9L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </svg>
);

export const HelpCircleIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />
    </svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

export const MessageSquareQuestionIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2z" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />
    </svg>
);

export const FlowchartIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="6" height="6" x="3" y="3" rx="1" />
    <rect width="6" height="6" x="15" y="15" rx="1" />
    <path d="M6 9v6" />
    <path d="M15 9h3" />
    <path d="M18 9v6" />
    <path d="M12 9h-3" />
    <path d="M6 15h6" />
  </svg>
);

export const ChartIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 3v18h18" />
        <rect width="4" height="7" x="7" y="10" rx="1" />
        <rect width="4" height="12" x="15" y="5" rx="1" />
    </svg>
);