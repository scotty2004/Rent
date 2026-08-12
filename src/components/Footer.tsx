import React from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, MessageCircle, ShieldCheck, Heart, MapPin, Building2 } from 'lucide-react';
import { ZIM_CITIES } from '../data/mockData';

export const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { setFilters } = useApp();

  const handleCityClick = (cityName: string) => {
    setFilters(prev => ({ ...prev, city: cityName, suburb: 'all' }));
    onNavigate('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-24 lg:pb-12 border-t border-slate-800 transition-colors mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-[#008751] p-2 rounded-xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9.5L12 3L21 9.5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.5Z" stroke="#F4B400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21V12H15V21" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-black text-[#008751] tracking-tight">
                Zim<span className="text-white">Accommodation</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Zimbabwe's premier rental accommodation marketplace connecting verified landlords with tenants across Harare, Bulawayo, Mutare, Gweru and nationwide.
            </p>
            <div className="pt-2 text-xs text-slate-400 flex flex-col gap-1">
              <span className="flex items-center gap-1.5 font-bold text-[#F4B400]">
                <ShieldCheck className="w-4 h-4" /> 1-Month Free Trial for Landlords
              </span>
              <span>Then only <strong>US$2 per year</strong></span>
            </div>
          </div>

          {/* Col 2: Popular Cities */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#F4B400]">Popular Cities</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              {ZIM_CITIES.map(c => (
                <li key={c.name}>
                  <button 
                    onClick={() => handleCityClick(c.name)}
                    className="hover:text-[#008751] transition-colors flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-[#008751]" /> {c.name} Houses
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: House Types */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#F4B400]">Accommodation Types</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li><button onClick={() => { onNavigate('search'); }} className="hover:text-[#008751]">Rooms & Extensions</button></li>
              <li><button onClick={() => { onNavigate('search'); }} className="hover:text-[#008751]">Garden Cottages</button></li>
              <li><button onClick={() => { onNavigate('search'); }} className="hover:text-[#008751]">Apartments & Flats</button></li>
              <li><button onClick={() => { onNavigate('search'); }} className="hover:text-[#008751]">Full Houses & Villas</button></li>
              <li><button onClick={() => { onNavigate('search'); }} className="hover:text-[#008751]">Bachelor Flats</button></li>
            </ul>
          </div>

          {/* Col 4: Landlord Hotline & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#F4B400]">Landlord Support</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <PhoneCall className="w-4 h-4 text-[#008751]" />
                <span>+263 77 123 4567</span>
              </div>
              <p className="text-[11px] text-slate-400">Support Hours: Mon - Sat, 8:00 AM - 6:00 PM CAT</p>
              
              <a
                href="https://wa.me/263771234567?text=Hi%20Zim%20Accommodation%20Support"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md mt-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Landlord Hotline</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium pt-2">
          <p>© 2026 Zim Accommodation. All rights reserved. Built for Zimbabwe.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">EcoCash Payments</a>
            <a href="#" className="hover:text-white">Fraud Prevention</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
