import { sessions } from '../data/notes';

export interface ColleagueProfile {
  name: string;
  role: string;
  customQuery: string;
  format: 'bullets' | 'summary' | 'slack' | 'email';
}

export interface Takeaway {
  title: string;
  desc: string;
  improvement: string;
  sourceSessionId: string;
}

export interface ReplayRecommendation {
  title: string;
  speakers: string;
  reason: string;
  id: string;
  url: string;
}

export interface SynthesisResult {
  title: string;
  intro: string;
  topTakeaways: Takeaway[];
  replayRecommendation: ReplayRecommendation;
  highlightedSessionIds: string[];
  slackCopyText: string;
  emailHtml: string;
}

// Pre-defined Replays matching the official portal list
const REPLAY_PORTAL_LIST = [
  { id: 'd1-tech-future', title: 'Technology, power and the future of growth', speakers: 'Prof. Simon Johnson, The Hon. Dr. Kevin Rudd A.C.', url: 'https://conference.ubs.com/reg/page.asp?tkn=0641410c7ede6a269025d654e49f679c1ea495e7&id=3232&cid=286810&passcode=p184948' },
  { id: 'd1-monetary-policy', title: 'Whats next for monetary policy', speakers: 'Adrian Orr, Charles Evans', url: 'https://conference.ubs.com/reg/page.asp?tkn=0641410c7ede6a269025d654e49f679c1ea495e7&id=3232&cid=286810&passcode=p184948' },
  { id: 'd1-middle-east-energy', title: 'Middle East risk and the future of energy', speakers: 'Meghan OSullivan', url: 'https://conference.ubs.com/reg/page.asp?tkn=0641410c7ede6a269025d654e49f679c1ea495e7&id=3232&cid=286810&passcode=p184948' },
  { id: 'd1-space-frontier', title: 'Space: The economic frontier', speakers: 'Dame Dr. Maggie Aderin', url: 'https://conference.ubs.com/reg/page.asp?tkn=0641410c7ede6a269025d654e49f679c1ea495e7&id=3232&cid=286810&passcode=p184948' },
  { id: 'd2-regional-strategy', title: 'Our UBS regional strategy view of markets', speakers: 'Rohit Arora, Sunil Tirumalai, James Wang', url: 'https://conference.ubs.com/reg/page.asp?tkn=0641410c7ede6a269025d654e49f679c1ea495e7&id=3232&cid=286810&passcode=p184948' },
  { id: 'd2-wisdom-investing', title: 'The wisdom of 60 years of investing', speakers: 'Jeremy Grantham', url: 'https://conference.ubs.com/reg/page.asp?tkn=0641410c7ede6a269025d654e49f679c1ea495e7&id=3232&cid=286810&passcode=p184948' },
  { id: 'd2-dataism', title: 'From Homo Sapiens to the age of dataism', speakers: 'Yuval Harari', url: 'https://conference.ubs.com/reg/page.asp?tkn=0641410c7ede6a269025d654e49f679c1ea495e7&id=3232&cid=286810&passcode=p184948' },
  { id: 'd2-ai-infra', title: 'Scaling AI: Next-gen innovation & infrastructure', speakers: 'Lucy Guo, Lila Tretikov', url: 'https://conference.ubs.com/reg/page.asp?tkn=0641410c7ede6a269025d654e49f679c1ea495e7&id=3232&cid=286810&passcode=p184948' }
];

// Shorten a session title to max 7 words
function shortenTitle(title: string): string {
  const words = title.split(' ');
  return words.length > 7 ? words.slice(0, 7).join(' ') + '...' : title;
}

