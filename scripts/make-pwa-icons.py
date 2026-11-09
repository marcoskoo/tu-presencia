#!/usr/bin/env python3
"""Genera los iconos PWA (192/512 + maskable + apple-touch) desde icon.svg."""

import cairosvg
from PIL import Image, ImageDraw, ImageFilter
import os

OUT = '/home/z/my-project/public/icons'
os.makedirs(OUT, exist_ok=True)

SVG = '/home/z/my-project/src/app/icon.svg'

# 1) Iconos estándar desde el SVG (fondo sage con enso)
for size in (192, 512):
    cairosvg.svg2png(url=SVG, write_to=f'{OUT}/icon-{size}.png',
                     output_width=size, output_height=size)

# 2) Versión maskable: el enso ocupa el 78 % del área (zona segura)
maskable_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
  <rect width="48" height="48" fill="#6f8b67"/>
  <circle cx="24" cy="24" r="13" stroke="#f8f4ec" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="72 14.5" transform="rotate(-50 24 24)"/>
  <circle cx="24" cy="24" r="3.2" fill="#f8f4ec" opacity="0.9"/>
</svg>'''
for size in (192, 512):
    cairosvg.svg2png(bytestring=maskable_svg.encode(), write_to=f'{OUT}/maskable-{size}.png',
                     output_width=size, output_height=size)

# 3) Apple touch icon 180 con fondo redondeado estilo iOS
apple_size = 180
cairosvg.svg2png(url=SVG, write_to='/tmp/apple-flat.png',
                 output_width=apple_size, output_height=apple_size)
img = Image.open('/tmp/apple-flat.png').convert('RGBA')

# iOS recorta las esquinas: fondo del color de la página
bg = Image.new('RGBA', (apple_size, apple_size), (247, 245, 240, 255))
bg.paste(img, (0, 0), img)

# Máscara redondeada
mask = Image.new('L', (apple_size, apple_size), 0)
d = ImageDraw.Draw(mask)
radius = int(apple_size * 0.2237)
d.rounded_rectangle([0, 0, apple_size - 1, apple_size - 1], radius=radius, fill=255)
rounded = Image.new('RGBA', (apple_size, apple_size), (0, 0, 0, 0))
rounded.paste(bg, (0, 0), mask)
rounded.save(f'{OUT}/apple-touch-icon.png')

# 4) Favicon SVG copiado también a la raíz pública
import shutil
shutil.copy(SVG, '/home/z/my-project/public/favicon.svg')

print('Iconos generados:')
for f in sorted(os.listdir(OUT)):
    print(' ', f, Image.open(os.path.join(OUT, f)).size)
