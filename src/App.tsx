/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RefreshCw, 
  Sparkles, 
  Copy, 
  Check, 
  Shuffle, 
  Image as ImageIcon, 
  Palette, 
  Zap,
  Dices
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Data for the buckets
const SUBJECTS = [
  "A majestic dragon",
  "A futuristic space station",
  "A vintage typewriter",
  "A cozy cabin in the woods",
  "A giant friendly robot",
  "A curious red fox",
  "A bustling street market in Tokyo",
  "An ancient Greek temple",
  "A floating island with waterfalls",
  "A high-tech laboratory",
  "A magical library with flying books",
  "A sleek electric supercar",
  "A peaceful zen garden",
  "A medieval knight in shining armor",
  "A group of penguins wearing scarves",
  "A mysterious glowing portal",
  "A treehouse city",
  "A steampunk airship",
  "A coral reef teeming with life",
  "A friendly alien visiting Earth"
];

const STYLES = [
  "in the style of a 1980s anime",
  "made entirely of origami paper",
  "as a hyper-realistic oil painting from the 1700s",
  "in the style of Minecraft / Voxel art",
  "drawn on a crumpled napkin with a blue ballpoint pen",
  "as a high-fashion magazine cover",
  "in a vibrant cyberpunk neon aesthetic",
  "as a Studio Ghibli watercolor background",
  "in a bold Pop Art style",
  "as a detailed charcoal sketch",
  "in a minimalist line art style",
  "as a 3D claymation scene",
  "in the style of a classic comic book",
  "as a stained glass window",
  "in a dreamy impressionist style",
  "as a retro 8-bit pixel art piece",
  "in a dark gothic aesthetic",
  "as a futuristic holographic projection",
  "in a whimsical storybook illustration style",
  "as a cinematic movie poster"
];

