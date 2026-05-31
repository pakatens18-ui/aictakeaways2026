import { useState, useMemo } from 'react';
import { synthesizeBriefing } from './utils/synthesizer';
import type { ColleagueProfile } from './utils/synthesizer';
import {
  Share2,
  ChevronDown,
  Check,
  Copy,
  Mail,
  MessageSquare,
  FileText,
  PlayCircle
} from 'lucide-react';

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

  const [showExportModal, setShowExportModal] = useState(false);
  const [exportTab, setExportTab] = useState<'slack' | 'email' | 'markdown'>('slack');
  const [copied, setCopied] = useState(false);

  const briefing = useMemo(() => synthesizeBriefing(profile), [profile]);

  const displayName = profile.name.trim() || 'You';

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const markdownText = `# Personal Takeaways: UBS Asia Investment Conference (AIC) 2026

* **Prepared For:** ${displayName}
* **Role:** ${profile.role}

---

## Overview
${briefing.intro}

## Recommended Replay
* **Session:** ${briefing.replayRecommendation.title}
* **Speakers:** ${briefing.replayRecommendation.speakers}
* **Why watch:** ${briefing.replayRecommendation.reason}

## Key Takeaways
${briefing.topTakeaways.map((tk, i) => `\n### 0${i + 1}. ${tk.title}\n${tk.desc}\n**How it improves your work:** ${tk.improvement}`).join('\n')}

---
*Synthesized from UBS AIC 2026 conference proceedings.*`;

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
      <main className="main-dashboard">
        <header className="dashboard-header">
          <div>
            <div className="header-eyebrow">UBS AIC 2026 — Tailored Briefing</div>
            <h2 className="dashboard-title">Takeaways for {displayName}</h2>
            <p className="dashboard-subtitle">
              Role: <strong>{profile.role}</strong>
            </p>
          </div>
          <div className="header-actions">
            <button onClick={() => window.print()} className="btn-secondary" title="Print or save as PDF">
              <FileText size={15} />
              Print PDF
            </button>
            <button onClick={() => setShowExportModal(true)} className="btn-primary">
              <Share2 size={15} />
              Share
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
          <div className="replay-title">{briefing.replayRecommendation.title}</div>
          <div className="replay-speakers">Speakers: {briefing.replayRecommendation.speakers}</div>
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
                    <strong>How it improves your work: </strong>{takeaway.improvement}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Export Modal */}
      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Share Takeaways for {displayName}</h3>
              <button className="btn-close" onClick={() => setShowExportModal(false)}>
                <ChevronDown size={20} style={{ transform: 'rotate(90deg)' }} />
              </button>
            </div>

            <div className="modal-body">
              <div className="export-tabs">
                <button className={`export-tab-btn ${exportTab === 'slack' ? 'active' : ''}`} onClick={() => setExportTab('slack')}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MessageSquare size={13} /> Slack / Teams
                  </span>
                </button>
                <button className={`export-tab-btn ${exportTab === 'email' ? 'active' : ''}`} onClick={() => setExportTab('email')}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Mail size={13} /> Email
                  </span>
                </button>
                <button className={`export-tab-btn ${exportTab === 'markdown' ? 'active' : ''}`} onClick={() => setExportTab('markdown')}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <FileText size={13} /> Markdown
                  </span>
                </button>
              </div>

              {exportTab === 'slack' && (
                <>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pre-formatted for Slack or Microsoft Teams.</p>
                  <div className="preview-container">{briefing.slackCopyText}</div>
                </>
              )}
              {exportTab === 'email' && (
                <>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Visual HTML email preview. Copy HTML to send via Outlook.</p>
                  <div className="preview-container rich-preview" dangerouslySetInnerHTML={{ __html: briefing.emailHtml }} />
                </>
              )}
              {exportTab === 'markdown' && (
                <>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Raw markdown for Notion, Confluence, or wikis.</p>
                  <div className="preview-container">{markdownText}</div>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowExportModal(false)}>Cancel</button>
              <button
                className="btn-primary"
                onClick={() => {
                  const text = exportTab === 'slack' ? briefing.slackCopyText
                    : exportTab === 'email' ? briefing.emailHtml
                    : markdownText;
                  handleCopyToClipboard(text);
                }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
