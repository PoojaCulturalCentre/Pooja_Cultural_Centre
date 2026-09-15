  // Real Bharathanatyam photographs sourced from Wikimedia Commons (freely licensed).
// Swap these for the academy's own photography whenever it's available.

export const HERO_PHOTO = {
  src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/The_Graceful_Poses_of_Bharatanatyam_Dance.jpg/1280px-The_Graceful_Poses_of_Bharatanatyam_Dance.jpg",
  alt: "Bharathanatyam dancer in a classical pose",
  credit: { name: "Mohd Zishan", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:The_Graceful_Poses_of_Bharatanatyam_Dance.jpg" },
};

export const ABOUT_PHOTO = {
  src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Indian_classical_dance_-_Bharatanatyam_from_of_Tamil_Nadu.jpg/1280px-Indian_classical_dance_-_Bharatanatyam_from_of_Tamil_Nadu.jpg",
  alt: "Bharathanatyam dancer from Tamil Nadu",
  credit: { name: "Vijay Sundararaman Iyer", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Indian_classical_dance_-_Bharatanatyam_from_of_Tamil_Nadu.jpg" },
};

export const GURU_PHOTO = {
  src: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bharata_natyam_ankle_bells_footwork.jpg",
  alt: "Close-up of Bharathanatyam ankle bells and footwork",
  credit: { name: "Centro Culturale Khatawat", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Bharata_natyam_ankle_bells_footwork.jpg" },
};

export const GURU_EYE_PHOTO = {
  src: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Bharatnatyam_Eyes_%26_Expressions%2C_Bharat_Bhavan_Bhopal_in_June_2025.jpg",
  alt: "Expressive eyes of a Bharathanatyam dancer performing Netra Abhinaya",
  credit: { name: "Suyash Dwivedi", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Bharatnatyam_Eyes_%26_Expressions,_Bharat_Bhavan_Bhopal_in_June_2025.jpg" },
};

export const GALLERY_PHOTOS = [
  {
    id: "arangetram",
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Bharata_Natyam_Performance_DS.jpg/1280px-Bharata_Natyam_Performance_DS.jpg",
    alt: "Bharathanatyam solo performance",
    credit: { name: "Augustus Binu", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Bharata_Natyam_Performance_DS.jpg" },
  },
  {
    id: "natyanjali",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Bharatanatyam_dancer.jpg",
    alt: "Bharathanatyam dancer performing at a festival",
    credit: { name: "Jim Bachalo", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Bharatanatyam_dancer.jpg" },
  },
  {
    id: "guruVandana",
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Barathanatyam_dancer.jpg/1280px-Barathanatyam_dancer.jpg",
    alt: "Bharathanatyam dancer in traditional costume",
    credit: { name: "Karthik Rangappa", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Barathanatyam_dancer.jpg" },
  },
  {
    id: "thillana",
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/A_Vibrant_Bharatanatyam_Group_Interpretation.jpg/1280px-A_Vibrant_Bharatanatyam_Group_Interpretation.jpg",
    alt: "Group of Bharathanatyam dancers performing together",
    credit: { name: "Mohd Zishan", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:A_Vibrant_Bharatanatyam_Group_Interpretation.jpg" },
  },
  {
    id: "temple",
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Mamallapuram%2C_Indian_Dance_Festival%2C_Bharatanatyam_dancer_%289902519434%29.jpg/1280px-Mamallapuram%2C_Indian_Dance_Festival%2C_Bharatanatyam_dancer_%289902519434%29.jpg",
    alt: "Bharathanatyam dancer at a temple dance festival in Mamallapuram",
    credit: { name: "Arian Zwegers", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Mamallapuram,_Indian_Dance_Festival,_Bharatanatyam_dancer_(9902519434).jpg" },
  },
  {
    id: "annual",
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Bharatanatyam_male_dancer.jpg/1280px-Bharatanatyam_male_dancer.jpg",
    alt: "Bharathanatyam dancer on stage",
    credit: { name: "Brendan Lally", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Bharatanatyam_male_dancer.jpg" },
  },
];

export const ALL_PHOTO_CREDITS = [HERO_PHOTO, ABOUT_PHOTO, GURU_PHOTO, GURU_EYE_PHOTO, ...GALLERY_PHOTOS].map((p) => p.credit);
