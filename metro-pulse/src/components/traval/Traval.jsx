import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../../lib/contentful";

function Traval() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchArticles = async () => {
      setLoading(true);

      try {
        const data = await getArticles("Travel");
        if (isMounted) {
          setArticles(data);
        }
      } catch (error) {
        console.error("Failed to fetch travel articles:", error);
        if (isMounted) {
          setArticles([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="mx-auto max-w-[88%] px-4 py-10">
      <section className="body-font text-gray-400">
        <div className="container mx-auto py-6">
          <div className="container mx-auto px-5 py-10">
            <h2 className="text-2xl font-bold text-black">
              Travel & Exploration
            </h2>
          </div>

          {loading ? (
            <div className="px-5 py-10 text-center text-lg text-slate-600">
              Loading Travel articles...
            </div>
          ) : articles.length === 0 ? (
            <div className="px-5 py-10 text-center text-lg text-slate-600">
              No Travel articles available.
            </div>
          ) : (
            <div className="flex flex-wrap -m-4">
              {articles.map((article) => {
                const { fields = {} } = article;
                const slug =
                  fields.slug ||
                  (fields.title || "")
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "");
                const imageUrl = fields.image?.fields?.file?.url;
                const category = fields.Category || "Travel";
                const title = fields.title || "Untitled article";
                const shortDescription =
                  fields.ShortDescription ||
                  fields.shortDescription ||
                  fields.description ||
                  "Read the full story.";

                return (
                  <div key={slug || title} className="p-4 md:w-1/3">
                    <Link
                      to={slug ? `/article/${slug}` : "/"}
                      className="block h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                    >
                      {imageUrl ? (
                        <img
                          className="h-48 w-full object-cover object-center md:h-56"
                          src={
                            imageUrl.startsWith("//")
                              ? `https:${imageUrl}`
                              : imageUrl
                          }
                          alt={title}
                        />
                      ) : (
                        <div className="h-48 w-full bg-slate-200 md:h-56" />
                      )}

                      <div className="p-6">
                        <span className="mb-2 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                          {category}
                        </span>
                        <h3 className="mb-3 text-xl font-semibold text-slate-900">
                          {title}
                        </h3>
                        <p className="mb-5 leading-relaxed text-slate-600">
                          {shortDescription}
                        </p>

                        <span className="inline-flex items-center text-base font-medium text-indigo-600 transition hover:text-indigo-800">
                          Learn More
                          <svg
                            className="ml-2 h-4 w-4"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Traval;
