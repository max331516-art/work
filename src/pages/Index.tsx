import { Briefcase } from 'lucide-react';
import { translations } from '@/data/translations';
import { useJobFinder } from '@/hooks/useJobFinder';
import ProgressBar from '@/components/ProgressBar';
import LanguageSelect from '@/components/LanguageSelect';
import StepQuestion from '@/components/StepQuestion';
import VacancyList from '@/components/VacancyList';
import ApplyForm from '@/components/ApplyForm';
import SuccessScreen from '@/components/SuccessScreen';
import RejectionScreen from '@/components/RejectionScreen';

const Index = () => {
  const {
    step, setStep, language, answers, selectedJob, setSelectedJob,
    progress, isDelivery, hasDocuments,
    selectLanguage, selectCategory, selectAge, selectCity, selectTransport, selectDocuments, selectReadyWhen,
    goBack, getRelevantJobs, canApplyToJob,
    rejectionReason, setRejectionReason, redirectLink, setRedirectLink, canRedirect,
  } = useJobFinder();

  const t = translations[language];

  const categoryOptions = [
    { label: t.categoryDelivery, value: 'delivery', icon: '🚴' },
    { label: t.categoryWarehouse, value: 'warehouse', icon: '📦' },
    { label: t.categoryRemote, value: 'remote', icon: '💻' },
    { label: t.categoryShift, value: 'shift', icon: '⛏️' },
  ];

  const ageOptions = [
    { label: t.age1825, value: '18-25', icon: '👤' },
    { label: t.age2635, value: '26-35', icon: '👤' },
    { label: t.age3645, value: '36-45', icon: '👤' },
    { label: t.age46plus, value: '46+', icon: '👤' },
    { label: t.ageUnder18, value: 'under18', icon: '⚠️' },
  ];

  const cityOptions = [
    { label: t.cityMoscow, value: 'moscow', icon: '🏙️' },
    { label: t.citySPb, value: 'spb', icon: '🌉' },
    { label: t.cityEkb, value: 'ekb', icon: '🏔️' },
    { label: t.cityNsk, value: 'nsk', icon: '🌲' },
    { label: t.cityKzn, value: 'kzn', icon: '🕌' },
    { label: t.cityOther, value: 'other', icon: '📍' },
  ];

  const transportOptions = [
    { label: t.transportCar, value: 'car', icon: '🚗' },
    { label: t.transportBike, value: 'bike', icon: '🚲' },
    { label: t.transportFoot, value: 'foot', icon: '🚶' },
    { label: t.transportAny, value: 'any', icon: '✅' },
  ];

  const documentOptions = [
    { label: t.documentsYes, value: 'yes', icon: '✅' },
    { label: t.documentsPartial, value: 'partial', icon: '⏳' },
    { label: t.documentsNo, value: 'no', icon: '❌' },
  ];

  const readyWhenOptions = [
    { label: t.readyWhen13, value: '1-3days', icon: '⚡' },
    { label: t.readyWhenWeek, value: 'week', icon: '📅' },
    { label: t.readyWhen2Weeks, value: '2weeks', icon: '📆' },
    { label: t.readyWhenLooking, value: 'looking', icon: '🔍' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ProgressBar progress={progress} />

      <div className="max-w-lg mx-auto px-4 pt-6 pb-12">
        {/* Header */}
        <div className="text-center pt-8 pb-10 animate-slide-down">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <Briefcase className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight mb-3">
            {t.welcome}
          </h1>
          <p className="text-muted-foreground font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Steps */}
        {step === 'language' && <LanguageSelect onSelect={selectLanguage} />}

        {step === 'category' && (
          <StepQuestion
            title={t.category}
            subtitle={t.categorySubtitle}
            options={categoryOptions}
            onSelect={selectCategory}
            onBack={goBack}
            backLabel={t.back}
            showBack={false}
          />
        )}

        {step === 'age' && (
          <StepQuestion
            title={t.age}
            subtitle={t.ageSubtitle}
            options={ageOptions}
            onSelect={selectAge}
            onBack={goBack}
            backLabel={t.back}
          />
        )}

        {step === 'city' && (
          <StepQuestion
            title={t.city}
            subtitle={t.citySubtitle}
            options={cityOptions}
            onSelect={selectCity}
            onBack={goBack}
            backLabel={t.back}
            primaryOption={{
              label: t.geoLocation,
              icon: '📍',
              onClick: () => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (pos) => {
                      const { latitude, longitude } = pos.coords;
                      let city = 'other';
                      if (Math.abs(latitude - 55.75) < 1 && Math.abs(longitude - 37.61) < 1) city = 'moscow';
                      else if (Math.abs(latitude - 59.93) < 1 && Math.abs(longitude - 30.31) < 1) city = 'spb';
                      selectCity(city);
                    },
                    () => alert('Не удалось определить местоположение. Выберите город вручную.')
                  );
                }
              },
            }}
          />
        )}

        {step === 'transport' && (
          <StepQuestion
            title={t.transport}
            subtitle={t.transportSubtitle}
            options={transportOptions}
            onSelect={selectTransport}
            onBack={goBack}
            backLabel={t.back}
          />
        )}

        {step === 'documents' && (
          <StepQuestion
            title={t.documents}
            subtitle={t.documentsSubtitle}
            options={documentOptions}
            onSelect={selectDocuments}
            onBack={goBack}
            backLabel={t.back}
          />
        )}

        {step === 'readyWhen' && (
          <StepQuestion
            title={t.readyWhen}
            subtitle={t.readyWhenSubtitle}
            options={readyWhenOptions}
            onSelect={selectReadyWhen}
            onBack={goBack}
            backLabel={t.back}
          />
        )}

        {step === 'vacancies' && (
          <VacancyList
            jobs={getRelevantJobs()}
            t={t}
            canApply={canApplyToJob}
            onJobClick={(job) => {
              setSelectedJob(job);
              setStep('apply');
            }}
            onBack={goBack}
            isDelivery={isDelivery}
            hasDocuments={hasDocuments}
          />
        )}

        {step === 'apply' && (
          <ApplyForm
            job={selectedJob}
            t={t}
            answers={answers}
            language={language}
            onSubmit={() => setStep('final')}
            onBack={() => setStep('vacancies')}
            onRedirectLink={setRedirectLink}
          />
        )}

        {step === 'final' && (
          <SuccessScreen
            t={t}
            redirectLink={redirectLink}
            canRedirect={canRedirect}
          />
        )}

        {step === 'rejected' && rejectionReason && (
          <RejectionScreen
            t={t}
            reason={rejectionReason}
            onRestart={() => {
              setStep('language');
              setRejectionReason(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
