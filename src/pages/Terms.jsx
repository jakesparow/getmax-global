import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const SECTIONS = [
  {
    title: '1. Acceptance of these terms',
    body: (
      <>
        These Terms of Service ("Terms") form a binding agreement between you ("Customer," "you")
        and Getmax Healthcare Solutions Pvt. Ltd. ("Getmax," "we," "us"). By accessing or using
        any Getmax product, website, or API (collectively, the "Service"), you agree to these
        Terms. If you accept on behalf of an organization, you represent that you have authority
        to bind that organization.
      </>
    ),
  },
  {
    title: '2. License grant',
    body: (
      <>
        Subject to your compliance with these Terms and timely payment of fees, Getmax grants you
        a non-exclusive, non-transferable, non-sublicensable, revocable license to access and use
        the Service for your internal business purposes during the subscription term.
      </>
    ),
  },
  {
    title: '3. Restrictions',
    body: (
      <>
        <p className="mb-3">You will not, and will not permit any third party to:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-400">
          <li>copy, modify, or create derivative works of the Service;</li>
          <li>reverse engineer, decompile, or otherwise attempt to derive source code or model weights;</li>
          <li>resell, sublicense, or commercially exploit the Service except as expressly permitted;</li>
          <li>upload or transmit malware or use the Service to violate any law;</li>
          <li>use the Service to build a competing product or to benchmark without our prior written consent;</li>
          <li>circumvent technical limitations, rate limits, or access controls;</li>
          <li>upload Protected Health Information (PHI) unless a Business Associate Agreement is in effect.</li>
        </ul>
      </>
    ),
  },
  {
    title: '4. Customer data and content',
    body: (
      <>
        You retain all rights to data you submit to the Service ("Customer Data"). You grant
        Getmax a limited license to process Customer Data solely to provide and support the
        Service, to maintain security, and to comply with law. We do not use Customer Data to
        train shared machine learning models.
      </>
    ),
  },
  {
    title: '5. Intellectual property',
    body: (
      <>
        The Service, including all software, models, designs, and documentation, is owned by
        Getmax and its licensors and is protected by applicable intellectual property laws.
        Except for the license expressly granted in these Terms, no rights are transferred to
        you. Feedback you provide may be used by Getmax without restriction.
      </>
    ),
  },
  {
    title: '6. Fees and payment',
    body: (
      <>
        Fees are set out in the applicable order form or pricing page. Unless otherwise stated,
        fees are payable in advance, non-refundable, and exclusive of taxes. Late payments accrue
        interest at the lower of 1.5% per month or the maximum allowed by law. We may suspend the
        Service for non-payment after written notice.
      </>
    ),
  },
  {
    title: '7. Term and termination',
    body: (
      <>
        These Terms remain in effect until terminated. Either party may terminate for material
        breach not cured within 30 days of written notice. Upon termination, your right to use
        the Service ends and Getmax will delete or return Customer Data in accordance with the
        order form and any applicable BAA. Sections that by their nature should survive
        termination will survive.
      </>
    ),
  },
  {
    title: '8. Disclaimer of warranties',
    body: (
      <>
        EXCEPT AS EXPRESSLY STATED, THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE." GETMAX
        DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. GETMAX DOES NOT
        WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT AI-GENERATED OUTPUTS
        WILL BE ACCURATE OR FIT FOR YOUR USE. YOU ARE RESPONSIBLE FOR CLINICAL, BILLING, LEGAL,
        AND OPERATIONAL DECISIONS THAT RELY ON OUTPUT FROM THE SERVICE.
      </>
    ),
  },
  {
    title: '9. Limitation of liability',
    body: (
      <>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE,
        OR DATA. EACH PARTY'S TOTAL AGGREGATE LIABILITY UNDER THESE TERMS WILL NOT EXCEED THE
        AMOUNTS PAID OR PAYABLE BY YOU TO GETMAX IN THE 12 MONTHS PRECEDING THE EVENT GIVING
        RISE TO LIABILITY. THESE LIMITS DO NOT APPLY TO BREACHES OF CONFIDENTIALITY
        OBLIGATIONS, INDEMNITY OBLIGATIONS, OR LIABILITY THAT CANNOT BE LIMITED BY LAW.
      </>
    ),
  },
  {
    title: '10. Indemnification',
    body: (
      <>
        You will defend and indemnify Getmax against third-party claims arising from your
        Customer Data, your use of the Service in violation of these Terms, or your violation
        of applicable law. Getmax will defend and indemnify you against third-party claims that
        the Service, as provided, infringes that party's intellectual property rights, subject
        to customary exclusions and procedures.
      </>
    ),
  },
  {
    title: '11. Governing law and venue',
    body: (
      <>
        These Terms are governed by the laws of India, without regard to conflict-of-laws rules.
        The courts located in Chennai, Tamil Nadu, India will have exclusive jurisdiction over
        any dispute arising out of or relating to these Terms, except that either party may seek
        injunctive relief in any court of competent jurisdiction to protect its intellectual
        property.
      </>
    ),
  },
  {
    title: '12. Changes',
    body: (
      <>
        We may update these Terms from time to time. We will provide reasonable notice of
        material changes. Continued use of the Service after changes take effect constitutes
        acceptance of the updated Terms.
      </>
    ),
  },
  {
    title: '13. Contact',
    body: (
      <>
        Notices to Getmax should be sent to{' '}
        <a href="mailto:legal@getmaxglobal.com" className="text-purple-400 hover:underline">
          legal@getmaxglobal.com
        </a>{' '}
        or to our registered office in Chennai, Tamil Nadu, India.
      </>
    ),
  },
]

export default function Terms() {
  return (
    <div className="min-h-screen">
      <div className="section-dark border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-400 font-medium mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <span className="badge text-purple-300 mb-4">Legal</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-4">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-gray-400 text-lg">
            The rules for using Getmax products and the Service.
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
