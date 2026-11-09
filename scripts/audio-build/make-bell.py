"""Sintetiza una campana tipo cuenco tibetano con parciales inarmónicos y decaimiento exponencial."""
import numpy as np
import wave

SR = 24000  # misma tasa que el TTS

def bell(freq: float, duration: float, volume: float, path: str):
    n = int(SR * duration)
    t = np.arange(n) / SR

    # Parciales inarmónicos típicos de campanas/cuencos (relación, amplitud, decaimiento)
    partials = [
        (1.0,   1.00, 2.6),   # fundamental, decae lento
        (2.75,  0.42, 3.4),   # tercero de campana
        (5.40,  0.22, 5.0),
        (8.93,  0.10, 7.0),
    ]

    signal = np.zeros(n)
    for ratio, amp, decay in partials:
        f = freq * ratio
        if f > SR / 2 - 200:
            continue
        env = amp * np.exp(-decay * t)
        # batido suave entre parciales cercanos (rasgo de cuencos reales)
        signal += env * np.sin(2 * np.pi * f * t) * (0.9 + 0.1 * np.sin(2 * np.pi * 1.7 * t))

    # Ataque suave (golpe de maza): rampa de 12 ms
    attack = int(0.012 * SR)
    signal[:attack] *= np.linspace(0, 1, attack)

    # Cola final con fade para evitar clic
    fade = int(0.5 * SR)
    signal[-fade:] *= np.linspace(1, 0, fade)

    # Normalizar al volumen objetivo
    peak = np.max(np.abs(signal))
    signal = signal / peak * volume

    # A 16-bit PCM mono
    pcm = (signal * 32767).astype(np.int16)
    with wave.open(path, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(f'{path}: {duration}s @ {freq} Hz, vol {volume}')

# Campana de inicio (más cálida, fa# grave) y de cierre (algo más aguda y suave)
bell(185.0, 8.0, 0.55, '/home/z/my-project/scripts/audio-build/bell-start.wav')
bell(220.0, 9.0, 0.45, '/home/z/my-project/scripts/audio-build/bell-end.wav')
# Campana para la "campana de presencia" (interactiva, más brillante)
bell(246.9, 10.0, 0.85, '/home/z/my-project/scripts/audio-build/bell-presence.wav')
# Ding corto y sutil para marcar el cambio de fase en la respiración guiada
bell(587.33, 2.2, 0.40, '/home/z/my-project/scripts/audio-build/ding-fase.wav')
