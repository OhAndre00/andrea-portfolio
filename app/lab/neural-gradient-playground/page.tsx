"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, RefreshCw } from "lucide-react";

type Palette = {
  name: string;
  a: string;
  b: string;
  c: string;
};

type PlaygroundPreset = {
  name: string;
  bgFrom: string;
  bgTo: string;
  palette: Palette;
  angle: number;
  intensity: number;
  spread: number;
  blur: number;
  speed: number;
  orbSize: number;
  saturation: number;
  contrast: number;
  grain: number;
  vignette: number;
  aX: number;
  aY: number;
  bX: number;
  bY: number;
  cX: number;
  cY: number;
};

type Settings = Omit<PlaygroundPreset, "name">;

const presets: PlaygroundPreset[] = [
  {
    name: "Site Aurora (Default)",
    bgFrom: "#07090d",
    bgTo: "#121c2c",
    palette: { name: "Aurora", a: "#3EC7A2", b: "#6BB8FF", c: "#FFD17B" },
    angle: 136,
    intensity: 64,
    spread: 43,
    blur: 56,
    speed: 12,
    orbSize: 246,
    saturation: 140,
    contrast: 114,
    grain: 10,
    vignette: 26,
    aX: 14,
    aY: 16,
    bX: 88,
    bY: 18,
    cX: 46,
    cY: 88,
  },
  {
    name: "Ocean Glass",
    bgFrom: "#081320",
    bgTo: "#111f34",
    palette: { name: "Ocean", a: "#53E3C2", b: "#6BAFFF", c: "#7BD8FF" },
    angle: 124,
    intensity: 58,
    spread: 46,
    blur: 62,
    speed: 14,
    orbSize: 260,
    saturation: 134,
    contrast: 108,
    grain: 7,
    vignette: 22,
    aX: 18,
    aY: 24,
    bX: 82,
    bY: 23,
    cX: 48,
    cY: 84,
  },
  {
    name: "Product Sunset",
    bgFrom: "#14101a",
    bgTo: "#1f1a28",
    palette: { name: "Sunset", a: "#FF8A65", b: "#FFD36B", c: "#7AB8FF" },
    angle: 122,
    intensity: 61,
    spread: 45,
    blur: 54,
    speed: 11,
    orbSize: 252,
    saturation: 146,
    contrast: 116,
    grain: 8,
    vignette: 30,
    aX: 16,
    aY: 17,
    bX: 86,
    bY: 21,
    cX: 49,
    cY: 87,
  },
  {
    name: "Light Frost",
    bgFrom: "#dfe8f4",
    bgTo: "#c5d6eb",
    palette: { name: "Frost", a: "#3EC7A2", b: "#6BB8FF", c: "#A0D4FF" },
    angle: 155,
    intensity: 45,
    spread: 52,
    blur: 48,
    speed: 13,
    orbSize: 234,
    saturation: 120,
    contrast: 105,
    grain: 6,
    vignette: 14,
    aX: 20,
    aY: 15,
    bX: 84,
    bY: 16,
    cX: 51,
    cY: 85,
  },
];

