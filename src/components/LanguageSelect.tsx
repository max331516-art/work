import { Language, languageOptions } from '@/data/translations';

interface LanguageSelectProps {
  onSelect: (lang: Language) => void;
}

const LanguageSelect = ({ onSelect }: LanguageSelectProps) => (
  <div className="animate-fade-in-up">
    <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
      <h2 className="font-display text-xl font-bold text-card-foreground mb-6">Выберите язык</h2>
      <div className="grid grid-cols-2 gap-3">
        {languageOptions.map((lang, i) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            className={`bg-card border-2 border-border rounded-xl p-5 text-center transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-md active:scale-95 ${
              i === languageOptions.length - 1 && languageOptions.length % 2 !== 0 ? 'col-span-2' : ''
            }`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span className="text-4xl block mb-2">{lang.flag}</span>
            <span className="text-sm font-semibold text-card-foreground">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default LanguageSelect;
