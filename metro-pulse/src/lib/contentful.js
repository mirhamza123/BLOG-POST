import { createClient } from "contentful";

export const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

// Category ke mutabiq articles fetch karne ka function
export const getArticles = async (categoryName) => {
  try {
    const query = {
      content_type: "blogPost",
    };

    if (categoryName && categoryName.toLowerCase() !== "all") {
      const formattedCategory =
        categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      query["fields.Category"] = formattedCategory;
    }

    const response = await client.getEntries(query);
    return response.items;
  } catch (error) {
    console.error("Contentful fetch error:", error);
    return [];
  }
};
