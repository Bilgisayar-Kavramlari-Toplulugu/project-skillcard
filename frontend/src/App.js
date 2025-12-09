import React, { useState } from 'react';
import './App.css';
import ProfileCard from './components/ProfileCard';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Lütfen bir GitHub kullanıcı adı girin');
      return;
    }

    setLoading(true);
    setError('');
    setProfileData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/profile/${username}`);
      setProfileData(response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Profil bilgileri alınırken bir hata oluştu';
      if (errorMsg.includes('rate limit') || err.response?.status === 429 || err.response?.status === 403) {
        setError(`⚠️ ${errorMsg}\n\nGitHub token eklemek için backend/.env dosyasına ekleyin:\nGITHUB_TOKEN=your_token_here`);
      } else {
        setError(`⚠️ ${errorMsg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const extractGitHubUsername = (url) => {
    // GitHub URL'den kullanıcı adını çıkar
    const match = url.match(/github\.com\/([^\/]+)/);
    return match ? match[1] : url;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Eğer URL girilirse, kullanıcı adını çıkar
    const extractedUsername = extractGitHubUsername(value);
    setUsername(extractedUsername);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎯Profil Kartı Oluşturucu</h1>
        <p className="subtitle">GitHub kullanıcı bilgilerinizi profesyonel CV formatında görüntüleyin</p>
      </header>

      <main className="App-main">
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="GitHub kullanıcı adı veya profil linki girin (örn: tlpkurt)"
                value={username}
                onChange={handleInputChange}
                className="github-input"
              />
              <button 
                type="submit" 
                className="search-button"
                disabled={loading}
              >
                {loading ? '🔍 Aranıyor...' : '🚀 Profil Oluştur'}
              </button>
            </div>
          </form>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}
        </div>

        {profileData && <ProfileCard data={profileData} />}
      </main>

      <footer className="App-footer">
        <p>Bilgisayar Kavramları Topluluğu tarafından geliştirilmiştir 💻</p>
      </footer>
    </div>
  );
}

export default App;
