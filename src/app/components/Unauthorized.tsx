const Unauthorized = () => (
    <div className="p-6 bg-white dark:bg-gray-700 text-center rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-red-600">Zugriff verweigert</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Sie haben keine Berechtigung, diese Aktion auszuführen.
      </p>
      <a href="/" className="mt-4 inline-block text-primary underline hover:text-primary-dark">
        Zurück zur Startseite
      </a>
    </div>
  );
  
  export default Unauthorized;
  