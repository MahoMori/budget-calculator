const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
};

// export const device = {
//   mobileS: `(min-width: 320px) and (max-width: 374px)`,
//   mobileM: `(min-width: 375px) and (max-width: 424px)`,
//   mobileL: `(min-width: 425px) and (max-width: 767px)`,
//   tablet: `(min-width: 768px) and (max-width: 1023px)`,
//   laptop: `(min-width: 1024px) and (max-width: 1439px)`,
//   laptopL: `(min-width: 1440px) and (max-width: 2559px)`,
//   desktop: `(min-width: 2560px)`,
// };
