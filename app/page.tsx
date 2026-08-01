'use client';

import { useState } from 'react';

interface Story {
  id: string;
  title: string;
  category: string;
  readTime: string;
  author: string;
  excerpt: string;
  fullStory: string;
  image: string;
}

const STORIES: Story[] = [
  {
    id: 'lighthouse',
    title: 'The Lighthouse in the Storm',
    category: 'Hope & Guidance',
    readTime: '8 min read',
    author: 'J.M.',
    excerpt:
      'When the violent waves of life crashed against the jagged shore, an ancient beacon revealed a light that could never be extinguished.',
    fullStory: `The rain fell in unrelenting sheets over Harbor Cliff, whipping against the worn wooden timbers of Caleb’s small cottage. For months, Caleb felt as though his heart was adrift in uncharted dark waters. The diagnosis, the financial collapse, the quiet isolation of grief—it felt like a storm with no dawn in sight.

Driven by a restless impulse, Caleb put on his heavy oilskin coat and walked toward the towering stone lighthouse at the edge of the cliff. Built over a century ago, its solid foundations had endured countless gales. Old Isaac, the keeper, opened the heavy oak door with a warm, knowing smile.

"Come inside, son," Isaac said, placing a steady hand on Caleb’s shoulder. "The storm is fierce tonight, but the tower stands firm because it was anchored into the bedrock."

As they climbed the spiral staircase, Isaac spoke of faith not as the absence of storms, but as the steadfast assurance of the light within them. "You see, Caleb," Isaac pointed up at the brilliant rotating lamp casting light five leagues into the ocean, "the lighthouse doesn't ask the storm to calm down before it shines. It shines precisely because the sea is dark."

That night, listening to the gale roar outside while sitting beneath the warm beam of light, Caleb understood. Faith wasn’t waiting for the storm to pass; it was trusting the Anchor who holds us through the fury of the gale.`,
    image: '/images/lighthouse_storm.jpg',
  },
  {
    id: 'grace-piedmont',
    title: 'Grace on Piedmont Road',
    category: 'Redemption & Mercy',
    readTime: '12 min read',
    author: 'J.M.',
    excerpt:
      'A quiet avenue where forgotten encounters turn into miraculous moments of divine mercy and unexpected second chances.',
    fullStory: `Piedmont Road was known for its towering magnolia trees and quiet, unassuming suburban charm. Yet for Marcus, it was a street burdened with bitter memories of broken promises and estranged family ties. He hadn't driven down Piedmont Road in over fifteen years.

On a warm autumn Tuesday evening, a sudden breakdown forced Marcus to pull over right outside St. Jude’s Chapel on Piedmont. Frustrated and stranded, he walked into the open courtyard to find water. There he met Sister Clara, tending to a small community food garden.

Instead of dismissing his frustration, Sister Clara handed him a cold glass of lemonade and listened quietly as Marcus poured out years of accumulated regret. He confessed his fear that he had drifted too far, broken too many bonds, and crossed beyond the reach of grace.

Sister Clara pointed to an old, weathered oak bench beneath a glowing streetlight. "Grace, Marcus, is not earned by a pristine past. It is a gift extended precisely to those who feel unlovable. God does not audit your failures before offering His love; He offers His Son."

Standing under the warm amber glow on Piedmont Road, Marcus pulled out his phone and made the call he had avoided for a decade. The tears of reconciliation that followed proved that no road is ever too long for grace to find its way home.`,
    image: '/images/grace_piedmont.jpg',
  },
  {
    id: 'quiet-table',
    title: 'The Quiet Table',
    category: 'Fellowship & Prayer',
    readTime: '10 min read',
    author: 'J.M.',
    excerpt:
      'Around a simple candlelit wooden table, three weary souls discovered that true bread and living waters are found in fellowship.',
    fullStory: `In the bustling heart of the city stood a modest wooden table inside Arthur’s small bakery. Every Thursday evening after closing, Arthur lit a single beeswax candle and opened his doors for anyone seeking quiet fellowship.

One chilly Thursday, three strangers sat together: Sarah, a young mother exhausted by single parenthood; David, a retired teacher grieving his late wife; and Liam, a university student struggling with doubts and purpose. None of them knew what to say at first.

Arthur placed a freshly baked loaf of warm bread and three cups of warm tea between them. "We don't need eloquent speeches here," Arthur whispered softly. "Just open hearts."

As the hours slipped by, barriers melted away. Sarah shared her hidden anxieties, David recalled the comfort of scripture during his darkest hours, and Liam asked the honest, raw questions he had been afraid to voice anywhere else. Together, they prayed—not with formal rehearsed words, but with sincere, humble petitions.

When they left Arthur’s bakery that night, the cold night air no longer felt heavy. They had gathered as weary individuals, but walked away united as a family in Christ, renewed by the bread of life broken at a quiet table.`,
    image: '/images/quiet_table.jpg',
  },
];