const TWISTS = [
  "but it's all underwater",
  "as a blueprint or technical schematic",
  "embroidered as a patch on a denim jacket",
  "in the middle of a dusty sandstorm",
  "but everything is made of candy",
  "seen through a night-vision camera",
  "glitchy and distorted like a broken TV",
  "contained inside a tiny snow globe",
  "made entirely of liquid gold",
  "as a miniature diorama on a desk",
  "surrounded by floating geometric shapes",
  "illuminated by a thousand fireflies",
  "frozen in a block of ice",
  "with a reflection in a puddle",
  "emerging from a cloud of colorful smoke",
  "as if seen through a kaleidoscope",
  "with a double exposure effect",
  "in a world where gravity is reversed",
  "made of glowing fiber-optic cables",
  "as a constellation in the night sky"
];

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function App() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [twist, setTwist] = useState(TWISTS[0]);
  const [styleEnabled, setStyleEnabled] = useState(true);
  const [twistEnabled, setTwistEnabled] = useState(true);
  const [copied, setCopied] = useState(false);

  const randomizeSubject = useCallback(() => {
    const currentIndex = SUBJECTS.indexOf(subject);
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * SUBJECTS.length);
    } while (nextIndex === currentIndex && SUBJECTS.length > 1);
    setSubject(SUBJECTS[nextIndex]);
  }, [subject]);

  const randomizeStyle = useCallback(() => {
    if (!styleEnabled) return;
    const currentIndex = STYLES.indexOf(style);
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * STYLES.length);
    } while (nextIndex === currentIndex && STYLES.length > 1);
    setStyle(STYLES[nextIndex]);
  }, [style, styleEnabled]);

  const randomizeTwist = useCallback(() => {
    if (!twistEnabled) return;
    const currentIndex = TWISTS.indexOf(twist);
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * TWISTS.length);
    } while (nextIndex === currentIndex && TWISTS.length > 1);
    setTwist(TWISTS[nextIndex]);
  }, [twist, twistEnabled]);

  const randomizeAll = useCallback(() => {
    randomizeSubject();
    if (styleEnabled) randomizeStyle();
    if (twistEnabled) randomizeTwist();
  }, [randomizeSubject, randomizeStyle, randomizeTwist, styleEnabled, twistEnabled]);

  const fullPrompt = `Generate ${subject}${styleEnabled ? `, ${style}` : ''}${twistEnabled ? `, ${twist}` : ''}.`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Initial randomization on load
  useEffect(() => {
    randomizeAll();
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground font-sans p-6 md:p-10 flex flex-col max-w-[1024px] mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-end mb-10 border-b-2 border-foreground pb-3">
          <h1 className="text-[42px] font-black uppercase tracking-tighter leading-none">
            PROMPT LAB
          </h1>
          <div className="font-mono text-sm font-bold uppercase">
            V.01 // HIGH SCHOOL CREATIVE SUITE
          </div>
        </header>

        {/* Main Buckets */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow">
          
          {/* Bucket 1: Subject */}
          <BucketCard 
            id="01"
            title="SUBJECT_DATA" 
            value={subject}
            onRandomize={randomizeSubject}
            btnLabel="ROLL SUBJECT"
            enabled={true}
          />

          {/* Bucket 2: Style */}
          <BucketCard 
            id="02"
            title="STYLE_DATA" 
            value={style}
            onRandomize={randomizeStyle}
            btnLabel="ROLL STYLE"
            enabled={styleEnabled}
            onToggle={setStyleEnabled}
          />

          {/* Bucket 3: Twist */}
          <BucketCard 
            id="03"
            title="TWIST_DATA" 
            value={twist}
            onRandomize={randomizeTwist}
            btnLabel="ROLL TWIST"
            enabled={twistEnabled}
            onToggle={setTwistEnabled}
          />

        </main>

        {/* Footer Bar */}
        <div className="mt-10 bg-foreground text-white p-8 flex flex-col gap-4 shadow-brutal">
          <div className="font-mono text-[11px] tracking-[2px] opacity-60 uppercase">
            COMPILED_OUTPUT_PROMPT:
          </div>
          
          <AnimatePresence mode="wait">
            <motion.p 
              key={fullPrompt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-normal leading-relaxed"
            >
              "{fullPrompt.replace('Generate ', 'Generate ').replace(subject, '')} 
              <span className="text-[#6E7BFF] font-bold underline">{subject}</span>
              {styleEnabled && (
                <>
                  , <span className="text-[#6E7BFF] font-bold underline">{style}</span>
                </>
              )}
              {twistEnabled && (
                <>
                  , <span className="text-[#6E7BFF] font-bold underline">{twist}</span>
                </>
              )}
              ."
            </motion.p>
          </AnimatePresence>

          <div className="flex flex-wrap gap-4 mt-2">
            <Button 
              onClick={randomizeAll}
              className="bg-white text-black hover:bg-white/90 font-bold text-xs uppercase rounded-none px-6 h-10 border-none"
            >
              RANDOMIZE ALL
            </Button>
            <Button 
              variant="outline"
              onClick={copyToClipboard}
              className="bg-transparent text-white border-white hover:bg-white/10 font-bold text-xs uppercase rounded-none px-6 h-10"
            >
              {copied ? 'COPIED!' : 'COPY TO CLIPBOARD'}
            </Button>
          </div>
        </div>

      </div>
    </TooltipProvider>
  );
}

interface BucketCardProps {
  id: string;
  title: string;
  value: string;
  onRandomize: () => void;
  btnLabel: string;
  enabled: boolean;
  onToggle?: (enabled: boolean) => void;
}

function BucketCard({ id, title, value, onRandomize, btnLabel, enabled, onToggle }: BucketCardProps) {
  return (
    <div className={cn(
      "bg-white border-2 border-foreground shadow-brutal flex flex-col p-6 relative group transition-opacity duration-300",
      !enabled && "opacity-50"
    )}>
      {/* Geometric Decoration */}
      <div className={cn(
        "absolute -top-[2px] -right-[2px] w-10 h-10 clip-triangle z-10 transition-colors duration-300",
        enabled ? "bg-primary" : "bg-muted-foreground"
      )} />
      
      <div className="font-mono text-xs uppercase mb-6 flex items-center justify-between font-bold">
        <div className="flex items-center gap-2">
          <span className={cn("w-2.5 h-2.5 rounded-full", enabled ? "bg-foreground" : "bg-muted-foreground")} />
          {id}_{title}
        </div>
        {onToggle && (
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-[10px] font-bold tracking-widest transition-colors duration-300",
              enabled ? "text-primary" : "text-muted-foreground"
            )}>
              {enabled ? "ACTIVE" : "INACTIVE"}
            </span>
            <Switch 
              checked={enabled} 
              onCheckedChange={onToggle}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        )}
      </div>

      <div className={cn(
        "flex-grow flex items-center justify-center text-center p-5 border border-dashed mb-6 transition-colors duration-300",
        enabled ? "border-[#CCC]" : "border-muted-foreground/30"
      )}>
        <AnimatePresence mode="wait">
          {enabled ? (
            <motion.p
              key={value}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold leading-tight text-primary"
            >
              {value}
            </motion.p>
          ) : (
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Disabled</p>
          )}
        </AnimatePresence>
      </div>

      <Button 
        onClick={onRandomize}
        disabled={!enabled}
        className={cn(
          "bg-foreground text-white border-none p-4 h-auto font-black uppercase text-[13px] tracking-wider rounded-none transition-colors duration-200",
          enabled ? "hover:bg-primary" : "opacity-50 cursor-not-allowed"
        )}
      >
        {btnLabel}
      </Button>
    </div>
  );
}
