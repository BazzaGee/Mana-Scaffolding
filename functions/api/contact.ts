export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json<{ name: string; email: string; phone: string; project_type: string; message: string }>();

    const { name, email, phone, project_type, message = '' } = body;

    if (!name || name.length < 2) {
      console.log(`[CONTACT] Validation failed: Invalid name: "${name}"`);
      return Response.json({ error: 'Name must be at least 2 characters.' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log(`[CONTACT] Validation failed: Invalid email: "${email}"`);
      return Response.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (!phone || phone.length < 7) {
      console.log(`[CONTACT] Validation failed: Invalid phone: "${phone}"`);
      return Response.json({ error: 'Phone number too short.' }, { status: 400 });
    }
    if (!message || message.length < 10) {
      console.log(`[CONTACT] Validation failed: Message too short`);
      return Response.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const submissionId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const nzTime = new Date().toLocaleString('en-NZ', {
      timeZone: 'Pacific/Auckland',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    console.log(`[CONTACT] ========================================`);
    console.log(`[CONTACT] Form submission received`);
    console.log(`[CONTACT] Submission ID: ${submissionId}`);
    console.log(`[CONTACT] Timestamp: ${nzTime}`);
    console.log(`[CONTACT] Name: ${name}`);
    console.log(`[CONTACT] Email: ${email}`);
    console.log(`[CONTACT] Phone: ${phone}`);
    console.log(`[CONTACT] Project Type: ${project_type}`);
    console.log(`[CONTACT] Message: ${message.substring(0, 50)}...`);
    console.log(`[CONTACT] ========================================`);

    console.log(`[CONTACT] Mock mode: Email service not configured - simulating success`);
    console.log(`[CONTACT] (Resend/Cloudflare Email will be configured later)`);
    console.log(`[CONTACT] Redirecting to thank you page...`);

    return Response.json({ success: true, submissionId });
  } catch (error) {
    console.error('[CONTACT] Contact form error:', error);
    return Response.json(
      { error: 'Failed to send request. Please try again or call 0508 626 272.' },
      { status: 500 },
    );
  }
};
