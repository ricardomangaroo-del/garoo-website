import {
  AbsoluteFill,
  Sequence,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { loadFont as loadLuckiestGuy } from "@remotion/google-fonts/LuckiestGuy";
import { loadFont as loadBaloo2 } from "@remotion/google-fonts/Baloo2";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";

const { fontFamily: luckiestGuy } = loadLuckiestGuy();
const { fontFamily: baloo2 } = loadBaloo2("normal", { weights: ["700", "800"] });
const { fontFamily: nunito } = loadNunito("normal", { weights: ["700", "800"] });

export const FPS = 30;
export const DURATION_IN_FRAMES = 450; // 15s

// Matter MazeBall's actual in-game palette (see gyro-maze/style.css) —
// reused here and on the website so the trailer, hero, and game read as one thing.
const INK = "#283044";
const PAPER = "#fffaf0";
const SKY_TOP = "#6fc3f2";
const SKY_BOTTOM = "#cfeffd";
const GREEN = "#58c968";
const GOLD = "#f5a623";

const hardShadow = (px: number) => `0 ${px}px 0 ${INK}`;

const SkyBackdrop: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(180deg, ${SKY_TOP} 0%, ${SKY_BOTTOM} 100%)`,
    }}
  />
);

// A comic-panel card: thick ink border + flat offset shadow, no blur —
// the game's signature "physical" surface treatment, reused for every panel.
const ComicCard: React.FC<{
  children: React.ReactNode;
  background?: string;
  radius?: number;
  shadowPx?: number;
  style?: React.CSSProperties;
}> = ({ children, background = PAPER, radius = 28, shadowPx = 10, style }) => (
  <div
    style={{
      background,
      border: `4px solid ${INK}`,
      borderRadius: radius,
      boxShadow: hardShadow(shadowPx),
      ...style,
    }}
  >
    {children}
  </div>
);

const popIn = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.6 },
  });

// ---------- Beat 1: studio logo ----------
const LogoBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = popIn(frame, fps, 0);
  const fadeOut = interpolate(frame, [60, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <SkyBackdrop />
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", gap: 24 }}
      >
        <div style={{ transform: `scale(${scale})` }}>
          <ComicCard
            radius={40}
            shadowPx={12}
            style={{ padding: "36px 48px", display: "flex", alignItems: "center", gap: 20 }}
          >
            <Img src={staticFile("garoo-icon.png")} style={{ width: 84, height: 84, display: "block" }} />
            <span
              style={{
                fontFamily: baloo2,
                fontWeight: 800,
                fontSize: 52,
                color: INK,
              }}
            >
              Garoo Interactive
            </span>
          </ComicCard>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- Beat 2: game title reveal ----------
const TitleBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [110, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleScale = popIn(frame, fps, 6);
  const ballRoll = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 120 } });
  const ballX = interpolate(ballRoll, [0, 1], [-260, 0]);
  const ballSpin = interpolate(frame, [20, 150], [0, 900]);

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <SkyBackdrop />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ transform: `scale(${titleScale})`, textAlign: "center" }}>
          <div
            style={{
              fontFamily: luckiestGuy,
              fontSize: 108,
              color: "#ffffff",
              WebkitTextStroke: `4px ${INK}`,
              textShadow: `6px 7px 0 ${INK}`,
              lineHeight: 1,
              padding: "0 40px",
            }}
          >
            Matter MazeBall
          </div>
          <div
            style={{
              marginTop: 22,
              fontFamily: baloo2,
              fontWeight: 800,
              fontSize: 40,
              color: INK,
              WebkitTextStroke: `1.4px ${INK}`,
              textShadow: `3px 4px 0 rgba(40,48,68,0.35)`,
            }}
          >
            tilt. roll. survive.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 140,
            transform: `translateX(${ballX}px) rotate(${ballSpin}deg)`,
          }}
        >
          <Img
            src={staticFile("mazeball-icon.png")}
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              border: `4px solid ${INK}`,
              boxShadow: hardShadow(8),
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- Beat 3: screenshot showcase with feature chips ----------
const FEATURES = [
  { label: "30 elemental balls", delay: 20, color: GOLD },
  { label: "39 mazes · 3 worlds", delay: 45, color: GREEN },
  { label: "living hazards & weather", delay: 70, color: "#7fb4f2" },
];

const ShowcaseBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [130, 160], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Slow Ken Burns push-in on the screenshot — the only "camera" motion in the piece.
  const zoom = interpolate(frame, [0, 160], [1, 1.08], { extrapolateRight: "clamp" });
  const panelScale = popIn(frame, fps, 0);
  const isLandscape = width >= 1500; // vertical/square layouts stack; landscape sits side-by-side

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <SkyBackdrop />
      <AbsoluteFill
        style={{
          flexDirection: isLandscape ? "row" : "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 48,
          padding: 64,
        }}
      >
        <div style={{ transform: `scale(${panelScale})` }}>
          <ComicCard radius={32} shadowPx={12} style={{ padding: 14, overflow: "hidden" }}>
            <div style={{ overflow: "hidden", borderRadius: 18, width: isLandscape ? 620 : 720 }}>
              <Img
                src={staticFile("mazeball-screenshot.png")}
                style={{
                  width: "100%",
                  display: "block",
                  transform: `scale(${zoom})`,
                  transformOrigin: "center",
                }}
              />
            </div>
          </ComicCard>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {FEATURES.map((f) => {
            const s = popIn(frame, fps, f.delay);
            const x = interpolate(s, [0, 1], [60, 0]);
            return (
              <div
                key={f.label}
                style={{ opacity: s, transform: `translateX(${x}px)` }}
              >
                <ComicCard
                  background={f.color}
                  radius={999}
                  shadowPx={6}
                  style={{ padding: "14px 28px" }}
                >
                  <span style={{ fontFamily: baloo2, fontWeight: 800, fontSize: 30, color: INK }}>
                    {f.label}
                  </span>
                </ComicCard>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- Beat 4: CTA outro ----------
const CtaBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeScale = popIn(frame, fps, 0);
  const btnScale = popIn(frame, fps, 12);
  const pulse = 1 + Math.sin(frame / 8) * 0.03;

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <SkyBackdrop />
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", gap: 28 }}
      >
        <div style={{ transform: `scale(${badgeScale})` }}>
          <ComicCard
            background={GOLD}
            radius={999}
            shadowPx={6}
            style={{ padding: "10px 24px" }}
          >
            <span style={{ fontFamily: nunito, fontWeight: 800, fontSize: 24, color: INK }}>
              Out Now on Steam
            </span>
          </ComicCard>
        </div>
        <div style={{ transform: `scale(${btnScale * pulse})` }}>
          <ComicCard
            background={GREEN}
            radius={24}
            shadowPx={10}
            style={{ padding: "22px 44px" }}
          >
            <span style={{ fontFamily: luckiestGuy, fontSize: 44, color: PAPER, WebkitTextStroke: `2px ${INK}` }}>
              Play Now
            </span>
          </ComicCard>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Trailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: nunito }}>
      <Sequence from={0} durationInFrames={90}>
        <LogoBeat />
      </Sequence>
      <Sequence from={80} durationInFrames={150}>
        <TitleBeat />
      </Sequence>
      <Sequence from={210} durationInFrames={160}>
        <ShowcaseBeat />
      </Sequence>
      <Sequence from={350} durationInFrames={100}>
        <CtaBeat />
      </Sequence>
    </AbsoluteFill>
  );
};
