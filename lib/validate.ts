/** Shared enquiry validation — used by the form (client) and the API route (server). */
export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  shoot_type: string;
  preferred_date?: string;
  message: string;
  website?: string; // honeypot
};

export const rules: Record<'name' | 'email' | 'phone' | 'shoot_type' | 'message', (v: string) => true | string> = {
  name: (v) => v.trim().length > 1 || 'Please enter your name.',
  email: (v) => /^\S+@\S+\.\S+$/.test(v.trim()) || 'Enter a valid email address.',
  phone: (v) => /^[+\d][\d\s\-()]{7,}$/.test(v.trim()) || 'Enter a valid phone number.',
  shoot_type: (v) => !!v.trim() || 'Choose a shoot type.',
  message: (v) => v.trim().length > 9 || 'Tell me a little more (10+ characters).',
};

export function validate(data: Partial<Enquiry>) {
  const errors: Partial<Record<keyof typeof rules, string>> = {};
  (Object.keys(rules) as (keyof typeof rules)[]).forEach((k) => {
    const r = rules[k](String(data[k] ?? ''));
    if (r !== true) errors[k] = r;
  });
  return errors;
}
