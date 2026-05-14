import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const SECTIONS = [
  {
    title: '1. Who we are',
    body: (
      <>
        Getmax Healthcare Solutions Pvt. Ltd. ("Getmax," "we," "us," or "our") operates the
        websites at getmaxglobal.com and app.getmaxglobal.com and provides AI-native software
        products for healthcare revenue cycle management, voice operations, marketing, and
        workforce management. This Privacy Policy explains how we collect, use, share, and
        protect personal information.
      </>
    ),
  },
  {
    title: '2. Information we collect',
    body: (
      <>
        <p className="mb-3">We collect the following categories of information:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-400">
          <li><strong className="text-gray-200">Account data:</strong> name, work email, role, employer, password hash.</li>
          <li><strong className="text-gray-200">Usage data:</strong> pages visited, features used, device and browser metadata, IP address, session identifiers.</li>
          <li><strong className="text-gray-200">Communications:</strong> messages you send us through contact forms, email, demo bookings, and support tickets.</li>
          <li><strong className="text-gray-200">Customer content:</strong> data you upload, sync, or generate inside our products, including business records and, where applicable under a BAA, Protected Health Information (PHI).</li>
          <li><strong className="text-gray-200">Cookies:</strong> strictly necessary cookies for authentication and session management, and limited analytics cookies. We do not use third-party advertising cookies.</li>
        </ul>
      </>
    ),
  },
  {
    title: '3. How we use information',
    body: (
      <>
        We use personal information to: provide and operate the service; authenticate users and
        secure accounts; respond to support and sales requests; bill for paid plans; send service
        notices and, where you have opted in, product updates; investigate and prevent abuse,
        fraud, and security incidents; comply with legal obligations; and improve product
        quality. Customer content is processed only to deliver the product to that customer; we
        do not use customer content to train shared models.
      </>
    ),
  },
  {
    title: '4. Legal bases',
    body: (
      <>
        Where the EU/UK GDPR applies, we process personal data on the bases of contract
        performance, legitimate interests (operating and securing the service), consent
        (marketing communications you have opted into), and legal obligation.
      </>
    ),
  },
  {
    title: '5. How we share information',
    body: (
      <>
        <p className="mb-3">We share information only as needed and with appropriate contracts in place:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-400">
          <li><strong className="text-gray-200">Subprocessors:</strong> infrastructure (AWS), email and identity providers, payment processors, and analytics. Subprocessors that may access PHI operate under a signed BAA.</li>
          <li><strong className="text-gray-200">Within your organization:</strong> administrators of your tenant can see usage and content as required to operate the workspace.</li>
          <li><strong className="text-gray-200">Legal:</strong> where required by law, valid legal process, or to protect rights, safety, and property.</li>
          <li><strong className="text-gray-200">Business transfers:</strong> in connection with a merger, acquisition, or asset sale, subject to confidentiality protections.</li>
        </ul>
        <p className="mt-3">We do not sell personal information.</p>
      </>
    ),
  },
  {
    title: '6. Data retention',
    body: (
      <>
        We retain personal information for as long as your account is active and as needed to
        provide the service. Audit logs and records required to demonstrate HIPAA compliance are
        retained for a minimum of six years. After termination, customer content is deleted or
        returned in accordance with the applicable order form and BAA, subject to backup
        rotation.
      </>
    ),
  },
  {
    title: '7. Security',
    body: (
      <>
        We use administrative, technical, and physical safeguards designed to protect personal
        information, including encryption at rest and in transit, role-based access controls,
        audit logging, and least-privilege production access. See our{' '}
        <Link to="/security" className="text-purple-400 hover:underline">Security</Link> page for
        more detail.
      </>
    ),
  },
  {
    title: '8. Your rights',
    body: (
      <>
        Depending on where you live, you may have the right to access, correct, delete, or
        export your personal information, to object to or restrict certain processing, and to
        withdraw consent. To exercise these rights, contact us at the address below. If you are
        an employee of a Getmax customer, please direct requests about content stored in that
        customer's workspace to your administrator.
      </>
    ),
  },
  {
    title: '9. International transfers',
    body: (
      <>
        Getmax operates from India and uses cloud infrastructure in the United States and
        elsewhere. Where data is transferred internationally, we rely on appropriate safeguards
        such as standard contractual clauses.
      </>
    ),
  },
  {
    title: '10. Children',
    body: (
      <>
        Our service is not directed to children under 16, and we do not knowingly collect
        personal information from them.
      </>
    ),
  },
  {
    title: '11. Changes to this policy',
    body: (
      <>
        We may update this Privacy Policy from time to time. Material changes will be announced
        through the product or by email. The "last updated" date at the bottom reflects the most
        recent revision.
      </>
    ),
  },
  {
    title: '12. Contact us',
    body: (
      <>
        Questions or requests under this policy can be sent to{' '}
        <a href="mailto:info@getmaxsolutions.com" className="text-purple-400 hover:underline">
          info@getmaxsolutions.com
        </a>
        . For HIPAA-specific requests, write to{' '}
        <a href="mailto:privacy@getmaxglobal.com" className="text-purple-400 hover:underline">
          privacy@getmaxglobal.com
        </a>
        .
      </>
    ),
  },
]

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <div className="section-dark border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-400 font-medium mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <span className="badge text-purple-300 mb-4">Legal</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-4">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-gray-400 text-lg">
            How Getmax collects, uses, and protects your information.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {SECTIONS.map((s, i) => (
            <section key={i}>
              <h2 className="text-xl font-bold text-white mb-3">{s.title}</h2>
              <div className="text-gray-400 text-[15px] leading-relaxed">{s.body}</div>
            </section>
          ))}
        </div>

        <p className="text-xs text-gray-600 mt-12 text-center">Last updated: May 12, 2026</p>
      </div>
    </div>
  )
}
