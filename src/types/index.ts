export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  cat: "commercial" | "residential" | "specialist";
  slug?: boolean;
}

export interface ReviewItem {
  stars: string;
  text: string;
  initials: string;
  name: string;
  loc: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface UspItem {
  icon: string;
  title: string;
  desc: string;
}

export interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  href?: string;
}
