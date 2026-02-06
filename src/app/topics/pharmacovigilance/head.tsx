export default function Head() {
  const title = "Pharmacovigilance Training and Resources";
  const description =
    "Learn pharmacovigilance fundamentals, adverse event reporting, drug safety monitoring, and OPF career guidance resources.";
  const url = "https://opf.org.in/topics/pharmacovigilance";
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
