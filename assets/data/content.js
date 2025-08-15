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
    short: "PhD candidate",
    email: "jaweria [dot] qaiser [at] mail [dot] utoronto [dot] ca", // Will be obfuscated in UI
    orcid: "0000-0003-2820-3021",
    googleScholar: "https://scholar.google.com/citations?user=OHEQbFgAAAAJ&hl=en",
    osf: "https://osf.io/ufx5d"
  },

  // === CV DATA ===
  cv: [
    {
      section: "Education",
      items: [
        {
          title: "PhD Candidate in Psychology",
          institution: "University of Toronto",
          year: "2021-Present",
          details: "Thesis: 'Reading Group Emotions'."
        },
        {
          title: "BSc in Psychology",
          institution: "University of Toronto",
          year: "2017-2021",
          details: "Specialist in Neurobiology | Minor in Biology",
          details: "Graduated with Distinction"
        }
      ]
    },
    {
      section: "Teaching",
      items: [
        {
          title: "XX",
          institution: "XX",
          year: "XX"
        }
      ]
    },
    {
      section: "Grants & Awards",
      items: [
        {
          title: "XX",
          institution: "XX",
          year: "XX"
        }
      ]
    },
    {
      section: "Service",
      items: [
        {
          title: "Peer Reviewer",
          institution: "XX",
          year: "XX"
        }
      ]
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
    }
  ]
};
