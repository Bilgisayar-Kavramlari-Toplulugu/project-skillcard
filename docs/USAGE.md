# GitHub Profil Kartı - Kullanım Kılavuzu

## Hızlı Başlangıç

### 1. Backend'i Çalıştırma

```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend http://localhost:5000 adresinde başlayacaktır.

### 2. Frontend'i Çalıştırma

Yeni bir terminal açın:

```powershell
cd frontend
npm install
npm start
```

Frontend http://localhost:3000 adresinde açılacaktır.

## Özellik Detayları

### GitHub API Entegrasyonu

Uygulama aşağıdaki GitHub API endpoint'lerini kullanır:

- `/users/{username}` - Kullanıcı bilgileri
- `/users/{username}/repos` - Repository listesi
- `/users/{username}/events/public` - Aktiviteler

### Toplanan Veriler

#### 1. Kişisel Bilgiler
- Ad ve soyad
- Kullanıcı adı
- Profil fotoğrafı
- Biyografi
- Konum
- Şirket
- Hesap oluşturma tarihi

#### 2. Sosyal Medya
- GitHub profil linki
- Twitter kullanıcı adı
- Website/Blog
- Email adresi

#### 3. İstatistikler
- Public repository sayısı
- Takipçi sayısı
- Takip edilen kişi sayısı
- Toplam yıldız sayısı
- Toplam fork sayısı
- Toplam commit sayısı

#### 4. Programlama Dilleri
- En çok kullanılan 10 dil
- Her dil için repository sayısı
- Renkli gösterim

#### 5. Contribution Geçmişi
- Push events
- Pull request sayısı
- Issue sayısı
- Create events
- Fork events
- Son 5 aktivite

#### 6. En İyi Repository'ler
- En çok yıldız alan 5 repository
- Açıklama, yıldız, fork sayıları
- Kullanılan dil

## PDF/Yazdırma Özelliği

"CV Olarak Yazdır / PDF'e Aktar" butonuna tıklayarak:

1. Tarayıcının yazdırma penceresi açılır
2. Hedef olarak "PDF'e kaydet" seçin
3. Profesyonel CV formatında PDF elde edin

## Rate Limiting Çözümü

GitHub API saatte 60 istek limiti vardır. Daha fazla istek için:

1. GitHub Personal Access Token oluşturun
2. `backend/.env` dosyası oluşturun:
   ```
   GITHUB_TOKEN=ghp_your_token_here
   ```
3. Backend'i yeniden başlatın

## Sorun Giderme

### Backend başlamıyor
- Python 3.8+ yüklü olduğundan emin olun
- `pip install -r requirements.txt` komutunu çalıştırın
- Port 5000 kullanımda değil mi kontrol edin

### Frontend başlamıyor
- Node.js 14+ yüklü olduğundan emin olun
- `npm install` komutunu çalıştırın
- Port 3000 kullanımda değil mi kontrol edin

### CORS hatası
- Backend'in çalıştığından emin olun
- `flask-cors` yüklü olduğunu kontrol edin

### Kullanıcı bulunamadı hatası
- GitHub kullanıcı adını doğru yazdığınızdan emin olun
- Kullanıcının public profili olmalı

## Geliştirme Önerileri

### Yeni Özellik Eklemek

1. Backend için `app.py` dosyasına yeni endpoint ekleyin
2. Frontend için yeni component oluşturun
3. `ProfileCard.js` içinde yeni veriyi gösterin

### Tema Değiştirme

CSS dosyalarındaki gradient ve renk değerlerini düzenleyin:
- `frontend/src/App.css` - Ana tema
- `frontend/src/components/ProfileCard.css` - Kart teması

## API Örnek Yanıtı

```json
{
  "personal_info": {
    "name": "Talip Kurt",
    "username": "tlpkurt",
    "bio": "...",
    "location": "Turkey",
    "company": "...",
    "avatar_url": "https://...",
    "created_at": "2020-01-01T00:00:00Z"
  },
  "social_links": {
    "github": "https://github.com/tlpkurt",
    "twitter": "https://twitter.com/...",
    "website": "https://...",
    "email": "..."
  },
  "statistics": {
    "public_repos": 50,
    "followers": 100,
    "following": 50,
    "total_stars": 500,
    "total_forks": 100
  },
  "languages": [
    {"language": "Python", "count": 20},
    {"language": "JavaScript", "count": 15}
  ],
  "contributions": {
    "stats": {
      "PushEvent": 100,
      "PullRequestEvent": 20,
      "IssuesEvent": 10,
      "total_commits": 500
    },
    "recent_activities": []
  },
  "top_repositories": []
}
```
