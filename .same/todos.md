# Media-Austausch: Supabase-Medien (Videos + Fotos)

## Quelle
Supabase Bucket `viedos` (public) – 3 Videos + 12 Fotos echter Einsätze.

## VIDEOS (Priorität 1 – zuerst) ✅ FERTIG
- [x] ffmpeg (arm64) installiert
- [x] 3 Videos aus Supabase geladen (.MOV/.MOV/.AVI)
- [x] Transkodiert zu web-tauglichem H.264 MP4 + Poster
  - kamerabefahrung-stromkabel.mp4 (Featured, Landscape, 1:48)
  - einsatz-kanal.mp4 (Portrait Reel)
  - einsatz-rohr.mp4 (Portrait Reel)
- [x] Alte, ungenutzte Videos entfernt
- [x] `workVideos` Daten in company.ts
- [x] `VideoShowcase` Komponente gebaut (Featured + Reels + Lightbox)
- [x] Auf Startseite eingebunden (Sektion 8)
- [x] Auf /arbeiten Seite eingebunden
- [x] Poster geschärft (Stromkabel klar sichtbar)
- [x] Lint OK

## FOTOS (Priorität 2) ✅ FERTIG
- [x] 12 Fotos aus Supabase (public/work/, komprimiert)
- [x] Alte "Arbeiten"-Bilder ersetzt (gallery + beforeAfterGallery in company.ts → /work/)
- [x] Echtes Vorher/Nachher: kanalreinigung-vorher/-nachher (interaktiver Slider)
- [x] Foto-Kategorien: Kanalreinigung, Rohrreinigung, Abflussreinigung, Kamera-Inspektion
- [x] Homepage Gallery neu gebaut (Inline Vorher/Nachher + Foto-Grid + Lightbox)
- [x] /arbeiten nutzt echte Fotos (mit Kategorie-Filter)
- [x] Mitarbeiter-Foto in AboutUs eingebunden
- [x] Alte Platzhalter-Bilder gelöscht (26 Dateien) + BeforeAfterSlider.tsx entfernt
- [x] Lint OK
