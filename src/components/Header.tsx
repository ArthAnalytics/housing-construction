export default function Header() {
  return (
    <header className="bg-white shadow-lg border-b border-gray-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/azleague-logo.png"
            alt="Arizona League Logo"
            className="h-10 w-auto flex-shrink-0"
          />
          <div className="h-6 w-px bg-gray-600 flex-shrink-0"></div>
          <h1 className="text-base font-bold text-gray-700 tracking-normal normal-case leading-tight">
            Arizona Housing Construction 2010-2025
          </h1>
        </div>
      </div>
    </header>
  );
}
