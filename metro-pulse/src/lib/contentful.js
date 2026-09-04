import { createClient } from "contentful";

export const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

const normalizeCategoryValue = (value) => {
  if (value === undefined || value === null) return "";
  if (typeof value === "object") {
    return normalizeCategoryValue(
      value.fields?.name || value.fields?.title || value.name || value.title,
    );
  }
  return String(value).trim().toLowerCase();
};

export const filterArticles = (
  articles,
  searchQuery = "",
  selectedCategory = "All",
) => {
  const query = searchQuery.trim().toLowerCase();
  const category = normalizeCategoryValue(selectedCategory);

  return articles.filter((article) => {
    const fields = article?.fields || {};
    const title = String(fields.title || "").toLowerCase();
    const articleCategory = [
      fields.Category,
      fields.category,
      fields.categoryName,
      fields.type,
    ].map(normalizeCategoryValue);

    return (
      title.includes(query) &&
      (category === "all" || articleCategory.includes(category))
    );
  });
};

export const getArticles = async (categoryName) => {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      limit: 1000,
    });

    const items = response.items || [];

    if (!categoryName || categoryName.toLowerCase() === "all") {
      return items;
    }

    const targetCategory = normalizeCategoryValue(categoryName);

    return items.filter((item) => {
      const fields = item?.fields || {};
      const categoryValues = [
        fields.Category,
        fields.category,
        fields.categoryName,
        fields.type,
      ];

      return categoryValues.some(
        (value) => normalizeCategoryValue(value) === targetCategory,
      );
    });
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
      include: 10,
    });

    return response.items?.[0] || null;
  } catch (error) {
    console.error("Contentful single article fetch error:", error);
    return null;
  }
};