function presetToSettings(preset: PlaygroundPreset): Settings {
  const { name: _name, ...settings } = preset;
  return settings;
}

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace("#", "").trim();

  if (value.length === 3) {
    const r = Number.parseInt(value[0] + value[0], 16);
    const g = Number.parseInt(value[1] + value[1], 16);
    const b = Number.parseInt(value[2] + value[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
  }

  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hslToHex(hue: number, saturation: number, lightness: number) {
  const s = saturation / 100;
  const l = lightness / 100;

  const convert = (n: number) => {
    const k = (n + hue / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const color = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${convert(0)}${convert(8)}${convert(4)}`;
}

function randomAccentColor() {
  return hslToHex(randomInt(0, 359), randomInt(62, 96), randomInt(56, 72));
}

function randomBaseColor() {
  return hslToHex(randomInt(190, 320), randomInt(24, 58), randomInt(6, 18));
}

export default function NeuralGradientPlaygroundPage() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [settings, setSettings] = useState<Settings>(() =>
    presetToSettings(presets[0]),
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copiedTarget, setCopiedTarget] = useState<"none" | "css" | "react">(
    "none",
  );

  const palette = settings.palette;
  const alpha = Math.max(0.22, settings.intensity / 100);

  const backgroundImage = useMemo(
    () =>
      [
        `radial-gradient(circle at ${settings.aX}% ${settings.aY}%, ${hexToRgba(palette.a, alpha)} 0%, transparent ${settings.spread}%)`,
        `radial-gradient(circle at ${settings.bX}% ${settings.bY}%, ${hexToRgba(palette.b, alpha)} 0%, transparent ${settings.spread - 2}%)`,
        `radial-gradient(circle at ${settings.cX}% ${settings.cY}%, ${hexToRgba(palette.c, alpha * 0.9)} 0%, transparent ${settings.spread + 2}%)`,
        `linear-gradient(${settings.angle}deg, ${settings.bgFrom}, ${settings.bgTo})`,
      ].join(",\n"),
    [
      settings.aX,
      settings.aY,
      settings.angle,
      settings.bX,
      settings.bY,
      settings.bgFrom,
      settings.bgTo,
      settings.cX,
      settings.cY,
      settings.spread,
      palette.a,
      palette.b,
      palette.c,
      alpha,
    ],
  );

  const previewStyle = useMemo(
    () => ({
      backgroundImage,
      filter: `saturate(${settings.saturation}%) contrast(${settings.contrast}%)`,
      transitionDuration: `${Math.max(0.28, settings.speed / 11)}s`,
    }),
    [backgroundImage, settings.contrast, settings.saturation, settings.speed],
  );

  const cssSnippet = useMemo(() => {
    const grainLayer = settings.grain
      ? `

.neural-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 0.7px, transparent 0.7px);
  background-size: 2px 2px;
  opacity: ${(settings.grain / 100).toFixed(2)};
}`
      : "";

    const vignetteLayer = settings.vignette
      ? `

.neural-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at center, rgba(255,255,255,0) 45%, rgba(0,0,0,0.72) 100%);
  opacity: ${(settings.vignette / 100).toFixed(2)};
}`
      : "";

    return `.neural-bg {
  position: relative;
  overflow: hidden;
  background-image: ${backgroundImage.replace(/\n/g, " ")};
  filter: saturate(${settings.saturation}%) contrast(${settings.contrast}%);
}${grainLayer}${vignetteLayer}`;
  }, [
    backgroundImage,
    settings.contrast,
    settings.grain,
    settings.saturation,
    settings.vignette,
  ]);

  const reactStyleSnippet = useMemo(
    () =>
      `const neuralStyle = {
  backgroundImage: \`${backgroundImage}\`,
  filter: "saturate(${settings.saturation}%) contrast(${settings.contrast}%)",
};`,
    [backgroundImage, settings.contrast, settings.saturation],
  );

  const updateSetting = <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setSettings(presetToSettings(presets[index]));
  };

  const randomize = () => {
    const randomPresetIndex = randomInt(0, presets.length - 1);
    const preset = presets[randomPresetIndex];
    const bgFrom = randomBaseColor();
    const bgTo = randomBaseColor();
    const palette = {
      name: "Wild",
      a: randomAccentColor(),
      b: randomAccentColor(),
      c: randomAccentColor(),
    };

    setSelectedPresetIndex(randomPresetIndex);
    setSettings({
      ...presetToSettings(preset),
      bgFrom,
      bgTo,
      palette,
      angle: randomInt(0, 360),
      intensity: randomInt(34, 90),
      spread: randomInt(30, 66),
      blur: randomInt(24, 92),
      speed: randomInt(6, 22),
      orbSize: randomInt(160, 360),
      saturation: randomInt(90, 190),
      contrast: randomInt(88, 145),
      grain: randomInt(0, 24),
      vignette: randomInt(0, 38),
      aX: randomInt(0, 34),
      aY: randomInt(0, 36),
      bX: randomInt(62, 100),
      bY: randomInt(0, 36),
      cX: randomInt(14, 76),
      cY: randomInt(56, 100),
    });
  };

  const copyToClipboard = async (text: string, target: "css" | "react") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTarget(target);
      window.setTimeout(() => setCopiedTarget("none"), 1600);
    } catch {
      setCopiedTarget("none");
    }
  };

  return (
    <section className="section-shell relative min-h-screen px-4 pb-20 pt-30 sm:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-4">
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-(--ink-1) transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Lab
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="glass-panel overflow-hidden rounded-3xl border border-white/15 p-4 sm:p-6">
            <div
              className="relative min-h-100 overflow-hidden rounded-2xl border border-white/12"
              style={previewStyle}
            >
              <div
                className="absolute -left-16 -top-16 h-56 w-56 rounded-full"
                style={{
                  background: palette.a,
                  width: `${settings.orbSize}px`,
                  height: `${settings.orbSize}px`,
                  filter: `blur(${settings.blur}px)`,
                  animation: `floatOrb ${settings.speed}s ease-in-out infinite`,
                }}
              />
              <div
                className="absolute -right-12 top-8 h-60 w-60 rounded-full"
                style={{
                  background: palette.b,
                  width: `${Math.round(settings.orbSize * 1.12)}px`,
                  height: `${Math.round(settings.orbSize * 1.12)}px`,
                  filter: `blur(${settings.blur}px)`,
                  animation: `floatOrb ${Math.max(6, settings.speed - 2)}s ease-in-out infinite`,
                  animationDelay: "1.2s",
                }}
              />
              <div
                className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full"
                style={{
                  background: palette.c,
                  width: `${Math.round(settings.orbSize * 0.94)}px`,
                  height: `${Math.round(settings.orbSize * 0.94)}px`,
                  filter: `blur(${settings.blur}px)`,
                  animation: `floatOrb ${settings.speed + 2}s ease-in-out infinite`,
                  animationDelay: "2.3s",
                }}
              />

              {settings.grain > 0 && (
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    opacity: settings.grain / 100,
                    backgroundImage:
                      "radial-gradient(rgba(255, 255, 255, 0.08) 0.7px, transparent 0.7px)",
                    backgroundSize: "2px 2px",
                  }}
                />
              )}

              {settings.vignette > 0 && (
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    opacity: settings.vignette / 100,
                    background:
                      "radial-gradient(circle at center, rgba(255,255,255,0) 40%, rgba(0,0,0,0.72) 100%)",
                  }}
                />
              )}

              <div className="relative z-10 flex min-h-100 flex-col justify-end p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[rgba(255,255,255,0.74)]">
                  Neural Gradient Playground
                </p>
                <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[rgba(255,255,255,0.98)] sm:text-4xl">
                  Preset vibe: {palette.name}
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[rgba(255,255,255,0.88)]">
                  Build atmospheric backgrounds in your portfolio style and ship
                  copy-ready code directly to your dev team.
                </p>
              </div>
            </div>
          </div>

          <aside className="glass-panel rounded-3xl border border-white/15 p-6 xl:h-[72vh] xl:max-h-175 xl:overflow-y-auto xl:pr-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">
                {showAdvanced ? "Advanced Controls" : "Quick Controls"}
              </h2>
              <button
                onClick={randomize}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-(--ink-1) transition-colors duration-200 hover:text-white"
              >
                <RefreshCw size={14} />
                Randomize
              </button>
            </div>

            <button
              onClick={() => setShowAdvanced((prev) => !prev)}
              className="mt-3 inline-flex items-center rounded-xl border border-white/20 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-(--ink-1) transition-colors duration-200 hover:text-white"
            >
              {showAdvanced ? "Hide Advanced" : "Show Advanced"}
            </button>

            <div className="mt-5 space-y-6">
              <div>
                <span className="mb-2 block text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                  Preset
                </span>
                <select
                  value={selectedPresetIndex}
                  onChange={(event) => applyPreset(Number(event.target.value))}
                  className="w-full rounded-xl border border-white/20 bg-white/8 px-3 py-2.5 text-sm text-white outline-none transition-colors duration-200 focus:border-[rgba(62,199,162,0.65)]"
                >
                  {presets.map((preset, index) => (
                    <option
                      key={preset.name}
                      value={index}
                      className="bg-[#0d141f]"
                    >
                      {preset.name}
                    </option>
                  ))}
                </select>
              </div>

              {showAdvanced && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      Base Start
                    </span>
                    <input
                      type="color"
                      value={settings.bgFrom}
                      onChange={(event) =>
                        updateSetting("bgFrom", event.target.value)
                      }
                      className="h-10 w-full cursor-pointer rounded-xl border border-white/20 bg-white/8"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      Base End
                    </span>
                    <input
                      type="color"
                      value={settings.bgTo}
                      onChange={(event) =>
                        updateSetting("bgTo", event.target.value)
                      }
                      className="h-10 w-full cursor-pointer rounded-xl border border-white/20 bg-white/8"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      Orb A
                    </span>
                    <input
                      type="color"
                      value={settings.palette.a}
                      onChange={(event) =>
                        updateSetting("palette", {
                          ...settings.palette,
                          a: event.target.value,
                        })
                      }
                      className="h-10 w-full cursor-pointer rounded-xl border border-white/20 bg-white/8"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      Orb B
                    </span>
                    <input
                      type="color"
                      value={settings.palette.b}
                      onChange={(event) =>
                        updateSetting("palette", {
                          ...settings.palette,
                          b: event.target.value,
                        })
                      }
                      className="h-10 w-full cursor-pointer rounded-xl border border-white/20 bg-white/8"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      Orb C
                    </span>
                    <input
                      type="color"
                      value={settings.palette.c}
                      onChange={(event) =>
                        updateSetting("palette", {
                          ...settings.palette,
                          c: event.target.value,
                        })
                      }
                      className="h-10 w-full cursor-pointer rounded-xl border border-white/20 bg-white/8"
                    />
                  </label>
                </div>
              )}

              <label className="block">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                  <span>Intensity</span>
                  <span>{settings.intensity}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={settings.intensity}
                  onChange={(event) =>
                    updateSetting("intensity", Number(event.target.value))
                  }
                  className="w-full"
                />
              </label>

              {showAdvanced && (
                <label className="block">
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                    <span>Spread</span>
                    <span>{settings.spread}%</span>
                  </div>
                  <input
                    type="range"
                    min={32}
                    max={62}
                    value={settings.spread}
                    onChange={(event) =>
                      updateSetting("spread", Number(event.target.value))
                    }
                    className="w-full"
                  />
                </label>
              )}

              <label className="block">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                  <span>Blur</span>
                  <span>{settings.blur}px</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={92}
                  value={settings.blur}
                  onChange={(event) =>
                    updateSetting("blur", Number(event.target.value))
                  }
                  className="w-full"
                />
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                  <span>Motion Speed</span>
                  <span>{settings.speed}s</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={24}
                  value={settings.speed}
                  onChange={(event) =>
                    updateSetting("speed", Number(event.target.value))
                  }
                  className="w-full"
                />
              </label>

              {showAdvanced && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      <span>Saturation</span>
                      <span>{settings.saturation}%</span>
                    </div>
                    <input
                      type="range"
                      min={90}
                      max={180}
                      value={settings.saturation}
                      onChange={(event) =>
                        updateSetting("saturation", Number(event.target.value))
                      }
                      className="w-full"
                    />
                  </label>
                  <label className="block">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      <span>Contrast</span>
                      <span>{settings.contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min={90}
                      max={145}
                      value={settings.contrast}
                      onChange={(event) =>
                        updateSetting("contrast", Number(event.target.value))
                      }
                      className="w-full"
                    />
                  </label>
                  <label className="block">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      <span>Grain</span>
                      <span>{settings.grain}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={24}
                      value={settings.grain}
                      onChange={(event) =>
                        updateSetting("grain", Number(event.target.value))
                      }
                      className="w-full"
                    />
                  </label>
                  <label className="block">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      <span>Vignette</span>
                      <span>{settings.vignette}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={40}
                      value={settings.vignette}
                      onChange={(event) =>
                        updateSetting("vignette", Number(event.target.value))
                      }
                      className="w-full"
                    />
                  </label>
                  <label className="block">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      <span>Angle</span>
                      <span>{settings.angle}deg</span>
                    </div>
                    <input
                      type="range"
                      min={90}
                      max={220}
                      value={settings.angle}
                      onChange={(event) =>
                        updateSetting("angle", Number(event.target.value))
                      }
                      className="w-full"
                    />
                  </label>
                  <label className="block">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      <span>Orb Size</span>
                      <span>{settings.orbSize}px</span>
                    </div>
                    <input
                      type="range"
                      min={180}
                      max={340}
                      value={settings.orbSize}
                      onChange={(event) =>
                        updateSetting("orbSize", Number(event.target.value))
                      }
                      className="w-full"
                    />
                  </label>

                  <label className="block">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      <span>Orb A Position</span>
                      <span>
                        {settings.aX}% / {settings.aY}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={35}
                      value={settings.aX}
                      onChange={(event) =>
                        updateSetting("aX", Number(event.target.value))
                      }
                      className="w-full"
                    />
                    <input
                      type="range"
                      min={0}
                      max={40}
                      value={settings.aY}
                      onChange={(event) =>
                        updateSetting("aY", Number(event.target.value))
                      }
                      className="mt-2 w-full"
                    />
                  </label>

                  <label className="block">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      <span>Orb B Position</span>
                      <span>
                        {settings.bX}% / {settings.bY}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={64}
                      max={100}
                      value={settings.bX}
                      onChange={(event) =>
                        updateSetting("bX", Number(event.target.value))
                      }
                      className="w-full"
                    />
                    <input
                      type="range"
                      min={0}
                      max={40}
                      value={settings.bY}
                      onChange={(event) =>
                        updateSetting("bY", Number(event.target.value))
                      }
                      className="mt-2 w-full"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.13em] text-(--ink-2)">
                      <span>Orb C Position</span>
                      <span>
                        {settings.cX}% / {settings.cY}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={75}
                      value={settings.cX}
                      onChange={(event) =>
                        updateSetting("cX", Number(event.target.value))
                      }
                      className="w-full"
                    />
                    <input
                      type="range"
                      min={56}
                      max={100}
                      value={settings.cY}
                      onChange={(event) =>
                        updateSetting("cY", Number(event.target.value))
                      }
                      className="mt-2 w-full"
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-white/15 bg-white/7 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-[0.14em] text-(--ink-2)">
                  Export for Developers
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(cssSnippet, "css")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/8 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-(--ink-1) transition-colors duration-200 hover:text-white"
                  >
                    {copiedTarget === "css" ? (
                      <Check size={13} />
                    ) : (
                      <Copy size={13} />
                    )}
                    Copy CSS
                  </button>
                  {showAdvanced && (
                    <button
                      onClick={() =>
                        copyToClipboard(reactStyleSnippet, "react")
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/8 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-(--ink-1) transition-colors duration-200 hover:text-white"
                    >
                      {copiedTarget === "react" ? (
                        <Check size={13} />
                      ) : (
                        <Copy size={13} />
                      )}
                      Copy React
                    </button>
                  )}
                </div>
              </div>
              <pre className="mt-2 max-h-52 overflow-auto text-xs leading-relaxed text-(--ink-1)">
                {cssSnippet}
              </pre>
              {showAdvanced && (
                <pre className="mt-3 max-h-44 overflow-auto rounded-xl border border-white/12 bg-[rgba(5,10,18,0.4)] p-3 text-xs leading-relaxed text-(--ink-1)">
                  {reactStyleSnippet}
                </pre>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
