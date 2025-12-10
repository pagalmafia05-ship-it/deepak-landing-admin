import React, { useEffect, useState } from 'react';
import { DEFAULT_CONFIG } from './configDefaults.js';

function useConfig() {
  const [cfg, setCfg] = useState(() => {
    try {
      const raw = localStorage.getItem('landing_config');
      return raw ? JSON.parse(raw) : DEFAULT_CONFIG;
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  });

  useEffect(() => {
    localStorage.setItem('landing_config', JSON.stringify(cfg));
  }, [cfg]);

  return [cfg, setCfg];
}

export default function App() {
  const [cfg] = useConfig();

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white font-sans">
      <div className="max-w-xl mx-auto p-6">

        {/* Hero */}
        <div className="text-center mt-6">
          <div className="w-32 h-32 rounded-full mx-auto mb-4 ring-4 ring-yellow-400 overflow-hidden">
            <img
              src={cfg.hero.avatar}
              alt="avatar"
              className="object-cover w-full h-full"
            />
          </div>

          <h1 className="text-4xl font-extrabold text-yellow-400 tracking-wide">
            {cfg.hero.nameLine1}<br />{cfg.hero.nameLine2}
          </h1>

          <p className="mt-3 text-gray-200">✅ {cfg.hero.subtitle}</p>

          <div className="mt-6 flex flex-col gap-3 items-center">
            <div className="bg-[#222] px-6 py-3 rounded-lg w-64 text-center">
              👥 {cfg.hero.membersText}
            </div>
            <div className="bg-[#222] px-6 py-3 rounded-lg w-44 text-center">
              24/7 Updates
            </div>
            <div className="bg-[#222] px-6 py-3 rounded-lg w-40 text-center">
              Free to Join
            </div>
          </div>

          <a
            href={cfg.hero.telegramLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 bg-gradient-to-r from-blue-400 to-cyan-400 px-10 py-4 rounded-full text-black font-semibold"
          >
            Join on Telegram
          </a>
        </div>

        {/* Features */}
        <div className="mt-8 space-y-3">
          {cfg.features.map((f, i) => (
            <div key={i} className="bg-[#1b1b1b] p-4 rounded-lg">
              ✅ {f}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <h3 className="mt-8 text-yellow-400 text-xl font-bold">🏆 Our Members Speak</h3>

        <div className="mt-4 space-y-4">
          {cfg.testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[#0e2b2a] p-4 rounded-lg shadow-lg border-l-4 border-teal-400"
            >
              <p className="italic text-gray-100">“{t.text}”</p>
              <div className="mt-2 font-bold">- {t.author}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}


