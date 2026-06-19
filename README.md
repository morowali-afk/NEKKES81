# LaiHakerAI Pentest Assistant

Aplikasi GUI untuk Kali Linux yang menggabungkan workflow pentest berizin:

1. Nmap → cari target, port, service
2. Nikto → scan web server
3. Burp → analisa request manual
4. SQLmap → cek injection mode deteksi
5. Metasploit → search/rekomendasi module saja
6. HTTP security headers check
7. Testssl → audit TLS/SSL
8. theHarvester → OSINT domain dari sumber publik
9. Subfinder → enumerasi subdomain pasif
10. WhatWeb → fingerprint teknologi web
11. Nuclei → safe/rate-limited template scan
12. Report Markdown dengan ringkasan evidence dan prioritas validasi

## Batasan Aman

Aplikasi ini **tidak menjalankan exploit otomatis**.  
Metasploit hanya dipakai untuk `search type:exploit name:<service>` agar aman untuk pembelajaran/lab.
Mode **Deep Authorized** hanya untuk lab atau target yang jelas masuk scope izin.

## Install di Kali Linux

```bash
sudo apt update
sudo apt install -y nmap nikto sqlmap metasploit-framework burpsuite python3-tk testssl.sh theharvester subfinder whatweb nuclei
```

Atau jalankan:

```bash
chmod +x install.sh
./install.sh
```

## Jalankan Aplikasi

```bash
python3 kali_pentest_assistant.py
```

Jika memakai installer, aplikasi juga tersedia dari menu desktop sebagai:

```text
LaiHakerAI Pentest Assistant
```

## Contoh Target Lab

- DVWA
- OWASP Juice Shop
- Metasploitable2

## Cara Pakai

1. Isi Target IP/Host untuk Nmap.
2. Isi Target URL untuk Nikto/SQLmap/Burp.
3. Centang pernyataan izin/scope.
4. Jalankan Nmap.
5. Jalankan Nikto.
6. Buka Burp untuk analisis manual.
7. Jalankan SQLmap Check untuk deteksi SQLi saja.
8. Pilih profil scan:
   - Safe: ringan dan cepat
   - Deep Authorized: enumerasi lebih lengkap, tetap tanpa exploit otomatis
   - Report Only: hanya membuat report dari output yang sudah ada
9. Jalankan Metasploit Search untuk mencari module terkait service.
10. Jalankan Testssl untuk audit TLS/SSL pada target HTTPS.
11. Jalankan Subfinder/theHarvester untuk OSINT domain berizin.
12. Jalankan WhatWeb dan Nuclei Safe untuk fingerprint dan validasi ringan.
13. Klik Generate Report.

## Workflow Otomatis

Tombol **Run Authorized Workflow** akan menjalankan langkah yang relevan secara berurutan:

- Nmap jika Target IP/Host diisi
- HTTP headers, Nikto, dan SQLmap detection jika Target URL diisi
- WhatWeb dan Testssl jika Target URL diisi
- Subfinder jika domain valid tersedia
- Nuclei Safe dan theHarvester pada mode Deep Authorized
- Metasploit search-only berdasarkan service hasil Nmap
- Generate report akhir

## Catatan Legal

Gunakan hanya untuk:
- sistem sendiri
- lab pribadi
- CTF
- bug bounty sesuai scope
- pentest resmi dengan izin tertulis
