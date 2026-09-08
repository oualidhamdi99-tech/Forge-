let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  return ctx;
}

export function chimeRestDone() {
  const ac = getCtx();
  if (!ac) return;
  void ac.resume();
  const now = ac.currentTime;
  const tones = [0, 0.16, 0.32];
  tones.forEach((t, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "square";
    osc.frequency.value = i === 2 ? 1174 : 880;
    gain.gain.setValueAtTime(0.0001, now + t);
    gain.gain.exponentialRampToValueAtTime(0.07, now + t + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.12);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(now + t);
    osc.stop(now + t + 0.14);
  });
}

export function tick() {
  const ac = getCtx();
  if (!ac) return;
  void ac.resume();
  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "sine";
  osc.frequency.value = 660;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.03, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(now);
  osc.stop(now + 0.06);
}
