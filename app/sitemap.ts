import type { MetadataRoute } from "next"

const BASE_URL = "https://lp-juspilot.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/pt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "pt-BR": `${BASE_URL}/pt`,
          en: `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          "pt-BR": `${BASE_URL}/pt`,
          en: `${BASE_URL}/en`,
        },
      },
    },
  ]
}
