export default function Head() {
  const title = "Membership Payment Success";
  const description = "Your OPF membership payment was successful.";
  const url = "https://opf.org.in/membership-success";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
}
