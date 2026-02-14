import { useState, useCallback, useRef } from 'react';
import { Language } from '@/data/translations';
import { Job, jobsByCategory } from '@/data/jobs';

export type Step = 'language' | 'category' | 'age' | 'city' | 'transport' | 'documents' | 'readyWhen' | 'vacancies' | 'apply' | 'final' | 'rejected';

export type RejectionReason = 'age' | 'no_vacancies' | null;

export interface Answers {
  category?: string;
  age?: string;
  city?: string;
  transport?: string;
  documents?: string;
  readyWhen?: string;
}

const REJECTION_RANDOM_CHANCE = 0.25;
const MIN_STEPS_BEFORE_REDIRECT = 3;
const MIN_SECONDS_BEFORE_REDIRECT = 30;

export function useJobFinder() {
  const [step, setStep] = useState<Step>('language');
  const [language, setLanguage] = useState<Language>('ru');
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [rejectionReason, setRejectionReason] = useState<RejectionReason>(null);
  const [redirectLink, setRedirectLink] = useState<string | null>(null);
  const startedAtRef = useRef<number>(Date.now());

  const isRemote = answers.category === 'remote';
  const isShift = answers.category === 'shift';
  const isDelivery = answers.category === 'delivery';

  const getStepFlow = useCallback((ans: Answers): Step[] => {
    const remote = ans.category === 'remote';
    const shift = ans.category === 'shift';
    const delivery = ans.category === 'delivery';

    const flow: Step[] = ['language', 'category', 'age'];
    if (!remote && !shift) flow.push('city');
    if (delivery) flow.push('transport');
    flow.push('documents', 'readyWhen', 'vacancies', 'apply');
    return flow;
  }, []);

  const stepFlow = getStepFlow(answers);
  const currentIndex = stepFlow.indexOf(step);
  const progress = step === 'final' ? 100 : step === 'rejected' ? 0 : currentIndex < 0 ? 0 : (currentIndex / (stepFlow.length - 1)) * 100;

  const timeSpentSeconds = (Date.now() - startedAtRef.current) / 1000;
  const stepsCompleted = step === 'final' ? stepFlow.length : (currentIndex >= 0 ? currentIndex + 1 : 0);
  const canRedirect = timeSpentSeconds >= MIN_SECONDS_BEFORE_REDIRECT && stepsCompleted >= MIN_STEPS_BEFORE_REDIRECT;

  const goNext = useCallback((newAnswers?: Answers) => {
    const ans = newAnswers || answers;
    const flow = getStepFlow(ans);
    const idx = flow.indexOf(step);
    if (idx >= 0 && idx < flow.length - 1) {
      setStep(flow[idx + 1]);
    }
  }, [answers, step, getStepFlow]);

  const goBack = useCallback(() => {
    const idx = stepFlow.indexOf(step);
    if (idx > 0) {
      setStep(stepFlow[idx - 1]);
    }
  }, [step, stepFlow]);

  const selectLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    setStep('category');
  }, []);

  const selectCategory = useCallback((cat: string) => {
    const newAnswers = { ...answers, category: cat };
    setAnswers(newAnswers);
    const flow = getStepFlow(newAnswers);
    const idx = flow.indexOf('category');
    if (idx >= 0 && idx < flow.length - 1) {
      setStep(flow[idx + 1]);
    }
  }, [answers, getStepFlow]);

  const selectAge = useCallback((ageValue: string) => {
    if (ageValue === 'under18') {
      setRejectionReason('age');
      setStep('rejected');
      return;
    }
    const newAnswers = { ...answers, age: ageValue };
    setAnswers(newAnswers);
    const flow = getStepFlow(newAnswers);
    const idx = flow.indexOf('age');
    if (idx >= 0 && idx < flow.length - 1) {
      setStep(flow[idx + 1]);
    }
  }, [answers, getStepFlow]);

  const selectCity = useCallback((city: string) => {
    const newAnswers = { ...answers, city };
    setAnswers(newAnswers);
    const flow = getStepFlow(newAnswers);
    const idx = flow.indexOf('city');
    if (idx >= 0 && idx < flow.length - 1) {
      setStep(flow[idx + 1]);
    }
  }, [answers, getStepFlow]);

  const selectTransport = useCallback((transport: string) => {
    const newAnswers = { ...answers, transport };
    setAnswers(newAnswers);
    const flow = getStepFlow(newAnswers);
    const idx = flow.indexOf('transport');
    if (idx >= 0 && idx < flow.length - 1) {
      setStep(flow[idx + 1]);
    }
  }, [answers, getStepFlow]);

  const selectDocuments = useCallback((doc: string) => {
    const newAnswers = { ...answers, documents: doc };
    setAnswers(newAnswers);
    const flow = getStepFlow(newAnswers);
    const idx = flow.indexOf('documents');
    if (idx >= 0 && idx < flow.length - 1) {
      setStep(flow[idx + 1]);
    }
  }, [answers, getStepFlow]);

  const selectReadyWhen = useCallback((readyWhen: string) => {
    const newAnswers = { ...answers, readyWhen };
    setAnswers(newAnswers);
    if (Math.random() < REJECTION_RANDOM_CHANCE) {
      setRejectionReason('no_vacancies');
      setStep('rejected');
      return;
    }
    const flow = getStepFlow(newAnswers);
    const idx = flow.indexOf('readyWhen');
    if (idx >= 0 && idx < flow.length - 1) {
      setStep(flow[idx + 1]);
    }
  }, [answers, getStepFlow]);

  const hasDocuments = answers.documents === 'yes';

  const getRelevantJobs = useCallback((): Job[] => {
    const cat = answers.category || 'delivery';
    const city = answers.city || 'other';

    if (cat === 'remote' || cat === 'shift') {
      return jobsByCategory[cat]?.all || [];
    }

    const cityKey = city === 'moscow' ? 'moscow' : city === 'spb' ? 'spb' : 'other';
    return jobsByCategory[cat]?.[cityKey] || jobsByCategory[cat]?.other || [];
  }, [answers]);

  const canApplyToJob = useCallback((job: Job): boolean => {
    if (!hasDocuments && job.requirements?.documents) {
      return false;
    }
    return true;
  }, [hasDocuments]);

  return {
    step, setStep, language, answers, selectedJob, setSelectedJob,
    progress, isDelivery, isRemote, isShift, hasDocuments,
    selectLanguage, selectCategory, selectAge, selectCity, selectTransport, selectDocuments, selectReadyWhen,
    goBack, getRelevantJobs, canApplyToJob,
    rejectionReason, setRejectionReason, redirectLink, setRedirectLink,
    timeSpentSeconds, stepsCompleted, canRedirect,
  };
}
