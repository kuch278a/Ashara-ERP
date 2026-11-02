import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Plus, 
  Search
} from 'lucide-react';

export default function ClientsView({ clients, projects, onOpenNewClient }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.stylePreference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="content-body">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <span className="view-pretitle">Ashara Client Relations</span>
          <h1 className="view-title">
            <span>Client Portfolios & Design Briefs</span>
          </h1>
          <p className="view-desc">
            VIP client relationship management, confidential design briefs, aesthetic stylings, and cumulative lifetime commissions.
          </p>
        </div>
        <div>
          <button className="btn-primary" onClick={onOpenNewClient}>
            <Plus size={16} />
            <span>Onboard Client</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="filter-bar" style={{ marginBottom: '24px' }}>
        <Search size={16} style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Filter by client name, typology, city, or aesthetic style..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '13px' }}
        />
      </div>

      {/* Clients Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
        {filteredClients.map((client) => {
          const clientProjects = projects.filter(p => client.activeProjects?.includes(p.id));

          return (
            <div key={client.id} className="panel-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-gold" style={{ fontSize: '10.5px' }}>{client.type}</span>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', margin: '8px 0 2px 0' }}>
                    {client.name}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> {client.city}
                  </div>
                </div>
                <span className="badge badge-neutral">{client.status}</span>
              </div>

              {/* Aesthetic Preference Box */}
              <div style={{ background: 'var(--bg-tertiary)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '11px', color: 'var(--gold-bright)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Aesthetic DNA & Stylistic Intent
                </span>
                <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {client.stylePreference}
                </p>
              </div>

              {/* Active Commissions */}
              <div>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Commissioned Projects:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {clientProjects.map(cp => (
                    <span key={cp.id} className="badge badge-neutral" style={{ color: 'var(--text-primary)' }}>
                      {cp.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lifetime Value & Contacts */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Lifetime Contract Value</span>
                  <strong style={{ fontSize: '15px', color: 'var(--gold-bright)' }}>{formatCurrency(client.lifetimeValue)}</strong>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href={`mailto:${client.email}`} className="action-icon-btn" title={client.email}>
                    <Mail size={15} />
                  </a>
                  <a href={`tel:${client.phone}`} className="action-icon-btn" title={client.phone}>
                    <Phone size={15} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
