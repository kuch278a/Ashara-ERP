import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function NewProjectModal({ onClose, onSubmit, clients }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Luxury Residential Villa',
    location: '',
    area: '',
    client: clients[0]?.name || '',
    totalBudget: 5000000,
    designFee: 400000,
    stage: 'Concept & Moodboards',
    progress: 10,
    leadArchitect: 'Sarah Al-Mansoor',
    targetHandover: '2027-06-30',
    image: '/images/villa-interior.jpg',
    health: 'On Track',
    aesthetic: 'Warm Travertine Minimalist',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newProject = {
      ...formData,
      id: `PRJ-2026-00${Math.floor(Math.random() * 900 + 100)}`,
      invoicedAmount: 0,
      phases: [
        { name: "Concept & Moodboards", status: "In Progress", date: "Now" },
        { name: "Schematic & 3D Visualization", status: "Pending", date: "Next Month" },
        { name: "Technical BIM & CAD Detailing", status: "Pending", date: "+3 Months" },
        { name: "BOQ & Procurement", status: "Pending", date: "+5 Months" },
        { name: "Site Fit-Out & Execution", status: "Pending", date: "+8 Months" },
        { name: "Snagging & Handover", status: "Pending", date: formData.targetHandover }
      ],
      roomSchedule: ["Grand Foyer", "Main Salon", "Master Sanctuary", "Terrace Suite"]
    };

    onSubmit(newProject);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Commission New Architectural Project</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Project Title / Residence Name</label>
              <input
                type="text"
                required
                placeholder="e.g. The Elysium Coastal Estate"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Typology</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="form-select"
                >
                  <option value="Luxury Residential Villa">Luxury Residential Villa</option>
                  <option value="Ultra-Luxury Penthouse">Ultra-Luxury Penthouse</option>
                  <option value="Hospitality & Wellness Resort">Hospitality & Wellness Resort</option>
                  <option value="Boutique Commercial HQ">Boutique Commercial HQ</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Client Principal</label>
                <select
                  value={formData.client}
                  onChange={e => setFormData({ ...formData, client: e.target.value })}
                  className="form-select"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Location / Sector</label>
                <input
                  type="text"
                  placeholder="e.g. Palm Jumeirah, Frond N"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Built Area</label>
                <input
                  type="text"
                  placeholder="e.g. 1,200 m² / 12,900 sq ft"
                  value={formData.area}
                  onChange={e => setFormData({ ...formData, area: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Total Commission Budget ($)</label>
                <input
                  type="number"
                  value={formData.totalBudget}
                  onChange={e => setFormData({ ...formData, totalBudget: Number(e.target.value) })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ashara Design & BIM Fee ($)</label>
                <input
                  type="number"
                  value={formData.designFee}
                  onChange={e => setFormData({ ...formData, designFee: Number(e.target.value) })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Lead Architect</label>
                <select
                  value={formData.leadArchitect}
                  onChange={e => setFormData({ ...formData, leadArchitect: e.target.value })}
                  className="form-select"
                >
                  <option value="Sarah Al-Mansoor">Sarah Al-Mansoor (Principal)</option>
                  <option value="Julian Vance">Julian Vance (Senior)</option>
                  <option value="Dr. Omar Farooq">Dr. Omar Farooq (Hospitality Lead)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Handover</label>
                <input
                  type="date"
                  value={formData.targetHandover}
                  onChange={e => setFormData({ ...formData, targetHandover: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Aesthetic & Material Identity</label>
              <input
                type="text"
                placeholder="e.g. Warm Travertine Minimalist with Smoked Bronze & Calacatta Oro"
                value={formData.aesthetic}
                onChange={e => setFormData({ ...formData, aesthetic: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Visual Inspiration Cover</label>
              <select
                value={formData.image}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
                className="form-select"
              >
                <option value="/images/villa-interior.jpg">Villa Interior — Honed Travertine & Water Courtyard</option>
                <option value="/images/penthouse-suite.jpg">Obsidian Penthouse — Smoked Oak & Skyline</option>
                <option value="/images/hotel-lobby.jpg">Hotel Lobby — Monumental Fluted Columns & Zen Tree</option>
                <option value="/images/villa-facade.jpg">Modern Facade — Cantilevered Balconies & Sunset Pool</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Architectural Brief & Description</label>
              <textarea
                rows={3}
                placeholder="Provide client design brief, spatial program, and engineering requirements..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Sparkles size={16} />
              <span>Initialize Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
