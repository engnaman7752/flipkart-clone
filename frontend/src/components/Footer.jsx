const Footer = () => (
  <footer className="bg-[#172337] text-white mt-6">
    {/* Top section: columns */}
    <div className="max-w-[1248px] mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-[12px]">
        <div>
          <h4 className="text-[#878787] font-semibold mb-3 text-[11px] uppercase tracking-widest">About</h4>
          <ul className="space-y-2.5 text-gray-300">
            {['Contact Us', 'About Us', 'Careers', 'Flipkart Stories', 'Press', 'Flipkart Wholesale'].map(item => (
              <li key={item} className="hover:text-white cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[#878787] font-semibold mb-3 text-[11px] uppercase tracking-widest">Help</h4>
          <ul className="space-y-2.5 text-gray-300">
            {['Payments', 'Shipping', 'Cancellation & Returns', 'FAQ', 'Report Infringement'].map(item => (
              <li key={item} className="hover:text-white cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[#878787] font-semibold mb-3 text-[11px] uppercase tracking-widest">Policy</h4>
          <ul className="space-y-2.5 text-gray-300">
            {['Return Policy', 'Terms of Use', 'Security', 'Privacy', 'Sitemap', 'EPR Compliance'].map(item => (
              <li key={item} className="hover:text-white cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[#878787] font-semibold mb-3 text-[11px] uppercase tracking-widest">Social</h4>
          <ul className="space-y-2.5 text-gray-300">
            {['Facebook', 'Twitter', 'YouTube', 'Instagram'].map(item => (
              <li key={item} className="hover:text-white cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>

          <h4 className="text-[#878787] font-semibold mt-6 mb-3 text-[11px] uppercase tracking-widest">Mail Us</h4>
          <p className="text-gray-400 text-[11px] leading-relaxed">
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &amp; Clover,<br />
            Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli,<br />
            Bengaluru, 560103, Karnataka, India
          </p>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-[#2f3d52]">
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#878787]">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[#878787]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
          <span>© 2007-2024 Flipkart.com (Demo Clone — No real payments)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-3 h-3 text-[#878787]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>Bengaluru, Karnataka, India</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
