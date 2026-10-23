import { useEffect, useMemo, useRef, useState } from "react";

const TITLE = "HAPPIEST BIRTHDAY TO MY PRETTIEST GIRLLLL MY KHAYRA!!! <333";

const PARAGRAPHS = [
  "AAAAA, MY BABYYYY IS GETTING OLDER!! i wish i could give you the biggest hug and the sweetest kisses ever today, sayanggg :(( i hope life always treats you gently, just like i always try to do, and that you’ll always have a million reasons to smile every single day. you deserve ALL the love, happiness, and beautiful things this world has to offer, baby, and so much more than words could ever explain.",
  "i’m genuinely so so grateful that you exist, that you were born into this world, and that somehow, out of all the people i could’ve met, i got to meet YOU and call you mine. how lucky am i to have someone as precious as you in my life?? i hope this new chapter brings you endless happiness, beautiful memories, and all the little things your heart has been wishing for. i hope you never forget how loved, appreciated, and special you are, especially on the days when life gets a little too hard.",
  "and of courseee, i hope i get to celebrate so many more birthdays with you, growing alongside you, loving you more every day, and making even the simplest moments feel special. i’ll always be cheering for you, supporting you through everything, and reminding you just how amazing you are whenever you need it, my love.",
  "HAPPY BIRTHDAY ONCE AGAIN, MY KHAYRA!! I LOVE YOU SOOO MUCH, SAYANGGG!! MWAH MWAH MWAHHH :333 i hope today is as beautiful as your heart, because nobody deserves it more than you do. YOU’RE MY FAVORITE PERSON, MY FAVORITE GIRL, AND MY FAVORITE EVERYTHING. I’M SO LUCKY TO LOVE YOUUUU!! <3333",
];

// The name written as a signature at the end of the letter.
const SIGNATURE = "Grevillea";

// Paste your Spotify playlist link between the quotes, for example
// "https://open.spotify.com/playlist/...". Leave it empty to hide the link.
const PLAYLIST_URL = "https://open.spotify.com/playlist/0LMVylkI5CKPVoJIScCtFf?si=17532a4a76fb4246";

// Put your photos in the "public" folder with these names.
// To use more or fewer photos (or .png files), edit this list.
const PHOTOS = ["our-photo-1.jpg", "our-photo-2.jpg", "our-photo-3.jpg"].map(
  (name) => `${import.meta.env.BASE_URL}${name}`
);

// The audio that plays when the letter opens. Save your file in the "public"
// folder with this name (.mp3 works everywhere). Set it to "" to turn audio off.
const AUDIO_FILE = "letter-song.mp3";
const AUDIO_VOLUME = 0.2; // 0 (silent) to 1 (full)

// The envelopes Khayra opens one after another, BEFORE the main letter.
// Each one holds its own positive affirmations. Add, remove or reword them freely.
//   label : the short word printed on the envelope (keep it to 7 letters or fewer so it fits)
//   lines : the affirmations on the card inside (2 to 4 lines look best)
//   tone  : 0 pink, 1 peach, 2 lilac, 3 butter (the envelope color)
const LAYERS = [
  {
    label: "FIRST",
    tone: 0,
    lines: [
      "you are so loved, khayra. more than you will ever know.",
      "you are enough, exactly as you are today.",
      "your smile can fix my whole day, no joke.",
    ],
  },
  {
    label: "YOU ARE",
    tone: 1,
    lines: [
      "you are stronger than you think, baby.",
      "you are allowed to rest, to cry, and to start over.",
      "you are doing so much better than you give yourself credit for.",
    ],
  },
  {
    label: "BELIEVE",
    tone: 2,
    lines: [
      "you are beautiful inside and out, and i mean it every single time.",
      "you deserve soft days and gentle things.",
      "you are never alone. i’m always on your side.",
    ],
  },
  {
    label: "ALWAYS",
    tone: 3,
    lines: [
      "you make the world a warmer place just by being in it.",
      "everything your heart is wishing for is on its way to you.",
      "and i’m so, so proud of you. always.",
    ],
  },
];

// The last envelope is the main letter. Its label:
const LETTER_LABEL = "KHAYRA";
const LETTER_TONE = 0;

// The little hearts that float up when Khayra taps the photo button.
// They no longer appear when the letter opens. Set to false to remove them completely.
const HEARTS_ON_PHOTO = true;

function PhotoModal({ src, onClose }) {
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="backdrop" onClick={onClose}>
      <figure
        className="polaroid"
        role="dialog"
        aria-modal="true"
        aria-label="Our photo"
        onClick={(e) => e.stopPropagation()}
      >
        {missing ? (
          <div className="photo-missing">
            Add your photo as <code>public/{src.split("/").pop()}</code>
          </div>
        ) : (
          <img src={src} alt="Us together" onError={() => setMissing(true)} />
        )}
        <figcaption>us ♥</figcaption>
        <button type="button" className="close" onClick={onClose} aria-label="Close photo" autoFocus>
          ×
        </button>
      </figure>
    </div>
  );
}

