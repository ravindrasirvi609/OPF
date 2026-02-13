import { Clock3, Mail, MapPin, Phone, SendHorizonal } from "lucide-react";
import Link from "next/link";
import PageHero from "../components/PageHero";
import { breadcrumbSchema, pageSchema } from "../lib/seo";

const contactItems = [
  {
    icon: MapPin,
    title: "Registered Office",
    details: ["Shradhawan Tower, Mayank Nagar", "Pali - Marwar, Rajasthan - 306401, India"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["admin@opf.org.in", "help@opf.org.in"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 94609 71652"],
  },
  {
    icon: Clock3,
    title: "Office Hours",
    details: ["Monday to Saturday: 9:00 AM to 6:00 PM", "Sunday: Closed"],
  },
];

export default function ContactPage() {
  const webPage = pageSchema({
    title: "Contact Operant Pharmacy Federation",
    description:
      "Contact OPF for membership guidance, pharmaceutical research collaborations, conference participation, and pharmacy education support.",
    path: "/contact",
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Operant Pharmacy Federation",
    url: "https://opf.org.in/contact",
    about: {
      "@type": "Organization",
      name: "Operant Pharmacy Federation",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <PageHero
        tag="Contact OPF"
        title="Speak With the OPF Team for Membership, Research, and Collaboration"
        description="Reach out for support on OPF memberships, conference participation, research publishing guidance, and institutional partnerships in pharmaceutical sciences."
        image="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2000"
        alt="Medical research professionals discussing strategy"
        actions={[
          { href: "mailto:help@opf.org.in", label: "Email Support" },
          { href: "/membershipForm", label: "Apply for Membership", variant: "secondary" },
        ]}
      />

      <section className="section-pad">
        <div className="section-shell grid gap-5 lg:grid-cols-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="surface-card rounded-3xl p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <Icon size={18} />
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900">{item.title}</h2>
                  <div className="mt-2 space-y-1 text-sm text-slate-600">
                    {item.details.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="surface-card rounded-[2rem] p-6 sm:p-8 lg:col-span-7">
            <h2 className="text-3xl font-semibold text-slate-900">Send a Message</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              For faster assistance, include your purpose such as membership support, conference registration, research publication, or institutional collaboration.
            </p>

            <form className="mt-6 grid gap-4 sm:grid-cols-2" action="mailto:help@opf.org.in" method="post" encType="text/plain">
              <Input label="Full Name" name="name" placeholder="Your full name" />
              <Input label="Email Address" name="email" type="email" placeholder="name@email.com" />
              <Input label="Phone Number" name="phone" placeholder="10-digit mobile number" />
              <Input label="Subject" name="subject" placeholder="Membership query" />
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-slate-700">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-900"
                />
              </label>

              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a4ea3]"
              >
                Send Message
                <SendHorizonal size={15} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="section-shell">
          <div className="surface-card rounded-[2rem] p-6 md:p-8">
            <h2 className="text-3xl font-semibold text-slate-900">Looking for a Quick Start?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Start with our most visited routes to understand OPF programs and make a faster decision about joining.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/about" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
                About OPF
              </Link>
              <Link href="/memberships" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
                Membership Plans
              </Link>
              <Link href="/topics" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
                Topic Hubs
              </Link>
              <Link href="/impact-stories" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
                View Impact Stories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Input({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-900"
      />
    </label>
  );
}
