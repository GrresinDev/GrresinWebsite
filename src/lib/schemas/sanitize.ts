import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Initialize once per application
const { window } = new JSDOM('');
const purify = DOMPurify(window);

export const sanitize = (dirty: string): string => {
  const sanitized = purify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    FORBID_ATTR: ['style', 'script', 'img']
  });

  const unsafePattern = /(javascript:|console\.log\(|<script|on\w+=|<iframe)/i;

  if (dirty !== sanitized || sanitized === '' || unsafePattern.test(sanitized)) {
    return '';
  }

  return sanitized.trim();
};