// The four framed photos floating around the letter.
// Drop your pictures in the "public" folder with these names (.jpg).
// Until a file exists, the slot shows the default picture (grevi-face.png).
// To use .png files or other names, edit this list.
const FRAME_PHOTOS = ["frame-1.jpg", "frame-2.jpg", "frame-3.jpg", "frame-4.jpg"];

function FramedPhoto({ file, className }) {
  const base = import.meta.env.BASE_URL;
  const [src, setSrc] = useState(`${base}${file}`);
  return (
    <div className={`floating-frame ${className}`}>
      <img
        src={src}
        alt=""
        onError={() => setSrc(`${base}grevi-face.png`)}
      />
    </div>
  );
}

function FloatingFaces() {
  return (
    <div className="floating-faces" aria-hidden="true">
      {FRAME_PHOTOS.map((file, i) => (
        <FramedPhoto key={file} file={file} className={`face-${i + 1}`} />
      ))}
    </div>
  );
}

function Hearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        fontSize: `${16 + Math.random() * 26}px`,
        animationDuration: `${4 + Math.random() * 3.5}s`,
        animationDelay: `${Math.random() * 1.6}s`,
        "--drift": `${(Math.random() - 0.5) * 120}px`,
      })),
    []
  );

  return (
    <div className="hearts" aria-hidden="true">
      {hearts.map(({ id, ...style }) => (
        <span key={id} className="heart" style={style}>
          ♥
        </span>
      ))}
    </div>
  );
}

