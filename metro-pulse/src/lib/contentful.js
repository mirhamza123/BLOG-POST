import { createClient } from "contentful";

export const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export const getArticles = async (categoryName) => {
  try {
    const query = {
      content_type: "blogPost",
    };

    if (categoryName && categoryName.toLowerCase() !== "all") {
      const formattedCategory =
        categoryName.trim().charAt(0).toUpperCase() +
        categoryName.trim().slice(1).toLowerCase();
      query["fields.Category"] = formattedCategory;
    }

    const response = await client.getEntries(query);
    return response.items || [];
  } catch (error) {
    console.error("Contentful fetch error:", error);
    return [];
  }
};

export const getArticleBySlug = async (slug) => {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    });

    return response.items?.[0] || null;
  } catch (error) {
    console.error("Contentful single article fetch error:", error);
    return null;
  }
};
