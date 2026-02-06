export default function Head() {
  const title = "Privacy Policy | Operant Pharmacy Federation";
  const description =
    "Read the OPF privacy policy explaining how we collect, use, protect, and process your pharmacy membership and website data.";
  const url = "https://opf.org.in/privacy";
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
