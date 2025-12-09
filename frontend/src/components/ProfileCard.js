import React, { useState } from 'react';
import './ProfileCard.css';
import './ProfileCardATS.css';

const ProfileCard = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: data.personal_info.name,
    bio: data.personal_info.bio || '',
    location: data.personal_info.location || '',
    company: data.personal_info.company || '',
    email: data.social_links.email || '',
    website: data.social_links.website || '',
    twitter: data.social_links.twitter || '',
    phone: '',
    title: '',
    summary: '',
    experience: [],
    education: [],
    certifications: [],
    skills: [],
  });

  const { personal_info, social_links, statistics, languages, contributions, top_repositories } = data;

  const handleEdit = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayEdit = (field, index, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field, defaultValue) => {
    setEditedData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  const removeArrayItem = (field, index) => {
    setEditedData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
  };

  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': '#f1e05a',
      'Python': '#3572A5',
      'Java': '#b07219',
      'TypeScript': '#2b7489',
      'C++': '#f34b7d',
      'C': '#555555',
      'C#': '#178600',
      'PHP': '#4F5D95',
      'Ruby': '#701516',
      'Go': '#00ADD8',
      'Swift': '#ffac45',
      'Kotlin': '#F18E33',
      'Rust': '#dea584',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
    };
    return colors[language] || '#cccccc';
  };

  return (
    <div className="profile-card ats-cv">
      {/* Edit Button */}
      <div className="edit-controls no-print">
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className={`edit-button ${isEditing ? 'editing' : ''}`}
        >
          {isEditing ? '✓ Kaydet' : '✏️ Düzenle'}
        </button>
      </div>

      {/* ATS CV Header */}
      <div className="cv-header">
        <div className="cv-header-content">
          <div className="cv-avatar">
            <img src={personal_info.avatar_url} alt={editedData.name} />
          </div>
          <div className="cv-personal-info">
            {isEditing ? (
              <input
                type="text"
                value={editedData.name}
                onChange={(e) => handleEdit('name', e.target.value)}
                className="editable-input cv-name-input"
                placeholder="Ad Soyad"
              />
            ) : (
              <h1 className="cv-name">{editedData.name}</h1>
            )}
            {isEditing ? (
              <input
                type="text"
                value={editedData.title}
                onChange={(e) => handleEdit('title', e.target.value)}
                className="editable-input cv-title-input"
                placeholder="Unvan (örn: Senior Software Developer)"
              />
            ) : (
              editedData.title && <h2 className="cv-title">{editedData.title}</h2>
            )}
            <div className="cv-contact">
              {isEditing ? (
                <>
                  <input
                    type="email"
                    value={editedData.email}
                    onChange={(e) => handleEdit('email', e.target.value)}
                    className="editable-input cv-contact-input"
                    placeholder="email@example.com"
                  />
                  <input
                    type="tel"
                    value={editedData.phone}
                    onChange={(e) => handleEdit('phone', e.target.value)}
                    className="editable-input cv-contact-input"
                    placeholder="+90 XXX XXX XX XX"
                  />
                  <input
                    type="text"
                    value={editedData.location}
                    onChange={(e) => handleEdit('location', e.target.value)}
                    className="editable-input cv-contact-input"
                    placeholder="Şehir, Ülke"
                  />
                </>
              ) : (
                <>
                  {editedData.email && <span>📧 {editedData.email}</span>}
                  {editedData.phone && <span>📱 {editedData.phone}</span>}
                  {editedData.location && <span>📍 {editedData.location}</span>}
                </>
              )}
              {social_links.github && <span>🐙 {personal_info.username}</span>}
              {editedData.website && <span>🌐 {editedData.website}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="cv-section">
        <h3 className="cv-section-title">ÖZET</h3>
        {isEditing ? (
          <textarea
            value={editedData.summary || editedData.bio}
            onChange={(e) => handleEdit('summary', e.target.value)}
            className="editable-input cv-summary-input"
            placeholder="Profesyonel özet yazınız (2-3 cümle)"
            rows="3"
          />
        ) : (
          <p className="cv-summary">{editedData.summary || editedData.bio}</p>
        )}
      </div>

      {/* Technical Skills */}
      <div className="cv-section">
        <h3 className="cv-section-title">TEKNİK YETKİNLİKLER</h3>
        <div className="cv-skills-grid">
          <div className="cv-skill-category">
            <h4 className="cv-skill-cat-title">Programlama Dilleri</h4>
            <div className="cv-skill-items">
              {languages.slice(0, 8).map((lang, index) => (
                <span key={index} className="cv-skill-tag">
                  {lang.language}
                </span>
              ))}
            </div>
          </div>
          {isEditing && (
            <div className="cv-skill-category">
              <h4 className="cv-skill-cat-title">Diğer Yetenekler</h4>
              <input
                type="text"
                value={editedData.skills.join(', ')}
                onChange={(e) => handleEdit('skills', e.target.value.split(',').map(s => s.trim()))}
                className="editable-input"
                placeholder="Docker, Kubernetes, AWS (virgülle ayırın)"
              />
            </div>
          )}
          {!isEditing && editedData.skills.length > 0 && (
            <div className="cv-skill-category">
              <h4 className="cv-skill-cat-title">Diğer Yetenekler</h4>
              <div className="cv-skill-items">
                {editedData.skills.map((skill, index) => (
                  <span key={index} className="cv-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Work Experience */}
      <div className="cv-section">
        <h3 className="cv-section-title">İŞ DENEYİMİ</h3>
        {isEditing && (
          <button 
            onClick={() => addArrayItem('experience', { company: '', position: '', startDate: '', endDate: '', description: '' })}
            className="add-button"
          >
            + İş Deneyimi Ekle
          </button>
        )}
        {editedData.experience.length === 0 && !isEditing && editedData.company && (
          <div className="cv-experience-item">
            <div className="cv-exp-header">
              <div>
                <h4 className="cv-exp-position">Developer</h4>
                <p className="cv-exp-company">{editedData.company}</p>
              </div>
              <span className="cv-exp-date">Güncel</span>
            </div>
            <p className="cv-exp-desc">
              {statistics.public_repos} açık kaynak proje geliştirme. 
              {contributions.stats.total_commits} commit, {contributions.stats.PullRequestEvent} pull request katkısı.
            </p>
          </div>
        )}
        {editedData.experience.map((exp, index) => (
          <div key={index} className="cv-experience-item">
            {isEditing ? (
              <>
                <div className="cv-exp-edit">
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleArrayEdit('experience', index, { ...exp, position: e.target.value })}
                    className="editable-input"
                    placeholder="Pozisyon"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleArrayEdit('experience', index, { ...exp, company: e.target.value })}
                    className="editable-input"
                    placeholder="Şirket"
                  />
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => handleArrayEdit('experience', index, { ...exp, startDate: e.target.value })}
                    className="editable-input"
                    placeholder="Başlangıç (örn: Ocak 2020)"
                  />
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => handleArrayEdit('experience', index, { ...exp, endDate: e.target.value })}
                    className="editable-input"
                    placeholder="Bitiş (Güncel / Haziran 2023)"
                  />
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleArrayEdit('experience', index, { ...exp, description: e.target.value })}
                    className="editable-input"
                    placeholder="İş tanımı ve başarılar"
                    rows="3"
                  />
                  <button onClick={() => removeArrayItem('experience', index)} className="remove-button">
                    Kaldır
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="cv-exp-header">
                  <div>
                    <h4 className="cv-exp-position">{exp.position}</h4>
                    <p className="cv-exp-company">{exp.company}</p>
                  </div>
                  <span className="cv-exp-date">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="cv-exp-desc">{exp.description}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Notable Projects */}
      <div className="cv-section">
        <h3 className="cv-section-title">ÖNE ÇIKAN PROJELER</h3>
        {top_repositories.slice(0, 4).map((repo, index) => (
          <div key={index} className="cv-project-item">
            <div className="cv-project-header">
              <h4 className="cv-project-name">{repo.name}</h4>
              <div className="cv-project-stats">
                <span>⭐ {repo.stars}</span>
                <span>🍴 {repo.forks}</span>
              </div>
            </div>
            {repo.description && (
              <p className="cv-project-desc">{repo.description}</p>
            )}
            {repo.topics && repo.topics.length > 0 && (
              <div className="cv-project-techs">
                <strong>Teknolojiler:</strong> {repo.topics.join(', ')}
              </div>
            )}
            {repo.language && (
              <div className="cv-project-lang">
                <strong>Ana Dil:</strong> {repo.language}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="cv-section">
        <h3 className="cv-section-title">EĞİTİM</h3>
        {isEditing && (
          <button 
            onClick={() => addArrayItem('education', { school: '', degree: '', field: '', startYear: '', endYear: '' })}
            className="add-button"
          >
            + Eğitim Ekle
          </button>
        )}
        {editedData.education.map((edu, index) => (
          <div key={index} className="cv-education-item">
            {isEditing ? (
              <>
                <div className="cv-edu-edit">
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => handleArrayEdit('education', index, { ...edu, school: e.target.value })}
                    className="editable-input"
                    placeholder="Üniversite/Okul"
                  />
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleArrayEdit('education', index, { ...edu, degree: e.target.value })}
                    className="editable-input"
                    placeholder="Derece (Lisans, Yüksek Lisans, vb.)"
                  />
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => handleArrayEdit('education', index, { ...edu, field: e.target.value })}
                    className="editable-input"
                    placeholder="Bölüm"
                  />
                  <input
                    type="text"
                    value={edu.startYear}
                    onChange={(e) => handleArrayEdit('education', index, { ...edu, startYear: e.target.value })}
                    className="editable-input"
                    placeholder="Başlangıç Yılı"
                  />
                  <input
                    type="text"
                    value={edu.endYear}
                    onChange={(e) => handleArrayEdit('education', index, { ...edu, endYear: e.target.value })}
                    className="editable-input"
                    placeholder="Bitiş Yılı (veya Güncel)"
                  />
                  <button onClick={() => removeArrayItem('education', index)} className="remove-button">
                    Kaldır
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="cv-edu-header">
                  <div>
                    <h4 className="cv-edu-degree">{edu.degree} - {edu.field}</h4>
                    <p className="cv-edu-school">{edu.school}</p>
                  </div>
                  <span className="cv-edu-date">{edu.startYear} - {edu.endYear}</span>
                </div>
              </>
            )}
          </div>
        ))}
        {editedData.education.length === 0 && !isEditing && (
          <p className="cv-placeholder">Düzenle butonuna tıklayarak eğitim bilgilerinizi ekleyebilirsiniz.</p>
        )}
      </div>

      {/* Certifications */}
      <div className="cv-section">
        <h3 className="cv-section-title">SERTİFİKALAR</h3>
        {isEditing && (
          <button 
            onClick={() => addArrayItem('certifications', { name: '', issuer: '', year: '' })}
            className="add-button"
          >
            + Sertifika Ekle
          </button>
        )}
        {editedData.certifications.map((cert, index) => (
          <div key={index} className="cv-cert-item">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleArrayEdit('certifications', index, { ...cert, name: e.target.value })}
                  className="editable-input"
                  placeholder="Sertifika Adı"
                />
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleArrayEdit('certifications', index, { ...cert, issuer: e.target.value })}
                  className="editable-input"
                  placeholder="Veren Kurum"
                />
                <input
                  type="text"
                  value={cert.year}
                  onChange={(e) => handleArrayEdit('certifications', index, { ...cert, year: e.target.value })}
                  className="editable-input"
                  placeholder="Yıl"
                />
                <button onClick={() => removeArrayItem('certifications', index)} className="remove-button">
                  Kaldır
                </button>
              </>
            ) : (
              <div className="cv-cert-content">
                <strong>{cert.name}</strong> - {cert.issuer} ({cert.year})
              </div>
            )}
          </div>
        ))}
        {editedData.certifications.length === 0 && !isEditing && (
          <p className="cv-placeholder">Düzenle butonuna tıklayarak sertifika bilgilerinizi ekleyebilirsiniz.</p>
        )}
      </div>

      {/* GitHub Stats */}
      <div className="cv-section">
        <h3 className="cv-section-title">GITHUB İSTATİSTİKLERİ</h3>
        <div className="cv-stats-grid">
          <div className="cv-stat-item">
            <span className="cv-stat-label">Toplam Proje</span>
            <span className="cv-stat-value">{statistics.public_repos}</span>
          </div>
          <div className="cv-stat-item">
            <span className="cv-stat-label">Toplam Commit</span>
            <span className="cv-stat-value">{contributions.stats.total_commits}</span>
          </div>
          <div className="cv-stat-item">
            <span className="cv-stat-label">Pull Request</span>
            <span className="cv-stat-value">{contributions.stats.PullRequestEvent}</span>
          </div>
          <div className="cv-stat-item">
            <span className="cv-stat-label">Alınan Yıldız</span>
            <span className="cv-stat-value">{statistics.total_stars}</span>
          </div>
          <div className="cv-stat-item">
            <span className="cv-stat-label">Fork</span>
            <span className="cv-stat-value">{statistics.total_forks}</span>
          </div>
          <div className="cv-stat-item">
            <span className="cv-stat-label">Takipçi</span>
            <span className="cv-stat-value">{statistics.followers}</span>
          </div>
        </div>
      </div>

      {/* GitHub Activity (No Print) */}
      <div className="cv-section no-print">
        <h3 className="cv-section-title">GITHUB AKTİVİTESİ</h3>
        {contributions.streak && (
          <div className="cv-activity-stats">
            <div className="cv-activity-item">
              <span className="cv-activity-label">Mevcut Seri</span>
              <span className="cv-activity-value">{contributions.streak.current} gün</span>
            </div>
            <div className="cv-activity-item">
              <span className="cv-activity-label">En Uzun Seri</span>
              <span className="cv-activity-value">{contributions.streak.longest} gün</span>
            </div>
            <div className="cv-activity-item">
              <span className="cv-activity-label">Issue</span>
              <span className="cv-activity-value">{contributions.stats.IssuesEvent}</span>
            </div>
            <div className="cv-activity-item">
              <span className="cv-activity-label">Code Review</span>
              <span className="cv-activity-value">{contributions.stats.PullRequestReviewEvent || 0}</span>
            </div>
          </div>
        )}
      </div>

      {/* Print Button */}
      <div className="print-section">
        <button onClick={() => window.print()} className="print-button">
          🖨️ PDF Olarak Kaydet
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
