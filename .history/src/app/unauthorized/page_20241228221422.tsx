export default function UnauthorizedPage() {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-bold text-red-600">Zugriff verweigert</h1>
        <p className="text-lg mt-2">
          Sie haben keine Berechtigung, diese Seite zu sehen.
        </p>
        <a href="/" className="mt-6 text-primary underline hover:text-primary-dark">
          Zurück zur Startseite
        </a>
      </div>
    );
  }
  