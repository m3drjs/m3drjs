import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Drum, 
  Music, 
  Sparkles, 
  MapPin, 
  Heart, 
  Radio, 
  ShieldCheck, 
  Feather, 
  Compass 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Desia Dhemsa | Odisha Folk & Tribal Music Preservation',
  description: 'Learn about the timeless Dhemsa dance, the Desia dialect, traditional instruments like Mahuri & Tamak, and our mission to celebrate and archive the living sounds of South Odisha.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-desia-surface border border-desia-border text-xs text-desia-gold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cultural Heritage & Preservation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-desia-sand tracking-wide leading-tight">
          Where Desia Rhythm Never Stops.
        </h1>
        <p className="text-sm sm:text-base text-desia-clay leading-relaxed">
          <strong>DESIA DHEMSA</strong> is a live, minimalist online music room dedicated to the living folk songs and circular community dance of the southern highlands of Odisha.
        </p>
      </div>

      {/* The 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: Desia Music */}
        <div className="p-6 rounded-3xl bg-desia-surface/50 border border-desia-border/60 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-desia-red/30 border border-desia-ochre/40 flex items-center justify-center text-desia-gold">
            <Music className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-serif font-bold text-desia-sand">
            Desia Music
          </h2>
          <p className="text-xs sm:text-sm text-desia-sand/80 leading-relaxed font-sans">
            Desia (ଦେଶିଆ) is the Indo-Aryan lingua franca spoken across the tribal districts of southwestern Odisha. Desia songs are rooted in the daily rhythm of agriculture, sacred mountain worship, seasonal monsoons, and oral stories passed down through generations.
          </p>
        </div>

        {/* Pillar 2: Dhemsa Dance */}
        <div className="p-6 rounded-3xl bg-desia-surface/50 border border-desia-border/60 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-desia-ochre/30 border border-desia-gold/40 flex items-center justify-center text-desia-gold">
            <Feather className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-serif font-bold text-desia-sand">
            The Dhemsa Dance
          </h2>
          <p className="text-xs sm:text-sm text-desia-sand/80 leading-relaxed font-sans">
            Dhemsa is an ancient circular dance performed with interlocked arms and synchronized footwork. Practiced by communities such as the Paroja, Gadaba, Bhatra, and Kondh, Dhemsa removes social hierarchy: all dancers move as one single, undulating entity.
          </p>
        </div>

        {/* Pillar 3: Preservation Mission */}
        <div className="p-6 rounded-3xl bg-desia-surface/50 border border-desia-border/60 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-desia-darkred/40 border border-desia-red/40 flex items-center justify-center text-desia-gold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-serif font-bold text-desia-sand">
            Preservation Mission
          </h2>
          <p className="text-xs sm:text-sm text-desia-sand/80 leading-relaxed font-sans">
            Far too often, indigenous regional music is confined to obscure archives or commercialized inappropriately. Desia Dhemsa creates an open, elegant, immersive virtual space where anyone in the world can experience the trance-like joy of a live village gathering.
          </p>
        </div>

      </div>

      {/* Traditional Instruments Deep Dive */}
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-desia-gold">
            <Drum className="w-4 h-4" />
            <span>Acoustic Soul</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-desia-sand">
            The Traditional Instruments of Dhemsa
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-desia-card/60 border border-desia-border space-y-2">
            <span className="text-xs font-mono font-bold text-desia-ochre">01 • ମାହୁରୀ</span>
            <h3 className="text-base font-serif font-bold text-desia-sand">Mahuri</h3>
            <p className="text-xs text-desia-clay leading-relaxed">
              A double-reed woodwind instrument resembling an ancient oboe. Piercing, microtonal, and emotionally charged, the Mahuri leads the melodic conversation of every Dhemsa session.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-desia-card/60 border border-desia-border space-y-2">
            <span className="text-xs font-mono font-bold text-desia-ochre">02 • ତାମାକ</span>
            <h3 className="text-base font-serif font-bold text-desia-sand">Tamak</h3>
            <p className="text-xs text-desia-clay leading-relaxed">
              A small hemispherical kettle drum made of clay or wood, beaten with curved cane sticks. The Tamak dictates rapid syncopated variations that guide dancers to shift steps.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-desia-card/60 border border-desia-border space-y-2">
            <span className="text-xs font-mono font-bold text-desia-ochre">03 • ନିଶାନ</span>
            <h3 className="text-base font-serif font-bold text-desia-sand">Nishan</h3>
            <p className="text-xs text-desia-clay leading-relaxed">
              A conical iron percussion drum slung around the chest and struck with thick wooden beaters. Often crested with antlers or brass ornaments, its deep resonance carries for miles across valleys.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-desia-card/60 border border-desia-border space-y-2">
            <span className="text-xs font-mono font-bold text-desia-ochre">04 • ଚାଙ୍ଗୁ & ଘଣ୍ଟା</span>
            <h3 className="text-base font-serif font-bold text-desia-sand">Changu & Ghanta</h3>
            <p className="text-xs text-desia-clay leading-relaxed">
              The circular handheld goat-skin Changu drum paired with high-pitch bronze bell-metal gongs (Ghanta) provides the hypnotic shimmer and steady metronome for night-long vigils.
            </p>
          </div>

        </div>
      </div>

      {/* The 5 Districts of the Desia Corridor */}
      <div className="p-6 sm:p-8 rounded-3xl bg-desia-surface/40 border border-desia-border space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-desia-gold">
            <Compass className="w-4 h-4" />
            <span>Geography of Rhythm</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-desia-sand">
            The Five Sacred Districts
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Koraput',
              tag: 'Heartland of Chokda Dhemsa',
              desc: 'Highland plateaus, coffee estates, Deomali mountain, and the Paroja & Gadaba Dhemsa traditions.'
            },
            {
              name: 'Nabarangpur',
              tag: 'Indravati River Basin & Mandia Harvest',
              desc: 'Famed for the Bhatra tribe, sweet bamboo flutes (Baunsi), and the joyful autumn Mandia Parab.'
            },
            {
              name: 'Malkangiri',
              tag: 'Sal Forests & Koya Traditions',
              desc: 'Dense deciduous canopies, sacred forest shrines, and vibrant wedding Baha Dhemsa rhythms.'
            },
            {
              name: 'Rayagada',
              tag: 'Niyamgiri Hills & Kondh Heritage',
              desc: 'The soul of classical Mahuri playing, sacred streams, and Dongria Kondh agricultural hymns.'
            },
            {
              name: 'Kandhamal',
              tag: 'Sacred Groves & Changu Vigils',
              desc: 'Pristine hills, organic turmeric cultivation, and hypnotic fire vigils driven by circular Changu drums.'
            },
            {
              name: 'Global Diaspora',
              tag: 'Preserving for Tomorrow',
              desc: 'Connecting Odia diaspora and world folk enthusiasts to the primal beauty of live indigenous rhythm.'
            },
          ].map((item) => (
            <div key={item.name} className="p-4 rounded-xl bg-desia-card/40 border border-desia-border/50 space-y-1.5">
              <h3 className="text-sm font-serif font-bold text-desia-sand">{item.name}</h3>
              <p className="text-[11px] text-desia-gold font-medium">{item.tag}</p>
              <p className="text-xs text-desia-clay leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Respect & Disclaimer */}
      <div className="p-6 rounded-2xl bg-desia-card/50 border border-desia-ochre/30 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-12 h-12 rounded-full bg-desia-surface border border-desia-border flex items-center justify-center flex-shrink-0 text-desia-gold">
          <Heart className="w-6 h-6 fill-current text-red-500" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-serif font-bold text-desia-sand">
            Built with Deep Reverence for Odisha&apos;s Tribal Communities
          </h3>
          <p className="text-xs text-desia-clay leading-relaxed">
            All musical arrangements, names, and cultural depictions are developed in spirit of honoring and archiving the living folk heritage of South Odisha. We adhere to the highest standards of cultural sensitivity and intellectual rights protection.
          </p>
        </div>
      </div>

      {/* CTA back to the room */}
      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-desia-red to-desia-ochre text-white font-medium text-sm shadow-xl shadow-desia-red/20 hover:scale-105 transition-all"
        >
          <Radio className="w-4 h-4 text-red-400 animate-pulse" />
          <span>Step Back Into The Dhemsa Room</span>
        </Link>
      </div>

    </div>
  );
}
