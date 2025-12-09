# 🚀 Hızlı Başlangıç Kılavuzu

## En Hızlı Yöntem - Tek Tıkla Başlat! ⚡

### Windows Kullanıcıları için

1. Projeyi indirin/klonlayın
2. `ÇALIŞTIR.bat` dosyasına **çift tıklayın**
3. İşte bu kadar! 🎉

Script otomatik olarak:
- ✅ Python ve Node.js kontrolü yapar
- ✅ İlk kullanımda tüm bağımlılıkları yükler
- ✅ Backend (Flask) ve Frontend (React) başlatır
- ✅ Tarayıcınızı otomatik açar (http://localhost:3000)

### İlk Kurulumda Beklenen Süre

- **Backend kurulumu:** ~30 saniye
- **Frontend kurulumu:** 2-3 dakika (internet hızına bağlı)
- **Toplam:** ~3-4 dakika

### İkinci ve Sonraki Kullanımlarda

`ÇALIŞTIR.bat` dosyası zaten kurulumu yaptığınızı anlar ve direkt uygulamayı başlatır (~10 saniye).

---

## Alternatif Yöntemler

### PowerShell ile

```powershell
# Otomatik kurulum + başlatma
.\run.ps1

# Sadece kurulum
.\setup.ps1

# Sadece başlatma (kurulum yapılmışsa)
.\start.ps1
```

### Manuel Kurulum

Eğer kontrol sahibi olmak istiyorsanız:

#### 1. Backend Kurulumu
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

#### 2. Frontend Kurulumu
```powershell
cd frontend
npm install
```

#### 3. Başlatma

**Terminal 1 - Backend:**
```powershell
cd backend
.\venv\Scripts\activate
python app.py
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm start
```

---

## Uygulamayı Kullanma

1. Tarayıcınızda **http://localhost:3000** açılır
2. GitHub kullanıcı adı veya profil linki girin
   - Örnek: `tlpkurt`
   - Veya: `https://github.com/tlpkurt`
3. **"Profil Oluştur"** butonuna tıklayın
4. CV formatında profilinizi görün! 🎯

### PDF'e Aktarma

- **"CV Olarak Yazdır / PDF'e Aktar"** butonuna tıklayın
- Tarayıcı yazdırma penceresinde **"PDF'e kaydet"** seçin
- Profesyonel CV'niz hazır! 📄

---

## Sorun Giderme

### "Python bulunamadı" hatası
- Python 3.8+ yüklü değil
- **Çözüm:** https://www.python.org/downloads/ adresinden indirin
- Kurulumda "Add Python to PATH" seçeneğini işaretleyin

### "Node.js bulunamadı" hatası
- Node.js yüklü değil
- **Çözüm:** https://nodejs.org/ adresinden indirin

### Port kullanımda hatası
- 5000 veya 3000 portları başka bir uygulama tarafından kullanılıyor
- **Çözüm:** Diğer uygulamaları kapatın veya portları değiştirin

### "npm install" çok yavaş
- Normal, ilk kurulumda birkaç dakika sürebilir
- İnternet bağlantınızı kontrol edin

### Backend başlamıyor
```powershell
cd backend
.\venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend başlamıyor
```powershell
cd frontend
npm install
```

---

## Sistem Gereksinimleri

### Minimum
- **OS:** Windows 10/11, macOS, Linux
- **RAM:** 4 GB
- **Disk:** 500 MB boş alan
- **İnternet:** İlk kurulum için gerekli

### Önerilen
- **RAM:** 8 GB
- **Disk:** 1 GB boş alan
- **İnternet:** Hızlı bağlantı

---

## GitHub API Rate Limit

GitHub API saatte **60 istek** limiti vardır.

### Daha fazla istek için:

1. GitHub hesabınızda **Personal Access Token** oluşturun
2. `backend/.env` dosyası oluşturun:
```bash
GITHUB_TOKEN=ghp_your_token_here
```
3. Backend'i yeniden başlatın

**Token oluşturma:**
- GitHub → Settings → Developer settings → Personal access tokens
- "Generate new token" → `public_repo` yetkisi yeterli

---

## Kısayollar

| Dosya | Açıklama |
|-------|----------|
| `ÇALIŞTIR.bat` | ⭐ Tek tıkla başlat (Önerilen) |
| `run.ps1` | PowerShell: Otomatik kurulum + başlatma |
| `setup.ps1` | PowerShell: Sadece kurulum |
| `start.ps1` | PowerShell: Sadece başlatma |

---

## Daha Fazla Bilgi

- **Detaylı Kullanım:** [docs/USAGE.md](USAGE.md)
- **Proje Tanımı:** [Project-Definition.md](Project-Definition.md)
- **Mimari:** [Architecture-Overview.md](Architecture-Overview.md)

---

**İyi kullanımlar! 🚀**
