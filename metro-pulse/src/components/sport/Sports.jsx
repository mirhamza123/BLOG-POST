import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../../lib/contentful";

function Sports() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchArticles = async () => {
      setLoading(true);

      try {
        const data = await getArticles("Sports");
        if (isMounted) {
          setArticles(data);
        }
      } catch (error) {
        console.error("Failed to fetch sports articles:", error);
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
              Sports & Exploration
            </h2>
          </div>

          {loading ? (
            <div className="px-5 py-10 text-center text-lg text-slate-600">
              Loading Sports articles...
            </div>
          ) : articles.length === 0 ? (
            <div className="px-5 py-10 text-center text-lg text-slate-600">
              No Sports articles available.
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
                const authorName =
                  fields.authorName || fields["author name"] || "Anonymous";
                const authorImageUrl = fields.authorimg?.fields?.file?.url;
                const readTime =
                  fields["Reading Time"] ||
                  fields.readingTime ||
                  fields.readTime;
                const category = fields.Category || "Sports";
                const title = fields.title || "Untitled article";
                const shortDescription =
                  fields.ShortDescription ||
                  fields.shortDescription ||
                  fields.description ||
                  "Read the full story.";

                return (
                  <div key={slug || title} className="p-2 md:w-1/3">
                    <Link
                      to={slug ? `/article/${slug}` : "/"}
                      className="group block h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                    >
                      {imageUrl ? (
                        <img
                          className="h-40 w-full object-cover object-center md:h-44"
                          src={
                            imageUrl.startsWith("//")
                              ? `https:${imageUrl}`
                              : imageUrl
                          }
                          alt={title}
                        />
                      ) : (
                        <div className="h-40 w-full bg-slate-200 md:h-44" />
                      )}

                      <div className="p-4">
                        <span className="mb-2 inline-flex rounded-full bg-indigo-100 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                          {category}
                        </span>
                        <h3 className="mb-2 text-base font-semibold leading-tight text-slate-900 group-hover:underline">
                          {title}
                        </h3>
                        <p className="mb-2 text-xs leading-relaxed text-slate-600">
                          {shortDescription}
                        </p>

                        {readTime && (
                          <div className="mb-3 text-[10px] text-gray-500">
                            Reading time: {readTime}
                          </div>
                        )}

                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            {authorImageUrl ? (
                              <img
                                className="h-7 w-7 shrink-0 rounded-full object-cover"
                                src={
                                  authorImageUrl.startsWith("//")
                                    ? `https:${authorImageUrl}`
                                    : authorImageUrl
                                }
                                alt={authorName}
                              />
                            ) : (
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white">
                                {authorName.charAt(0).toUpperCase()}
                              </span>
                            )}
                            <span className="truncate text-xs font-medium text-slate-700">
                              {authorName}
                            </span>
                          </div>
                        </div>

                        <span className="inline-flex items-center text-xs font-medium text-indigo-600 transition hover:text-indigo-800">
                          Learn More
                          <svg
                            className="ml-1.5 h-3.5 w-3.5"
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

export default Sports;
