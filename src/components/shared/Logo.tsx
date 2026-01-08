import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      {/* Calculator Icon */}
      <div className="relative">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" className="fill-blue-600 dark:fill-blue-500"/>
          <rect x="7" y="7" width="26" height="8" rx="2" className="fill-white"/>
          <circle cx="12" cy="22" r="2.5" className="fill-white"/>
          <circle cx="20" cy="22" r="2.5" className="fill-white"/>
          <circle cx="28" cy="22" r="2.5" className="fill-white"/>
          <circle cx="12" cy="30" r="2.5" className="fill-white"/>
          <circle cx="20" cy="30" r="2.5" className="fill-white"/>
          <circle cx="28" cy="30" r="2.5" className="fill-white"/>
        </svg>
      </div>
      
      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
            UtilityHub
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400 -mt-1">
            Calculators
          </span>
        </div>
      )}
    </Link>
  );
}
