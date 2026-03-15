export function Founder() {
  return (
    <main>
      <section className="bg-slate-950 py-16 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold gradient-text">Our Founder</h1>
          <p className="mt-3 text-slate-300">Meet the founder of Ofstride Services LLP and the leadership behind our consulting practice.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr,1.3fr]">
          <div className="card overflow-hidden">
            <img src="/assets/team/raj-kumar-jha.jpg" alt="Raj Kumar Jha" className="rounded-2xl photo-hover" />
          </div>
          <div className="card">
            <h2 className="text-2xl font-semibold">Raj Kumar Jha</h2>
            <p className="mt-1 text-sm font-semibold text-primary-500">Director</p>
            <p className="mt-4 text-sm text-slate-600">
              Raj Kumar Jha an air veteran with over 16 years of defence experience and over 16 years of corporate experience handling multiple roles in HR, business development, operations, and administration. He has a postgraduate degree in Business Administration from IIMS Kolkata and a certification in Business Strategy from IIM Lucknow. Worked in numerous capacities in the healthcare, hospitality, and insurance industries. Has worked as the Head of Human Resources and Administration for Talwalkars Better Value Fitness Ltd. Also worked as an Executive Director at Ki Squad Pvt Ltd, Bangalore.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
