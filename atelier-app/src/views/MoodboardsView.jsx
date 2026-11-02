import React, { useState } from 'react';
import { 
  Sun, 
  Eye
} from 'lucide-react';

export default function MoodboardsView() {
  const [selectedRender, setSelectedRender] = useState(null);

  const renders = [
    {
      id: "RND-01",
      title: "Villa Al-Manara — Double-Height Travertine Hall",
      project: "Villa Al-Manara Sanctuary",
      image: "/images/villa-interior.jpg",
      style: "Warm Minimalist & Biophilic Water Garden",
      lightingSpec: "2700K High-CRI 98 Cove Lighting + Integrated Sunken Reflective Pool Sunlight",
      materials: ["Honed Roman Travertine", "Pierre Frey Dedar Bouclé", "Hand-brushed Champagne Brass", "Calacatta Fireplace Marble"],
      architecturalIntent: "Monumental spatial volume balanced by soft tactile seating and expansive floor-to-ceiling motorized glazing framing the water reflections."
    },
    {
      id: "RND-02",
      title: "The Obsidian Penthouse — Master Sanctuary Suite",
      project: "The Obsidian Sky Penthouse",
      image: "/images/penthouse-suite.jpg",
      style: "Moody Contemporary & Fluted Smoked Oak",
      lightingSpec: "2400K Warm Dim Linear LED Headboard Recess + Low-Glare Narrow Beam Downlights",
      materials: ["Smoked Rift Oak Fluted Wall", "Silk Georgette Rug", "Cognac Saddle Leather", "Matte Polished Concrete"],
      architecturalIntent: "Intimate nocturnal sanctuary framing panoramic skyline vistas with acoustic slat wall paneling for superior acoustic privacy."
    },
    {
      id: "RND-03",
      title: "Al-Rawda Boutique Sanctuary — Monumental Atrium",
      project: "Al-Rawda Sanctuary Hotel & Spa",
      image: "/images/hotel-lobby.jpg",
      style: "Neo-Heritage Hospitality & Zen Indoor Garden",
      lightingSpec: "3000K Soft Indirect Ceiling Vaults + Micro-spotlights on Japanese Maple and Zen Gravel Bed",
      materials: ["Fluted Travertine Columns", "Sand-cast Patinated Bronze", "Bookmatched Arabescato Marble", "Artisan Terrazzo"],
      architecturalIntent: "Grand hotel arrival sequence marrying classical colonnades with organic sculptural bronze volumes and contemplative nature."
    },
    {
      id: "RND-04",
      title: "Casa Solaria — Cantilevered Cliffside Facade",
      project: "Casa Solaria Cliffside Villa",
      image: "/images/villa-facade.jpg",
      style: "Sculptural Mediterranean Limestone & Kinetic Glazing",
      lightingSpec: "Sunset Golden Hour Solar Alignment + Low-voltage Concealed Step & Landscape Accent Luminaires",
      materials: ["Portuguese Moleanos Limestone", "Bronze Anodized Mullions", "Clear Horizon Infinity Glazing", "Cascading Biophilic Terrace Flora"],
      architecturalIntent: "Dynamic stacked cantilever volumes extending into the ocean horizon with integrated exterior planter overhangs for microclimate cooling."
    }
  ];

  return (
    <div className="content-body">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <span className="view-pretitle">Ashara Visual Arts & 3D Lab</span>
          <h1 className="view-title">
            <span>3D Visualization Atelier & Concept Moodboards</span>
          </h1>
          <p className="view-desc">
            Photorealistic architectural ray-traced visualizations, lighting simulations, material moodboards, and spatial composition studies.
          </p>
        </div>
      </div>

      {/* Render Showcase Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '28px' }}>
        {renders.map((rnd) => (
          <div key={rnd.id} className="panel-card" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
            {/* Image Preview with Zoom Action */}
            <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
              <img 
                src={rnd.image} 
                alt={rnd.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(10,14,20,0.85) 100%)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '16px'
                }}
              >
                <span className="badge badge-gold">{rnd.id} • {rnd.project}</span>
                <button
                  onClick={() => setSelectedRender(rnd)}
                  className="action-icon-btn"
                  style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF' }}
                  title="Expand Full View"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>

            {/* Info Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>
                {rnd.title}
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                {rnd.architecturalIntent}
              </p>

              {/* Lighting Specs */}
              <div style={{ background: 'var(--bg-tertiary)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '12px' }}>
                <span style={{ color: 'var(--gold-bright)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <Sun size={13} /> Photometric & Lighting Simulation:
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{rnd.lightingSpec}</span>
              </div>

              {/* Material DNA Swatches */}
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
                  Material Palette:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {rnd.materials.map((mat, i) => (
                    <span key={i} className="badge badge-neutral" style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Render Inspection Modal */}
      {selectedRender && (
        <div className="modal-backdrop" onClick={() => setSelectedRender(null)}>
          <div className="modal-dialog" style={{ maxWidth: '1000px' }} onClick={e => e.stopPropagation()}>
            <div style={{ position: 'relative' }}>
              <img 
                src={selectedRender.image} 
                alt={selectedRender.title} 
                style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', background: '#000000', display: 'block' }} 
              />
              <button
                onClick={() => setSelectedRender(null)}
                className="action-icon-btn"
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.7)', color: '#FFFFFF' }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '24px', background: 'var(--bg-secondary)' }}>
              <span className="badge badge-gold">{selectedRender.project}</span>
              <h2 style={{ fontSize: '22px', color: 'var(--text-primary)', margin: '8px 0 4px 0' }}>{selectedRender.title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>{selectedRender.architecturalIntent}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