// A small drawn flower with two leaves, used on the corners of the paper.
function Bloom({ className }) {
  return (
    <svg className={`bloom ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <path className="leaf" d="M50 52 C28 66 18 86 26 97 C44 94 58 76 50 52 Z" />
      <path className="leaf" d="M50 52 C72 64 86 80 82 94 C64 94 46 78 50 52 Z" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          className="petal"
          cx="50"
          cy="27"
          rx="11"
          ry="19"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle className="core" cx="50" cy="50" r="10" />
      <circle className="dot" cx="47" cy="47" r="2.2" />
      <circle className="dot" cx="54" cy="51" r="2.2" />
      <circle className="dot" cx="48" cy="55" r="2.2" />
    </svg>
  );
}

// A thin line with a heart in the middle, under the title.
function Flourish() {
  return (
    <svg className="flourish" viewBox="0 0 260 28" aria-hidden="true">
      <defs>
        <linearGradient id="fl-left" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="fl-right" x1="1" x2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path d="M6 14 C40 14 70 6 108 14" stroke="url(#fl-left)" fill="none" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M254 14 C220 14 190 6 152 14" stroke="url(#fl-right)" fill="none" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M130 24 C112 12 116 1 124 3 C127 4 130 8 130 8 C130 8 133 4 136 3 C144 1 148 12 130 24 Z" fill="currentColor" />
      <circle cx="98" cy="19" r="1.8" fill="currentColor" />
      <circle cx="162" cy="19" r="1.8" fill="currentColor" />
    </svg>
  );
}

export default function App() {
  // layer = which envelope we are on (0 .. LAYERS.length; the last one is the letter).
  // stage = closed (waiting for a tap) -> opening (flap animating) -> note (affirmations) -> open (main letter)
  const [layer, setLayer] = useState(0);
  const [stage, setStage] = useState("closed");
  const [showHearts, setShowHearts] = useState(false);
  const [photoSrc, setPhotoSrc] = useState(null);
  const lastPhoto = useRef(-1);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [audioOk, setAudioOk] = useState(Boolean(AUDIO_FILE));

  // Created inside a tap, so browsers allow it to play.
  function getAudio() {
    if (!AUDIO_FILE) return null;
    if (!audioRef.current) {
      const a = new Audio(`${import.meta.env.BASE_URL}${AUDIO_FILE}`);
      a.loop = true;
      a.volume = AUDIO_VOLUME;
      a.addEventListener("error", () => setAudioOk(false));
      a.addEventListener("play", () => setPlaying(true));
      a.addEventListener("pause", () => setPlaying(false));
      audioRef.current = a;
    }
    return audioRef.current;
  }

  function toggleAudio() {
    const a = getAudio();
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  }

  useEffect(() => () => audioRef.current?.pause(), []);

  useEffect(() => {
    // Visit /#letter to skip the envelope while you are editing.
    if (window.location.hash === "#letter") setStage("open");
  }, []);

  const isLetterLayer = layer >= LAYERS.length;

  function openIt() {
    if (stage !== "closed") return;
    setStage("opening");
    getAudio()?.play().catch(() => {});
    setStarted(true);
    setTimeout(() => {
      window.scrollTo(0, 0);
      // The last envelope opens straight into the letter; the others show their affirmations.
      setStage(isLetterLayer ? "open" : "note");
    }, 1700);
  }

  function nextEnvelope() {
    setLayer((n) => n + 1);
    setStage("closed");
    window.scrollTo(0, 0);
  }

  function openPhoto() {
    // Pick a random photo, never the same one twice in a row.
    let next = Math.floor(Math.random() * PHOTOS.length);
    if (PHOTOS.length > 1 && next === lastPhoto.current) {
      next = (next + 1 + Math.floor(Math.random() * (PHOTOS.length - 1))) % PHOTOS.length;
    }
    lastPhoto.current = next;
    setPhotoSrc(PHOTOS[next]);
    if (HEARTS_ON_PHOTO) {
      setShowHearts(false);
      // Remount the hearts so the burst plays again.
      setTimeout(() => setShowHearts(true), 0);
      setTimeout(() => setShowHearts(false), 7000);
    }
  }

  const open = stage === "open";

  return (
    <main>
      <div className="bg" aria-hidden="true" />
      <section className="gate" hidden={open}>
        {stage !== "note" && (
          <>
            <p className="tag">
              {layer === 0 ? "for Khayra" : "keep going"} · {layer + 1} / {LAYERS.length + 1}
            </p>
            <button
              key={layer}
              type="button"
              className={`envelope tone-${isLetterLayer ? LETTER_TONE : LAYERS[layer].tone}${
                stage === "opening" ? " opening" : ""
              }${layer > 0 ? " arrive" : ""}`}
              onClick={openIt}
              aria-label={`Open envelope ${layer + 1} of ${LAYERS.length + 1}`}
            >
              <span className="env-back" />
              <span className="env-letter" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="env-front" />
              <span className="flap-shadow" />
              <span className="env-flap" />
              <span className="env-frame" />
              <span className="stamp" aria-hidden="true">♥</span>
              <span className="seal" aria-hidden="true">
                <span className="seal-mark">♥</span>
              </span>
              <span className="to">{isLetterLayer ? LETTER_LABEL : LAYERS[layer].label}</span>
            </button>
            <p className="tag hint">{isLetterLayer ? "tap to open my letter" : "tap to open"}</p>
          </>
        )}

        {stage === "note" && !isLetterLayer && (
          <div className="note" key={`note-${layer}`}>
            <p className="tag">
              {layer + 1} / {LAYERS.length + 1}
            </p>
            <ul className="note-lines">
              {LAYERS[layer].lines.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            <Flourish />
            <button type="button" className="surprise-btn" onClick={nextEnvelope} autoFocus>
              {layer === LAYERS.length - 1 ? "open my letter ♥" : "next envelope ♥"}
            </button>
          </div>
        )}
      </section>

      {open && <FloatingFaces />}

      {open && (
        <article className="paper">
          <Bloom className="bloom-tl" />
          <Bloom className="bloom-br" />
          <h1 className="title">{TITLE}</h1>
          <Flourish />
          {PARAGRAPHS.map((text, i) => (
            <p
              key={i}
              className={`para${i === PARAGRAPHS.length - 1 ? " last" : ""}`}
            >
              {text}
            </p>
          ))}
          <div className="signature">
            <span className="sig-note">with all my love,</span>
            <span className="sig-name">{SIGNATURE}</span>
            <svg className="sig-swash" viewBox="0 0 220 30" aria-hidden="true">
              <path
                d="M4 21 C40 4 82 30 130 14 S200 8 216 18"
                pathLength="1"
                fill="none"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </article>
      )}

      {open && (
        <div className="surprise">
          <button type="button" className="surprise-btn" onClick={openPhoto}>
            try clicking this a few times keyii!
          </button>
          {PLAYLIST_URL && (
            <a className="playlist-link" href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
              and also click this please!!
            </a>
          )}
        </div>
      )}

      {(open || started) && audioOk && (
        <button
          type="button"
          className={`sound-btn${playing ? " on" : ""}`}
          onClick={toggleAudio}
          aria-label={playing ? "Pause music" : "Play music"}
          aria-pressed={playing}
        >
          ♪
        </button>
      )}

      {open && <p className="tag foot">KHAYRA</p>}
      {photoSrc && <PhotoModal key={photoSrc} src={photoSrc} onClose={() => setPhotoSrc(null)} />}
      {showHearts && <Hearts />}
    </main>
  );
}
