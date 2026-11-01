import emailjs from '@emailjs/browser'

export interface ContactFormData {
  name: string
  email: string
  company?: string
  engagementModel?: string
  service: string
  details: string
}

export interface EmailSendResult {
  success: boolean
  adminSent: boolean
  autoReplySent: boolean
  error?: string
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const TEMPLATE_ADMIN = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN || ''
const TEMPLATE_AUTOREPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY || ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

/**
 * Checks if EmailJS environment variables are present and configured.
 */
export function isEmailJsConfigured(): boolean {
  return Boolean(SERVICE_ID && (TEMPLATE_ADMIN || TEMPLATE_AUTOREPLY) && PUBLIC_KEY)
}

/**
 * Sends both the Admin notification email (to Arivom Technologies)
 * and/or an automated confirmation Auto-Reply (to the client/visitor).
 */
export async function sendContactEmail(
  data: ContactFormData
): Promise<EmailSendResult> {
  const templateParams: Record<string, string> = {
    name: data.name,
    email: data.email,
    company: data.company || 'Not specified',
    engagement_model: data.engagementModel || 'Not selected',
    service: data.service || 'Web Development',
    details: data.details,
    submitted_at: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    reply_to: data.email,
  }

  // Graceful development mode fallback if credentials are not configured yet
  if (!isEmailJsConfigured()) {
    console.warn(
      '[EmailJS Service] Credentials not detected in environment variables.\n' +
        'To enable live email delivery and auto-replies, ensure .env contains:\n' +
        '  VITE_EMAILJS_SERVICE_ID=service_...\n' +
        '  VITE_EMAILJS_TEMPLATE_AUTOREPLY=template_...\n' +
        '  VITE_EMAILJS_PUBLIC_KEY=your_public_key\n' +
        'Simulating successful submission for now with payload:',
      templateParams
    )

    // Simulate standard network roundtrip latency
    await new Promise((resolve) => setTimeout(resolve, 850))

    return {
      success: true,
      adminSent: true,
      autoReplySent: true,
    }
  }

  try {
    // 1. Dispatch Admin Notification Email (if template provided)
    const adminPromise = TEMPLATE_ADMIN
      ? emailjs.send(
          SERVICE_ID,
          TEMPLATE_ADMIN,
          templateParams,
          PUBLIC_KEY
        )
      : Promise.resolve(null)

    // 2. Dispatch Auto-Reply Email to Client (if template provided)
    const autoReplyPromise = TEMPLATE_AUTOREPLY
      ? emailjs.send(
          SERVICE_ID,
          TEMPLATE_AUTOREPLY,
          templateParams,
          PUBLIC_KEY
        )
      : Promise.resolve(null)

    // Dispatch in parallel
    const [adminResult, autoReplyResult] = await Promise.allSettled([
      adminPromise,
      autoReplyPromise,
    ])

    const adminSent = adminResult.status === 'fulfilled' && adminResult.value !== null
    const autoReplySent =
      autoReplyResult.status === 'fulfilled' && autoReplyResult.value !== null

    // If both failed or configured templates failed
    const adminFailed = Boolean(TEMPLATE_ADMIN && adminResult.status === 'rejected')
    const autoReplyFailed = Boolean(
      TEMPLATE_AUTOREPLY && autoReplyResult.status === 'rejected'
    )

    if (adminFailed && autoReplyFailed) {
      const reason =
        adminResult.status === 'rejected' ? adminResult.reason : 'Unknown error'
      console.error('[EmailJS] Both email dispatches failed:', reason)
      throw new Error(
        typeof reason === 'object' && reason !== null && 'text' in reason
          ? String((reason as { text: unknown }).text)
          : 'Failed to deliver emails via EmailJS.'
      )
    }

    if (adminFailed) {
      console.warn(
        '[EmailJS] Auto-reply was sent, but admin brief notification failed:',
        adminResult.status === 'rejected' ? adminResult.reason : ''
      )
    }

    if (autoReplyFailed) {
      console.warn(
        '[EmailJS] Admin email succeeded, but auto-reply failed:',
        autoReplyResult.status === 'rejected' ? autoReplyResult.reason : ''
      )
    }

    return {
      success: adminSent || autoReplySent,
      adminSent,
      autoReplySent,
    }
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error
        ? err.message
        : 'An unexpected error occurred while transmitting your project brief.'
    console.error('[EmailJS Error]', err)

    return {
      success: false,
      adminSent: false,
      autoReplySent: false,
      error: errorMsg,
    }
  }
}
