import { fail, type RequestEvent } from '@sveltejs/kit';
import { publicCreate } from './directus.js';

/**
 * Shared form action: validates the contact form and stores it as a
 * `contact_requests` item (the public policy allows create-only access).
 * The team triages the inbox in Directus; a Flow can forward it by email.
 */
export async function handleContactAction(event: RequestEvent) {
  const data = await event.request.formData();
  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();
  const company = String(data.get('company') ?? '').trim();
  const phone = String(data.get('phone') ?? '').trim();
  const recipient = String(data.get('recipient') ?? '').trim();

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail(400, { contactError: 'validation' });
  }

  try {
    await publicCreate('contact_requests', {
      name,
      email,
      message,
      company: company || null,
      phone: phone || null,
      recipient: recipient || null,
      page_url: event.url.pathname,
    });
  } catch (e) {
    console.error('contact_requests create failed:', e);
    return fail(502, { contactError: 'upstream' });
  }
  return { contactSuccess: true };
}
