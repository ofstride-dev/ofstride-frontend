import { useState, useCallback } from 'react';

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  company: string;
  location?: string;
  message: string;
  [key: string]: string | undefined;
}

interface UseFormSubmitReturn {
  status: SubmitStatus;
  submitForm: (data: FormData) => Promise<void>;
  reset: () => void;
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const BASIN_ENDPOINT = 'https://usebasin.com/f/YOUR_BASIN_ID';

export function useFormSubmit(accessKey: string): UseFormSubmitReturn {
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const submitForm = useCallback(async (data: FormData) => {
    setStatus('submitting');

    const formData = new FormData();
    formData.append('access_key', accessKey);
    formData.append('from_name', 'Ofstride Website');
    formData.append('subject', `New inquiry from ${data.name} — ${data.company}`);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', 
      `Company: ${data.company}\n` +
      `Location: ${data.location || 'Not provided'}\n` +
      `Message: ${data.message}`
    );
    formData.append('botcheck', '');

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });
      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        return;
      }
      throw new Error('Web3Forms failed');
    } catch {
      try {
        const basinFormData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value) basinFormData.append(key, value);
        });
        
        const basinResponse = await fetch(BASIN_ENDPOINT, {
          method: 'POST',
          body: basinFormData,
        });
        
        if (basinResponse.ok) {
          setStatus('success');
          return;
        }
      } catch {
        // Both failed
      }
      setStatus('error');
    }
  }, [accessKey]);

  const reset = useCallback(() => setStatus('idle'), []);

  return { status, submitForm, reset };
}
