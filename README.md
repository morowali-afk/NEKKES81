# LaiHakerAI Pentest Assistant

Aplikasi GUI untuk Kali Linux yang menggabungkan workflow pentest berizin:

1. Nmap → cari target, port, service
2. Nikto → scan web server dengan tuning profil Safe/Deep Authorized
3. Burp → analisa request manual
4. SQLmap → cek injection mode deteksi
5. Metasploit → search/rekomendasi module saja
6. HTTP security headers check
7. HTTP Probe → status, redirect, header, cookie, title, robots.txt, sitemap.xml
8. Testssl → audit TLS/SSL
9. theHarvester → OSINT domain dari sumber publik
10. Subfinder → enumerasi subdomain pasif
11. WhatWeb → fingerprint teknologi web
12. Nuclei → safe/rate-limited template scan
13. Report Markdown + HTML + PDF profesional dengan ringkasan evidence dan prioritas validasi

## Batasan Aman

Aplikasi ini **tidak menjalankan exploit otomatis**.  
Metasploit hanya dipakai untuk `search type:exploit name:<service>` agar aman untuk pembelajaran/lab.
Mode **Deep Authorized** hanya untuk lab atau target yang jelas masuk scope izin.

## Install di Kali Linux

```bash
sudo apt update
sudo apt install -y nmap nikto sqlmap metasploit-framework burpsuite python3-tk testssl.sh theharvester subfinder whatweb nuclei chromium
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
   - Deep Authorized: enumerasi lebih lengkap, Nikto memakai `-Tuning x`, tetap tanpa exploit otomatis
   - Report Only: hanya membuat report dari output yang sudah ada
9. Jalankan Metasploit Search untuk mencari module terkait service.
10. Jalankan Testssl untuk audit TLS/SSL. Jika Target URL berisi `http://` atau `https://`, aplikasi otomatis mengirim format host yang benar ke Testssl.
11. Jalankan Subfinder/theHarvester untuk OSINT domain berizin.
12. Jalankan WhatWeb dan Nuclei Safe untuk fingerprint dan validasi ringan.
13. Jalankan HTTP Probe untuk rangkuman status, header, cookie, robots.txt, dan sitemap.xml.
14. Klik Generate Report/PDF.

## Workflow Otomatis

Tombol **Run Authorized Workflow** akan menjalankan langkah yang relevan secara berurutan:

- Nmap jika Target IP/Host diisi
- HTTP headers, HTTP Probe, Nikto, dan SQLmap detection jika Target URL diisi
- WhatWeb dan Testssl jika Target URL diisi
- Subfinder jika domain valid tersedia
- Nuclei Safe dan theHarvester pada mode Deep Authorized
- Metasploit search-only berdasarkan service hasil Nmap
- Generate report akhir dalam Markdown, HTML, dan PDF profesional jika Chromium tersedia

## Catatan Legal

Gunakan hanya untuk:
- sistem sendiri
- lab pribadi
- CTF
- bug bounty sesuai scope
- pentest resmi dengan izin tertulis
