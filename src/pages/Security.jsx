import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Shield, Lock, KeyRound, FileSearch, Cloud,
  AlertTriangle, ScanLine, Users, CheckCircle, Mail
} from 'lucide-react'

const PRACTICES = [
  {
    icon: Lock,
    title: 'Encryption at rest and in transit',
    body: 'All customer data is encrypted at rest using AES-256 and in transit using TLS 1.2+. Database volumes, object storage, and backups are encrypted with managed keys. Internal service-to-service traffic stays inside private subnets and is encrypted end-to-end.',
  },
  {
    icon: KeyRound,
    title: 'Access controls',
    body: 'Production access follows least-privilege. Role-based access control (RBAC) is enforced at the application, database, and infrastructure layers. Administrative access requires SSO with mandatory multi-factor authentication. Customer tenants are logically isolated with per-tenant scoping on every query.',
  },
  {
    icon: FileSearch,
    title: 'Audit logging',
    body: 'Every authentication event, privileged action, configuration change, and data access against PHI is recorded to an append-only audit log. Logs include actor, action, resource, timestamp, and source IP. Audit data is retained for a minimum of six years to meet HIPAA requirements.',
  },
  {
    icon: Shield,
    title: 'Secret management',
    body: 'API keys, database credentials, and signing keys are stored in AWS Secrets Manager and SSM Parameter Store. No secrets are committed to source control. CI/CD pipelines pull secrets at deploy time. Keys rotate on a defined schedule and on any suspected exposure.',
  },
  {
    icon: Cloud,
    title: 'Infrastructure',
    body: 'Getmax runs on AWS in hardened VPCs with private subnets, security groups, and managed WAF. Compute is patched continuously. Backups are point-in-time, encrypted, and tested. We use infrastructure-as-code so every environment change is reviewed and version-controlled.',
  },
  {
    icon: AlertTriangle,
    title: 'Incident response',
    body: 'We maintain a documented incident response plan with on-call rotation, severity classification, and customer-notification SLAs. Confirmed incidents involving customer data are communicated to affected customers within the timelines required by their BAA and applicable law.',
  },
  {
    icon: ScanLine,
    title: 'Vulnerability management and pentesting',
    body: 'Dependencies are scanned continuously. Container images are scanned on build. We perform regular internal security reviews and engage third-party penetration testing on an annual basis. Critical findings are remediated on a defined SLA and re-tested.',
  },
  {
    icon: Users,
    title: 'Vendor and subprocessor BAAs',
    body: 'Every subprocessor that may touch PHI operates under a signed Business Associate Agreement. We maintain an up-to-date subprocessor list and review each vendor for security posture before onboarding and on an annual basis.',
  },
]

export default function Security() {
  return (
    <div className="min-h-screen">
      <div className="section-dark border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-400 font-medium mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <span className="badge text-purple-300 mb-4">Trust</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-4">
            <span className="gradient-text">Security</span> at Getmax
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            We handle protected health information and revenue data for healthcare organizations.
            Here is how we keep it safe.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {PRACTICES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="p-6 glass-card rounded-2xl"
            >
              <div className="w-11 h-11 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                <p.icon className="text-purple-400" size={22} />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">{p.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 p-7 glass-card rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="text-emerald-400" size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Reporting a security issue</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                If you believe you have discovered a vulnerability or want to request our latest
                security documentation, please reach out. We acknowledge reports within one business
                day.
              </p>
              <a
                href="mailto:security@getmaxglobal.com"
                className="inline-flex items-center gap-2 text-purple-400 font-semibold text-sm hover:text-purple-300 transition-colors"
              >
                <Mail size={16} /> security@getmaxglobal.com
              </a>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-10 text-center">Last updated: May 12, 2026</p>
      </div>
    </div>
  )
}
