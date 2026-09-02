import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png";
import { getArticles } from "../../lib/contentful";

function HeroArticle() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <main className="mx-auto max-w-[88%] px-4 py-20">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex md:flex-row flex-col items-center">
            <div className="mb-10 w-full md:mb-0 md:w-[55%] lg:w-[95%] lg:max-w-[700px]">
              <img
                className="h-[320px] w-full rounded-2xl object-cover shadow-md sm:h-[420px] lg:h-[560px]"
                alt="hero"
                src={heroImage}
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-15 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
                <span className="block">The Future of Urban Living: </span>
                <span className="block">Navigating the 2024 Metropolis</span>
              </h1>
              <p className="mb-8 leading-relaxed">
                As major cities adapt to post-pandemic realities, a new wave of
                urban planning is transforming how we live, work, and commute.
                From 15-minute neighborhoods to vertical farming, explore the
                innovations reshaping our skylines.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start ">
                <button className="inline-flex text-white bg-indigo-700 border-0 py-2 px-6 hover:bg-indigo-600 rounded-2xl text-lg">
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
            ) : articles.length === 0 ? (
              <div className="px-5 py-10 text-center text-lg text-slate-600">
                No articles available.
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
                  const category =
                    fields.Category || fields.category || "General";
                  const title = fields.title || "Untitled article";
                  const shortDescription =
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
    </div>
  );
}

export default HeroArticle;
