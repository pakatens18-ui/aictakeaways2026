import { useState, useMemo, useRef } from 'react';
import html2canvas from 'html2canvas';
import { synthesizeBriefing } from './utils/synthesizer';
import type { ColleagueProfile } from './utils/synthesizer';
import { PlayCircle, ExternalLink, Camera } from 'lucide-react';

const ROLE_OPTIONS = [
  'Management Level',
  'Product Specialist: Fixed Income',
  'Product Specialist: Equity Funds',
  'Product Specialist: Private Assets',
  'Product Specialist: Hedge Funds',
  'Product Specialist: Equities',
  'Product Specialist: Structured Products',
  'Investment Consultant',
  'Data Analytics',
  'Sales',
];

export default function App() {
  const [profile, setProfile] = useState<ColleagueProfile>({
    name: '',
    role: 'Management Level',
    customQuery: '',
    format: 'summary',
  });

  const [savingPhoto, setSavingPhoto] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const briefing = useMemo(() => synthesizeBriefing(profile), [profile]);

  const displayName = profile.name.trim() || 'You';

  const handleSavePhoto = async () => {
    if (!captureRef.current) return;
    setSavingPhoto(true);
    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        width: 390,
        windowWidth: 390,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `aic2026-takeaways-${(profile.name || 'briefing').toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setSavingPhoto(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <span className="logo-ubs">UBS</span>
          <span className="logo-subtitle">Asia Investment Conference 2026</span>
          <span className="logo-title">Personal Takeaway Briefing</span>
        </div>

        <div className="config-group">
          <label className="config-label" htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            className="input-text"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your name..."
          />
        </div>

        <div className="config-group">
          <label className="config-label" htmlFor="role">Your Role</label>
          <select
            id="role"
            className="select-input"
            value={profile.role}
            onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
          >
            {ROLE_OPTIONS.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="config-group">
          <label className="config-label" htmlFor="query">Topics that interest you</label>
          <textarea
            id="query"
            className="input-text"
            rows={3}
            style={{ resize: 'none', fontFamily: 'inherit' }}
            value={profile.customQuery}
            onChange={(e) => setProfile(prev => ({ ...prev, customQuery: e.target.value }))}
            placeholder="e.g. semiconductors, China reflation, space data..."
          />
        </div>
      </aside>

      {/* Main */}
      <main className="main-dashboard" ref={captureRef}>
        <header className="dashboard-header">
          <div>
            <div className="header-eyebrow">UBS AIC 2026 — Tailored Briefing</div>
            <h2 className="dashboard-title">Takeaways for {displayName}</h2>
            <p className="dashboard-subtitle">
              Role: <strong>{profile.role}</strong>
            </p>
          </div>
          <div className="header-actions">
            <button onClick={handleSavePhoto} className="btn-primary" title="Save as image" disabled={savingPhoto}>
              <Camera size={15} />
              {savingPhoto ? 'Saving…' : 'Save Photo'}
            </button>
          </div>
        </header>

        {/* Intro */}
        <p className="synthesis-intro">"{briefing.intro}"</p>

        {/* Recommended Replay */}
        <div className="replay-card">
          <div className="replay-eyebrow">
            <PlayCircle size={14} />
            Recommended Replay to Watch
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <div className="replay-title">{briefing.replayRecommendation.title}</div>
              <div className="replay-speakers">Speakers: {briefing.replayRecommendation.speakers}</div>
            </div>
            {briefing.replayRecommendation.url && (
              <a
                href={briefing.replayRecommendation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ textDecoration: 'none', flexShrink: 0 }}
              >
                <ExternalLink size={14} />
                Watch Replay
              </a>
            )}
          </div>
          <div className="replay-reason">
            <strong>Why watch: </strong>{briefing.replayRecommendation.reason}
          </div>
        </div>

        {/* Takeaways */}
        <div>
          <div className="section-label">Key Tailored Takeaways</div>
          <div className="takeaways-grid">
            {briefing.topTakeaways.map((takeaway, idx) => (
              <div key={idx} className="takeaway-item">
                <div className="takeaway-num">0{idx + 1}</div>
                <div className="takeaway-title">{takeaway.title}</div>
                <p className="takeaway-desc">{takeaway.desc}</p>
                {takeaway.improvement && (
                  <div className="takeaway-improvement">
                    <strong>What to think about next: </strong>{takeaway.improvement}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