// Generate a role + category aware "what to think about next" hint
function queryImprovement(role: string, category: string): string {
  const categoryHints: Record<string, string> = {
    'tech-ai': 'how this technology shift affects your work and client conversations.',
    'macro-monetary': 'how this macro dynamic should influence your positioning and recommendations.',
    'geopolitics-energy': 'how this geopolitical or energy risk factors into your near-term decisions.',
    'finance-investing': 'how to apply this investing principle to your current mandates.',
    'semiconductors': 'how this semiconductor trend affects the companies or products you follow.',
  };
  const rolePrefix: Record<string, string> = {
    'Management Level': 'Consider',
    'Product Specialist: Fixed Income': 'Reflect on',
    'Product Specialist: Equity Funds': 'Assess',
    'Product Specialist: Equities': 'Assess',
    'Product Specialist: Private Assets': 'Evaluate',
    'Product Specialist: Hedge Funds': 'Factor in',
    'Product Specialist: Structured Products': 'Consider',
    'Investment Consultant': 'Think about',
    'Data Analytics': 'Explore',
    'Sales': 'Consider',
  };
  const prefix = rolePrefix[role] || 'Consider';
  const hint = categoryHints[category] || 'how this insight applies to your current work priorities.';
  return `${prefix} ${hint}`;
}

