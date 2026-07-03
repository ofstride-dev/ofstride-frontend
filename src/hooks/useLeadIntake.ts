import { useCallback, useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';
import type { IntakeStep, LeadInfo } from '../types/chat';

const STEP_ORDER: IntakeStep[] = ['name', 'phone', 'location', 'company', 'task', 'done'];

const STEP_FIELD_MAP: Record<IntakeStep, keyof LeadInfo | null> = {
  name: 'name',
  phone: 'phone',
  location: 'location',
  company: 'company',
  task: 'taskSummary',
  done: null,
};

const STEP_PROMPTS: Record<IntakeStep, string> = {
  name: "What's your name?",
  phone: "Nice to meet you! What's the best phone number to reach you? (Include country code, e.g., +91 98765 43210)",
  location: 'Which city or region are you based in?',
  company: 'What company or organization are you representing?',
  task: 'What can we help you with? (e.g., HR consulting, financial advisory, legal support, IT modernization)',
  done: '',
};

export interface UseLeadIntakeReturn {
  step: IntakeStep;
  lead: LeadInfo;
  errors: Partial<Record<keyof LeadInfo, string>>;
  processInput: (value: string) => { success: boolean; error?: string; botResponse?: string };
  reset: () => void;
  isComplete: boolean;
  currentPrompt: string;
}

export function useLeadIntake(): UseLeadIntakeReturn {
  const [step, setStep] = useState<IntakeStep>('name');
  const [lead, setLead] = useState<LeadInfo>({
    name: '', phone: '', location: '', company: '', taskSummary: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadInfo, string>>>({});

  const validateStep = useCallback((currentStep: IntakeStep, value: string): string | null => {
    const trimmed = value.trim();
    switch (currentStep) {
      case 'name':
        return trimmed.length < 2 ? 'Please enter your full name (at least 2 characters)' : null;
      case 'phone': {
        const phone = parsePhoneNumberFromString(trimmed);
        if (!phone?.isValid()) {
          return 'Please enter a valid phone number with country code (e.g., +91 98765 43210, +1 555-123-4567)';
        }
        return null;
      }
      case 'location':
        return trimmed.length < 2 ? 'Please enter your city or region' : null;
      case 'company':
        return trimmed.length < 2 ? 'Please enter your company or organization name' : null;
      case 'task':
        return trimmed.length < 10 ? 'Please describe your needs in at least 10 characters' : null;
      default:
        return null;
    }
  }, []);

  const processInput = useCallback((value: string): { success: boolean; error?: string; botResponse?: string } => {
    const error = validateStep(step, value);
    if (error) {
      setErrors(prev => ({ ...prev, [step]: error }));
      return { success: false, error };
    }

    const field = STEP_FIELD_MAP[step];
    const updatedLead = field ? { ...lead, [field]: value.trim() } : lead;
    if (field) setLead(updatedLead);

    setErrors(prev => {
      const next = { ...prev };
      if (field) delete next[field];
      return next;
    });

    const currentIndex = STEP_ORDER.indexOf(step);
    const nextStep = STEP_ORDER[currentIndex + 1] ?? 'done';
    setStep(nextStep);

    let botResponse: string | undefined;
    if (nextStep === 'done') {
      botResponse = `Thank you, ${updatedLead.name}! Here's what I captured:\n\n` +
        `📞 Phone: ${updatedLead.phone}\n` +
        `📍 Location: ${updatedLead.location}\n` +
        `🏢 Company: ${updatedLead.company}\n` +
        `📝 Need: ${updatedLead.taskSummary}\n\n` +
        `Our team will review and reach out within 24 hours. You can also book a call directly for faster scheduling.`;
    } else {
      botResponse = STEP_PROMPTS[nextStep];
    }

    return { success: true, botResponse };
  }, [step, lead, validateStep]);

  const reset = useCallback(() => {
    setStep('name');
    setLead({ name: '', phone: '', location: '', company: '', taskSummary: '' });
    setErrors({});
  }, []);

  return {
    step,
    lead,
    errors,
    processInput,
    reset,
    isComplete: step === 'done',
    currentPrompt: STEP_PROMPTS[step],
  };
}
