import { ChevronLeft, ChevronRight, Briefcase, AlertTriangle, Share2 } from 'lucide-react';
import { Job, partnerProducts, documentHelp } from '@/data/jobs';
import { Translation } from '@/data/translations';

interface VacancyListProps {
  jobs: Job[];
  t: Translation;
  canApply: (job: Job) => boolean;
  onJobClick: (job: Job) => void;
  onBack: () => void;
  isDelivery: boolean;
  hasDocuments: boolean;
}

const badgeStyles: Record<string, string> = {
  top: 'bg-success text-success-foreground',
  urgent: 'bg-destructive text-destructive-foreground',
  new: 'bg-primary text-primary-foreground',
};

const VacancyList = ({ jobs, t, canApply, onJobClick, onBack, isDelivery, hasDocuments }: VacancyListProps) => (
  <div className="animate-fade-in-up space-y-4">
    <button
      onClick={onBack}
      className="flex items-center gap-1.5 text-primary font-semibold text-sm hover:-translate-x-1 transition-transform"
    >
      <ChevronLeft className="w-4 h-4" />
      {t.back}
    </button>

    <h2 className="font-display text-xl font-bold text-foreground">{t.vacancies}</h2>
    <p className="text-muted-foreground text-sm font-semibold flex items-center gap-2">
      <Briefcase className="w-4 h-4 text-primary" />
      {t.vacanciesCount}: <strong className="text-foreground">{jobs.length}</strong>
    </p>

    {jobs.length === 0 ? (
      <div className="bg-card rounded-2xl p-8 border border-border text-center">
        <p className="text-muted-foreground">{t.noVacancies}</p>
      </div>
    ) : (
      jobs.map((job, idx) => (
        <div
          key={idx}
          className="bg-card rounded-2xl p-5 border border-border shadow-sm transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-md animate-fade-in-up"
          style={{ animationDelay: `${idx * 0.08}s` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{job.icon}</span>
              <span className="font-display font-extrabold text-lg text-card-foreground">{job.company}</span>
            </div>
            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide ${badgeStyles[job.badgeClass] || ''}`}>
              {job.badge}
            </span>
          </div>

          <div className="font-display text-2xl font-black text-primary mb-3">
            {job.salary}<span className="text-base font-semibold text-muted-foreground">{t[job.period]}</span>
          </div>

          {job.description && (
            <div className="bg-secondary rounded-xl p-4 mb-3 text-sm leading-relaxed text-secondary-foreground border-l-4 border-primary">
              {job.description.split('\n').map((line, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-bold">$1</strong>') }} />
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {job.tags.map((tag, i) => (
              <span key={i} className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold border border-border">
                {tag}
              </span>
            ))}
          </div>

          {canApply(job) ? (
            <button
              onClick={() => onJobClick(job)}
              className="w-full bg-primary text-primary-foreground rounded-xl p-3.5 font-bold text-[15px] flex items-center justify-between transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
            >
              <span>{t.apply}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="bg-warning-light border-2 border-warning rounded-xl p-4">
              <div className="flex items-center gap-2 font-bold text-sm text-foreground mb-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                {t.warningNoDocuments}
              </div>
              <p className="text-muted-foreground text-sm mb-3">{t.warningNoDocumentsText}</p>
              <button
                onClick={() => window.open(documentHelp[0].link, '_blank')}
                className="w-full bg-primary text-primary-foreground rounded-lg p-3 font-bold text-sm transition-all hover:-translate-y-0.5"
              >
                {t.warningFixIt}
              </button>
            </div>
          )}
        </div>
      ))
    )}

    {/* Partner products for delivery */}
    {isDelivery && (
      <PartnerSection title={t.needForWork} items={partnerProducts.delivery} />
    )}

    {/* Cards */}
    <PartnerSection title={t.getCard} items={partnerProducts.cards} />

    {/* Document help */}
    {!hasDocuments && (
      <PartnerSection title={t.helpTitle} items={documentHelp.map(d => ({ name: d.name, icon: d.icon, bonus: d.price, link: d.link }))} />
    )}

    {/* Share */}
    <button
      onClick={() => {
        const url = `https://t.me/share/url?url=t.me/YOUR_BOT&text=${encodeURIComponent('Нашёл удобный сервис для поиска работы!')}`;
        window.open(url, '_blank');
      }}
      className="w-full bg-card border-2 border-primary text-primary rounded-xl p-4 font-bold flex items-center justify-center gap-2.5 transition-all hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 hover:shadow-md"
    >
      <Share2 className="w-5 h-5" />
      {t.share}
    </button>
  </div>
);

interface PartnerSectionProps {
  title: string;
  items: { name: string; icon: string; bonus: string; link: string }[];
}

const PartnerSection = ({ title, items }: PartnerSectionProps) => (
  <div className="bg-secondary rounded-2xl p-5 border border-border">
    <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
      {title}
    </h3>
    <div className="space-y-2.5">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => window.open(item.link, '_blank')}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between transition-all hover:border-primary hover:translate-x-1.5 hover:shadow-sm"
        >
          <span className="flex items-center gap-2.5 font-semibold text-sm text-foreground">
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </span>
          <span className="text-success text-sm font-bold bg-success-light px-2.5 py-1 rounded-md">
            {item.bonus}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default VacancyList;
