"use client";
import { useRef, useState } from "react";
import { C, E } from "../styles/tokens";
import { Reveal, Label } from "./ui";

/* ============================================================
   REMORA — Video section (sits right after the Hero)
   - Click to play, with sound. The file only downloads its first
     bit (preload="metadata") until someone presses play, so the
     page stays fast on phones.
   - Adapts to the video's real shape: a landscape video fills the
     width, a portrait video is kept to a phone-sized column.
   - Plays inline on iPhone (no forced fullscreen).
   - After the video ends, the play button comes back for replay.
   The video file lives in the repo at public/remora.mp4
   ============================================================ */

const VIDEO_SRC = "/remora.mp4";

const CSS = `
.vs-frame{position:relative;margin:0 auto;border-radius:24px;overflow:hidden;background:#0F172A;border:1.5px solid #E2E8F0;box-shadow:0 24px 64px rgba(15,23,42,.14),0 8px 24px rgba(15,23,42,.06);transition:max-width .4s cubic-bezier(.16,1,.3,1)}
.vs-video{display:block;width:100%;height:100%;object-fit:contain;background:#0F172A}
.vs-cover{position:absolute;inset:0;width:100%;height:100%;border:none;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;background:linear-gradient(to top,rgba(15,23,42,.5) 0%,rgba(15,23,42,.08) 55%,rgba(15,23,42,.18) 100%);-webkit-tap-highlight-color:transparent}
.vs-play{position:relative;width:84px;height:84px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 40px rgba(15,23,42,.35);transition:transform .3s cubic-bezier(.16,1,.3,1)}
.vs-cover:hover .vs-play{transform:scale(1.08)}
.vs-cover:active .vs-play{transform:scale(.96)}
.vs-play::before,.vs-play::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid rgba(255,255,255,.7);animation:vs-ring 2.2s ease-out infinite}
.vs-play::after{animation-delay:1.1s}
.vs-chip{position:absolute;left:50%;bottom:clamp(14px,3vw,24px);transform:translateX(-50%);display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:99px;background:rgba(15,23,42,.62);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#fff;font-size:12.5px;font-weight:700;white-space:nowrap}
@keyframes vs-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.9);opacity:0}}
@media(max-width:600px){
  .vs-frame{border-radius:18px}
  .vs-play{width:64px;height:64px}
  .vs-play svg{width:26px;height:26px}
}
@media(prefers-reduced-motion:reduce){.vs-play::before,.vs-play::after{animation:none;opacity:0}}
`;

export default function VideoSection() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false); // user has pressed play at least once
  const [ended, setEnded] = useState(false);
  const [ratio, setRatio] = useState(16 / 9);    // updated to the real shape once metadata loads

  const showCover = !started || ended;

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    if (ended) { v.currentTime = 0; setEnded(false); }
    setStarted(true);
    const p = v.play();
    // If the browser refuses for any reason, native controls are already visible,
    // so the visitor can simply press play there.
    if (p && typeof p.catch === "function") p.catch(() => {});
  };

  const onMeta = (e) => {
    const { videoWidth: w, videoHeight: h } = e.currentTarget;
    if (w && h) setRatio(w / h);
  };

  // Landscape fills the column; portrait/square stays phone-sized.
  const maxWidth = ratio >= 1.2 ? 960 : ratio >= 0.9 ? 620 : 400;

  return (
    <section id="video" style={{
      padding: "clamp(56px,8vw,110px) clamp(20px,4vw,40px)",
      background: C.bg || C.light,
    }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)" }}>
          <Label text="Watch" color={C.blue} />
          <h2 style={{
            fontSize: "clamp(26px,4.5vw,42px)", fontWeight: 900, color: C.dark,
            letterSpacing: "-0.8px", lineHeight: 1.15, maxWidth: 620, margin: "0 auto 14px",
          }}>
            See how Remora works
          </h2>
          <p style={{
            fontSize: "clamp(14px,1.6vw,16px)", color: C.gray, maxWidth: 480,
            margin: "0 auto", lineHeight: 1.8,
          }}>
            A short look at how one system connects your orders, calls, documents and team.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="vs-frame" style={{ maxWidth, aspectRatio: String(ratio) }}>
            <video
              ref={videoRef}
              className="vs-video"
              src={`${VIDEO_SRC}#t=0.1`}
              preload="metadata"
              playsInline
              controls={started && !ended}
              onLoadedMetadata={onMeta}
              onEnded={() => setEnded(true)}
              aria-label="Remora overview video"
            />

            {showCover && (
              <button type="button" className="vs-cover" onClick={play}
                aria-label={ended ? "Replay video" : "Play video"}>
                <span className="vs-play">
                  {ended ? (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill={C.blue} aria-hidden="true">
                      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                    </svg>
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill={C.blue} aria-hidden="true" style={{ marginLeft: 4 }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </span>
                <span className="vs-chip">{ended ? "Watch again" : "Tap to play with sound"}</span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
