# Forum Pembentukan Sinode GKMR — Situs Web (siap pakai)

Versi pengembangan **offline-first + PWA** dari `forum_pembentukan_sinode_gkmr.html` (file asli tetap utuh di workspace root — **tidak** diintegrasikan ke aplikasi portal GKMR).

## Struktur

```
gkmr-forum/
├── index.html              ← Aplikasi utama
├── manifest.webmanifest    ← PWA manifest (installable)
├── sw.js                   ← Service worker (mode offline)
├── css/app.css             ← Tailwind CSS statis (kompilasi lokal, 28 KB)
├── assets/
│   ├── logo-gkmr.jpeg      ← Logo GKMR
│   ├── logo-morut.jpeg     ← Logo Morowali Utara
│   ├── hero.svg            ← Latar hero lokal (tanpa placehold.co)
│   ├── fa/                 ← Font Awesome lokal (CSS + webfonts)
│   ├── inter/              ← Font Inter lokal (latin + latin-ext)
│   └── sweetalert2.all.min.js ← SweetAlert2 lokal
├── icons/                  ← Ikon PWA (192 & 512 px, dari logo GKMR)
├── screenshots/            ← Bukti visual
├── tailwind.config.js      ← Konfigurasi build CSS
└── test-e2e.cjs            ← Uji fungsional end-to-end (CDP)
```

## Cara Menjalankan

```bash
cd gkmr-forum
python3 -m http.server 8791
# buka http://localhost:8791
```

**Tanpa internet?** Tetap jalan — semua CSS, font, ikon, dan JS lokal; service worker meng-cache seluruh aset (test offline lulus ✅).

**Install sebagai aplikasi (PWA):** buka di Chrome/Edge → ikon install di address bar → aplikasi berdiri sendiri seperti native.

## Fitur

### v4 — Database Online (Supabase)
- **Pendaftaran jemaat langsung masuk database online** (Supabase, tabel `pendaftar`) — bukan lagi hanya localStorage.
- Panel admin **baca data langsung dari database** — pendaftar baru muncul di perangkat mana pun setelah reload.
- Badge "☁️ Online" pada baris data yang berasal dari database; sinkronisasi status verifikasi & hapus ke database.
- Fallback: jika koneksi database gagal/offline, data tetap tersimpan lokal dan tetap muncul di panel (mode hibrida).
- Konfigurasi: `SUPABASE_URL` + `SUPABASE_KEY` (publishable key) di `index.html`; library `assets/supabase.min.js` lokal (offline-first).

### Publik
- Beranda (hero + 3 pilar + statistik potensi jemaat + counter pendaftar online)
- Tentang, Visi & Misi (dengan timeline 6 tahapan pembentukan)
- Berita (kartu + detail modal)
- Kepanitiaan inti
- Formulir pendaftaran jemaat dengan validasi HP Indonesia, deteksi duplikat, dan opsi kirim data via WhatsApp ke sekretariat
- Footer kontak dinamis (WA/email dari pengaturan admin)

### Admin (PIN default `12345` — wajib ganti)
- Dashboard statistik: total pendaftar, Morowali Utara, Morowali, berita
- Kelola berita: tambah, edit (dengan URL gambar), hapus
- Data pendaftar: pencarian real-time, verifikasi (Baru/Diverifikasi), detail, chat WhatsApp, hapus
- Export CSV pendaftar
- **Pengaturan**: ubah PIN, nomor WA & email sekretariat, toggle buka/tutup pendaftaran, **backup/restore JSON**, hapus semua data

### Teknis
- 100% offline-capable: Tailwind CSS statis, Font Awesome, Inter, SweetAlert2 — semua lokal
- PWA: manifest + service worker (cache-first, network-first untuk navigasi)
- Persistensi localStorage (pendaftar, berita, PIN, sesi, pengaturan)
- Escape HTML di semua render data (anti-XSS)

## Catatan

- Data tersimpan di browser (localStorage). Gunakan **Unduh Cadangan (JSON)** di Pengaturan untuk backup/pindah perangkat.
- Mode offline: setelah pertama kali dibuka online (SW terpasang), aplikasi bisa dibuka tanpa internet.
- Untuk deploy publik (Netlify/GitHub Pages), cukup unggah seluruh folder ini — tanpa build tambahan.

## Uji

```bash
node test-e2e.cjs   # butuh chromium headless + server lokal (lihat isi file)
```

16 skenario diuji: fungsi inti, pendaftaran, duplikat, validasi HP, login admin, berita, persistensi reload, ganti PIN, pengaturan WA/email, toggle pendaftaran (termasuk blokir saat ditutup), backup, offline assets, navigasi. Semua lulus ✅
