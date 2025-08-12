/**
 * assets/data/content.js
 * ----------------------
 * All editable site content in one file.
 * 
 * HOW TO EDIT:
 * - Update your bio, CV, publications, and portfolio art below.
 * - Add or remove CV sections, publication items, or artworks as needed.
 * - All fields are documented with examples.
 */

window.siteContent = {
  // === BIO & LINKS ===
  bio: {
    name: "Jaweria Qaiser",
    short: "Researcher, artist, and educator exploring intersections of art & technology.",
    email: "hello [at] example [dot] edu", // Will be obfuscated in UI
    orcid: "0000-0000-0000-0000",
    googleScholar: "https://scholar.google.com/",
    github: "https://github.com/jaweriaqaiser",
    instagram: "https://instagram.com/",
  },

  // === CV DATA ===
  cv: [
    {
      section: "Education",
      items: [
        {
          title: "PhD in Computational Arts",
          institution: "University of Imaginary Studies",
          year: "2025",
          details: "Thesis: 'Artful Machines: Generative Aesthetics and Algorithmic Expression'."
        },
        {
          title: "MFA in Fine Arts",
          institution: "Dreamland Art Institute",
          year: "2021"
        }
      ]
    },
    {
      section: "Appointments",
      items: [
        {
          title: "Assistant Professor",
          institution: "Department of Creative Technology, Utopia University",
          year: "2026–present"
        }
      ]
    },
    {
      section: "Teaching",
      items: [
        {
          title: "Generative Art & Code",
          institution: "Utopia University",
          year: "2026–present"
        }
      ]
    },
    {
      section: "Grants & Awards",
      items: [
        {
          title: "Young Innovators Grant",
          institution: "Art & Tech Foundation",
          year: "2024"
        }
      ]
    },
    {
      section: "Service",
      items: [
        {
          title: "Peer Reviewer",
          institution: "Journal of Digital Arts",
          year: "2023–"
        }
      ]
    }
  ],

  // === PUBLICATIONS DATA ===
  publications: [
    {
      id: "pub1",
      title: "Quirky Networks: Algorithmic Play in Computational Art",
      authors: "J. Qaiser, A. Smith",
      year: 2025,
      venue: "International Conference on Generative Arts",
      doi: "10.0000/ga2025.42",
      url: "https://doi.org/10.0000/ga2025.42",
      abstract: "This paper explores playful algorithmic forms in generative art...",
      tags: ["conference", "generative art"],
      bibtex: `@inproceedings{qaiser2025quirky,
  title={Quirky Networks: Algorithmic Play in Computational Art},
  author={Qaiser, Jaweria and Smith, Alex},
  booktitle={International Conference on Generative Arts},
  year={2025},
  doi={10.0000/ga2025.42}
}`
    },
    {
      id: "pub2",
      title: "Machine Aesthetics in Digital Painting",
      authors: "J. Qaiser",
      year: 2024,
      venue: "Journal of Digital Arts",
      doi: "10.0000/jda.2024.17",
      url: "https://doi.org/10.0000/jda.2024.17",
      abstract: "A study of AI-driven styles and their influence on contemporary painting...",
      tags: ["journal", "digital painting"],
      bibtex: `@article{qaiser2024machine,
  title={Machine Aesthetics in Digital Painting},
  author={Qaiser, Jaweria},
  journal={Journal of Digital Arts},
  year={2024},
  doi={10.0000/jda.2024.17}
}`
    },
    {
      id: "pub3",
      title: "Teaching Code as Creative Practice",
      authors: "J. Qaiser, M. Doe",
      year: 2023,
      venue: "Art Education Review",
      doi: "",
      url: "",
      abstract: "Examines pedagogical strategies for integrating coding into creative arts education...",
      tags: ["teaching", "art education"],
      bibtex: `@article{qaiser2023teaching,
  title={Teaching Code as Creative Practice},
  author={Qaiser, Jaweria and Doe, Mary},
  journal={Art Education Review},
  year={2023}
}`
    }
  ],

  // === ART PORTFOLIO DATA ===
  portfolio: [
    {
      id: "art1",
      title: "Algorithmic Bloom",
      year: 2024,
      medium: "Digital print",
      category: "digital",
      thumb: "thumb_bloom.jpg",
      image: "bloom_full.jpg",
      caption: "Inspired by natural growth and randomness.",
      download: "bloom_full.jpg"
    },
    {
      id: "art2",
      title: "Night Grid",
      year: 2022,
      medium: "Acrylic on canvas",
      category: "painting",
      thumb: "thumb_nightgrid.jpg",
      image: "nightgrid_full.jpg",
      caption: "A play of order and chaos in color.",
      download: ""
    },
    {
      id: "art3",
      title: "Print Experiment #7",
      year: 2023,
      medium: "Monoprint",
      category: "print",
      thumb: "thumb_print7.jpg",
      image: "print7_full.jpg",
      caption: "One-of-a-kind generative print.",
      download: ""
    },
    {
      id: "art4",
      title: "Fluid Networks",
      year: 2025,
      medium: "Mixed media",
      category: "mixed",
      thumb: "thumb_fluid.jpg",
      image: "fluid_full.jpg",
      caption: "Exploring network aesthetics with ink and code.",
      download: "fluid_full.jpg"
    },
    {
      id: "art5",
      title: "Sunrise Render",
      year: 2024,
      medium: "Digital print",
      category: "digital",
      thumb: "thumb_sunrise.jpg",
      image: "sunrise_full.jpg",
      caption: "Color study using generative code.",
      download: ""
    },
    {
      id: "art6",
      title: "Paper Garden",
      year: 2021,
      medium: "Collage",
      category: "mixed",
      thumb: "thumb_papergarden.jpg",
      image: "papergarden_full.jpg",
      caption: "Layers and textures from recycled materials.",
      download: ""
    }
  ]
};
