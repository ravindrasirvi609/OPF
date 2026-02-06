export default function Head() {
  const title = "OPF Members Directory";
  const description = "Browse verified OPF members and professional affiliations.";
  const url = "https://opf.org.in/members";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="noindex, follow" />
    </>
  );
}
