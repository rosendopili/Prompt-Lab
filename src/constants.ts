import { PageConfig } from './types';

export const PAGES: PageConfig[] = [
  {
    id: 'creative',
    name: 'CREATIVE SUITE',
    version: 'V.01',
    primaryColor: '#3E51FF',
    highlightColor: '#6E7BFF',
    promptPrefix: 'Generate',
    buckets: [
      {
        id: '01',
        title: 'SUBJECT_DATA',
        btnLabel: 'ROLL SUBJECT',
        options: [
          "A majestic dragon",
          "A futuristic space station",
          "A vintage typewriter",
          "A cozy cabin in the woods",
          "A giant friendly robot",
          "A curious red fox",
          "A bustling street market in Tokyo",
          "An ancient Greek temple",
          "A floating island with waterfalls",
          "A high-tech laboratory",
          "A magical library with flying books",
          "A sleek electric supercar",
          "A peaceful zen garden",
          "A medieval knight in shining armor",
          "A group of penguins wearing scarves",
          "A mysterious glowing portal",
          "A treehouse city",
          "A steampunk airship",
          "A coral reef teeming with life",
          "A friendly alien visiting Earth"
        ]
      },
      {
        id: '02',
        title: 'STYLE_DATA',
        btnLabel: 'ROLL STYLE',
        options: [
          "in the style of a 1980s anime",
          "made entirely of origami paper",
          "as a hyper-realistic oil painting from the 1700s",
          "in the style of Minecraft / Voxel art",
          "drawn on a crumpled napkin with a blue ballpoint pen",
          "as a high-fashion magazine cover",
          "in a vibrant cyberpunk neon aesthetic",
          "as a Studio Ghibli watercolor background",
          "in a bold Pop Art style",
          "as a detailed charcoal sketch",
          "in a minimalist line art style",
          "as a 3D claymation scene",
          "in the style of a classic comic book",
          "as a stained glass window",
          "in a dreamy impressionist style",
          "as a retro 8-bit pixel art piece",
          "in a dark gothic aesthetic",
          "as a futuristic holographic projection",
          "in a whimsical storybook illustration style",
          "as a cinematic movie poster"
        ]
      },
      {
        id: '03',
        title: 'TWIST_DATA',
        btnLabel: 'ROLL TWIST',
        options: [
          "but it's all underwater",
          "as a blueprint or technical schematic",
          "embroidered as a patch on a denim jacket",
          "in the middle of a dusty sandstorm",
          "but everything is made of candy",
          "seen through a night-vision camera",
          "glitchy and distorted like a broken TV",
          "contained inside a tiny snow globe",
          "made entirely of liquid gold",
          "as a miniature diorama on a desk",
          "surrounded by floating geometric shapes",
          "illuminated by a thousand fireflies",
          "frozen in a block of ice",
          "with a reflection in a puddle",
          "emerging from a cloud of colorful smoke",
          "as if seen through a kaleidoscope",
          "with a double exposure effect",
          "in a world where gravity is reversed",
          "made of glowing fiber-optic cables",
          "as a constellation in the night sky"
        ]
      }
    ]
  },
  {
    id: 'problem',
    name: 'BUSINESS GENERATOR',
    version: 'V.02',
    primaryColor: '#0D9488', // Teal 600
    highlightColor: '#14B8A6', // Teal 500
    promptPrefix: 'Act as an expert startup founder. I want to build a business that solves the problem of',
    buckets: [
      {
        id: '01',
        title: 'PROBLEM_STATEMENT',
        btnLabel: 'ROLL PROBLEM',
        options: [
          "Your phone always dies at the worst possible time.",
          "Falling asleep during early morning classes.",
          "Losing track of homework assignments.",
          "Keeping track of assignments and links across five different school websites is a nightmare.",
          "It’s hard to make casual friends or chat when you are physically separated",
          "You can never find the tab you were looking for in your dozens of open tabs.",
          "Staring at a screen all day gives you \"Zoom fatigue\""
        ]
      },
      {
        id: '02',
        title: 'THE_BRAND_VIBE',
        btnLabel: 'ROLL VIBE',
        options: [
          "High-tech, sleek, and futuristic.",
          "Eco-friendly, green, and sustainable.",
          "Luxury, premium, and expensive.",
          "Funny, colorful, and meme-focused.",
          "Retro 90s arcade aesthetic.",
          "Cozy, relaxing, and chill."
        ]
      },
      {
        id: '03',
        title: 'THE_SECRET_SAUCE',
        btnLabel: 'ROLL SAUCE',
        options: [
          "It’s an app that connects you with your friends.",
          "It involves a piece of wearable tech (like smart glasses or a watch).",
          "It uses gamification (you earn points/rewards for using it).",
          "It is powered by robotic automation.",
          "It runs completely on solar power.",
          "It includes a virtual holographic pet."
        ]
      }
    ]
  }
];
