import { Link, useParams } from "react-router-dom";
import PageShell from "@/components/PageShell";
import NotFound from "@/pages/NotFound";
import BookCta from "@/components/BookCta";
import { buildGuidePageSchema } from "@/lib/schema";
import { GUIDES, findGuide, guideHref } from "@/data/guides";
import { BUSINESS } from "@/data/business";

const GuideDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? findGuide(slug) : undefined;

  if (!guide) return <NotFound />;

  const url = guideHref(guide.slug);
  const title = `${guide.title} | ${BUSINESS.name}`;
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Guides", url: "/guides" },
    { name: guide.title, url },
  ];
  const related = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <PageShell title={title} schema={buildGuidePageSchema(guide, url, title, breadcrumbs)} breadcrumbs={breadcrumbs}>
      <article className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{guide.title}</h1>
            <p className="text-lg text-muted-foreground mb-10">{guide.excerpt}</p>

            <div className="space-y-8">
              {guide.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">{section.heading}</h2>
                  <div className="space-y-3">
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-secondary/30 rounded-xl">
              <BookCta
                heading="Ready to book?"
                description={`We come to you across ${BUSINESS.address.addressLocality} and surrounding suburbs.`}
                secondary={{ label: "View Services & Prices", to: "/services" }}
              />
            </div>

            {related.length > 0 && (
              <div className="mt-14">
                <h2 className="text-lg font-bold text-foreground mb-4">Keep reading</h2>
                <div className="divide-y divide-border">
                  {related.map((g) => (
                    <Link
                      key={g.slug}
                      to={guideHref(g.slug)}
                      className="block py-4 hover:text-primary transition-colors"
                    >
                      <p className="font-medium text-foreground">{g.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </PageShell>
  );
};

export default GuideDetail;
