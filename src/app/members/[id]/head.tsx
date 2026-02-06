interface HeadProps {
  params: { id: string };
}

export default function Head({ params }: HeadProps) {
  const title = `Member ${params.id} | OPF`;
  const description = "OPF member profile page.";
  const url = `https://opf.org.in/members/${params.id}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
}
