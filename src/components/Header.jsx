export default function Header() {
  return (
    <header className="w-full h-30 bg-gray-100 dark:bg-gray-800 px-4 flex items-center justify-center shadow fixed top-0 left-0">
      <div className="flex items-center w-full relative">
        {/* Texte à gauche */}
        <h1 className="absolute left-4 text-3xl font-bold text-gray-900 dark:text-gray-100 hidden md:block">
          Jeu des Veterans
        </h1>

        {/* Logo centré */}
        <img
          src="logoVeteransDarkMode.png"
          alt="Logo dark"
          className="h-full w-100 object-contain mx-auto hidden dark:block"
        />
        <img
          src="logoVeteransLightMode.png"
          alt="Logo light"
          className="h-full w-100 object-contain mx-auto dark:hidden"
        />
      </div>
    </header>
  );
}
