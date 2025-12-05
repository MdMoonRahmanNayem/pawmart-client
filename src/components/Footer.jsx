export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white mt-8">
      <div className="container mx-auto px-4 py-10 md:flex md:items-start md:justify-between">
        <div className="md:max-w-md">
          <div className="flex items-center gap-3">
            <img src="/images/download.png" alt="PawMart" className="w-10 h-10 rounded" />
            <span className="font-semibold text-lg">PawMart</span>
          </div>

          <p className="mt-4 text-sm text-slate-300">
            PawMart connects local pet owners and buyers for adoption and pet care products.
          </p>
        </div>

        <div className="mt-6 md:mt-0 grid grid-cols-2 gap-6 text-sm text-slate-300">
          <div>
            <h4 className="font-semibold text-white mb-2">Useful Links</h4>
            <ul className="space-y-1">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/terms" className="hover:text-white">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2">Support</h4>
            <ul className="space-y-1 text-slate-300">
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
              <li><a href="/help" className="hover:text-white">Help Center</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-4 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} PawMart — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
