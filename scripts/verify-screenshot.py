"""Verificación visual de la landing: no vacía, paleta presente, contenido renderizado."""
from PIL import Image

img = Image.open('/tmp/landing-full.png').convert('RGB')
w, h = img.size
print(f'Dimensiones: {w}x{h}')

# 1. No vacía: ratio de píxeles no-blancos/negros puros
pixels = list(img.getdata())
total = len(pixels)
non_extreme = sum(1 for p in pixels if not (p[0] > 250 and p[1] > 250 and p[2] > 250))
print(f'Píxeles no-blancos: {non_extreme/total:.1%} (debe ser > 15%)')

# 2. Presencia de la paleta cálida (crema, salvia, terracota) con tolerancia
def near(p, target, tol=28):
    return all(abs(a - b) <= tol for a, b in zip(p, target))

cream = (248, 244, 236)
sage = (111, 139, 103)
terracotta = (193, 121, 90)
gold = (176, 141, 87)

counts = {'crema': 0, 'salvia': 0, 'terracota': 0, 'dorado': 0}
sample = pixels[::37]
for p in sample:
    if near(p, cream, 10): counts['crema'] += 1
    elif near(p, sage): counts['salvia'] += 1
    elif near(p, terracotta): counts['terracota'] += 1
    elif near(p, gold): counts['dorado'] += 1

n = len(sample)
for k, v in counts.items():
    print(f'Color {k}: {v/n:.2%}')

# 3. Secciones por franjas horizontales: variación vertical (indica contenido diverso)
import statistics
gray = img.convert('L')
rows = []
step_y = max(1, h // 60)
for y in range(0, h, step_y):
    row = [gray.getpixel((x, y)) for x in range(0, w, 40)]
    rows.append(statistics.mean(row))
var = statistics.pstdev(rows)
print(f'Variación de brillo entre secciones: {var:.1f} (debe ser > 8 para indicar secciones distintas)')
print('OK' if non_extreme/total > 0.15 and var > 8 else 'REVISAR')
