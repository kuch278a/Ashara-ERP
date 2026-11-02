import React from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  FileCode, 
  Plus, 
  ArrowRight
} from 'lucide-react';

export default function CrmPipelineView({ 
  opportunities, 
  onOpenNewOpportunity, 
  onUpdateOpportunityStage,
  onOpenDocTypeInspector 
}) {

  const stages = [
    'Prospecting',
    'Concept Presentation',
    'Tender Submission',
    'Contract Negotiation',
    'Closed Won'
  ];

  const totalPipeline = opportunities.reduce((sum, opp) => sum + (opp.opportunity_amount || 0), 0);
  const weightedPipeline = opportunities.reduce((sum, opp) => sum + ((opp.opportunity_amount || 0) * (opp.probability || 50) / 100), 0);
  const wonDeals = opportunities.filter(opp => opp.stage === 'Closed Won');

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const handleAdvanceStage = (oppId, currentStage) => {
    const currentIdx = stages.indexOf(currentStage);
    if (currentIdx < stages.length - 1) {
      onUpdateOpportunityStage(oppId, stages[currentIdx + 1]);
    }
  };

  return (
    <div className="content-body">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="view-pretitle">Ashara Atelier Commercial Growth</span>
            <span className="badge badge-gold" style={{ fontSize: '10px' }}>ERPNext CRM Module</span>
          </div>
          <h1 className="view-title">
            <span>High-Value Tenders, Proposals & Deal Pipeline</span>
          </h1>
          <p className="view-desc">
            Directly mapped to ERPNext <code>Opportunity</code> & <code>Lead</code> DocTypes. Track multimillion-dollar royal villa bids, luxury hospitality tenders, and stage probabilities.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="btn-secondary" 
            onClick={() => onOpenDocTypeInspector('opportunity')}
            title="Inspect ERPNext CRM schema"
          >
            <FileCode size={16} />
            <span>DocType Schema</span>
          </button>
          <button className="btn-primary" onClick={onOpenNewOpportunity}>
            <Plus size={16} />
            <span>New Opportunity</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Gross Opportunity Pipeline</span>
            <Briefcase size={18} style={{ color: 'var(--gold-bright)' }} />
          </div>
          <div className="metric-value">{formatCurrency(totalPipeline)}</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{opportunities.length} Active Luxury Opportunities</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Weighted Revenue Forecast</span>
            <TrendingUp size={18} style={{ color: 'var(--status-success)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-success)' }}>{formatCurrency(weightedPipeline)}</div>
          <span style={{ fontSize: '11px', color: 'var(--status-success)' }}>Probability-adjusted commercial pipeline</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Tender Win Conversion</span>
            <CheckCircle2 size={18} style={{ color: 'var(--gold-bright)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--gold-bright)' }}>
            {Math.round((wonDeals.length / (opportunities.length || 1)) * 100)}%
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {wonDeals.length} Won of {opportunities.length} Total Tenders
          </span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Average Commission Ticket</span>
            <DollarSign size={18} style={{ color: 'var(--status-info)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-info)' }}>
            {formatCurrency(opportunities.length > 0 ? totalPipeline / opportunities.length : 0)}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ultra-high net-worth estates</span>
        </div>
      </div>

      {/* Pipeline Kanban Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(280px, 1fr))', gap: '16px', overflowX: 'auto', paddingBottom: '20px' }}>
        {stages.map(stageName => {
          const stageOpps = opportunities.filter(o => o.stage === stageName);
          const stageTotal = stageOpps.reduce((s, o) => s + (o.opportunity_amount || 0), 0);

          return (
            <div 
              key={stageName}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '480px'
              }}
            >
              {/* Column Header */}
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.015)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {stageName}
                  </span>
                  <span className="badge badge-neutral" style={{ fontSize: '10.5px' }}>
                    {stageOpps.length}
                  </span>
                </div>
                <span style={{ fontSize: '11.5px', color: 'var(--gold-bright)', fontWeight: '600', display: 'block', marginTop: '4px' }}>
                  {formatCurrency(stageTotal)}
                </span>
              </div>

              {/* Cards in Column */}
              <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
                {stageOpps.map(opp => (
                  <div 
                    key={opp.id}
                    className="panel-card"
                    style={{
                      margin: 0,
                      padding: '14px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div>
                      <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                        {opp.opportunity_type}
                      </span>
                      <h4 style={{ margin: '6px 0 2px 0', fontSize: '14.5px', color: 'var(--text-primary)' }}>
                        {opp.party_name}
                      </h4>
                      <code style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{opp.id}</code>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--gold-bright)' }}>
                        {formatCurrency(opp.opportunity_amount)}
                      </span>
                      <span style={{ fontSize: '11.5px', color: 'var(--status-success)', fontWeight: '600' }}>
                        {opp.probability}% win prob
                      </span>
                    </div>

                    <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {opp.description}
                    </p>

                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <span>Closing: {opp.expected_closing}</span>
                      {stageName !== 'Closed Won' && (
                        <button
                          className="btn-secondary btn-sm"
                          style={{ padding: '3px 8px', fontSize: '10.5px' }}
                          onClick={() => handleAdvanceStage(opp.id, opp.stage)}
                          title="Advance to next pipeline stage"
                        >
                          <span>Advance</span>
                          <ArrowRight size={11} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {stageOpps.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    No opportunities in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
