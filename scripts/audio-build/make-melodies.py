"""
Pistas de meditación SIN VOZ: melodías instrumentales generativas.
Sustituye a los mp3 guiados por TTS (a petición: "quitar voz, solo sonidos
relajantes, de preferencia melodías de meditación").

Cada pista, misma estructura y duración que la versión con voz:
  campana de inicio (-3 dB) + 2 s + MELODÍA + 2.5 s + campana de cierre (-3 dB)
La melodía se compone por capas, en pentatónica menor (entonación natural,
sin disonancias):
  - drone continuo una octava por debajo (con batido lento)
  - acordes pad con ataque/release de varios segundos
  - frases melódicas dispersas de tonos de cuenco y tonos suaves
Todo determinista por semilla (reproducible).

Mismos nombres de archivo y duraciones → la app no requiere cambios.
"""
import numpy as np
import wave
import subprocess
import os

SR = 24000
BASE = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = '/home/z/my-project/public/audios'
F32 = np.float32

RATIOS = [1.0, 6 / 5, 4 / 3, 3 / 2, 9 / 5]  # pentatónica menor, entonación natural


def read_wav(path):
    with wave.open(path, 'rb') as w:
        x = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').astype(np.float32) / 32768.0
    return x


def write_wav(path, x):
    pcm = np.clip(x, -1.0, 1.0)
    with wave.open(path, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((pcm * 32767).astype(np.int16).tobytes())


def bowl(freq, dur, vol, decay_mult=1.0):
    """Golpe de cuenco: parciales inarmónicos y decaimiento exponencial (como make-bell.py)."""
    n = int(SR * dur)
    t = np.arange(n, dtype=F32) / SR
    two_pi = np.float32(2 * np.pi)
    partials = [(1.0, 1.00, 2.6), (2.75, 0.42, 3.4), (5.40, 0.22, 5.0), (8.93, 0.10, 7.0)]
    s = np.zeros(n, dtype=F32)
    for ratio, amp, dec in partials:
        f = np.float32(freq * ratio)
        if f > SR / 2 - 300:
            continue
        e = np.exp((-np.float32(dec * decay_mult)) * t, dtype=F32)
        carrier = np.sin(two_pi * f * t, dtype=F32)
        beat = (np.float32(0.9) + np.float32(0.1) * np.sin(two_pi * np.float32(1.7) * t, dtype=F32)).astype(F32)
        s += (amp * e * carrier * beat).astype(F32)
    k = int(0.015 * SR)
    s[:k] *= np.linspace(0, 1, k, dtype=F32)
    fdt = int(0.4 * SR)
    s[-fdt:] *= np.linspace(1, 0, fdt, dtype=F32)
    return s * np.float32(vol)


def soft_tone(freq, dur, vol):
    """Nota sostenida suave (armónicos 2.º y 3.º a bajo nivel, ataque lento)."""
    n = int(SR * dur)
    t = np.arange(n, dtype=F32) / SR
    two_pi = np.float32(2 * np.pi)
    f = np.float32(freq)
    s = (np.sin(two_pi * f * t, dtype=F32)
         + np.float32(0.28) * np.sin(two_pi * np.float32(2) * f * t + np.float32(0.7), dtype=F32)
         + np.float32(0.08) * np.sin(two_pi * np.float32(3) * f * t, dtype=F32)).astype(F32)
    env = np.exp(-t / np.float32(dur * 0.55), dtype=F32)
    a = int(0.35 * SR)
    env[:a] *= np.linspace(0, 1, a, dtype=F32)
    fdt = int(0.5 * SR)
    env[-fdt:] *= np.linspace(1, 0, fdt, dtype=F32)
    return s * env * np.float32(vol / 1.35)


def pad_chord(freqs, dur, vol):
    """Acorde pad: voces con ligera desafinación, ataque 7 s y caída 10 s."""
    n = int(SR * dur)
    t = np.arange(n, dtype=F32) / SR
    two_pi = np.float32(2 * np.pi)
    s = np.zeros(n, dtype=F32)
    for i, f in enumerate(freqs):
        det = np.float32(1 + 0.0002 * ((i % 2) * 2 - 1))
        v = np.sin(two_pi * np.float32(f) * det * t + np.float32(i * 1.3), dtype=F32)
        v += np.float32(0.22) * np.sin(two_pi * np.float32(2 * f) * t + np.float32(i), dtype=F32)
        s += v.astype(F32)
    env = np.ones(n, dtype=F32)
    a = int(7 * SR)
    r = int(10 * SR)
    env[:a] = np.linspace(0, 1, a, dtype=F32) ** 1.5
    env[-r:] = np.linspace(1, 0, r, dtype=F32) ** 1.5
    env *= (np.float32(0.88) + np.float32(0.12) * np.sin(two_pi * np.float32(0.06) * t + np.float32(1.0), dtype=F32)).astype(F32)
    return s * env * np.float32(vol / len(freqs) / 1.4)


def drone(freq, dur, vol):
    """Nota pedal con batido lento (dos copias ±0.04 %) y LFO de amplitud."""
    n = int(SR * dur)
    t = np.arange(n, dtype=F32) / SR
    two_pi = np.float32(2 * np.pi)
    f = np.float32(freq)
    s = (np.sin(two_pi * f * t, dtype=F32)
         + np.float32(0.5) * np.sin(two_pi * f * np.float32(1.0004) * t + np.float32(0.5), dtype=F32)
         + np.float32(0.5) * np.sin(two_pi * f * np.float32(0.9996) * t - np.float32(0.5), dtype=F32)
         + np.float32(0.22) * np.sin(two_pi * f * np.float32(2) * t, dtype=F32)).astype(F32)
    lfo = (np.float32(0.75) + np.float32(0.25) * np.sin(two_pi * np.float32(0.045) * t, dtype=F32)).astype(F32)
    return s * lfo * np.float32(vol / 1.7)


def add(buf, x, at):
    i = int(at * SR)
    j = min(i + len(x), len(buf))
    if j > i:
        buf[i:j] += x[: j - i]


def step_freq(root, lo_oct, step):
    step = int(step)
    octv = lo_oct + step // 5
    return float(root * (2.0 ** octv) * RATIOS[step % 5])


# (id, archivo, campana de inicio?, segundos de melodía, raíz Hz, octava de melodía,
#  semilla, huecos entre notas s, amplitud de nota, decaimiento de nota s,
#  periodo de pads s, amplitud pad, amplitud drone, fundido final s)
TRACKS = [
    dict(id='presencia', out='meditacion-presencia.mp3', intro=True, music=291.0,
         root=146.83, lo=1, seed=101, gap=(7.0, 12.0), note_amp=(0.13, 0.17),
         note_decay=(5.0, 8.0), pad_period=(26, 40), pad_amp=0.055,
         drone_amp=0.045, fade_out=7.0),
    dict(id='escaneo', out='meditacion-escaneo.mp3', intro=True, music=248.0,
         root=174.61, lo=0, seed=202, gap=(8.0, 14.0), note_amp=(0.12, 0.16),
         note_decay=(6.0, 9.0), pad_period=(30, 46), pad_amp=0.05,
         drone_amp=0.05, fade_out=7.0),
    dict(id='dormir', out='meditacion-dormir.mp3', intro=True, music=234.0,
         root=220.0, lo=0, seed=303, gap=(12.0, 20.0), note_amp=(0.10, 0.14),
         note_decay=(7.0, 11.0), pad_period=(36, 54), pad_amp=0.045,
         drone_amp=0.05, fade_out=12.0),
    dict(id='pausa', out='meditacion-pausa.mp3', intro=False, music=65.0,
         root=164.81, lo=1, seed=404, gap=(10.0, 16.0), note_amp=(0.12, 0.15),
         note_decay=(6.0, 9.0), pad_period=(26, 26), pad_amp=0.05,
         drone_amp=0.04, fade_out=5.0),
    dict(id='caminando', out='meditacion-caminando.mp3', intro=True, music=530.0,
         root=196.0, lo=1, seed=505, gap=(5.5, 9.0), note_amp=(0.12, 0.16),
         note_decay=(5.0, 8.0), pad_period=(28, 42), pad_amp=0.05,
         drone_amp=0.045, fade_out=8.0),
    dict(id='yoga-nidra', out='meditacion-yoga-nidra.mp3', intro=True, music=516.0,
         root=130.81, lo=1, seed=606, gap=(16.0, 26.0), note_amp=(0.11, 0.15),
         note_decay=(8.0, 12.0), pad_period=(44, 66), pad_amp=0.05,
         drone_amp=0.055, fade_out=9.0),
    dict(id='presencia-extendida', out='meditacion-presencia-extendida.mp3', intro=True, music=939.0,
         root=146.83, lo=1, seed=707, gap=(14.0, 24.0), note_amp=(0.10, 0.14),
         note_decay=(9.0, 13.0), pad_period=(50, 78), pad_amp=0.045,
         drone_amp=0.05, fade_out=10.0),
]


def compose_music(cfg):
    rng = np.random.default_rng(cfg['seed'])
    music = cfg['music']
    root, lo = cfg['root'], cfg['lo']
    buf = np.zeros(int(SR * music), dtype=F32)

    # 1) drone continuo
    add(buf, drone(root / 2.0, music, cfg['drone_amp']), 0.0)

    # 2) acordes pad
    t = float(rng.uniform(8, 20))
    while t < music - 35:
        dur = float(rng.uniform(22, 34))
        color = 6 / 5 if rng.random() < 0.5 else 9 / 5
        f0 = root * (2.0 ** lo)
        add(buf, pad_chord([f0, f0 * 1.5, f0 * 2 * color], dur, cfg['pad_amp']), t)
        t += float(rng.uniform(*cfg['pad_period']))

    # 3) frases melódicas (paseo aleatorio por la pentatónica)
    deg = int(rng.integers(0, 3))
    t = float(rng.uniform(4, 8))
    while t < music - 16:
        phrase = int(rng.integers(3, 7))
        for _ in range(phrase):
            if t >= music - 16:
                break
            f = step_freq(root, lo, deg)
            dur = float(rng.uniform(*cfg['note_decay'])) + 1.0
            amp = float(rng.uniform(*cfg['note_amp']))
            if rng.random() < 0.55:
                x = bowl(f, dur, amp, decay_mult=float(rng.uniform(0.8, 1.2)))
            else:
                x = soft_tone(f, dur, amp * 0.9)
            add(buf, x, t)
            t += float(rng.uniform(*cfg['gap']))
        # la frase tiende a volver al grado bajo; después, un descanso más largo
        deg = max(0, deg - int(rng.integers(0, 2)))
        t += float(rng.uniform(*cfg['gap'])) * 1.7

    # 4) fundidos globales y normalización a pico 0.35 (~ -9 dBFS)
    n = len(buf)
    fi = int(2.5 * SR)
    buf[:fi] *= np.linspace(0, 1, fi, dtype=F32)
    fo = int(cfg['fade_out'] * SR)
    buf[-fo:] *= np.linspace(1, 0, fo, dtype=F32)
    peak = float(np.max(np.abs(buf)))
    if peak > 0:
        buf *= (0.35 / peak)
    return buf


def main():
    bell_3db = 10 ** (-3 / 20)
    bell_start = read_wav(os.path.join(BASE, 'bell-start.wav')) * bell_3db
    bell_end = read_wav(os.path.join(BASE, 'bell-end.wav')) * bell_3db
    ding = read_wav(os.path.join(BASE, 'ding-fase.wav')) * bell_3db

    def sil(sec):
        return np.zeros(int(SR * sec), dtype=F32)

    for cfg in TRACKS:
        print(f"→ {cfg['id']} ({cfg['music']:.0f} s de melodía)…", flush=True)
        music = compose_music(cfg)
        if cfg['intro']:
            full = np.concatenate([bell_start, sil(2.0), music, sil(2.5), bell_end, sil(1.2)])
        else:
            full = np.concatenate([sil(0.6), music, sil(2.5), ding, sil(1.2)])

        tmp = os.path.join(BASE, f"tmp-{cfg['id']}.wav")
        out = os.path.join(OUT_DIR, cfg['out'])
        write_wav(tmp, full)
        subprocess.run(
            ['ffmpeg', '-y', '-i', tmp, '-codec:a', 'libmp3lame', '-b:a', '64k',
             '-ar', '24000', '-ac', '1', out],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        os.remove(tmp)

        p = subprocess.run(
            ['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
             '-of', 'csv=p=0', out], capture_output=True, text=True)
        dur = float(p.stdout.strip())
        size = os.path.getsize(out) / 1024 / 1024
        print(f"✓ {cfg['out']}: {int(dur // 60)}m {dur % 60:04.1f}s · {size:.2f} MB")


if __name__ == '__main__':
    main()
