interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div className="fixed top-0 left-0 right-0 h-1 bg-border z-50">
    <div
      className="h-full bg-primary transition-all duration-500 ease-out"
      style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
    />
  </div>
);

export default ProgressBar;
