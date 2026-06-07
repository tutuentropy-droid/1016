export type SoundType =
  | "clue_unlock"
  | "answer_correct"
  | "answer_wrong"
  | "option_hover"
  | "option_select"
  | "confidence_change"
  | "next_question"
  | "streak_break"
  | "level_up"
  | "case_open"
  | "briefing_tick"
  | "detail_focus"
  | "paper_flip"
  | "stamp_hit";

class AudioManager {
  private enabled = true;
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  private ensureContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (this.audioCtx) return this.audioCtx;
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new Ctx();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.value = 0.12;
      this.masterGain.connect(this.audioCtx.destination);
      return this.audioCtx;
    } catch {
      return null;
    }
  }

  private tone(
    freq: number,
    duration: number,
    type: OscillatorType = "sine",
    gain = 0.6,
    sweepTo?: number
  ) {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (sweepTo !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(sweepTo, 0.01),
        ctx.currentTime + duration
      );
    }
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
  }

  private chord(freqs: number[], duration: number, type: OscillatorType = "triangle", gain = 0.35) {
    freqs.forEach((f, i) => {
      setTimeout(() => this.tone(f, duration, type, gain), i * 40);
    });
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  play(type: SoundType): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      void ctx.resume();
    }

    switch (type) {
      case "clue_unlock":
        this.chord([523.25, 659.25, 783.99], 0.2, "triangle", 0.3);
        break;
      case "answer_correct":
        this.chord([523.25, 659.25, 783.99, 1046.5], 0.35, "sine", 0.45);
        setTimeout(() => this.tone(1318.5, 0.4, "sine", 0.3), 150);
        break;
      case "answer_wrong":
        this.tone(200, 0.15, "sawtooth", 0.25);
        setTimeout(() => this.tone(150, 0.25, "sawtooth", 0.25), 80);
        break;
      case "option_hover":
        this.tone(800, 0.05, "sine", 0.1);
        break;
      case "option_select":
        this.tone(600, 0.08, "triangle", 0.2);
        break;
      case "confidence_change":
        this.tone(700, 0.08, "sine", 0.18);
        setTimeout(() => this.tone(900, 0.08, "sine", 0.18), 50);
        break;
      case "next_question":
        this.tone(440, 0.06, "square", 0.12);
        setTimeout(() => this.tone(554.37, 0.1, "triangle", 0.18), 60);
        break;
      case "streak_break":
        this.tone(300, 0.2, "sawtooth", 0.2);
        break;
      case "level_up":
        this.chord([523.25, 659.25, 783.99, 1046.5, 1318.5], 0.5, "sine", 0.4);
        break;
      case "case_open":
        this.tone(120, 0.8, "sine", 0.25, 60);
        setTimeout(() => this.chord([392, 493.88, 587.33], 0.35, "triangle", 0.25), 300);
        break;
      case "briefing_tick":
        this.tone(1000, 0.04, "square", 0.08);
        break;
      case "detail_focus":
        this.tone(880, 0.15, "sine", 0.2, 1320);
        break;
      case "paper_flip":
        this.tone(2000, 0.05, "sawtooth", 0.06);
        setTimeout(() => this.tone(1500, 0.08, "sawtooth", 0.05), 30);
        break;
      case "stamp_hit":
        this.tone(120, 0.08, "square", 0.3);
        break;
    }
  }
}

export const audioManager = new AudioManager();
