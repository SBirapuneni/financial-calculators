import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="text-center space-y-4">
        <LoadingSpinner />
        <p className="text-gray-600 dark:text-gray-400">Loading calculator...</p>
      </div>
    </div>
  );
}
