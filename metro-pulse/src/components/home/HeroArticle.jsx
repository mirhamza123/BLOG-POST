import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png";
import { filterArticles, getArticles } from "../../lib/contentful";

const formatTimeAgo = (dateString, now = Date.now()) => {
  if (!dateString) return "Just now";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Just now";

  const seconds = Math.max(0, Math.floor((now - date.getTime()) / 1000));

  if (seconds < 60) return "Just now";
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min ago`;
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hr ago`;
  }

  const days = Math.floor(seconds / 86400);
  return `${days} d ago`;
};

function HeroArticle({ searchQuery = "", selectedCategory = "All" }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const filteredArticles = filterArticles(
    articles,
    searchQuery,
    selectedCategory,
  );

  useEffect(() => {
    let isMounted = true;

    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        if (isMounted) {
          setArticles(data);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
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
    <div>
      <main className="mx-auto max-w-[88%] px-4 py-14">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex md:flex-row flex-col items-center">
            <div className="mb-10 w-full md:mb-0 md:w-[55%] lg:w-[95%] lg:max-w-[700px]">
              <img
                className="h-[320px] w-full rounded-2xl object-cover shadow-md sm:h-[420px] lg:h-[420px]"
                alt="hero"
                src={heroImage}
              />
            </div>
            <div className="lg:flex-grow md:w-[50%] lg:pl-15 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className=" title-font sm:text-4xl text-3xl mb-4 font-semibold text-gray-900">
                <span className="block text-blue-600">
                  Pulse of the World: Breaking News, Live Sports &
                </span>
                <span className="block">Unforgettable Journeys</span>
              </h1>
              <p className="mb-8 ">
                Stay informed with real-time news, feel the energy of live
                sports, and discover world-class travel escapes tailored for
                your daily pulse.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-center md:justify-start ">
                <button className="inline-flex text-white bg-blue-700 border-0 py-2 px-6 hover:bg-indigo-600 rounded-2xl text-lg">
                  Read more
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="text-gray-400 body-font">
          <div className="container py-24 mx-auto">
            <div className="container px-5 py-10 mx-auto">
              <h2 className="text-2xl font-bold text-black">Latest Stores</h2>
            </div>

            {loading ? (
              <div className="px-5 py-10 text-center text-lg text-slate-600">
                Loading articles...
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="px-5 py-10 text-center text-lg text-slate-600">
                No articles found.
              </div>
            ) : (
              <div className="flex flex-wrap -m-4">
                {filteredArticles.map((article) => {
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
                  const category =
                    fields.Category || fields.category || "General";
                  const publishDate =
                    fields.publishDate ||
                    fields.PublishDate ||
                    article.sys?.createdAt;
                  const title = fields.title || "Untitled article";
                  const shortDescription =
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

                          <div className="mt-1 text-[10px] text-gray-500">
                            {formatTimeAgo(publishDate, now)} | {category}
                          </div>

                          {readTime && (
                            <div className="mt-1 text-[10px] text-gray-500">
                              Reading time: {readTime}
                            </div>
                          )}

                          <div className="mt-2 mb-3 flex items-center justify-between gap-3">
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
    </div>
  );
}

export default HeroArticle;
