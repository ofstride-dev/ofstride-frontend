export type IntakeStep = 'name' | 'phone' | 'location' | 'company' | 'task' | 'done';

export interface LeadInfo {
  name: string;
  phone: string;
  location: string;
  company: string;
  taskSummary: string;
}

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: Array<{ label: string; value: string }>;
  timestamp: number;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
}
