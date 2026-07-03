import { useEffect, useCallback } from 'react';
import type { ChatMessage, LeadInfo } from '../types/chat';

const STORAGE_KEY = 'ofstride_chat_state';
const MAX_AGE_MS = 1000 * 60 * 60 * 24;

interface PersistedState {
  messages: ChatMessage[];
  lead: LeadInfo;
  step: string;
  timestamp: number;
}

export function useChatPersistence(
  messages: ChatMessage[],
  lead: LeadInfo,
  step: string,
  setMessages: (msgs: ChatMessage[]) => void,
  setLead: (lead: LeadInfo) => void,
  setStep: (step: string) => void
) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: PersistedState = JSON.parse(raw);
      if (Date.now() - parsed.timestamp > MAX_AGE_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      setMessages(parsed.messages);
      setLead(parsed.lead);
      setStep(parsed.step);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (messages.length <= 1) return;
    const state: PersistedState = { messages, lead, step, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [messages, lead, step]);

  const clearPersistence = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { clearPersistence };
}
