export default function Head() {
  const title = "Pharmaceutical Innovations and Insights";
  const description =
    "Explore OPF innovations in drug discovery, pharmaceutical technology, clinical research, and pharmacy professional advancement.";
  const url = "https://opf.org.in/innovations";
  const image = "https://opf.org.in/opflogo.png";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
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
