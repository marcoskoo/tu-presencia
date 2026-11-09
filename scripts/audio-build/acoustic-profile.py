#!/usr/bin/env python3
"""
Análisis acústico objetivo de muestras TTS para elegir la voz de meditación.
Métricas por archivo (WAV 24kHz mono):
  - F0 medio y desviación (tono y variación tonal: menor std = más calmado)
  - fracción de frames sonorizados (voicing)
  - fracción de pausa (silencio dentro del audio: más pausa = más relajado)
  - ritmo de sílabas por segundo de habla (menor = más pausado)
  - dinámica RMS en dB (menor variación = volumen más parejo y suave)
"""
import sys, wave, math
import numpy as np

def read_wav(path):
    with wave.open(path, 'rb') as w:
        sr = w.getframerate()
        n = w.getnframes()
        sw = w.getsampwidth()
        raw = w.readframes(n)
    if sw == 2:
        x = np.frombuffer(raw, dtype='<i2').astype(np.float64) / 32768.0
    elif sw == 4:
        x = np.frombuffer(raw, dtype='<i4').astype(np.float64) / 2147483648.0
    else:
        raise ValueError(f'ancho de muestra no soportado: {sw}')
    return x, sr

def f0_track(x, sr, fmin=70, fmax=450, win=0.04, hop=0.02):
    """F0 por autocorrelación con normalización. Devuelve (tiempos, f0, sonorizado)."""
    W = int(win * sr); H = int(hop * sr)
    ts, f0s, voiced = [], [], []
    for i in range(0, len(x) - W, H):
        fr = x[i:i+W]
        if np.sqrt(np.mean(fr**2)) < 0.005:
            continue  # frame mudo
        fr = fr - fr.mean()
        r0 = np.sum(fr*fr)
        if r0 <= 0: continue
        ac = np.correlate(fr, fr, 'full')[W-1:]
        ac = ac / r0
        lag_min = int(sr / fmax); lag_max = min(int(sr / fmin), W-1)
        if lag_max <= lag_min: continue
        seg = ac[lag_min:lag_max+1]
        k = np.argmax(seg)
        if seg[k] > 0.30:  # umbral de sonorización
            # parábola para refinar
            k_true = lag_min + k
            if 0 < k_true < len(ac)-1:
                y0, y1, y2 = ac[k_true-1], ac[k_true], ac[k_true+1]
                denom = (y0 - 2*y1 + y2)
                shift = 0.5*(y0 - y2)/denom if abs(denom) > 1e-9 else 0.0
            else:
                shift = 0.0
            lag = k_true + max(-1.0, min(1.0, shift))
            f = sr / lag
            if fmin <= f <= fmax:
                ts.append((i + W/2)/sr); f0s.append(f); voiced.append(1)
        else:
            ts.append((i + W/2)/sr); f0s.append(np.nan); voiced.append(0)
    return np.array(ts), np.array(f0s), np.array(voiced)

def envelope_bursts(x, sr, hop=0.01):
    """Sobres de amplitud y detección de núcleos silábicos (ráfagas de energía)."""
    H = int(hop*sr)
    env = []
    for i in range(0, len(x)-H, H):
        fr = x[i:i+H]
        env.append(np.sqrt(np.mean(fr**2)))
    env = np.array(env)
    thr = env.max()*0.06 + 1e-6
    above = env > thr
    # contar ráfagas: transiciones abajo->arriba
    bursts = 0
    prev = False
    for a in above:
        if a and not prev: bursts += 1
        prev = a
    return env, above, bursts, thr

def analyze(path):
    x, sr = read_wav(path)
    dur = len(x)/sr
    ts, f0, voiced = f0_track(x, sr)
    v = voiced == 1
    f0v = f0[v]
    if len(f0v) >= 3:
        f0_mean = float(np.mean(f0v))
        f0_std_st = float(np.std(20*np.log10(f0v[f0v>0])/math.log(10)*0+np.log2(f0v)*12)) if len(f0v) else float('nan')
        # desviación estándar en semitonos
        st = 12*np.log2(f0v/np.median(f0v))
        f0_std_st = float(np.std(st))
    else:
        f0_mean, f0_std_st = float('nan'), float('nan')
    env, above, bursts, thr = envelope_bursts(x, sr)
    speech_frames = int(above.sum())
    total_frames = len(above)
    pause_frac = 1 - speech_frames/total_frames if total_frames else float('nan')
    speech_sec = speech_frames*0.01
    syl_rate = bursts/speech_sec if speech_sec > 0 else float('nan')
    env_db = 20*np.log10(env[above]+1e-9) if speech_frames else np.array([np.nan])
    dyn_db = float(np.percentile(env_db, 90) - np.percentile(env_db, 10)) if speech_frames else float('nan')
    return {
        'dur': dur, 'f0_mean': f0_mean, 'f0_std_st': f0_std_st,
        'pause_frac': pause_frac, 'syl_rate': syl_rate, 'dyn_db': dyn_db,
        'voiced_frac': float(v.mean()) if len(voiced) else float('nan'),
    }

FILES = [
    ('voice-matrix-v2/tongtong.wav',  'tongtong @0.80 (actual)'),
    ('voice-matrix-v2/chuichui.wav',  'chuichui @0.80'),
    ('duelo/tongtong-075.wav',        'tongtong @0.75'),
    ('duelo/tongtong-085.wav',        'tongtong @0.85'),
    ('duelo/chuichui-075.wav',        'chuichui @0.75'),
    ('duelo/chuichui-085.wav',        'chuichui @0.85'),
]

import os
base = os.path.dirname(os.path.abspath(__file__))
# archivos extra desde CLI: acoustic-profile.py <ruta> <etiqueta> [...]
if len(sys.argv) > 1:
    args = sys.argv[1:]
    for i in range(0, len(args), 2):
        FILES.append((args[i], args[i+1] if i+1 < len(args) else args[i]))
print(f"{'muestra':<24} {'dur':>6} {'F0med':>6} {'F0±st':>6} {'paus%':>6} {'síl/s':>6} {'dyn±dB':>7}")
print('-'*70)
for rel, label in FILES:
    p = os.path.join(base, rel)
    if not os.path.exists(p):
        print(f"{label:<24} FALTA")
        continue
    m = analyze(p)
    f0s = f"{m['f0_mean']:.0f}Hz" if m['f0_mean']==m['f0_mean'] else '  —'
    st = f"{m['f0_std_st']:.1f}" if m['f0_std_st']==m['f0_std_st'] else ' —'
    pf = f"{m['pause_frac']*100:.0f}%"
    sr_ = f"{m['syl_rate']:.2f}" if m['syl_rate']==m['syl_rate'] else ' —'
    dy = f"{m['dyn_db']:.1f}" if m['dyn_db']==m['dyn_db'] else ' —'
    print(f"{label:<24} {m['dur']:>5.1f}s {f0s:>6} {st:>6} {pf:>6} {sr_:>6} {dy:>7}")
print()
print('Guía de lectura — voz de meditación ideal: F0med bajo-medio · F0±st bajo (2-4 st) ·')
print('paus% alto (30-55%) · síl/s bajo (3-4.5) · dyn±dB bajo (6-12 dB)')
