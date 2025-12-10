import React, { useState } from 'react'
import { DEFAULT_CONFIG } from './configDefaults'

function readConfig(){
  try{ return JSON.parse(localStorage.getItem('landing_config')) }catch(e){ return DEFAULT_CONFIG }
}

export default function AdminPanel(){
  const [cfg, setCfg] = useState(readConfig())
  const [password, setPassword] = useState('')
  const [locked, setLocked] = useState(true)

  // Simple password check (change the key below before uploading for some protection)
  const ADMIN_PASS = 'admin123' // change this in code if needed

  function save(){
    localStorage.setItem('landing_config', JSON.stringify(cfg))
    alert('Saved to localStorage. Site will reflect changes.')
  }

  function resetDefaults(){ if(confirm('Reset to defaults?')){ setCfg(DEFAULT_CONFIG); localStorage.setItem('landing_config', JSON.stringify(DEFAULT_CONFIG)); alert('Reset done') } }

  function exportJSON(){ const blob = new Blob([JSON.stringify(cfg, null, 2)], {type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'landing-config.json'; a.click(); URL.revokeObjectURL(url) }
  function importJSON(e){ const file = e.target.files[0]; if(!file) return; const reader = new FileReader(); reader.onload = () => { try{ const j = JSON.parse(reader.result); setCfg(j); localStorage.setItem('landing_config', JSON.stringify(j)); alert('Imported') }catch(err){ alert('Invalid JSON') } }; reader.readAsText(file) }

  if(locked) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f10] text-white">
      <div className="bg-[#111] p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Admin password" className="w-full p-3 rounded mb-3 text-black" />
        <button className="w-full p-3 bg-yellow-400 text-black font-semibold rounded" onClick={()=>{ if(password===ADMIN_PASS){ setLocked(false) } else { alert('Wrong password (change ADMIN_PASS in code)') } }}>Unlock</button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white p-6">
      <div className="max-w-3xl mx-auto bg-[#111] p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <div>
            <button className="px-3 py-2 bg-gray-700 rounded mr-2" onClick={()=>{ localStorage.removeItem('landing_config'); setCfg(DEFAULT_CONFIG); alert('Cleared') }}>Clear</button>
            <button className="px-3 py-2 bg-green-600 rounded" onClick={save}>Save</button>
          </div>
        </div>

        <section className="mb-4">
          <h3 className="font-bold">Hero</h3>
          <div className="grid grid-cols-1 gap-2 mt-2">
            <input value={cfg.hero.nameLine1} onChange={e=>setCfg({...cfg, hero:{...cfg.hero, nameLine1: e.target.value}})} className="p-2 text-black" />
            <input value={cfg.hero.nameLine2} onChange={e=>setCfg({...cfg, hero:{...cfg.hero, nameLine2: e.target.value}})} className="p-2 text-black" />
            <input value={cfg.hero.subtitle} onChange={e=>setCfg({...cfg, hero:{...cfg.hero, subtitle: e.target.value}})} className="p-2 text-black" />
            <input value={cfg.hero.membersText} onChange={e=>setCfg({...cfg, hero:{...cfg.hero, membersText: e.target.value}})} className="p-2 text-black" />
            <input value={cfg.hero.telegramLink} onChange={e=>setCfg({...cfg, hero:{...cfg.hero, telegramLink: e.target.value}})} className="p-2 text-black" />
            <input value={cfg.hero.avatar} onChange={e=>setCfg({...cfg, hero:{...cfg.hero, avatar: e.target.value}})} className="p-2 text-black" />
            <div className="text-sm text-gray-300">Avatar can be a public URL (or put image file in <code>/public</code> and reference like <code>/avatar.jpg</code>)</div>
          </div>
        </section>

        <section className="mb-4">
          <h3 className="font-bold">Features (comma separated)</h3>
          <textarea value={cfg.features.join(', ')} onChange={e=>setCfg({...cfg, features: e.target.value.split(',').map(s=>s.trim())})} className="w-full p-2 text-black" rows={2} />
        </section>

        <section className="mb-4">
          <h3 className="font-bold">Testimonials</h3>
          {cfg.testimonials.map((t, idx)=> (
            <div key={idx} className="bg-[#0b2b2a] p-3 rounded mb-2">
              <input value={t.text} onChange={e=>{ const arr = [...cfg.testimonials]; arr[idx].text = e.target.value; setCfg({...cfg, testimonials: arr}) }} className="w-full p-2 text-black mb-2" />
              <input value={t.author} onChange={e=>{ const arr = [...cfg.testimonials]; arr[idx].author = e.target.value; setCfg({...cfg, testimonials: arr}) }} className="w-full p-2 text-black" />
              <div className="flex gap-2 mt-2">
                <button onClick={()=>{ const arr = cfg.testimonials.filter((_,i)=>i!==idx); setCfg({...cfg, testimonials: arr}) }} className="px-2 py-1 bg-red-600 rounded">Delete</button>
              </div>
            </div>
          ))}
          <button className="mt-2 px-3 py-2 bg-blue-600 rounded" onClick={()=>{ setCfg({...cfg, testimonials: [...cfg.testimonials, {text:'नई प्रतिक्रिया', author:'Author'}]}) }}>Add Testimonial</button>
        </section>

        <section className="flex gap-2">
          <input type="file" onChange={importJSON} />
          <button className="px-3 py-2 bg-yellow-400 text-black rounded" onClick={exportJSON}>Export JSON</button>
          <button className="px-3 py-2 bg-gray-600 rounded" onClick={resetDefaults}>Reset to Defaults</button>
        </section>

      </div>
    </div>
  )
}