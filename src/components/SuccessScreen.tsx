import { useState, useEffect } from 'react';
import { CheckCircle, Share2, Loader2 } from 'lucide-react';
import { Translation } from '@/data/translations';

const REDIRECT_DELAY_SEC = 7;

interface SuccessScreenProps {
  t: Translation;
  redirectLink: string | null;
  canRedirect: boolean;
  onRedirectDone?: () => void;
}

const SuccessScreen = ({ t, redirectLink, canRedirect, onRedirectDone }: SuccessScreenProps) => {
  const [countdown, setCountdown] = useState(REDIRECT_DELAY_SEC);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (redirected) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (canRedirect && redirectLink) {
            window.open(redirectLink, '_blank');
            setRedirected(true);
            onRedirectDone?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [canRedirect, redirectLink, redirected, onRedirectDone]);

  return (
    <div className="text-center py-16 animate-fade-in-up">
      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in shadow-lg">
        <CheckCircle className="w-14 h-14 text-primary-foreground" />
      </div>
      <h2 className="font-display text-2xl font-extrabold text-foreground mb-4">{t.success}</h2>
      <p className="text-muted-foreground text-lg mb-4">{t.successText}</p>

      {redirectLink && (
        <div className="mb-8 flex flex-col items-center gap-2">
          <p className="text-muted-foreground text-sm font-medium flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t.sendingData}
          </p>
          {countdown > 0 && canRedirect && (
            <p className="text-primary font-semibold text-sm">
              {countdown} {countdown === 1 ? 'сек' : 'сек'}
            </p>
          )}
          {!canRedirect && (
            <p className="text-muted-foreground text-xs max-w-xs">
              Данные получены. Спасибо за заявку.
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => {
          const url = `https://t.me/share/url?url=t.me/YOUR_BOT&text=${encodeURIComponent('Нашёл работу через этот сервис!')}`;
          window.open(url, '_blank');
        }}
        className="inline-flex items-center gap-2.5 bg-card border-2 border-primary text-primary rounded-xl px-8 py-4 font-bold transition-all hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 hover:shadow-md"
      >
        <Share2 className="w-5 h-5" />
        {t.share}
      </button>
    </div>
  );
};

export default SuccessScreen;