const SUGGESTED_PROMPTS = [
  'How do I find peace when life feels overwhelming?',
  'Reflect on finding strength in times of quiet waiting.',
  'A biblical meditation on forgiveness and second chances.',
  'How can I trust God during unexpected life changes?',
];

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [reflection, setReflection] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setReflection('');

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate reflection');
      }

      setReflection(data.text);
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || 'An unexpected error occurred. Please check your API configuration.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!reflection) return;
    navigator.clipboard.writeText(reflection);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 glass-panel border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v18m-6-12h12"
                  />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                GodDome <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">Faith & Words</span>
              </span>
              <p className="text-xs text-slate-400 font-light">Christian Stories by J.M.</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-amber-400 transition-colors">
              Home
            </a>
            <a href="#stories" className="hover:text-amber-400 transition-colors">
              Featured Stories
            </a>
            <a href="#assistant" className="hover:text-amber-400 transition-colors">
              Faith Assistant
            </a>
            <a href="#about" className="hover:text-amber-400 transition-colors">
              About J.M.
            </a>
          </div>

          <div>
            <a
              href="#assistant"
              className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
            >
              Reflect Now
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 z-10">
        {/* Hero Section */}
        <section id="hero" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Faithful Words Collection
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 max-w-5xl mx-auto">
            Inspiring Christian Stories of <br className="hidden sm:inline" />
            <span className="gold-gradient-text">Hope, Grace & Redemption</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Welcome to <strong className="text-white font-semibold">GodDome</strong> — a sanctuary of spiritual literature crafted by <strong className="text-amber-300 font-semibold">J.M.</strong> Discover uplifting narratives of divine mercy, steadfast faith in trials, and an AI-powered reflection companion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#stories"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all text-center"
            >
              Explore Stories by J.M.
            </a>
            <a
              href="#assistant"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold glass-panel border border-slate-700 hover:border-amber-500/40 text-slate-200 hover:text-white transition-all text-center"
            >
              Ask Faith Assistant
            </a>
          </div>
        </section>

        {/* Featured Collection Grid */}
        <section id="stories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Curated Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                Featured Stories by J.M.
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md mt-3 md:mt-0 font-light">
              Explore powerful short stories rooted in scripture, grace, and real-life reflections of God&apos;s enduring love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STORIES.map((story) => (
              <div
                key={story.id}
                className="group glass-panel rounded-2xl overflow-hidden glass-panel-hover flex flex-col cursor-pointer border border-slate-800"
                onClick={() => setActiveStory(story)}
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  {/* Image */}
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
                      {story.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span>{story.author}</span>
                      <span>•</span>
                      <span>{story.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-3">
                      {story.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed font-light line-clamp-3">
                      {story.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-amber-400 text-sm font-semibold group-hover:text-amber-300">
                    <span>Read Full Story</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Faith & Reflection Assistant */}
        <section id="assistant" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Powered by Gemini 3 Flash
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
                Faith & Reflection Assistant
              </h2>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                Share a prayer, scripture prompt, personal struggle, or reflection topic to receive a thoughtful, biblically grounded meditation.
              </p>
            </div>

            {/* Prompt Chips */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">
                Suggested Prompts
              </label>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {SUGGESTED_PROMPTS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(chip)}
                    className="px-3.5 py-1.5 rounded-xl text-xs bg-slate-900/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-200 border border-slate-700 hover:border-amber-500/40 transition-all text-left"
                  >
                    ✨ {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your reflection prompt or spiritual question here..."
                  className="w-full rounded-2xl bg-slate-950/90 border border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-100 p-4 text-sm placeholder:text-slate-500 focus:outline-none transition-all resize-none shadow-inner"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  GodDome AI Reflection Engine
                </span>

                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-slate-950"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Generating Reflection...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Reflection</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Error state */}
            {error && (
              <div className="mt-6 p-4 rounded-xl bg-red-950/50 border border-red-800/60 text-red-200 text-sm">
                <p className="font-semibold mb-1">Error Generating Reflection</p>
                <p className="text-xs text-red-300 font-light">{error}</p>
              </div>
            )}

            {/* Output Reflection Box */}
            {reflection && (
              <div className="mt-8 p-6 rounded-2xl bg-slate-950/80 border border-amber-500/30 relative">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Spiritual Reflection
                    </span>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="text-xs font-medium text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
                  >
                    {copied ? (
                      <span className="text-emerald-400 font-semibold">Copied to Clipboard!</span>
                    ) : (
                      <>
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-light">
                  {reflection}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* About J.M. Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-1 flex-shrink-0 shadow-xl shadow-amber-500/10">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-4xl">
                ✝️
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                About the Author
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 mb-3">
                J.M. — Faithful Words
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">
                J.M. writes modern Christian fiction and spiritual reflections that explore grace, endurance in suffering, and the quiet miracles woven into everyday life. Through GodDome, J.M. shares stories to encourage, heal, and point hearts toward the eternal light of Christ.
              </p>
              <div className="flex items-center gap-4 text-xs font-medium text-amber-400">
                <span>• Biblical Themes</span>
                <span>• Faith & Devotion</span>
                <span>• Encouraging Narratives</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Story Reader Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-3xl max-h-[90vh] rounded-3xl border border-amber-500/30 overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="relative h-64 w-full bg-slate-900 flex-shrink-0">
              <img
                src={activeStory.image}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {activeStory.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {activeStory.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  By {activeStory.author} • {activeStory.readTime}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed font-light whitespace-pre-wrap">
              {activeStory.fullStory}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveStory(null)}
                className="px-6 py-2 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 glass-panel py-10 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="text-amber-400 font-bold">GodDome</span>
            <span>—</span>
            <span>Faithful Words: Christian Stories by J.M.</span>
          </div>

          <div>
            <p>&copy; 2026 GodDome — Faithful Words: Christian Stories by J.M. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
