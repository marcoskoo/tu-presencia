#!/usr/bin/env python3
"""Verifica que las pistas de melodía tienen contenido continuo:
RMS por bloques de 30 s — cada bloque debe superar -45 dBFS (no silencio digital)."""
import subprocess
import sys
import wave

import numpy as np

SR = 24000
FILES = [
    'meditacion-presencia.mp3',
    'meditacion-dormir.mp3',
    'meditacion-pausa.mp3',
    'meditacion-presencia-extendida.mp3',
]
BASE = '/home/z/my-project/public/audios'

ok = True
for name in FILES:
    wav = f'/tmp/verify-{name}.wav'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', f'{BASE}/{name}', '-c:a', 'pcm_s16le', wav],
                   check=True)
    with wave.open(wav, 'rb') as w:
        x = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').astype(np.float32) / 32768.0
    dur = len(x) / SR
    block = 30 * SR
    rms_db = []
    for i in range(0, len(x), block):
        seg = x[i:i + block]
        # ignorar colas parciales tras la campana final (intencionalmente silenciosas)
        if len(seg) < 5 * SR:
            continue
        rms = float(np.sqrt(np.mean(seg ** 2)))
        rms_db.append(20 * np.log10(rms + 1e-9))
    low = [round(v, 1) for v in rms_db if v < -45]
    print(f'{name}: {dur/60:.1f} min · bloques RMS(30s) min={min(rms_db):.1f} dB '
          f'media={np.mean(rms_db):.1f} dB · bloques en silencio: {len(low)}')
    if low:
        ok = False

print('RESULTADO:', 'OK — contenido continuo' if ok else 'FALLO — hay silencio digital')
sys.exit(0 if ok else 1)
