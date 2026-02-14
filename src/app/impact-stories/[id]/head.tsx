import { conferences } from "../../../../data";

interface HeadProps {
  params: { id: string };
}

export default function Head({ params }: HeadProps) {
  const conference = conferences.find((item) => item.id === Number(params.id));
  const title =
    conference?.metaTitle ||
    conference?.heading ||
    `Impact Story ${params.id} | Operant Pharmacy Federation`;
  const description =
    conference?.metaDescription ||
    conference?.description ||
    "Explore a detailed OPF impact story on pharmacy research, conference outcomes, and healthcare collaboration.";
  const url = `https://opf.org.in/impact-stories/${params.id}`;
  const image = conference?.coverImage || conference?.images?.[0] || "https://opf.org.in/opf-main.webp";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
