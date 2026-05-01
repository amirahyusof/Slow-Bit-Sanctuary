# 🎨 Theme Guide: Whimsical Watercolor

> Gaya **Whimsical Watercolor** sangat secocok dengan konsep **Slow Bit Sanctuary**. Ia membawa aura yang tenang, tidak terburu-buru, dan sangat manusiawi — berbeza dengan gaya grafik korporat yang kaku.

---

## 1. Elemen Visual "Slow Growth"

Daripada menggunakan ikon material design yang standard, gunakan ilustrasi cat air untuk:

- **Progress Markers** — Gambar tunas kecil yang membesar menjadi bunga mengikut tahap kemajuan.
- **Empty States** — Jika tiada aktiviti, paparkan ilustrasi secawan teh yang berasap atau kerusi taman yang kosong dengan gaya lembut ini.

---

## 2. Tipografi yang Harmoni

Untuk mengekalkan estetika _cozy_, padankan ilustrasi ini dengan:

| Jenis Font | Contoh | Kegunaan |
|---|---|---|
| **Serif** | *Lora*, *Playfair Display*, *Crimson Text* | Tajuk, heading — rupa klasik dan matang |
| **Handwritten** | *Indie Flower*, *Quicksand* | Nota kecil, kapsyen — rasa lebih personal |

---

## 3. Palet Warna "Intentional"

| Elemen | Warna Hex | Nama | Mood |
|---|---|---|---|
| **Daun / Pokok** | `#8DAA91` | Sage Green | Tenang & Matang |
| **Tanah** | `#C2A38A` | Soft Terracotta | Stabil & Bumi |
| **Bunga** | `#F4E1D2` | Creamy Pink | Lembut & Gembira |
| **Latar Belakang** | `#FDFBF7` | Parchment White | Bersih & Selesa |
| **Aksen Sunset** | `#E8A87C` | Warm Peach | Rehat & Senja |
| **Aksen Lavender** | `#C9B8D8` | Dusty Lavender | Tenang & Mimpi |

> **Tip:** Elakkan warna putih `#FFFFFF` yang terlalu tajam. Gunakan warna krim lembut `#FDFBF7` untuk latar belakang supaya mata lebih selesa (kurang *eye strain*).

---

## 4. Representasi Visual Pertumbuhan

Bahagikan aset visual mengikut tahap kemajuan dalam taman:

### Tahap Pertumbuhan Pokok

| Tahap | Visual | Trigger |
|---|---|---|
| **Benih** | Titik keemasan kecil dalam tanah | Hari pertama |
| **Tunas (Stage 0)** | Dua helai daun hijau sage kecil | Hari 1 |
| **Anak Pokok (Stage 1)** | Batang melengkung organik + daun lebih besar | Hari 2–3 |
| **Pokok Muda (Stage 2)** | Batang kuat + kuntum tertutup | Hari 4–6 |
| **Bunga Mekar (Stage 3)** | Bunga penuh + kesan brushstroke watercolor | Hari 7+ |

### Jenis Bunga

| Nama | Warna | Hex |
|---|---|---|
| Pink Dahlia | Merah jambu lembut | `#F4B8C8` |
| Lavender Tulip | Ungu dusty | `#C9B8D8` |
| Mint Daisy | Hijau mint | `#B8E8D0` |
| Peach Rose | Peach hangat | `#F4D4B8` |
| Sunset Marigold | Oren lembut | `#F4C87C` |

---

## 5. Elemen Persekitaran (Ambience)

Untuk menghidupkan suasana taman yang *intentional*, tambah elemen kecil:

- **Serangga Baik** — Ilustrasi lebah atau rama-rama kecil dalam gaya watercolor minimalis sebagai penanda aktiviti atau *streak*.
- **Cuaca** — Titisan hujan dengan kesan tompokan cat air yang cair untuk waktu "self-reflection" atau rehat (Bukan Hustle mode).
- **Cahaya** — Kesan cahaya lembut dari atas semasa Bright Day mode; cahaya oren hangat semasa Warm Sunset mode.

---

## 6. Implementasi Teknikal (React + Tailwind)

### CSS Classes yang digunakan

```css
/* Rounded corners — tiada bucu tajam */
rounded-2xl   /* untuk kad dan butang */
rounded-full  /* untuk badge dan avatar */

/* Soft shadows — nampak seperti "terletak di atas kertas" */
shadow-sm
drop-shadow-[0_2px_8px_rgba(139,94,46,0.12)]

/* Opacity untuk tekstur watercolor */
opacity-80    /* untuk lapisan warna */
opacity-60    /* untuk elemen latar */
```

### SVG Approach

```jsx
// Gunakan SVG paths melengkung (bukan rect pixel)
// untuk semua ilustrasi pokok dan bunga
// Contoh batang organik:
<path d="M 10 30 Q 8 20 12 10" stroke="#8DAA91" strokeWidth="2"
      fill="none" strokeLinecap="round" />
```

### Floating Animation

```css
/* Untuk pergerakan bunga dan daun — perlahan dan menenangkan */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-4px) rotate(1deg); }
  66%       { transform: translateY(-2px) rotate(-1deg); }
}
animation: float 4s ease-in-out infinite;
```

---

## 7. Mom Mode Colour Mapping

| Mode | Sky | Background | Border | Mood |
|---|---|---|---|---|
| **Bright Day** | `#FDE8D0` → `#FFF8F0` | `#FDFBF7` | `#C2A38A` | Fokus pagi |
| **Warm Sunset** | `#F4A87C` → `#F4D4A0` | `#FFF0E0` | `#C8784A` | Rehat petang |

---

## 8. Font Stack

```css
/* Import dalam index.css */
@import url('https://fonts.googleapis.com/css2?
  family=Lora:ital,wght@0,400;0,600;1,400&
  family=Indie+Flower&
  family=Nunito:wght@400;600&
  display=swap');

/* Usage */
--font-heading:     'Lora', Georgia, serif;
--font-handwritten: 'Indie Flower', cursive;
--font-body:        'Nunito', sans-serif;
```

---

*Theme ini dibangunkan berdasarkan konsep "Intentional Garden" — sebuah ruang digital yang tenang, organik, dan manusiawi.*