import React from 'react';
import { Mail } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/mockData';

export default function TeamView() {
  return (
    <div className="content-body">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <span className="view-pretitle">Ashara Practice Management</span>
          <h1 className="view-title">
            <span>Studio Team & Project Allocation</span>
          </h1>
          <p className="view-desc">
            Principal architects, senior interior designers, BIM managers, and 3D visualizers workload and project assignments.
          </p>
        </div>
      </div>

      {/* Team Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {TEAM_MEMBERS.map((member) => (
          <div key={member.id} className="panel-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div className="user-avatar-circle" style={{ width: '48px', height: '48px', fontSize: '16px' }}>
                {member.initials}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', margin: 0 }}>
                  {member.name}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--gold-bright)' }}>
                  {member.role}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              {member.specialty}
            </p>

            {/* Capacity Meter */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Studio Capacity</span>
                <span style={{ fontWeight: 700, color: member.capacityPct > 85 ? 'var(--status-warning)' : 'var(--status-success)' }}>
                  {member.capacityPct}%
                </span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ 
                    width: `${member.capacityPct}%`,
                    background: member.capacityPct > 85 ? 'var(--status-warning)' : 'var(--gold-bright)' 
                  }} 
                />
              </div>
            </div>

            {/* Bottom Meta */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>{member.assignedProjects} Commissions • {member.activeTasks} Tasks</span>
              <a href={`mailto:${member.email}`} className="action-icon-btn" style={{ width: '30px', height: '30px' }}>
                <Mail size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
