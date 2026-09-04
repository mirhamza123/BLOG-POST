import { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { Link, useParams } from "react-router-dom";
import { getArticleBySlug } from "../lib/contentful";

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const imageUrl = node?.data?.target?.fields?.file?.url;

      if (!imageUrl) return null;

      const src = imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl;

      return (
        <div className="my-8 overflow-hidden rounded-2xl">
          <img src={src} alt="" className="h-auto w-full object-cover" />
        </div>
      );
    },
  },
};

function CardDtail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setArticle(null);
      setLoading(false);
      return undefined;
    }

    let isMounted = true;

    const fetchArticle = async () => {
      setLoading(true);

      try {
        const articleData = await getArticleBySlug(slug);
        if (isMounted) {
          setArticle(articleData);
        }
      } catch (error) {
        console.error("Failed to fetch article detail:", error);
        if (isMounted) {
          setArticle(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArticle();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const getRichTextText = (nodes = []) =>
    nodes
      .map((node) => {
        if (node.value) return node.value;
        if (node.content) return getRichTextText(node.content);
        return "";
      })
      .join("");

  const renderDescription = (description) => {
    if (!description) {
      return (
        <p className="text-lg leading-8 text-slate-600">
          No description available.
        </p>
      );
    }

    if (typeof description === "string") {
      return <p className="text-lg leading-8 text-slate-700">{description}</p>;
    }

    if (description.content) {
      return description.content.map((block, index) => {
        if (block.nodeType !== "paragraph") return null;

        return (
          <p
            key={`${block.nodeType}-${index}`}
            className="mb-4 text-lg leading-8 text-slate-700"
          >
            {getRichTextText(block.content)}
          </p>
        );
      });
    }

    return (
      <p className="text-lg leading-8 text-slate-700">{String(description)}</p>
    );
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center text-lg text-slate-600">
        Loading article...
      </main>
    );
  }

  if (!article) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="mb-6 text-xl font-semibold text-slate-700">
          Article not found.
        </p>
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          ← Back to Home
        </Link>
      </main>
    );
  }

  const { fields = {} } = article;
  const imageUrl = fields.image?.fields?.file?.url;
  const authorName = fields.authorName || fields["author name"] || "Anonymous";
  const authorImageUrl = fields.authorimg?.fields?.file?.url;
  const readTime =
    fields["Reading Time"] || fields.readingTime || fields.readTime;
  const title = fields.title || "Untitled Article";
  const category = fields.Category || fields.category || "General";
  const body = fields.body;
  const shortDescription = fields.ShortDescription || fields.shortDescription;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-base font-medium text-indigo-600 transition hover:text-indigo-800"
        >
          ← Back to Home
        </Link>
      </div>

      <article className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200">
        <div className="p-6 md:p-10">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
              {category}
            </span>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              {authorImageUrl ? (
                <img
                  src={
                    authorImageUrl.startsWith("//")
                      ? `https:${authorImageUrl}`
                      : authorImageUrl
                  }
                  alt={authorName}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">
                  {authorName.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="font-semibold text-slate-800">{authorName}</span>
            </div>
            <span className="text-slate-400">|</span>
            <span>Reading time: {readTime || "Not specified"}</span>
          </div>

          <h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h1>

          {imageUrl && (
            <div className="mb-8 overflow-hidden rounded-2xl">
              <img
                src={imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl}
                alt={title}
                className="h-[350px] w-full object-cover md:h-[500px]"
              />
            </div>
          )}

          <div className="prose prose-slate max-w-none">
            {body ? (
              documentToReactComponents(body, renderOptions)
            ) : shortDescription ? (
              <p className="text-lg leading-8 text-slate-700">
                {shortDescription}
              </p>
            ) : (
              <p className="text-lg leading-8 text-slate-600">
                No description available.
              </p>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}

export default CardDtail;
