import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ShieldCheck, FileText, Lock, ClipboardCheck,
  AlertOctagon, GraduationCap, UserCheck, Mail
} from 'lucide-react'

const SECTIONS = [
  {
    icon: FileText,
    title: 'Business Associate status and BAA',
    body:
      'Getmax Healthcare Solutions operates as a Business Associate under the HIPAA Privacy and Security Rules when handling Protected Health Information (PHI) on behalf of Covered Entity customers. We sign a Business Associate Agreement (BAA) with every customer before any PHI is exchanged, and we maintain executed BAAs with subprocessors that may access PHI in the course of providing the service.',
  },
  {
    icon: ShieldCheck,
    title: 'PHI handling',
    body:
      'PHI is only used and disclosed for the specific purposes permitted under the BAA and the Privacy Rule. We follow the minimum-necessary standard. PHI is never used for marketing, never sold, and never used to train shared machine learning models. Customer data is logically segregated by tenant.',
  },
  {
    icon: Lock,
    title: 'Encryption and safeguards',
    body:
      'PHI is encrypted at rest using AES-256 and in transit using TLS 1.2+. Access to PHI requires authenticated sessions with multi-factor authentication for workforce members. Workstations used to access PHI are managed, encrypted, and monitored. Physical infrastructure is hosted on AWS data centers, which maintain HIPAA-eligible service offerings.',
  },
  {
    icon: ClipboardCheck,
    title: 'Access logging',
    body:
      'Every access to PHI is logged with actor identity, action, resource, timestamp, and source IP. Audit records are append-only and retained for a minimum of six years. Logs are reviewed on a regular cadence and on demand in response to suspected incidents.',
  },
  {
    icon: AlertOctagon,
    title: 'Breach notification',
    body:
      'In the event of a confirmed breach of unsecured PHI, we notify the affected Covered Entity without unreasonable delay and in no case later than 60 calendar days from discovery, in line with 45 CFR § 164.410. Notifications include the nature of the breach, the data involved, mitigation steps, and the remediation timeline.',
  },
  {
    icon: GraduationCap,
    title: 'Workforce training',
    body:
      'All Getmax workforce members complete HIPAA privacy and security training at hire and annually thereafter. Role-specific training is provided to engineers, support, and operations staff. Training records are retained and produced on request.',
  },
]

export default function Hipaa() {
  return (
    <div className="min-h-screen">
      <div className="section-dark border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-400 font-medium mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <span className="badge text-emerald-300 mb-4">Compliance</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-4">
            <span className="gradient-text-emerald">HIPAA</span> Compliance
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Getmax operates as a Business Associate under HIPAA. This page summarizes how we
            protect Protected Health Information on behalf of our healthcare customers.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-5">
          {SECTIONS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="p-6 glass-card rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <s.icon className="text-emerald-400" size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">{s.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <div className="p-6 glass-card rounded-2xl">
            <div className="w-11 h-11 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
              <UserCheck className="text-purple-400" size={22} />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Privacy Officer</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              Sriram Raghavan is the designated HIPAA Privacy Officer for Getmax Healthcare
              Solutions. The Privacy Officer is responsible for the development and implementation
              of our privacy policies and procedures.
            </p>
            <a href="mailto:privacy@getmaxglobal.com" className="inline-flex items-center gap-2 text-purple-400 font-semibold text-sm hover:text-purple-300">
              <Mail size={16} /> privacy@getmaxglobal.com
            </a>
          </div>

          <div className="p-6 glass-card rounded-2xl">
            <div className="w-11 h-11 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="text-emerald-400" size={22} />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Security Officer</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              Gaurav Shukla is the designated HIPAA Security Officer. The Security Officer is
              responsible for the development and implementation of the policies and procedures
              required by the Security Rule.
            </p>
            <a href="mailto:security@getmaxglobal.com" className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-sm hover:text-emerald-300">
              <Mail size={16} /> security@getmaxglobal.com
            </a>
          </div>
        </div>

        <div className="mt-10 p-5 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04]">
          <p className="text-sm text-amber-200/90 leading-relaxed">
            <strong className="text-amber-300">Request a BAA:</strong> Healthcare customers can
            request our Business Associate Agreement template at{' '}
            <a href="mailto:legal@getmaxglobal.com" className="underline hover:text-amber-200">
              legal@getmaxglobal.com
            </a>
            . Customers must execute a BAA before transmitting PHI through any Getmax product.
          </p>
        </div>

        <p className="text-xs text-gray-600 mt-10 text-center">Last updated: May 12, 2026</p>
      </div>
    </div>
  )
}
