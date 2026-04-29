/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { PAGES } from './constants';

export default function App() {
  const [pageId, setPageId] = useState(PAGES[0].id);
  const currentPage = useMemo(() => PAGES.find(p => p.id === pageId) || PAGES[0], [pageId]);

  const [b1, setB1] = useState('');
  const [b2, setB2] = useState('');
  const [b3, setB3] = useState('');
  const [b2Enabled, setB2Enabled] = useState(true);
  const [b3Enabled, setB3Enabled] = useState(true);
  const [copied, setCopied] = useState(false);

  const randomizeB1 = useCallback(() => {
    const options = currentPage.buckets[0].options;
    let next;
    do {
      next = options[Math.floor(Math.random() * options.length)];
    } while (next === b1 && options.length > 1);
    setB1(next);
  }, [b1, currentPage]);

  const randomizeB2 = useCallback(() => {
    if (!b2Enabled) return;
    const options = currentPage.buckets[1].options;
    let next;
    do {
      next = options[Math.floor(Math.random() * options.length)];
    } while (next === b2 && options.length > 1);
    setB2(next);
  }, [b2, b2Enabled, currentPage]);

  const randomizeB3 = useCallback(() => {
    if (!b3Enabled) return;
    const options = currentPage.buckets[2].options;
    let next;
    do {
      next = options[Math.floor(Math.random() * options.length)];
    } while (next === b3 && options.length > 1);
    setB3(next);
  }, [b3, b3Enabled, currentPage]);

  const randomizeAll = useCallback(() => {
    const options1 = currentPage.buckets[0].options;
    const options2 = currentPage.buckets[1].options;
    const options3 = currentPage.buckets[2].options;
    
    setB1(options1[Math.floor(Math.random() * options1.length)]);
    if (b2Enabled) setB2(options2[Math.floor(Math.random() * options2.length)]);
    if (b3Enabled) setB3(options3[Math.floor(Math.random() * options3.length)]);
  }, [currentPage, b2Enabled, b3Enabled]);

  const fullPrompt = useMemo(() => {
    if (currentPage.id === 'creative') {
      return `${currentPage.promptPrefix} ${b1}${b2Enabled ? `, ${b2}` : ''}${b3Enabled ? ` ${b3}` : ''}.`;
    } else if (currentPage.id === 'stride') {
      return `${currentPage.promptPrefix} ${b3Enabled ? b3 : 'an expert'}. Your task is to ${b1.charAt(0).toLowerCase() + b1.slice(1)}${b2Enabled ? `, but ${b2}` : ''}.`;
    } else {
      return `${currentPage.promptPrefix} ${b1}${b2Enabled ? ` The brand vibe is ${b2.toLowerCase().replace('.', '')}.` : ''}${b3Enabled ? ` The secret sauce is that ${b3.charAt(0).toLowerCase() + b3.slice(1).replace('.', '')}.` : ''} Give me 3 crazy product ideas.`;
    }
  }, [currentPage, b1, b2, b3, b2Enabled, b3Enabled]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Reset and randomize when page changes
  useEffect(() => {
    randomizeAll();
  }, [pageId]);

  return (
    <TooltipProvider>
      <div 
        className="min-h-screen bg-background text-foreground font-sans p-4 md:p-10 flex flex-col w-full max-w-[1024px] mx-auto transition-colors duration-500"
        style={{ '--primary': currentPage.primaryColor } as React.CSSProperties}
      >
        
        {/* Header */}
        <header className="flex flex-wrap justify-between items-end mb-10 border-b-2 border-foreground pb-3 gap-4">
          <div>
            <h1 className="text-2xl md:text-[42px] font-black uppercase tracking-tighter leading-none break-words">
              PROMPT LAB
            </h1>
            <div className="font-mono text-sm font-bold uppercase">
              {currentPage.version} // {currentPage.name}
            </div>
          </div>

          {/* Navigation Dropdown */}
          <div className="relative group">
            <select 
              value={pageId}
              onChange={(e) => setPageId(e.target.value)}
              className="appearance-none bg-foreground text-white px-4 py-2 pr-10 font-bold text-xs uppercase rounded-none cursor-pointer border-none focus:ring-2 focus:ring-primary outline-none"
            >
              {PAGES.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
          </div>
        </header>

        {/* Main Buckets */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          
          <BucketCard 
            id={currentPage.buckets[0].id}
            title={currentPage.buckets[0].title} 
            value={b1}
            onRandomize={randomizeB1}
            btnLabel={currentPage.buckets[0].btnLabel}
            enabled={true}
            primaryColor={currentPage.primaryColor}
          />

          <BucketCard 
            id={currentPage.buckets[1].id}
            title={currentPage.buckets[1].title} 
            value={b2}
            onRandomize={randomizeB2}
            btnLabel={currentPage.buckets[1].btnLabel}
            enabled={b2Enabled}
            onToggle={setB2Enabled}
            primaryColor={currentPage.primaryColor}
          />

          <BucketCard 
            id={currentPage.buckets[2].id}
            title={currentPage.buckets[2].title} 
            value={b3}
            onRandomize={randomizeB3}
            btnLabel={currentPage.buckets[2].btnLabel}
            enabled={b3Enabled}
            onToggle={setB3Enabled}
            primaryColor={currentPage.primaryColor}
          />

        </main>

        {/* Footer Bar */}
        <div className="mt-10 bg-foreground text-white p-8 flex flex-col gap-4 shadow-brutal transition-shadow duration-300">
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
              {currentPage.id === 'creative' ? (
                <>
                  "{currentPage.promptPrefix} "
                  <span 
                    className="font-bold underline transition-colors duration-300"
                    style={{ color: currentPage.highlightColor }}
                  >
                    {b1}
                  </span>
                  {b2Enabled && (
                    <>
                      , <span 
                        className="font-bold underline transition-colors duration-300"
                        style={{ color: currentPage.highlightColor }}
                      >
                        {b2}
                      </span>
                    </>
                  )}
                  {b3Enabled && (
                    <>
                      , <span 
                        className="font-bold underline transition-colors duration-300"
                        style={{ color: currentPage.highlightColor }}
                      >
                        {b3}
                      </span>
                    </>
                  )}
                  ."
                </>
              ) : currentPage.id === 'stride' ? (
                <>
                  "{currentPage.promptPrefix} "
                  <span 
                    className="font-bold underline transition-colors duration-300"
                    style={{ color: currentPage.highlightColor }}
                  >
                    {b3Enabled ? b3 : 'an expert'}
                  </span>
                  ". Your task is to "
                  <span 
                    className="font-bold underline transition-colors duration-300"
                    style={{ color: currentPage.highlightColor }}
                  >
                    {b1.charAt(0).toLowerCase() + b1.slice(1)}
                  </span>
                  {b2Enabled && (
                    <>
                      , but <span 
                        className="font-bold underline transition-colors duration-300"
                        style={{ color: currentPage.highlightColor }}
                      >
                        {b2}
                      </span>
                    </>
                  )}
                  ."
                </>
              ) : (
                <>
                  "{currentPage.promptPrefix} "
                  <span 
                    className="font-bold underline transition-colors duration-300"
                    style={{ color: currentPage.highlightColor }}
                  >
                    {b1}
                  </span>
                  {b2Enabled && (
                    <>
                      . The brand vibe is <span 
                        className="font-bold underline transition-colors duration-300"
                        style={{ color: currentPage.highlightColor }}
                      >
                        {b2.toLowerCase().replace('.', '')}
                      </span>
                    </>
                  )}
                  {b3Enabled && (
                    <>
                      . The secret sauce is that <span 
                        className="font-bold underline transition-colors duration-300"
                        style={{ color: currentPage.highlightColor }}
                      >
                        {b3.charAt(0).toLowerCase() + b3.slice(1).replace('.', '')}
                      </span>
                    </>
                  )}
                  . Give me 3 crazy product ideas."
                </>
              )}
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
  primaryColor: string;
}

function BucketCard({ id, title, value, onRandomize, btnLabel, enabled, onToggle, primaryColor }: BucketCardProps) {
  return (
    <div className={cn(
      "bg-white border-2 border-foreground shadow-brutal flex flex-col p-6 relative group transition-opacity duration-300 min-w-0",
      !enabled && "opacity-50"
    )}>
      {/* Geometric Decoration */}
      <div 
        className={cn(
          "absolute -top-[2px] -right-[2px] w-10 h-10 clip-triangle z-10 transition-colors duration-300"
        )} 
        style={{ backgroundColor: enabled ? primaryColor : '#9CA3AF' }}
      />
      
      <div className="font-mono text-xs uppercase mb-6 flex flex-wrap items-center justify-between gap-2 font-bold">
        <div className="flex items-center gap-2">
          <span className={cn("w-2.5 h-2.5 rounded-full", enabled ? "bg-foreground" : "bg-muted-foreground")} />
          {id}_{title}
        </div>
        {onToggle && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <span 
              className={cn(
                "text-[10px] font-bold tracking-widest transition-colors duration-300"
              )}
              style={{ color: enabled ? primaryColor : '#9CA3AF' }}
            >
              {enabled ? "ACTIVE" : "INACTIVE"}
            </span>
            <Switch 
              checked={enabled} 
              onCheckedChange={onToggle}
              style={{ '--primary': primaryColor } as React.CSSProperties}
              className="data-checked:bg-[var(--primary)]"
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
              className="text-2xl font-bold leading-tight"
              style={{ color: primaryColor }}
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
          "bg-foreground text-white border-none p-4 h-auto font-black uppercase text-[13px] tracking-wider rounded-none transition-colors duration-200"
        )}
        style={{ backgroundColor: enabled ? undefined : '#9CA3AF' }}
        onMouseEnter={(e) => {
          if (enabled) e.currentTarget.style.backgroundColor = primaryColor;
        }}
        onMouseLeave={(e) => {
          if (enabled) e.currentTarget.style.backgroundColor = '';
        }}
      >
        {btnLabel}
      </Button>
    </div>
  );
}
