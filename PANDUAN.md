# PaveRec-ITS Web 2.0-web.1 — panduan

Perekam survei berbasis peramban untuk **PaveScanPro-ITS** (Paten 2026-21).
Dipakai di **Android (Chrome)** dan **iPhone (Safari, iOS 14.3+)** tanpa
memasang APK. Dr. Cahya Buana — Departemen Teknik Sipil FTSPK ITS.

## 1. Pasang di server HTTPS (sekali saja)

Kamera, GPS, dan sensor getaran hanya diizinkan peramban pada halaman
**https://**. Membuka `index.html` langsung dari memori HP tidak akan bisa
merekam. Unggah **seluruh isi folder ini** (index.html, sw.js,
manifest.webmanifest, ikon-*) ke salah satu tempat berikut:

| Pilihan | Cara singkat |
|---|---|
| **Netlify Drop** (paling cepat) | Buka app.netlify.com/drop, seret folder `paverec-web`. Langsung dapat alamat `https://….netlify.app`. Buat akun gratis supaya alamatnya permanen. |
| **GitHub Pages** | Repositori baru → unggah berkas → Settings → Pages → Branch `main` / root. Alamat: `https://<akun>.github.io/<repo>/`. |
| **Server ITS / web lab** | Salin folder ke direktori web yang sudah ber-HTTPS, mis. `https://…its.ac.id/paverec/`. |

Bagikan alamat itu ke surveyor (boleh lewat WA).

## 2. Di HP surveyor

1. Buka alamatnya: Chrome (Android) atau Safari (iPhone).
2. Tambahkan ke layar utama supaya tampil seperti aplikasi dan tetap
   bisa dibuka meski sinyal lemah:
   - Android: menu ⋮ → **Instal aplikasi** / **Tambahkan ke layar utama**.
   - iPhone: tombol Bagikan → **Tambahkan ke Layar Utama**.
3. Saat pertama kali **Buka kamera & sensor**, izinkan **Kamera**,
   **Lokasi**, dan (di iPhone) **Gerakan & Orientasi**.

## 3. Merekam

- Isi nama ruas, surveyor, dan kendaraan. Sudut pandang lensa (HFOV) boleh
  dikosongkan; nilainya diambil dari rekaman **kalibrasi banner**.
- Pasang HP **mendatar** di dasbor, lensa utama 1×. Lingkaran di kiri bawah
  menunjukkan sudut **tunduk** dan **miring**; garis hijau berarti miring ≤ 3°.
- Lencana atas: waktu rekam, ketelitian GPS, kecepatan, jarak, laju sensor
  getaran (hijau ≥ 50 Hz), resolusi, dan ukuran video.
- **Kalibrasi banner**: kendaraan diam, banner utuh di layar. Lencana banner
  menghitung kotak merah (harus 6, tidak terpotong). Rekaman berhenti sendiri
  setelah 10 detik.
- **Layar harus tetap menyala dan halaman tetap terbuka** selama merekam.
  Aplikasi meminta layar tidak padam. Bila HP terkunci atau pindah
  aplikasi, iPhone menghentikan kamera dan sesi disimpan sampai titik itu.
- Data tersimpan di HP tiap 1–2 detik. Bila halaman tertutup mendadak, sesi
  muncul di tab **Sesi** sebagai *terputus*, dan bagian yang sudah tersimpan
  tetap bisa dikirim.

## 4. Kirim lewat WhatsApp ke komputer Windows

Tab **Sesi** → **Kemas & kirim** menghasilkan satu berkas
`20261108-093015-survei-Jl._Raya_ITS.zip` yang isinya sama dengan sesi
PaveRec-ITS Android:

```
20261108-093015-survei-Jl._Raya_ITS/
    video.mp4       video kamera belakang (H.264)
    jejak.gpx       posisi GPS, waktu UTC milidetik, kecepatan, ketelitian
    sensor.csv      waktu_ms,ax,ay,az,gx,gy,gz (m/s² termasuk gravitasi; rad/s)
    metadata.json   kunci sama dengan PaveRec-ITS 2.0 (+ platform "web")
```

- **iPhone**: ketuk **Bagikan** → WhatsApp → pilih kontak. Berkas terkirim
  sebagai dokumen.
- **Android**: ketuk **Unduh** (masuk ke folder *Download*), lalu di
  WhatsApp: 📎 **Lampirkan → Dokumen** → folder Download → pilih .zip.
  Chrome Android tidak mengizinkan berkas .zip dibagikan langsung dari
  halaman web, jadi harus lewat Unduh dulu.
- Jangan kirim lewat Galeri/Foto, karena WhatsApp akan mengompres videonya.
- Berkas lebih dari 1,9 GB otomatis dipecah (`.zip.001`, `.zip.002`, …)
  karena batas dokumen WhatsApp 2 GB. Untuk sinyal lemah, pilih bagian
  95 MB. Kirim **semua** bagian dan simpan di satu folder.
- Di Windows: unduh dari WhatsApp Desktop/Web, lalu impor ke PaveScanPro-ITS
  seperti sesi PaveRec biasa (tunjuk `.zip` atau `.zip.001`).
- Setelah terkirim, **Hapus** sesi di HP agar ruang penyimpanan lega.

## 5. Perbedaan dengan APK PaveRec-ITS

| Hal | APK Android | Versi web |
|---|---|---|
| Pemandu banner | perintah lengkap (MUNDUR, LURUSKAN, …), tombol rekam terkunci sampai SIAP | hanya hitung 6 kotak merah & deteksi terpotong |
| HFOV lensa | dibaca dari spesifikasi kamera | isi manual atau dari kalibrasi banner |
| Stabilisasi video | dimatikan paksa | tidak dapat diatur dari peramban; matikan *stabilisasi video* di aplikasi Kamera bila HP menyediakannya |
| Laju bingkai | tetap 30 fps | dapat bervariasi (cap waktu tetap benar) |
| Waktu mulai video | dari peristiwa CameraX | dari peristiwa `start` MediaRecorder (±0,1 s) |
| Tanda sumbu sensor iPhone | — | dicocokkan otomatis ke konvensi Android dengan orientasi perangkat; tercatat di `sensor.tanda_dibalik` |
| Kirim | bagikan .zip langsung | iPhone: bagikan; Android: unduh lalu lampirkan |

## 6. Catatan teknis

- Peramban yang hanya bisa merekam WebM (Chrome lama) memberi peringatan
  dan menyimpan `video.webm`. Perbarui Chrome agar video tersimpan sebagai MP4.
- Bingkai kunci dipaksa tiap 1 detik supaya Chrome menulis video ke
  penyimpanan selama merekam, tidak menahannya di memori. Bila peramban tetap
  menahan video di memori, muncul peringatan agar sesi dibuat pendek (≤ 5 menit).
- Video dibatasi 3,8 GB per sesi (sekitar 50 menit pada 1080p); setelah itu
  rekaman berhenti dan sesi baru perlu dimulai.
- Data disimpan di penyimpanan situs (IndexedDB) pada HP itu saja. Menghapus
  data situs atau riwayat peramban juga menghapus sesi yang belum dikirim.
