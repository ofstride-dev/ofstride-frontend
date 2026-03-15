export function About() {
  return (
    <main>
      <section className="bg-slate-950 py-16 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold gradient-text">About Us</h1>
          <p className="mt-3 text-slate-300">
            Learn about Ofstride Services LLP, our mission, and our approach to modern consulting for growing businesses.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr,1.1fr]">
          <div className="card overflow-hidden">
            <img src="/assets/creatives/about.png" alt="Ofstride Services LLP" className="rounded-2xl photo-hover" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-primary-500">ABOUT US</p>
              <h2 className="text-3xl font-bold">Ofstride Services LLP</h2>
            </div>
            <p className="text-slate-600">
              Ofstride Services LLP, founded in 2019, is a creative and forward-thinking consulting firm that specializes in offering comprehensive consulting services in the areas of human resources, finance, legal, and information technology.
            </p>
            <p className="text-slate-600">
              We use a 360-degree approach while engaging with our clients or team members, and we adhere to these three essential values of Integrity Reliability and delivery while connecting talents, transforming resources, and empowering people and organizations. While we understand the pain points of our clients we keep our services affordable and available across the states.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <h2 className="text-2xl font-bold">Why Ofstride Services LLP</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="card">
              <h3 className="text-lg font-semibold">Industry Expertise</h3>
              <p className="mt-2 text-sm text-slate-600">Our team comprises seasoned professionals with extensive experience in their respective domains.</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold">Client-Centric Approach</h3>
              <p className="mt-2 text-sm text-slate-600">We prioritize our clients' success and work closely with them to achieve their business objectives.</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold">Adaptability</h3>
              <p className="mt-2 text-sm text-slate-600">We provide adaptable solutions to meet the evolving needs of businesses.</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold">Long-term Partnerships</h3>
              <p className="mt-2 text-sm text-slate-600">We aim to build enduring relationships with our clients, becoming trusted advisors throughout their journey.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          <div className="card">
            <h3 className="text-xl font-semibold">Our Approach</h3>
            <p className="mt-3 text-sm text-slate-600">At Ofstride Services LLP, we understand the unique challenges that MSMEs and startups face.</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><strong>Tailored Solutions:</strong> We craft customized strategies and solutions that align with the specific needs and goals of each client.</li>
              <li><strong>Cost-Effective Services:</strong> We recognize the importance of managing costs, and our services are designed to provide maximum value within budget constraints.</li>
              <li><strong>Regulatory Expertise:</strong> Our legal and financial consultants are well-versed in the regulatory landscape, ensuring that our clients remain compliant at all times.</li>
              <li><strong>Technology Integration:</strong> We leverage cutting-edge IT solutions to enhance business processes and drive efficiency.</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="mt-3 text-sm text-slate-600">
              To establish a reservoir of seasoned professionals catering to the dynamic demands of the business landscape, Ofstride Services LLP endeavors to cultivate a team of experts committed to honesty, dependability, and the fulfillment of promises. Drawing upon extensive experience, we aim to navigate the ever-changing business environment with precision. Our dedication is centered around not only meeting but exceeding client expectations. We aspire to unlock opportunities, ensuring success and spreading happiness through our unwavering commitment to excellence in all facets of our endeavors. At Ofstride Services LLP, our mission is to be more than just a service provider; we aim to be a trusted partner in your journey towards sustained growth and prosperity.
            </p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="mt-3 text-sm text-slate-600">
              In our pursuit to become a steadfast business ally, Ofstride Services LLP aspires to be the trusted companion for individuals and organizations on their journey toward growth and new opportunities in the expansive world of possibilities. We are dedicated to fostering mutually beneficial partnerships, providing unparalleled support, and unlocking avenues for success. At Ofstride Services LLP, we believe in the power of collaboration and aim to be the catalyst for your ventures to thrive in the ever-evolving landscape of opportunities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
