export function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-8 mt-auto border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Jagruthi Voluntary Organization. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Made with <span className="text-red-500">&hearts;</span> for a better tomorrow.
        </p>
      </div>
    </footer>
  );
}
