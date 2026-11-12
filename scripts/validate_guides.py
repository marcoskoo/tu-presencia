#!/usr/bin/env python3
"""Valida los guiones de meditación: cobertura temporal por pista e idioma.

Estima el habla a 13 caracteres/segundo (ritmo 0.92) y compara el total
habla+pausas con la duración real del mp3 correspondiente.
"""
import re

SRC = '/home/z/my-project/src/lib/meditation-guides.ts'
AUDIO = {
    'presencia': 313.8, 'escaneo': 270.8, 'dormir': 256.8, 'pausa': 71.6,
    'caminando': 552.8, 'yogaNidra': 538.8, 'extendida': 961.8,
}

content = open(SRC, encoding='utf-8').read()

# Divide por meditación: "  <id>: {" a nivel de objeto MEDITATION_GUIDES
med_re = re.compile(r'^  (\w+): \{$', re.M)
parts = med_re.split(content)[1:]  # [id, bloque, id, bloque, ...]
print(f"{'meditación':<12} {'es':>7} {'en':>7} {'pt':>7}  pista   cobertura")
ok = True
for i in range(0, len(parts), 2):
    mid, block = parts[i], parts[i + 1]
    if mid not in AUDIO:
        continue  # cabecera u otros objetos
    totals = {}
    for lang in ('es', 'en', 'pt'):
        m = re.search(rf'{lang}: \[(.*?)\]', block, re.S)
        cues = re.findall(r"text: '(.*?)', pause: (\d+)", m.group(1))
        dur = sum(len(t) / 13 + int(p) for t, p in cues)
        totals[lang] = dur
    track = AUDIO[mid]
    cov = max(totals.values()) / track
    flag = '' if 0.55 <= cov <= 0.9 else '  ← REVISAR'
    if flag:
        ok = False
    print(f"{mid:<12} {totals['es']:>6.0f}s {totals['en']:>6.0f}s {totals['pt']:>6.0f}s  {track:>5.0f}s  {cov:>5.0%}{flag}")
print('\nOK: todos los guiones dentro del 55–90% de la pista' if ok else '\nATENCIÓN: guiones fuera de rango')
