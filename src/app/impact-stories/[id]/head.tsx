interface HeadProps {
  params: { id: string };
}

export default function Head({ params }: HeadProps) {
  const title = `Impact Story ${params.id} | Operant Pharmacy Federation`;
  const description =
    "Explore a detailed OPF impact story on pharmacy research, conference outcomes, and healthcare collaboration.";
  const url = `https://opf.org.in/impact-stories/${params.id}`;
  const image = "https://opf.org.in/opflogo.png";

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
