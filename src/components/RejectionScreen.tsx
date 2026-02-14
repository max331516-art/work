import { XCircle, RotateCcw } from 'lucide-react';
import { Translation } from '@/data/translations';
import type { RejectionReason } from '@/hooks/useJobFinder';

interface RejectionScreenProps {
  t: Translation;
  reason: RejectionReason;
  onRestart?: () => void;
}

const RejectionScreen = ({ t, reason, onRestart }: RejectionScreenProps) => (
  <div className="text-center py-16 animate-fade-in-up">
    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
      <XCircle className="w-14 h-14 text-muted-foreground" />
    </div>
    <h2 className="font-display text-xl font-extrabold text-foreground mb-4">{t.rejectionTitle}</h2>
    <p className="text-muted-foreground text-base max-w-sm mx-auto mb-8">
      {reason === 'age' ? t.rejectionAgeText : t.rejectionText}
    </p>
    {onRestart && (
      <button
        onClick={onRestart}
        className="inline-flex items-center gap-2 bg-card border-2 border-border rounded-xl px-6 py-3 font-semibold text-foreground hover:border-primary hover:text-primary transition-all"
      >
        <RotateCcw className="w-4 h-4" />
        {t.restartLabel}
      </button>
    )}
  </div>
);
export default RejectionScreen;