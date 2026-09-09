# Gallery documentation / Dokumentasi galeri

Current edition / Edisi saat ini: **1.2**, 9 September 2026.

| Language / Bahasa | Markdown | PDF |
|---|---|---|
| Bahasa Indonesia | [Guide](GALLERY-GUIDE.id.md) | [PDF](../output/pdf/interactive-gallery-guide.id.pdf) |
| English | [Guide](GALLERY-GUIDE.en.md) | [PDF](../output/pdf/interactive-gallery-guide.en.pdf) |

Version 1.2 adds the complete two-room architecture: typed room registry, passage portal and hitbox, camera-arrival callback, four-phase transition state machine, fade overlay, scene reset, and guarded input. It also records the English application interface. The skylight building remains native Three.js geometry rather than a flat image or GLB conversion.

Versi 1.2 menambahkan arsitektur dua ruangan secara lengkap: registry bertipe, portal dan hitbox lorong, callback kedatangan kamera, state machine empat fase, overlay fade, reset scene, dan penguncian input. Dokumentasi juga mencatat antarmuka aplikasi yang kini berbahasa Inggris. Bangunan skylight tetap dibuat dengan geometri Three.js.

The shorter [multi-room note](MULTI-ROOM.md) is a bilingual implementation summary; both full guides now contain the canonical step-by-step explanation.

## Rebuild / Ekspor ulang

The Markdown guides are the source of truth. Update both language editions before exporting. PDF diagrams render Mermaid connections as labeled vector arrows; the Markdown retains the original Mermaid graph syntax.

Markdown menjadi sumber utama. Perbarui kedua bahasa sebelum ekspor. Diagram PDF menampilkan koneksi Mermaid sebagai panah vektor berlabel; Markdown tetap menyimpan sintaks graph Mermaid.

```bash
python3 -m venv .venv-docs
.venv-docs/bin/pip install reportlab pymupdf pillow
.venv-docs/bin/python docs/build_guides.py --qa
```

Run these commands from the project root. The builder uses Arial/Courier New on macOS or DejaVu fonts on Linux. Install those fonts if missing. `--qa` writes rendered pages and contact sheets to `tmp/pdfs/v1.2-review/` for visual review; omit it to export PDFs only. Version labels are read from the Markdown front matter text.

Jalankan dari root proyek. Builder memakai Arial/Courier New pada macOS atau DejaVu pada Linux. Opsi `--qa` membuat preview untuk pemeriksaan visual. Hasil akhir ditulis ke `output/pdf/`, dengan nama file tetap agar tautan dokumen tidak berubah.
