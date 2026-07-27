import type { CountryHelp } from "@/lib/types";

export const GLOBAL_RESOURCES = [
  {
    name: "World Health Organization (WHO)",
    description: "Global public health guidance, including on violence and injury prevention.",
    website: "https://www.who.int",
  },
  {
    name: "UNICEF",
    description: "Child protection resources and country-level support programs worldwide.",
    website: "https://www.unicef.org",
  },
  {
    name: "Child Helpline International",
    description: "A global network of child helplines — find the one covering your country.",
    website: "https://childhelplineinternational.org",
  },
  {
    name: "Find A Helpline",
    description: "A vetted global directory of crisis lines for suicide, abuse, and mental health.",
    website: "https://findahelpline.com",
  },
];

export const COUNTRY_HELP: CountryHelp[] = [
  {
    countryCode: "PK",
    countryName: "Pakistan",
    emergencyNumber: "15 (Police)",
    resources: [
      {
        name: "Madadgaar National Helpline",
        description: "24/7 free helpline for children and women facing violence or abuse.",
        phone: "1098",
        website: "https://madadgaar.org",
      },
      {
        name: "Rozan Helpline",
        description: "Counseling support for children, youth, and women on violence and abuse.",
        website: "https://rozan.org",
      },
    ],
  },
  {
    countryCode: "US",
    countryName: "United States",
    emergencyNumber: "911",
    resources: [
      {
        name: "988 Suicide & Crisis Lifeline",
        description: "24/7 free, confidential support by call, text, or chat.",
        phone: "988",
        website: "https://988lifeline.org",
      },
      {
        name: "Childhelp National Child Abuse Hotline",
        description: "24/7 crisis intervention and support for child abuse situations.",
        phone: "1-800-422-4453",
        website: "https://www.childhelp.org",
      },
      {
        name: "National Domestic Violence Hotline",
        description: "24/7 confidential support for domestic violence situations.",
        phone: "1-800-799-7233",
        website: "https://www.thehotline.org",
      },
    ],
  },
  {
    countryCode: "GB",
    countryName: "United Kingdom",
    emergencyNumber: "999",
    resources: [
      {
        name: "Childline",
        description: "Free, confidential support for children and young people, any time.",
        phone: "0800 1111",
        website: "https://www.childline.org.uk",
      },
      {
        name: "NSPCC Helpline",
        description: "For any adult concerned about a child's safety.",
        phone: "0808 800 5000",
        website: "https://www.nspcc.org.uk",
      },
    ],
  },
  {
    countryCode: "CA",
    countryName: "Canada",
    emergencyNumber: "911",
    resources: [
      {
        name: "Kids Help Phone",
        description: "24/7 support for children and young people by phone, text, or chat.",
        phone: "1-800-668-6868",
        website: "https://kidshelpphone.ca",
      },
    ],
  },
  {
    countryCode: "AU",
    countryName: "Australia",
    emergencyNumber: "000",
    resources: [
      {
        name: "Kids Helpline",
        description: "Free, private counseling for young people aged 5–25.",
        phone: "1800 55 1800",
        website: "https://kidshelpline.com.au",
      },
      {
        name: "Lifeline Australia",
        description: "24/7 crisis support and suicide prevention.",
        phone: "13 11 14",
        website: "https://www.lifeline.org.au",
      },
    ],
  },
  {
    countryCode: "IN",
    countryName: "India",
    emergencyNumber: "112",
    resources: [
      {
        name: "CHILDLINE India",
        description: "24/7 free helpline for children in need of care and protection.",
        phone: "1098",
        website: "https://www.childlineindia.org",
      },
    ],
  },
];

export function getCountryHelp(code: string): CountryHelp | undefined {
  return COUNTRY_HELP.find((c) => c.countryCode === code);
}
