export type SoundType =
  | "clue_unlock"
  | "answer_correct"
  | "answer_wrong"
  | "option_hover"
  | "option_select"
  | "confidence_change"
  | "next_question"
  | "streak_break"
  | "level_up";

class AudioManager {
  private enabled = true;

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  play(type: SoundType): void {
    if (!this.enabled) return;
    // TODO: 接入真实音频资源
    // 预留接口：可在此处接入 Web Audio API / HTMLAudioElement
    // 示例结构：
    // const audio = this.audioCache.get(type);
    // if (audio) { audio.currentTime = 0; audio.play().catch(() => {}); }
    void type;
  }
}

export const audioManager = new AudioManager();
