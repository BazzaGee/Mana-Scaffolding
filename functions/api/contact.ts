export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json<{ name: string; email: string; phone: string; project_type: string; message: string }>();

    const { name, email, phone, project_type, message } = body;

    if (!name || name.length < 2) {
      return Response.json({ error: 'Name must be at least 2 characters.' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (!phone || phone.length < 7) {
      return Response.json({ error: 'Phone number too short.' }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return Response.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const submissionId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const nzTime = new Date().toLocaleString('en-NZ', {
      timeZone: 'Pacific/Auckland',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const resendApiKey = context.env.RESEND_API_KEY;

    if (resendApiKey) {
      const emailBody = [
        `New Quote Request from Mana Scaffolding Website`,
        `================================================`,
        ``,
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Phone:   ${phone}`,
        `Project Type: ${project_type}`,
        ``,
        `Message:`,
        `${message}`,
        ``,
        `---`,
        `Submitted at: ${nzTime}`,
        `Submission ID: ${submissionId}`,
      ].join('\n');

      const sendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Mana Scaffolding <onboarding@resend.dev>',
          to: ['buttersnoco@gmail.com'],
          subject: `New Quote Request from ${name} - ${project_type}`,
          text: emailBody,
          reply_to: email,
        }),
      });

      if (!sendResponse.ok) {
        const errorText = await sendResponse.text();
        console.error('Resend API error:', errorText);
      }
    }

    const kv = context.env.CONTACT_SUBMISSIONS;
    if (kv) {
      await kv.put(submissionId, JSON.stringify({
        id: submissionId,
        timestamp,
        nzTime,
        name,
        email,
        phone,
        project_type,
        message,
      }));
    }

    return Response.json({ success: true, submissionId });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { error: 'Failed to send request. Please try again or call 0508 626 272.' },
      { status: 500 },
    );
  }
};
