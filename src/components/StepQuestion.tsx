import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OptionItem {
  label: string;
  value: string;
  icon: string;
}

interface StepQuestionProps {
  title: string;
  subtitle: string;
  options: OptionItem[];
  onSelect: (value: string) => void;
  onBack: () => void;
  backLabel?: string;
  showBack?: boolean;
  primaryOption?: { label: string; icon: string; onClick: () => void };
}

const StepQuestion = ({ title, subtitle, options, onSelect, onBack, backLabel = 'Назад', showBack = true, primaryOption }: StepQuestionProps) => (
  <div className="animate-fade-in-up">
    <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
      {showBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-primary font-semibold text-sm mb-5 hover:-translate-x-1 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </button>
      )}
      <h2 className="font-display text-xl font-bold text-card-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground text-sm mb-6">{subtitle}</p>

      {primaryOption && (
        <button
          onClick={primaryOption.onClick}
          className="w-full bg-primary text-primary-foreground rounded-xl p-4 mb-3 font-semibold text-[15px] flex items-center justify-between transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
        >
          <span className="flex items-center gap-3">
            <span className="text-lg">{primaryOption.icon}</span>
            {primaryOption.label}
          </span>
          <ChevronRight className="w-5 h-5 opacity-70" />
        </button>
      )}

      <div className="space-y-2.5">
        {options.map((opt, idx) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full bg-card border-2 border-border rounded-xl p-4 text-left font-semibold text-[15px] text-card-foreground flex items-center justify-between transition-all duration-200 hover:border-primary hover:translate-x-1.5 hover:shadow-sm active:scale-[0.98]"
            style={{ animationDelay: `${idx * 0.04}s` }}
          >
            <span className="flex items-center gap-3">
              <span className="text-lg">{opt.icon}</span>
              {opt.label}
            </span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default StepQuestion;
