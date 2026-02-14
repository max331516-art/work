import { useState } from 'react';
import { ChevronLeft, User, Phone, Send } from 'lucide-react';
import { Job } from '@/data/jobs';
import { Translation } from '@/data/translations';
import type { Answers } from '@/hooks/useJobFinder';
import type { Language } from '@/data/translations';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

interface ApplyFormProps {
  job: Job | null;
  t: Translation;
  answers?: Answers;
  language?: Language;
  onSubmit: () => void;
  onBack: () => void;
  /** Передать ссылку для редиректа на SuccessScreen (редирект после паузы) */
  onRedirectLink?: (link: string) => void;
}

const formatPhone = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 0) return '';
  const match = cleaned.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
  if (match) {
    return [
      match[1] ? '+' + match[1] : '',
      match[2] ? ' (' + match[2] : '',
      match[3] ? ') ' + match[3] : '',
      match[4] ? '-' + match[4] : '',
      match[5] ? '-' + match[5] : ''
    ].join('');
  }
  return value;
};

const normalizePhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 11 && digits[0] === '8') return '7' + digits.slice(1);
  if (digits.length === 10) return '7' + digits;
  if (digits.length === 11 && digits[0] === '7') return digits;
  return digits;
};

const isValidRussianPhone = (value: string): boolean => {
  const norm = normalizePhone(value);
  if (norm.length !== 11 || norm[0] !== '7') return false;
  const rest = norm.slice(1);
  if (/^(\d)\1{9}$/.test(rest)) return false;
  if (rest === '1234567890') return false;
  if (/^0+$/.test(rest)) return false;
  return true;
};

const getTgId = (): number | null => {
  const tg = (window as unknown as { Telegram?: { WebApp?: { initDataUnsafe?: { user?: { id: number } } } } }).Telegram?.WebApp;
  return tg?.initDataUnsafe?.user?.id ?? null;
};

/** Только буквы (в т.ч. любые языки), пробелы и дефис. Цифры и символы — отсекаем. */
const formatName = (value: string): string => {
  return value.replace(/[^\p{L}\p{M}\s-]/gu, '').replace(/\s+/g, ' ').trimStart();
};

const isValidName = (value: string): boolean => {
  const trimmed = value.trim();
  if (trimmed.length < 2) return false;
  return /^[\p{L}\p{M}\s-]+$/u.test(trimmed);
};

const ApplyForm = ({ job, t, answers = {}, language = 'ru', onSubmit, onBack, onRedirectLink }: ApplyFormProps) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError(t.nameRequired);
      return;
    }
    if (!isValidName(name)) {
      setError(t.nameInvalid);
      return;
    }
    if (!isValidRussianPhone(phone)) {
      setError(t.phoneInvalid);
      return;
    }
    setError('');

    const phoneNorm = normalizePhone(phone);
    const redirectLink = job?.fallbackLink && Math.random() < 0.2 ? job.fallbackLink : job?.link;

    if (BACKEND_URL) {
      try {
        const res = await fetch(BACKEND_URL.replace(/\/$/, '') + '/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tg_id: getTgId(),
            language,
            city: answers.city,
            documents: answers.documents,
            transport: answers.transport,
            category: answers.category,
            job_company: job?.company,
            phone: phoneNorm,
            name: name.trim(),
            ready_when: answers.readyWhen,
            source: 'webapp',
            is_converted: false,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { duplicate?: boolean };
        if (res.status === 409 || data.duplicate) {
          setError(t.phoneDuplicate);
          return;
        }
      } catch {
        // Редирект всё равно делаем
      }
    }

    if (redirectLink) onRedirectLink?.(redirectLink);
    onSubmit();
  };

  if (!job) return null;

  return (
    <div className="animate-fade-in-up">
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-primary font-semibold text-sm mb-6 hover:-translate-x-1 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
          {t.back}
        </button>

        <div className="text-center mb-8">
          <span className="text-4xl mb-3 block">{job.icon}</span>
          <h3 className="font-display font-extrabold text-lg text-card-foreground">{job.company}</h3>
          <div className="font-display text-2xl font-black text-primary mt-1">
            {job.salary}<span className="text-sm font-semibold text-muted-foreground">{t[job.period]}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t.name}
              value={name}
              onChange={(e) => setName(formatName(e.target.value))}
              className="w-full bg-card border-2 border-border rounded-xl py-4 pl-12 pr-4 text-foreground font-medium text-base transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-muted-foreground"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="tel"
              placeholder="+7 (999) 123-45-67"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              maxLength={18}
              className="w-full bg-card border-2 border-border rounded-xl py-4 pl-12 pr-4 text-foreground font-medium text-base transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-muted-foreground"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm font-medium text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-primary-foreground rounded-xl p-4 font-bold text-base flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
          >
            <Send className="w-5 h-5" />
            {t.submit}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
