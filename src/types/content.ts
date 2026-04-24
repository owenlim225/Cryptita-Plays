export type NavItem = {
  label: string;
  href: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  mission: string;
  contactEmail: string;
  socialHandle: string;
  phoneNumber: string;
};

export type Program = {
  title: string;
  description: string;
  image: string;
  photoDate: string;
  photoLocation: string;
};

export type Partner = {
  name: string;
  logo: string;
};

/** Image cards (e.g. impact carousel / gallery blocks) */
export type GalleryCardItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
};
