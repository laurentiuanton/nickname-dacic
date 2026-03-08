"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";

// --- EXPANSIUNEA DICȚIONARULUI DACIC ---
const ANIMALS_M = ["Lupul", "Vulturul", "Ursul", "Șoimul", "Corbul", "Zimbrul", "Mistrețul", "Cerbul", "Dragonul", "Șarpele"];
const ANIMALS_F = ["Lupoaica", "Acvila", "Ursoaica", "Șoimița", "Corboaica", "Zimbroaica", "Căprioara", "Vipera", "Privighetoarea", "Lebăda"];

const WEAPONS = ["Falxul", "Sica Măiestră", "Scutul", "Spada", "Spărgătorul", "Lancea", "Arcul", "Stindardul", "Buzduganul"];

const ADJECTIVES_M = ["Nemuritorul", "Neînfricatul", "Viteazul", "Cel Liber", "Fiorosul", "Sângerosul", "Înțeleptul", "Grozavul", "Întunecatul", "Strălucitorul", "Cel Cumplit", "Cel Drept", "Neadormitul"];
const ADJECTIVES_F = ["Nemuritoarea", "Neînfricata", "Viteaza", "Cea Liberă", "Fioroasa", "Sângeroasa", "Înțeleapta", "Grozava", "Întunecata", "Strălucitoarea", "Cea Cumplită", "Cea Dreaptă", "Neadormita"];

const MATERIALS = ["de Aur", "de Fier", "de Argint", "de Bronz", "de Piatră", "de Foc", "de Oțel"];

const NATURE = ["Pădurilor", "Munților", "din Carpați", "Umbrelor", "Zorilor", "Furtunii", "Nordului", "Negurii"];

const HISTORIC_M = ["Decebal", "Burebista", "Cotiso", "Dicomes", "Oroles", "Rubobostes", "Scorilo", "Duras", "Vezina", "Diurpaneus", "Comosicus", "Deceneu", "Thiamarkos", "Pieporus", "Zyax"];
const HISTORIC_F = ["Zia", "Dochia", "Meda", "Andrada", "Dacidava", "Sargetia", "Zina", "Zamolxa", "Bendisa"];

const GODS = ["Zalmoxis", "Gebeleizis", "Bendis", "Derzelas", "Pleistoros"];

const CITIES = ["Sarmizegetusa", "Apulum", "Napoca", "Potaissa", "Buridava", "Cumidava", "Pelendava", "Sucidava", "Argedava", "Ziridava", "Singidava"];

const ROLES_M = ["Preotul", "Războinicul", "Căpetenia", "Străjerul", "Oracolul", "Fiul"];
const ROLES_F = ["Preoteasa", "Războinica", "Căpetenia", "Străjera", "Zeița", "Fiica"];

function getRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<"M" | "F">("M");
  const [nickname, setNickname] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setFirstName(v);
    
    const n = v.trim().toLowerCase();
    if (n.length > 2) {
      const maleExceptions = ["luca", "sava", "horea", "horia", "toma", "mircea", "nea", "badea", "mitica", "costica", "nelu"];
      const femaleExceptions = ["carmen", "beatrice", "iris", "ingrid", "astrid"];
      if (femaleExceptions.includes(n)) {
        setGender("F");
      } else if (maleExceptions.includes(n)) {
        setGender("M");
      } else if (n.endsWith("a")) {
        setGender("F");
      } else {
        setGender("M");
      }
    }
  };

  const handleGenerate = () => {
    if (!firstName || !lastName) return;

    setIsGenerating(true);
    setNickname(null);

    // Joacă sunetul de lup
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Eroare redare sunet:", e));
    }

    setTimeout(() => {
      const formatType = Math.floor(Math.random() * 8);
      let generatedName = "";

      const fName = firstName.trim();
      const lName = lastName.trim();

      const isMale = gender === "M";

      switch (formatType) {
        case 0:
          generatedName = `${fName} "${getRandom(isMale ? ANIMALS_M : ANIMALS_F)} ${getRandom(MATERIALS)}"`;
          break;
        case 1:
          generatedName = `${getRandom(isMale ? HISTORIC_M : HISTORIC_F)} ${isMale ? 'zis și' : 'zisă și'} ${fName} ${getRandom(isMale ? ADJECTIVES_M : ADJECTIVES_F)}`;
          break;
        case 2:
          generatedName = `${lName}, ${isMale ? 'Fiu' : 'Fiică'} de ${getRandom(isMale ? HISTORIC_M : HISTORIC_F)} din ${getRandom(CITIES)}`;
          break;
        case 3:
          generatedName = `${fName}, ${getRandom(isMale ? ROLES_M : ROLES_F)} lui ${getRandom(GODS)}`;
          break;
        case 4:
          generatedName = `"${getRandom(WEAPONS)} ${getRandom(NATURE)}" (${fName} ${lName})`;
          break;
        case 5:
          generatedName = `${fName} ${getRandom(isMale ? ADJECTIVES_M : ADJECTIVES_F)} din neamul ${getRandom(CITIES)}`;
          break;
        case 6:
          generatedName = `${lName} ${getRandom(isMale ? ANIMALS_M : ANIMALS_F)} ${getRandom(NATURE)}`;
          break;
        case 7:
          generatedName = `${getRandom(isMale ? HISTORIC_M : HISTORIC_F)} "${getRandom(isMale ? ADJECTIVES_M : ADJECTIVES_F)}" ${lName}`;
          break;
      }

      setNickname(generatedName);
      setIsGenerating(false);
    }, 600); // Scurt efect de așteptare pentru suspans
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-black font-sans selection:bg-amber-500/30">
      {/* Background Cinematic */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/background.png" 
          alt="Dacian Background" 
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-60 scale-105 transform hover:scale-100 transition-transform duration-[20s] ease-in-out"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
        {/* Glow effect central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 blur-[120px] rounded-full point-events-none"></div>
      </div>

      <audio ref={audioRef} src="/wolf.mp3" preload="auto"></audio>

      {/* Main Content Card */}
      <Card className="z-10 w-full max-w-xl bg-black/40 backdrop-blur-xl border border-white/10 text-stone-100 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden rounded-2xl">
        {/* Element decorativ deasupra cardului */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80"></div>
        
        <CardHeader className="text-center pt-10 pb-6 relative">
          <CardTitle className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700 font-serif drop-shadow-sm mb-4">
            Porecle Dacice
          </CardTitle>
          <CardDescription className="text-stone-300 text-lg md:text-xl font-light max-w-md mx-auto leading-relaxed">
            Descoperă-ți numele tău de dac liber. <br/>
            <span className="text-amber-500/80 italic text-sm mt-2 block">Inspirat din forța străbunilor noștri.</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 px-8 pb-10">
          <div className="space-y-5">
            <div className="space-y-2 group">
              <Label htmlFor="firstName" className="text-stone-400 uppercase tracking-widest text-xs font-bold group-focus-within:text-amber-500 transition-colors">Prenumele Tău</Label>
              <Input 
                id="firstName" 
                placeholder="Ex: Ion" 
                value={firstName}
                onChange={handleFirstNameChange}
                className="bg-black/50 border-white/10 text-white placeholder:text-stone-600 h-14 text-lg focus-visible:ring-amber-500/50 focus-visible:border-amber-500/50 transition-all rounded-xl"
              />
            </div>
            
            <div className="space-y-2 group">
              <Label htmlFor="lastName" className="text-stone-400 uppercase tracking-widest text-xs font-bold group-focus-within:text-amber-500 transition-colors">Numele De Familie</Label>
              <Input 
                id="lastName" 
                placeholder="Ex: Popescu" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-black/50 border-white/10 text-white placeholder:text-stone-600 h-14 text-lg focus-visible:ring-amber-500/50 focus-visible:border-amber-500/50 transition-all rounded-xl"
              />
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-stone-400 uppercase tracking-widest text-xs font-bold transition-colors">Alege Genul Spiritual</Label>
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  className={`flex-1 h-12 text-sm uppercase tracking-wider font-bold transition-all duration-300 ${gender === 'M' ? 'bg-amber-600/20 text-amber-500 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-black/50 border-white/10 text-stone-500 hover:text-stone-300 hover:border-white/20'}`}
                  onClick={(e) => { e.preventDefault(); setGender('M'); }}
                >
                  Războinic (M)
                </Button>
                <Button 
                  variant="outline"
                  className={`flex-1 h-12 text-sm uppercase tracking-wider font-bold transition-all duration-300 ${gender === 'F' ? 'bg-amber-600/20 text-amber-500 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-black/50 border-white/10 text-stone-500 hover:text-stone-300 hover:border-white/20'}`}
                  onClick={(e) => { e.preventDefault(); setGender('F'); }}
                >
                  Zeiță (F)
                </Button>
              </div>
            </div>
            
            <Button 
              className="w-full relative overflow-hidden group bg-gradient-to-r from-amber-700 via-red-900 to-amber-700 hover:from-amber-600 hover:via-red-800 hover:to-amber-600 text-amber-50 font-bold h-16 text-xl transition-all duration-500 border border-amber-500/30 rounded-xl shadow-[0_0_20px_rgba(180,83,9,0.2)] hover:shadow-[0_0_30px_rgba(180,83,9,0.5)]"
              onClick={handleGenerate}
              disabled={!firstName || !lastName || isGenerating}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isGenerating ? (
                  <span className="animate-pulse">Se invocă spiritul...</span>
                ) : (
                  <>
                    Generează Porecla!
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sword ml-1 group-hover:rotate-12 transition-transform"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/></svg>
                  </>
                )}
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </Button>
          </div>

          <div className={`transition-all duration-700 ease-out transform ${nickname ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none absolute'}`}>
            {nickname && (
              <div className="relative mt-8 p-8 bg-gradient-to-b from-amber-950/40 to-black/60 rounded-2xl border border-amber-500/30 text-center shadow-[inset_0_0_40px_rgba(180,83,9,0.1)] group">
                {/* Ornamente colțuri */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-amber-500/50 rounded-tl-lg m-2"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-amber-500/50 rounded-tr-lg m-2"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-amber-500/50 rounded-bl-lg m-2"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-amber-500/50 rounded-br-lg m-2"></div>
                
                <h3 className="text-xs font-bold text-amber-500/70 mb-3 uppercase tracking-[0.3em]">Numele Tău Dac Este:</h3>
                <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 font-serif drop-shadow-[0_0_10px_rgba(251,191,36,0.3)] leading-tight py-2">
                  {nickname}
                </p>
                <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mt-6"></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
