import React, { useState } from 'react';
import { 
  Music, Play, Pause, Download, Mail, Zap, 
  Loader2, CreditCard, Volume2 
} from 'lucide-react';

const AudioVisualizer = ({ isPlaying }) => (
  <div className="flex items-end justify-center gap-1 h-16 w-full bg-slate-900/10 rounded-xl p-4">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className={`bg-indigo-500 w-1.5 rounded-full transition-all duration-300 ${
          isPlaying ? 'animate-pulse' : 'h-2'
        }`}
        style={{ 
          animationDelay: `${i * 0.05}s`,
          height: isPlaying ? `${Math.floor(Math.random() * 80) + 20}%` : '8px'
        }}
      />
    ))}
  </div>
);

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Funk Brasileiro");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedSong, setGeneratedSong] = useState(null);
  const [view, setView] = useState('home');
  const [userPlan, setUserPlan] = useState('free');

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setIsPlaying(false);

    setTimeout(() => {
      setGeneratedSong({
        title: prompt.substring(0, 15).toUpperCase(),
        style: style,
        lyrics: `[Letra Gerada pela IA]\n\n(Verso 1)\nNa batida do ${style}\nA gente faz o som chegar\nCom a Sunogen no comando\nNinguém vai conseguir parar...\n\n(Refrão)\nÉ a música do futuro\nFeita pra você brilhar!`,
        id: Math.random().toString(36).substr(2, 5)
      });
      setIsGenerating(false);
    }, 3500);
  };

  const handleDownload = () => {
    if (userPlan === 'free') {
      alert("❌ Download disponível apenas no PLANO PRO.");
      setView('pricing');
    } else {
      alert("✅ Download iniciado!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      <nav className="bg-white border-b p-4 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2" onClick={() => setView('home')}>
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Music size={20} />
          </div>
          <span className="font-black text-indigo-900 tracking-tight text-xl">SUNOGEN</span>
        </div>
        <button onClick={() => setView('pricing')} className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
          {userPlan === 'free' ? 'PLANO GRÁTIS' : 'PLANO PRO'}
        </button>
      </nav>

      <main className="p-6 max-w-2xl mx-auto space-y-8">
        {view === 'home' && (
          <>
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 space-y-5">
              <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none ring-1 ring-slate-200 font-medium">
                <option>Funk Brasileiro</option>
                <option>Trap Pesado</option>
                <option>Sertanejo Universitário</option>
                <option>Gospel</option>
              </select>
              <textarea 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Sobre o que é a música?" 
                className="w-full p-4 bg-slate-50 border-none rounded-2xl h-32 resize-none outline-none ring-1 ring-slate-200"
              />
              <button onClick={handleGenerate} disabled={isGenerating || !prompt} className="w-full bg-indigo-600 text-white font-bold py-5 rounded-2xl flex justify-center items-center gap-2 shadow-lg active:scale-95 transition-all">
                {isGenerating ? <Loader2 className="animate-spin" /> : <Zap size={18} />}
                {isGenerating ? "CRIANDO MÚSICA..." : "GERAR AGORA"}
              </button>
            </div>

            {generatedSong && (
              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-2xl p-8 space-y-6 animate-in fade-in">
                <div className="flex justify-between items-center">
                   <h2 className="text-2xl font-black">{generatedSong.title}</h2>
                   <span className="text-xs font-bold text-indigo-600">{generatedSong.style}</span>
                </div>
                <AudioVisualizer isPlaying={isPlaying} />
                <div className="flex gap-4">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                  </button>
                  <button onClick={handleDownload} className="flex-1 bg-slate-100 text-slate-700 font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
                    <Download size={20} /> BAIXAR MP3
                  </button>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-sm whitespace-pre-wrap max-h-40 overflow-y-auto italic text-slate-500">
                  {generatedSong.lyrics}
                </div>
              </div>
            )}
          </>
        )}

        {view === 'pricing' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-black text-center text-slate-800">Planos Pro</h1>
            <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200">
                <h3 className="text-2xl font-black">Plano Artist</h3>
                <p className="mt-4 text-sm opacity-90">✅ Downloads ilimitados em HD</p>
                <p className="text-sm opacity-90">✅ Direitos autorais liberados</p>
                <div className="mt-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black">R$ 29,90</span>
                  <span className="text-xs">/mês</span>
                </div>
                <button onClick={() => {setUserPlan('pro'); setView('home');}} className="w-full mt-6 bg-white text-indigo-600 font-black py-4 rounded-2xl">ASSINAR AGORA</button>
            </div>
            <p className="text-center text-sm text-gray-400">Suporte: ezequielsantos33p@gmail.com</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-4 md:hidden">
        <button onClick={() => setView('home')} className={view === 'home' ? 'text-indigo-600' : 'text-slate-400'}><Zap /></button>
        <button onClick={() => setView('pricing')} className={view === 'pricing' ? 'text-indigo-600' : 'text-slate-400'}><CreditCard size={24} /></button>
        <a href="mailto:ezequielsantos33p@gmail.com" className="text-slate-400"><Mail /></a>
      </div>
    </div>
  );
}
