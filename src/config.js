/**
 * CENTRAL PERSONALIZATION CONFIGURATION
 * Easily customize all text, messages, names, and romantic details here!
 */
export const surpriseConfig = {
  // Names & Title
  recipientName: "Beautiful",
  senderName: "Someone Who Admires You",
  siteTitle: "Just For You ❤️",

  // Theme Colors (matching requirements)
  colors: {
    background: "#08050A",
    deepBurgundy: "#270819",
    romanticPink: "#FF4FA3",
    softPink: "#FFB6D9",
    roseRed: "#FF315D",
    white: "#FFFFFF",
    cardBackground: "#F9C7DF",
  },

  // Section 1: Intro Screen
  intro: {
    greeting: "Hey Beautiful ❤️",
    subheading: "Do you even know how cute you are? 🥺",
    buttonText: "Open Your Surprise 💗",
    heartHint: "A little world crafted just for you",
  },

  // Section 2: Just For You (5 Interactive Compliment Messages)
  justForYou: {
    heading: "Just for you",
    subtitle: "Tap each one to reveal something special.",
    counterText: "Surprises revealed",
    nextButtonText: "One more thing... 💌",
    messages: [
      {
        id: 1,
        title: "You look adorable",
        emoji: "✨",
        shortTag: "Pure Sunshine",
        revealedText:
          "Seriously, there's an effortless grace about you that turns heads without you even trying. That smile of yours? It honestly lights up everything.",
        flirtQuote: "Warning: Looking at you may cause uncontrollable smiling! 🥰",
      },
      {
        id: 2,
        title: "You have the sweetest vibe",
        emoji: "🌸",
        shortTag: "Warm & Cozy",
        revealedText:
          "Being around you is like that cozy feeling of warm sunshine on a breezy afternoon. Your presence is gentle, comforting, and genuinely addictive.",
        flirtQuote: "10/10 comfort score. Never change your sweet energy! 💫",
      },
      {
        id: 3,
        title: "You make things feel lighter",
        emoji: "☁️",
        shortTag: "Heart Melter",
        revealedText:
          "Whenever you're around, stress just disappears into thin air. Even the dullest day turns into a fun little adventure with you.",
        flirtQuote: "You have a superpower: turning ordinary days into favorites! 🎈",
      },
      {
        id: 4,
        title: "You are naturally charming",
        emoji: "🪄",
        shortTag: "Irresistible",
        revealedText:
          "It's the little things—the way your eyes crinkle when you laugh, the cute expressions you make, and how genuine your heart is.",
        flirtQuote: "You don't need a spellbook; your natural charm already does the magic. 💖",
      },
      {
        id: 5,
        title: "You make everything feel more special",
        emoji: "💖",
        shortTag: "One in a Billion",
        revealedText:
          "Some people enter a room and it just becomes warmer. You have that rare gift of making moments unforgettable simply by being yourself.",
        flirtQuote: "You are truly one of the best things that exists in this world. 🌹",
      },
    ],
  },

  // Section 3: Special Love Letter
  letter: {
    heading: "A little note for you",
    envelopeLabel: "Tap to Open With Love",
    nextButtonText: "One more thing →",
    content: `I just wanted to tell you something... you really are special in a way that's hard to explain.

There's a softness in the way you talk, a sweetness in the things you say, and something genuinely beautiful about you that just feels good to be around.

You make ordinary moments feel a little more special, and that's what makes you truly lovely.

Never forget how special you are. ❤️`,
    postscript: "P.S. Keep smiling like you do—it looks stunning on you.",
  },

  // Section 4: Final Surprise
  finalSurprise: {
    mainHeading: "You'll always be special to me ❤️",
    subheading: "Some people make the world a little more beautiful just by being in it.",
    actionButton: "Send Some Love 💗",
    grandMessage: "I LOVE YOU",
    grandSubmessage: "You are cherished, adored, and so deeply loved ✨",
    replayButton: "Experience Again 🔄",
  },

  // Audio configuration
  audio: {
    autoStartOnFirstInteraction: true,
    volume: 0.45,
    bgmTitle: "Romantic Piano Melody",
  },
};
