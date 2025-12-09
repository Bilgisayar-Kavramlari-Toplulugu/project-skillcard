# Otomatik olarak Profil Kartı oluşturma projesi

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-Bilgisayar-Kavramlari-Toplulugu-181717?style=flat-square&logo=github)](https://github.com/Bilgisayar-Kavramlari-Toplulugu/project-skillcard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg?style=flat-square&logo=python)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB.svg?style=flat-square&logo=react)](https://reactjs.org/)

**GitHub kullanıcı profillerini profesyonel CV formatında görüntüleme uygulaması**

</div>

---

## ⚡ Hızlı Başlangıç

### Tek Tıkla Çalıştır! 🚀

```bash
# ÇALIŞTIR.bat dosyasına çift tıklayın
# veya PowerShell'de:
.\ÇALIŞTIR.bat
```

**İşte bu kadar!** Script otomatik olarak her şeyi kurup başlatacak. 🎉

### 🔑 GitHub Token (Opsiyonel ama Önerilir)

GitHub API rate limit (saatte 60 istek) aşılmasını önlemek için GitHub token kullanmanızı öneririz:

1. [GitHub Token Oluştur](https://github.com/settings/tokens/new) (public_repo yetkisi yeterli)
2. `backend/.env` dosyası oluşturun:
```bash
GITHUB_TOKEN=your_github_token_here
```
3. Token ile rate limit 5000/saat'e çıkar

📖 **Detaylı kılavuz:** [docs/HIZLI-BASLANGIC.md](docs/HIZLI-BASLANGIC.md)

---

<details open>
<summary><strong>🇹🇷 Türkçe</strong></summary>

<br>

> **ÖNEMLİ:** Bu repository **Otomatik olarak Profil Kartı oluşturma projesi** projesinin bir parçasıdır. Proje hakkında detaylı bilgi için [`docs/Project-Definition.md`](docs/Project-Definition.md) dosyasına bakın.

## 📖 Hakkında

Bu proje, GitHub kullanıcılarının profil bilgilerini otomatik olarak çekerek profesyonel bir CV formatında sunar. Python (Flask) backend ve React frontend kullanılarak geliştirilmiştir.

### ✨ Özellikler

- 🔍 GitHub kullanıcı adı veya profil linki ile arama
- 👤 Ad, soyad ve profil bilgileri
- 🔗 Sosyal medya bağlantıları (Twitter, Blog, Email)
- 💻 Kullanılan programlama dilleri ve dağılımları
- 📊 Repository istatistikleri (yıldız, fork, takipçi sayıları)
- 📈 Contribution geçmişi ve son aktiviteler
- 🌟 En popüler repository'ler
- 🖨️ PDF/Yazdırma desteği
- 📱 Responsive tasarım

## 🚀 Hızlı Başlangıç

### ⚡ Tek Tıkla Çalıştırma (Önerilen)

Projeyi indirdikten sonra sadece şunu yapın:

**Windows için:**
```bash
# ÇALIŞTIR.bat dosyasına çift tıklayın
# veya PowerShell'de:
.\ÇALIŞTIR.bat
```

Bu komut:
- ✅ Gerekli bağımlılıkları otomatik kontrol eder
- ✅ İlk kullanımda otomatik kurulum yapar
- ✅ Backend ve Frontend'i başlatır
- ✅ Tarayıcınızı otomatik açar

### 📋 Gereksinimler

Sisteminizde bunlar yüklü olmalı:
- **Python 3.8+** - [İndir](https://www.python.org/downloads/)
- **Node.js 14+** - [İndir](https://nodejs.org/)
- Git (opsiyonel)

### 🔧 Manuel Kurulum ve Çalıştırma

İsterseniz manuel olarak da kurabilirsiniz:

#### Backend Kurulumu

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

#### Frontend Kurulumu

```bash
cd frontend
npm install
```

#### Manuel Başlatma

**Backend:**
```bash
cd backend
.\venv\Scripts\activate
python app.py
```

**Frontend:**
```bash
cd frontend
npm start
```

### 🎯 Alternatif Başlatma Yöntemleri

```powershell
# PowerShell scriptleri ile:
.\run.ps1          # Otomatik kurulum + başlatma
.\setup.ps1        # Sadece kurulum
.\start.ps1        # Sadece başlatma
```

### Kullanım Adımları

1. Tarayıcınızda http://localhost:3000 adresine gidin
2. GitHub kullanıcı adını veya profil linkini girin (örn: `tlpkurt` veya `https://github.com/tlpkurt`)
3. "Profil Oluştur" butonuna tıklayın
4. Oluşturulan profil kartını görüntüleyin
5. "CV Olarak Yazdır / PDF'e Aktar" butonuyla PDF olarak kaydedin

## 📁 Proje Yapısı

```
project-skillcard/
├── ÇALIŞTIR.bat         # ⭐ TEK TIKLA BAŞLAT!
├── run.ps1              # Otomatik kurulum + çalıştırma
├── setup.ps1            # Kurulum scripti
├── start.ps1            # Başlatma scripti
├── backend/             # Python Flask API
│   ├── app.py           # Ana Flask uygulaması
│   ├── requirements.txt # Python bağımlılıkları
│   └── .env.example     # Örnek environment dosyası
├── frontend/            # React uygulaması
│   ├── public/          # Statik dosyalar
│   ├── src/             # Kaynak kodlar
│   │   ├── components/  # React bileşenleri
│   │   │   ├── ProfileCard.js
│   │   │   └── ProfileCard.css
│   │   ├── App.js       # Ana uygulama
│   │   ├── App.css
│   │   └── index.js
│   └── package.json     # Node bağımlılıkları
├── docs/                # Dokümantasyon
│   └── USAGE.md         # Detaylı kullanım kılavuzu
└── README.md            # Bu dosya
```

## 🔧 Teknik Detaylar

### Backend (Python Flask)

- **Framework:** Flask 3.0.0
- **GitHub API:** REST API v3
- **CORS:** Çapraz kaynak istekleri için flask-cors
- **HTTP İstekleri:** requests kütüphanesi

#### API Endpoints

- `GET /api/profile/<username>` - GitHub kullanıcı profil bilgilerini getirir
- `GET /api/health` - API sağlık kontrolü

#### Toplanan Veriler

1. **Kişisel Bilgiler:** Ad, kullanıcı adı, bio, konum, şirket
2. **Sosyal Medya:** GitHub, Twitter, Website, Email
3. **İstatistikler:** Repository sayısı, takipçiler, yıldızlar
4. **Programlama Dilleri:** Kullanılan diller ve dağılımları
5. **Contribution:** Commit, PR, Issue aktiviteleri
6. **Repository'ler:** En popüler projeler

### Frontend (React)

- **Framework:** React 18.2
- **HTTP Client:** Axios
- **Styling:** Vanilla CSS (Gradient tasarım)
- **Responsive:** Mobile-first yaklaşım

#### Özellikler

- ⚡ Hızlı ve modern kullanıcı arayüzü
- 🎨 Gradient ve modern tasarım
- 📱 Tüm cihazlarda uyumlu
- 🖨️ Yazdırma ve PDF desteği
- ⌨️ URL veya kullanıcı adı ile arama

## 🧪 API Kullanımı

### Rate Limiting

GitHub API saatte 60 istek limiti vardır. Daha fazla istek için GitHub Personal Access Token kullanabilirsiniz:

1. GitHub'da Settings > Developer settings > Personal access tokens
2. Yeni token oluşturun (public_repo yetkisi yeterli)
3. `backend/.env` dosyasına ekleyin:
   ```
   GITHUB_TOKEN=your_token_here
   ```

### Örnek API İsteği

```bash
curl http://localhost:5000/api/profile/hakanceran64
```

## 🤝 Katkıda Bulunma

Katkıda bulunmak için lütfen [`CONTRIBUTING.md`](.github/CONTRIBUTING.md) dosyasını inceleyin.

### Geliştirme Önerileri

- [ ] Tema desteği (Dark/Light mode)
- [ ] Daha fazla GitHub istatistiği
- [ ] Farklı CV şablonları
- [ ] Export formatları (JSON, Markdown)
- [ ] Cache mekanizması
- [ ] Docker desteği

## 📚 Dokümantasyon

- [Proje Tanımı](docs/Project-Definition.md)
- [Mimari Genel Bakış](docs/Architecture-Overview.md)
- [Geliştirme Akışı](docs/Development-Workflow.md)

## 🐛 Bilinen Sorunlar

- GitHub API rate limiting (token kullanarak çözülebilir)
- Çok fazla repository olan kullanıcılarda yavaşlama olabilir

## 📄 Lisans

Bu proje MIT Lisansı ile lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

**Proje Lideri:** [@hakanceran64](https://github.com/hakanceran64)

</details>

<details>
<summary><strong>🇬🇧 English</strong></summary>

<br>

> **IMPORTANT:** This repository is part of **Otomatik olarak Profil Kartı oluşturma projesi** project. See [`docs/Project-Definition.md`](docs/Project-Definition.md) for details.

## 📖 About

<!-- Describe what this repository does -->

## 🚀 Installation

### Requirements

- List required tools here

### Getting Started

```bash
git clone https://github.com/Bilgisayar-Kavramlari-Toplulugu/project-skillcard.git
cd project-skillcard

# Add installation steps here
```

## 💻 Usage

```bash
# Add command to run the application
```

## 📁 Project Structure

```
project-skillcard/
├── src/          # Source code
├── tests/        # Tests
├── docs/         # Documentation
└── README.md     # This file
```

## 🧪 Testing

```bash
# Add test commands here
```

## 🤝 Contributing

Please see [`CONTRIBUTING.md`](.github/CONTRIBUTING.md) for contribution guidelines.

## 📚 Documentation

- [Project Definition](docs/Project-Definition.md)
- [Architecture Overview](docs/Architecture-Overview.md)
- [Development Workflow](docs/Development-Workflow.md)

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

**Project Lead:** [@hakanceran64](https://github.com/hakanceran64)

</details>
