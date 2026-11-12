#!/usr/bin/env python3
"""
Compone la imagen OG (1200×630) de Presencia AQUÍ y AHORA:
arte base generado con IA + velo cremoso superior + tipografía serif.

Uso: python3 scripts/compose-og.py
"""
from PIL import Image, ImageDraw, ImageFont

SRC = "scripts/og-art.png"
OUT = "public/og-image.jpg"

W, H = 1200, 630

SERIF = "/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf"
SERIF_SEMI = "/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-SemiBold.ttf"

INK = (53, 48, 42)        # --ink del sitio
SAGE_DARK = (90, 115, 83) # salvia con contraste sobre crema
GOLD_DARK = (150, 112, 63)
MUTED = (107, 95, 77)

def tracked_text(draw, xy, text, font, fill, tracking):
    """Dibuja texto con espaciado entre letras, devolviendo el ancho total."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x - xy[0] - tracking

def centered_tracked(draw, y, text, font, fill, tracking):
    w = sum(draw.textlength(c, font=font) + tracking for c in text) - tracking
    tracked_text(draw, ((W - w) / 2, y), text, font, fill, tracking)
    return w

def main():
    base = Image.open(SRC).convert("RGB")
    # Recorte centrado 1216×640 → 1200×630
    bx = (base.width - W) // 2
    by = (base.height - H) // 2
    im = base.crop((bx, by, bx + W, by + H))

    # Velo cremoso en la mitad superior para asegurar contraste del texto
    veil = Image.new("L", (1, H), 0)
    for y in range(H):
        if y < 430:
            alpha = int(160 * (1 - y / 430) ** 1.4)
        else:
            alpha = 0
        veil.putpixel((0, y), alpha)
    veil = veil.resize((W, H))
    cream = Image.new("RGB", (W, H), (248, 244, 236))
    im = Image.composite(cream, im, veil)

    draw = ImageDraw.Draw(im)

    # Eyebrow: PRESENCIA con tracking amplio
    f_eyebrow = ImageFont.truetype(SERIF, 30)
    centered_tracked(draw, 128, "PRESENCIA", f_eyebrow, SAGE_DARK, 16)

    # Título: AQUÍ y AHORA (la «y» en dorado)
    f_title = ImageFont.truetype(SERIF_SEMI, 112)
    parts = [("AQUÍ ", INK), ("y", GOLD_DARK), (" AHORA", INK)]
    total = sum(draw.textlength(t, font=f_title) for t, _ in parts)
    x = (W - total) / 2
    for text, color in parts:
        draw.text((x, 186), text, font=f_title, fill=color)
        x += draw.textlength(text, font=f_title)

    # Divisor fino salvia
    draw.rounded_rectangle([(W - 130) / 2, 350, (W + 130) / 2, 353],
                           radius=1.5, fill=SAGE_DARK)

    # Tagline
    f_tag = ImageFont.truetype(SERIF, 31)
    tagline = "melodías de meditación · respiración consciente · presencia"
    tw = draw.textlength(tagline, font=f_tag)
    draw.text(((W - tw) / 2, 386), tagline, font=f_tag, fill=MUTED)

    im.save(OUT, "JPEG", quality=87, optimize=True)
    print(f"OK {OUT} {im.size}")

if __name__ == "__main__":
    main()
