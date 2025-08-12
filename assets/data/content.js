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
    osf: "https://github.com/jaweriaqaiser",
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

  // === PUBLICATIONS DATA ===
  publications: [
    {
      id: "pub1",
      title: "Shared Hearts and Minds: Physiological Synchrony During Empathy",
      authors: "Qaiser, J., Leonhardt, N., Le, B. M., Gordon, A. M., Impett, E. A., & Stellar, J. E.",
      year: 2023,
      venue: "Affective Science",
      doi: "10.1007/s42761-023-00210-4",
      url: "https://link.springer.com/article/10.1007/s42761-023-00210-4",
      abstract: "Empathy is a multidimensional construct that includes changes in cognitive, affective, and physiological processes. However, the physiological processes that contribute to empathic responding have received far less empirical attention. Here, we investigated whether physiological synchrony emerged during an empathy-inducing activity in which individuals disclosed a time of suffering while their romantic partner listened and responded (N = 111 couples). Further, we examined the extent to which trait and state measures of cognitive and affective empathy were associated with each other and with physiological synchrony during this activity. We found evidence for physiological synchrony in skin conductance reactivity and also in interbeat interval reactivity, though only when disclosers were women, but not for respiratory sinus arrhythmia reactivity. Physiological synchrony was not consistently associated with other well-established trait and state measures of empathy. These findings identify the nuanced role of physiological synchrony in empathic responding to others’ suffering.",
      tags: ["publication", "empathy", "synchrony", "physiology", "relationship", "heart rate", "respiratory sinus arrhythmia", "skin conductance level", "RSA", "SCL", "HR", "IBI"],
      bibtex: `article{qaiser2023shared,
  title={Shared hearts and minds: Physiological synchrony during empathy},
  author={Qaiser, Jaweria and Leonhardt, Nathan D and Le, Bonnie M and Gordon, Amie M and Impett, Emily A and Stellar, Jennifer E},
  journal={Affective Science},
  volume={4},
  number={4},
  pages={711--721},
  year={2023},
  publisher={Springer}
}`
    },
    {
      id: "pub2",
      title: "XX",
      authors: "XX",
      year: 2024,
      venue: "XX",
      doi: "XX",
      url: "XX",
      abstract: "XX",
      tags: ["XX", "XX"],
      bibtex: "XX"
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