export function synthesizeBriefing(profile: ColleagueProfile): SynthesisResult {
  const name = profile.name.trim() || 'You';
  const role = profile.role;
  const query = (profile.customQuery || '').toLowerCase().trim();

  // 1. Determine session matching based on role and customQuery
  const scoredSessions = sessions.map(session => {
    let score = 0;

    // Direct text query matching — score each word independently so multi-word queries work
    if (query !== '') {
      const queryWords = query.split(/\s+/).filter(w => w.length > 2);
      queryWords.forEach(word => {
        if (session.title.toLowerCase().includes(word)) score += 8;
        session.tags.forEach(t => {
          if (t.toLowerCase().includes(word)) score += 5;
        });
        session.bullets.forEach(b => {
          if (b.text.toLowerCase().includes(word)) score += 2;
        });
      });
    }

    // Role-based baseline scoring
    if (role === 'Management Level') {
      if (session.id === 'd1-tech-future' || session.id === 'd2-wisdom-investing' || session.id === 'd2-dataism') score += 3;
    } else if (role === 'Product Specialist: Fixed Income') {
      if (session.id === 'd1-monetary-policy' || session.id === 'd2-private-capital') score += 3;
    } else if (role === 'Product Specialist: Equity Funds' || role === 'Product Specialist: Equities') {
      if (session.id === 'd2-wisdom-investing' || session.id === 'd2-regional-strategy' || session.id === 'd2-china-economy') score += 3;
    } else if (role === 'Product Specialist: Private Assets') {
      if (session.id === 'd2-private-capital' || session.id === 'd1-space-frontier' || session.id === 'd1-middle-east-energy') score += 3;
    } else if (role === 'Product Specialist: Hedge Funds') {
      if (session.id === 'd2-wisdom-investing' || session.id === 'd2-regional-strategy' || session.id === 'd2-cybersecurity') score += 3;
    } else if (role === 'Product Specialist: Structured Products') {
      if (session.id === 'd1-memory-semis' || session.id === 'd2-cybersecurity' || session.id === 'd2-wave-intelligence') score += 3;
    } else if (role === 'Investment Consultant') {
      if (session.id === 'd1-global-capital' || session.id === 'd2-wisdom-investing' || session.id === 'd2-dataism') score += 3;
    } else if (role === 'Data Analytics') {
      if (session.id === 'd2-dataism' || session.id === 'd2-wave-intelligence' || session.id === 'd1-space-frontier' || session.id === 'd2-cybersecurity') score += 3;
    } else if (role === 'Sales') {
      if (session.id === 'd1-global-capital' || session.id === 'd1-middle-east-energy' || session.id === 'd2-dataism') score += 3;
    }

    return { session, score };
  });

  // Extract relevant sessions
  const sortedScored = scoredSessions.sort((a, b) => b.score - a.score);
  const highlightedSessionIds = sortedScored.slice(0, 3).map(s => s.session.id);

  // 2. Select Replay Recommendation dynamically
  let recommendedReplayId = '';

  // Priority 1: Custom Query matching
  if (query !== '') {
    if (query.includes('space') || query.includes('satellite') || query.includes('orbit')) {
      recommendedReplayId = 'd1-space-frontier';
    } else if (query.includes('energy') || query.includes('nuclear') || query.includes('oil') || query.includes('hormuz') || query.includes('smr')) {
      recommendedReplayId = 'd1-middle-east-energy';
    } else if (query.includes('monetary') || query.includes('inflation') || query.includes('fed') || query.includes('rate')) {
      recommendedReplayId = 'd1-monetary-policy';
    } else if (query.includes('china') || query.includes('refation') || query.includes('rmb') || query.includes('em') || query.includes('asia')) {
      recommendedReplayId = 'd2-regional-strategy';
    } else if (query.includes('bubble') || query.includes('wisdom') || query.includes('grantham') || query.includes('extrapolat')) {
      recommendedReplayId = 'd2-wisdom-investing';
    } else if (query.includes('trust') || query.includes('dataism') || query.includes('harari') || query.includes('media')) {
      recommendedReplayId = 'd2-dataism';
    } else if (query.includes('ai') || query.includes('llm') || query.includes('infra') || query.includes('compute')) {
      recommendedReplayId = 'd2-ai-infra';
    }
  }

  // Priority 2: Role default
  if (!recommendedReplayId) {
    if (role === 'Management Level') {
      recommendedReplayId = 'd2-dataism';
    } else if (role === 'Product Specialist: Fixed Income') {
      recommendedReplayId = 'd1-monetary-policy';
    } else if (role === 'Product Specialist: Equity Funds' || role === 'Product Specialist: Equities') {
      recommendedReplayId = 'd2-regional-strategy';
    } else if (role === 'Product Specialist: Private Assets') {
      recommendedReplayId = 'd1-middle-east-energy';
    } else if (role === 'Product Specialist: Hedge Funds' || role === 'Investment Consultant') {
      recommendedReplayId = 'd2-wisdom-investing';
    } else if (role === 'Product Specialist: Structured Products') {
      recommendedReplayId = 'd2-ai-infra';
    } else if (role === 'Data Analytics' || role === 'Sales') {
      recommendedReplayId = 'd2-dataism';
    } else {
      recommendedReplayId = 'd1-tech-future';
    }
  }

  const selectedReplay = REPLAY_PORTAL_LIST.find(r => r.id === recommendedReplayId) || REPLAY_PORTAL_LIST[0];

  // Reasons matching the selected replay
  let replayReason = '';
  switch (selectedReplay.id) {
    case 'd2-dataism':
      replayReason = 'Provides crucial perspectives on human cooperation, client trust mechanics, and navigating algorithmic disruptions in a hybrid society.';
      break;
    case 'd1-monetary-policy':
      replayReason = 'Reviews changing US supply-side structures, central bank policy models, and how to manage fixed-income allocations in a higher-baseline inflation regime.';
      break;
    case 'd2-regional-strategy':
      replayReason = 'Highlights regional EM return dispersions, China corporate capex cycles, and tactical currency picks like Renminbi (RMB) and Australian Dollar (AUD).';
      break;
    case 'd1-middle-east-energy':
      replayReason = 'Details the Strait of Hormuz oil transit vulnerability and provides a strong outlook on Nuclear SMR infrastructure investments.';
      break;
    case 'd2-wisdom-investing':
      replayReason = 'Outlines Grantham\'s contrarian rules, demographic shifts, and strategic options for hedging against high-valuation capex bubbles.';
      break;
    case 'd2-ai-infra':
      replayReason = 'Provides real-world assessments of AI scaling bottlenecks, physical grid constraints, and software cost-efficiency execution.';
      break;
    case 'd1-space-frontier':
      replayReason = 'Analyzes the 90% space launch cost compression and how to unlock private capital yields in satellite data analytics.';
      break;
    default:
      replayReason = 'Reviews the overall technology innovation dividends and the private-public collaborations needed to navigate social and economic changes.';
  }

  const replayRecommendation: ReplayRecommendation = {
    ...selectedReplay,
    reason: replayReason,
  };

  // 2b. Generate intro paragraph
  const roleIntros: Record<string, string> = {
    'Management Level': `${name}, as a leader navigating strategic decisions, the AIC 2026 surfaced inflection points that matter most to long-horizon capital allocation — from demographic resource scarcity to algorithmic trust erosion in financial markets.`,
    'Product Specialist: Fixed Income': `${name}, fixed income markets are entering a structurally higher-rate regime. The AIC highlighted supply-side inflation persistence, private credit resilience, and Hormuz-linked FX volatility that directly shapes duration and allocation decisions.`,
    'Product Specialist: Equity Funds': `${name}, equity alpha will increasingly come from active EM dispersion plays and screening out AI capex overreach. The AIC outlined exactly where localized supply-chain winners and China's reflation trajectory intersect.`,
    'Product Specialist: Equities': `${name}, equity alpha will increasingly come from active EM dispersion plays and screening out AI capex overreach. The AIC outlined where China's deflation exit and memory semiconductor bottlenecks create concrete stock-level opportunities.`,
    'Product Specialist: Private Assets': `${name}, the AIC 2026 mapped three structural PE themes — AI power infrastructure, space data economy, and nuclear SMR energy — that are attracting concentrated institutional inflows into private asset strategies.`,
    'Product Specialist: Hedge Funds': `${name}, the AIC 2026 provided a toolkit for the current regime: contrarian bottom-entry discipline, EM tactical overlays, and post-quantum cybersecurity hedging as structural long/short themes.`,
    'Product Specialist: Structured Products': `${name}, the conference crystallized where structured payoffs are anchored — memory semiconductor bandwidth constraints, China LLM cost efficiency, and quantum engineering bottlenecks are the key variables to price.`,
    'Investment Consultant': `${name}, the AIC reinforced that advisory differentiation runs on communication, disciplined GP selection, and helping clients anchor to long-term demographic and resource realities over short-term noise.`,
    'Data Analytics': `${name}, the AIC surfaced three high-signal data frontiers — satellite geospatial analytics, multimodal model cost compression, and agentic AI credibility systems — that map directly to modern analytics infrastructure.`,
    'Sales': `${name}, the AIC highlighted that offline trust networks, energy resilience thematics, and persuasive GP-aligned communication are the differentiating sales levers in a fragmented attention environment.`,
  };

  const intro = roleIntros[role] || `${name}, the UBS AIC 2026 provided a sharp view of global capital cycles, AI's structural impact on markets, and the geopolitical forces reshaping energy and monetary policy over the next decade.`;

  // 3. Synthesize exactly 3 takeaways based on role
  const takeaways: Takeaway[] = [];

  if (role === 'Management Level') {
    takeaways.push(
      {
        title: 'Demographic Scarcity & Allocation',
        desc: 'A global population bust 30 years in the making is driving structural labor shortages. This, paired with physical resource shortages, requires long-term capital reallocation.',
        improvement: 'Guides strategic cross-asset resource positioning and offsets long-term labor cost structures.',
        sourceSessionId: 'd2-wisdom-investing'
      },
      {
        title: 'AI Capex & Margin Squeezes',
        desc: 'Hyperscaler capital expenditure is compounding rapidly, forming infrastructure bubble indicators. Aside from hardware suppliers, AI will become a baseline business cost that compresses corporate margins.',
        improvement: 'Protects capital allocation by shifting investments into specific utility use-cases with concrete operational ROI.',
        sourceSessionId: 'd2-wisdom-investing'
      },
      {
        title: 'Algorithmic Erosion of Social Trust',
        desc: 'Financial markets rely on inter-personal trust pools. Social media engagement loops optimize for hate and polarization, actively decaying trust, requiring AI legal personhood bans.',
        improvement: 'Improves risk profiling by treating institutional trust decay as a structural corporate risk metric.',
        sourceSessionId: 'd2-dataism'
      }
    );
  } else if (role === 'Product Specialist: Fixed Income') {
    takeaways.push(
      {
        title: 'Structural Inflation Regime Shifts',
        desc: 'US inflation has consistently run above targets for 6 years. Structural supply-side shifts indicate that higher baseline inflation will persist, creating monetary policy transition disruption.',
        improvement: 'Enhances fixed-income duration models by pricing in higher-for-longer baseline rates.',
        sourceSessionId: 'd1-monetary-policy'
      },
      {
        title: 'Private Credit Cash-Flow Focus',
        desc: 'Institutional capital continues to flow heavily into direct lending. This market remains insulated from speculative AI valuations, focusing strictly on cash-flow underwriting.',
        improvement: 'Directs fund selection toward specialty finance and credit underwriting with predictable yields.',
        sourceSessionId: 'd2-private-capital'
      },
      {
        title: 'Treasury Capacity & Hormuz FX Hedges',
        desc: 'The Strait of Hormuz remains a massive global energy leverage point, leaving EM currencies like the Indian Rupee vulnerable, while de-dollarization hurdles preserve US Treasury demand.',
        improvement: 'Signals when to trigger FX hedges on INR and manage liquid Treasury asset reserves.',
        sourceSessionId: 'd1-middle-east-energy'
      }
    );
  } else if (role === 'Product Specialist: Equity Funds' || role === 'Product Specialist: Equities') {
    takeaways.push(
      {
        title: 'Emerging Market return dispersion',
        desc: 'EM equities show high dispersion rather than uniform cycles. Specific localized winners—like A-shares (ChiNext making up ~25% of focus), SK Hynix, and non-consumer electronics—should lead.',
        improvement: 'Enables active stock-selection to outperform broad indices by targeting localized supply-chain winners.',
        sourceSessionId: 'd2-regional-strategy'
      },
      {
        title: 'China Deflation Exit by 2026',
        desc: 'Corporate-level capex declines have reversed. China is projected to exit deflation by 2026, echoing Japan\'s pivotal turn in 2022 and creating room for Renminbi appreciation.',
        improvement: 'Informs buy entry timings in undervalued Chinese equities ahead of the reflation pricing.',
        sourceSessionId: 'd2-china-economy'
      },
      {
        title: 'AI Margin Compression Screening',
        desc: 'Corporate AI implementation is an efficiency play. Avoid generic tech baskets; screen stocks based on real pricing power and margins to survive the capex bubble correction.',
        improvement: 'Screens out overvalued tech equities lacking direct monetization and operational cash flows.',
        sourceSessionId: 'd2-wisdom-investing'
      }
    );
  } else if (role === 'Product Specialist: Private Assets') {
    takeaways.push(
      {
        title: 'Digital & Energy PE Infrastructure',
        desc: 'Private equity inflows are concentrating on AI power grids, digital economy infrastructure, and logistics supply lines, overseen directly at the portfolio CEO level.',
        improvement: 'Aligns infrastructure project underwriting with structural grid capacity and e-commerce growth patterns.',
        sourceSessionId: 'd2-private-capital'
      },
      {
        title: 'Space launch cost compression',
        desc: 'Satellite launch costs fell 90% in a decade, creating a high-yield three-tier economic stack. SpaceX holds a monopoly, while China emerges as a key sovereign launch competitor.',
        improvement: 'Flags early-stage venture windows in satellite broadband, maritime analytics, and ground infra.',
        sourceSessionId: 'd1-space-frontier'
      },
      {
        title: 'Nuclear Energy Security SMRs',
        desc: 'Energy resilience is driving European and global policy. Nuclear energy has strong 5-10 year prospects, with Small Modular Reactors (SMRs) approaching commercial viability.',
        improvement: 'Guides project-finance deployments into SMR developers and secure energy transition infrastructure.',
        sourceSessionId: 'd1-middle-east-energy'
      }
    );
  } else if (role === 'Product Specialist: Hedge Funds') {
    takeaways.push(
      {
        title: 'Contrarian Bottom Entry Policies',
        desc: 'Asymmetric returns will come from contrarian bets against extreme downward extrapolations. Successful funds enforce strict policies to scale back in rather than trying to call the absolute bottom.',
        improvement: 'Establishes structured buying rules to capture value at extreme lows without timing risks.',
        sourceSessionId: 'd2-wisdom-investing'
      },
      {
        title: 'Tactical EM Overlays & Gold spillovers',
        desc: 'Geopolitical energy premium hikes from the Strait of Hormuz will trigger EM return dispersion. Hedging INR and long positions on AUD, RMB, and Gold are key trades.',
        improvement: 'Structures tactical FX and precious metal overlays to offset global inflationary shocks.',
        sourceSessionId: 'd2-regional-strategy'
      },
      {
        title: 'Quantum Decryption Security Hedging',
        desc: 'The "harvest now, decrypt later" threat is active. Adversaries intercept data today to decrypt once quantum computing is online. Selecting quantum-resistant assets is key.',
        improvement: 'Supports shorting companies lacking post-quantum transition plans and going long on post-quantum standards leaders.',
        sourceSessionId: 'd2-cybersecurity'
      }
    );
  } else if (role === 'Product Specialist: Structured Products') {
    takeaways.push(
      {
        title: 'Memory Semis Bandwidth Bottleneck',
        desc: 'AI training bottlenecks have shifted from compute to memory bandwidth. HBM is permanent, but expanding KV caches are forcing LLMs to utilize NAND flash.',
        improvement: 'Informs structured yield notes linked to memory manufacturers (like SK Hynix) and flash suppliers.',
        sourceSessionId: 'd1-memory-semis'
      },
      {
        title: 'Chinese LLM cost efficiency',
        desc: 'Chinese developers spend only 1% of the Capex compared to US competitors, optimizing for multimodality and cheap client-device implementation.',
        improvement: 'Helps design structured baskets linked to highly efficient Chinese technology integrations.',
        sourceSessionId: 'd2-wave-intelligence'
      },
      {
        title: 'Quantum Engineering Bottlenecks',
        desc: 'Quantum computing and semiconductor scaling are limited by energy grids, cooling, and mechanical engineering talent, not just theoretical physics.',
        improvement: 'Aids in pricing structured indexes by accounting for engineering and grid latency bottlenecks.',
        sourceSessionId: 'd2-cybersecurity'
      }
    );
  } else if (role === 'Investment Consultant') {
    takeaways.push(
      {
        title: 'GP Selection Rules',
        desc: 'Prioritize general partners with proven long-term track records, fair and aligned fee structures, and career longevity that covers the fund investment life cycle.',
        improvement: 'Refines due-diligence screens for advisory clients selecting private equity and credit managers.',
        sourceSessionId: 'd1-global-capital'
      },
      {
        title: 'Persuasive Advisory Communication',
        desc: 'Technical credentials are standard; the ultimate advisory differentiator is communication—the ability to structure clear, persuasive arguments for clients.',
        improvement: 'Maintains higher client retention and assets under management by framing portfolio shifts with trust and clarity.',
        sourceSessionId: 'd1-global-capital'
      },
      {
        title: 'Strategic Demographics and Optimism',
        desc: 'Demographic population busts and resource scarcity are 20-30 year structural realities. Pessimism sounds smart, but compounding optimism is what secures client wealth.',
        improvement: 'Enables aligning generational family wealth plans with long-term resources and renewables.',
        sourceSessionId: 'd2-wisdom-investing'
      }
    );
  } else if (role === 'Data Analytics') {
    takeaways.push(
      {
        title: 'Satellite Space Data Analytics',
        desc: 'Launch cost compression is flooding orbits with sensors. The value lies in the data analytics layer, using AI to track wave shapes and environmental assets.',
        improvement: 'Directs the engineering of geospatial algorithms to track maritime freight and carbon indexes.',
        sourceSessionId: 'd1-space-frontier'
      },
      {
        title: 'Multimodal cost efficiency',
        desc: 'China\'s developers build models at 1% of the compute cost of US hyperscalers. Data formatting and architectural efficiency are the core drivers of ROI.',
        improvement: 'Reduces internal operational overhead by utilizing smaller, highly-tuned multimodal models.',
        sourceSessionId: 'd2-wave-intelligence'
      },
      {
        title: 'Agentic AI & Algorithmic Engagement',
        desc: 'Agentic AI represents the core system disruptor. Internal algorithms must prioritize data credibility over basic engagement triggers.',
        improvement: 'Guides the development of internal data retrieval systems that prioritize source factual truth.',
        sourceSessionId: 'd2-dataism'
      }
    );
  } else if (role === 'Sales') {
    takeaways.push(
      {
        title: 'Offline Client Trust Networks',
        desc: 'Financial markets run on trust pools. In a decentralized media environment dominated by engagement-engagement algorithms, Sales must rebuild offline trust networks.',
        improvement: 'Improves prospect conversion by hosting high-touch, trust-building offline events to address client anxiety.',
        sourceSessionId: 'd2-dataism'
      },
      {
        title: 'Energy Resilience Thematics',
        desc: 'Energy security is driving nuclear energy adoption, SMR commercialization, and clean premiums. Share these resilient structural trends with clients.',
        improvement: 'Equips client conversations with secular infrastructure opportunities that are insulated from short-term inflation volatility.',
        sourceSessionId: 'd1-middle-east-energy'
      },
      {
        title: 'Persuasive Communication & GP Alignment',
        desc: 'Persuasion is the key commercial skill. Ground client recommendations in proven GP track records and realistic expectations rather than short-term hype.',
        improvement: 'Builds long-term client credibility, aligning product pitches with actual manager capacities.',
        sourceSessionId: 'd1-global-capital'
      }
    );
  } else {
    // Default
    takeaways.push(
      {
        title: 'Market Cycle Wisdom',
        desc: 'Pessimism sounds smart, but long-term gains belong to optimists. Utilize disciplined policies to reallocate during downturns.',
        improvement: 'Maintains long-term investment discipline.',
        sourceSessionId: 'd2-wisdom-investing'
      },
      {
        title: 'AI Operational Efficiency',
        desc: 'AI is an efficiency play. Focus allocations on companies using AI to expand actual margins rather than hype.',
        improvement: 'Aids in corporate productivity screening.',
        sourceSessionId: 'd2-wisdom-investing'
      },
      {
        title: 'Multipolar Energy Transitions',
        desc: 'National energy resilience is pushing uranium and SMR nuclear solutions into commercial viability.',
        improvement: 'Identifies secure clean energy infrastructure plays.',
        sourceSessionId: 'd1-middle-east-energy'
      }
    );
  }

  // 4. If a custom query produced strong session matches, override takeaways dynamically
  // A score >= 3 means at least a tag match or multiple bullet matches — meaningful signal.
  if (query !== '') {
    const queryWords = query.split(/\s+/).filter(w => w.length > 2);
    const strongMatches = sortedScored.filter(s => s.score >= 3);

    if (strongMatches.length > 0) {
      const queryTakeaways: Takeaway[] = strongMatches.slice(0, 3).map(({ session }) => {
        // Find the single bullet most relevant to the query words
        let bestBullet = session.bullets[0];
        let bestBulletScore = 0;
        session.bullets.forEach(b => {
          const bulletScore = queryWords.reduce((acc, w) => acc + (b.text.toLowerCase().includes(w) ? 1 : 0), 0);
          if (bulletScore > bestBulletScore) {
            bestBulletScore = bulletScore;
            bestBullet = b;
          }
        });

        return {
          title: shortenTitle(session.title),
          desc: bestBullet.text,
          improvement: queryImprovement(role, session.category),
          sourceSessionId: session.id,
        };
      });

      // If fewer than 3 strong query matches, fill remaining slots from role-based takeaways
      if (queryTakeaways.length < 3) {
        const usedIds = new Set(queryTakeaways.map(t => t.sourceSessionId));
        for (const tk of takeaways) {
          if (!usedIds.has(tk.sourceSessionId) && queryTakeaways.length < 3) {
            queryTakeaways.push(tk);
            usedIds.add(tk.sourceSessionId);
          }
        }
      }

      takeaways.splice(0, takeaways.length, ...queryTakeaways);
    }
  }

  // Generate Slack text
  const slackCopyText = `*UBS AIC Conference Takeaways for ${name}* (${role} Focus)
_${intro}_

*3 Key Takeaways:*
${takeaways.map((tk, idx) => `${idx + 1}. *${tk.title}*
   ${tk.desc}
   _What to think about next:_ ${tk.improvement}`).join('\n\n')}

*Recommended Replay Session to Watch:*
🎥 *"${replayRecommendation.title}"*
Speakers: ${replayRecommendation.speakers}
_Why watch:_ ${replayRecommendation.reason}

_Explore the full session notes at your personalized portal link._`;

  // Generate Email HTML
  const emailHtml = `<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
  <div style="border-bottom: 2px solid #E30613; padding-bottom: 15px; margin-bottom: 20px;">
    <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #E30613; letter-spacing: 1.5px;">UBS AIC Briefing</span>
    <h2 style="margin: 5px 0 0 0; color: #0f172a; font-size: 20px; font-weight: 800;">Personalized Takeaways for ${name}</h2>
    <p style="margin: 5px 0 0 0; font-size: 13px; color: #64748b; font-style: italic;">Focus: ${role}</p>
  </div>
  
  <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 25px;">${intro}</p>
  
  <h3 style="color: #0f172a; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 15px;">3 TAILORED TAKEAWAYS</h3>
  
  ${takeaways.map(tk => `
  <div style="margin-bottom: 20px; padding-left: 12px; border-left: 3px solid #E30613;">
    <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #0f172a; font-weight: bold;">${tk.title}</h4>
    <p style="margin: 0 0 6px 0; font-size: 13px; line-height: 1.5; color: #475569;">${tk.desc}</p>
    <p style="margin: 0; font-size: 12px; line-height: 1.4; color: #E30613; font-weight: 500;"><strong>What to think about next:</strong> ${tk.improvement}</p>
  </div>
  `).join('')}
  
  <h3 style="color: #0f172a; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 25px; margin-bottom: 15px;">RECOMMENDED REPLAY</h3>
  <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px; margin-bottom: 10px;">
    <h4 style="margin: 0 0 4px 0; font-size: 14px; color: #E30613;">${replayRecommendation.title}</h4>
    <p style="margin: 0 0 8px 0; font-size: 11px; color: #64748b;">Speakers: ${replayRecommendation.speakers}</p>
    <p style="margin: 0; font-size: 13px; line-height: 1.4; color: #475569;">${replayRecommendation.reason}</p>
  </div>
</div>`;

  return {
    title: `UBS AIC Custom Takeaways: ${name}`,
    intro,
    topTakeaways: takeaways,
    replayRecommendation,
    highlightedSessionIds,
    slackCopyText,
    emailHtml
  };
}
