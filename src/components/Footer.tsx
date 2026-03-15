import { siteContent } from "../data/siteContent";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4">
        <div>
          <img src={siteContent.brand.logo} alt={siteContent.brand.name} className="h-10" />
          <p className="mt-4 text-sm text-slate-300">
            Ofstride Services LLP, founded in 2019, is a creative and forward-thinking consulting firm.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold gradient-text">Useful Links</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a className="hover:text-white" href="/about">About Us</a></li>
            <li><a className="hover:text-white" href="/founder">Our Founder</a></li>
            <li><a className="hover:text-white" href="/team">Our Key Consulting Team</a></li>
            <li><a className="hover:text-white" href="/insights">Insights</a></li>
            <li><a className="hover:text-white" href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold gradient-text">Services</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a className="hover:text-white" href="/hr-consulting">HR Consulting</a></li>
            <li><a className="hover:text-white" href="/financial-consulting">Financial Consulting</a></li>
            <li><a className="hover:text-white" href="/legal-consulting">Legal Consulting</a></li>
            <li><a className="hover:text-white" href="/it-consulting">IT Consulting</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold gradient-text">Get in touch</h4>
          <p className="text-sm text-slate-300">Call: {siteContent.brand.phone}</p>
          <p className="text-sm text-slate-300">Email: {siteContent.brand.email}</p>
        </div>
      </div>
    </footer>
  );
}
