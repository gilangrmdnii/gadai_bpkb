const Footer = () => {
  return (
    <footer id="kontak" className="bg-ocean-900 text-gray-300 py-12 mt-20 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-10 right-0 w-80 h-80 rounded-full bg-ocean-700/40 blur-3xl" />
      <div className="container grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-xl font-semibold text-white">Garasi BPKB</h4>
          <p className="mt-3 text-sm text-gray-400">
            Solusi finansial terpercaya dengan jaminan BPKB. Proses cepat, aman, dan resmi.
          </p>
        </div>
        <div>
          <h5 className="font-semibold text-white mb-3">Navigasi</h5>
          <ul className="space-y-2 text-sm">.
            <li><a href="#fitur" className="hover:text-white">Fitur</a></li>
            <li><a href="#keunggulan" className="hover:text-white">Keunggulan</a></li>
            <li><a href="#apply" className="hover:text-white">Ajukan</a></li>
            <li><a href="#testimoni" className="hover:text-white">Testimoni</a></li>
            <li><a href="#fq" className="hover:text-white">FAQ</a></li>
            
          </ul>
        </div>
        <div>
          <h5 className="font-semibold text-white mb-3">Kontak</h5>
          <p className="text-sm">📍 BFI Tower Sunburst CBD BSD City, Jl. Kapten Soebijanto Djojohadikusumo No.2, Tangerang Selatan, Banten 10340</p>
          <p className="text-sm">📞 +62-8119-274-006</p>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-10">
        © {new Date().getFullYear()} GarasiBPKB. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
