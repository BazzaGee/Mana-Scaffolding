import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';

export const contact = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(7, 'Phone number too short'),
    project_type: z.enum(['residential', 'commercial', 'industrial', 'complex', 'other']),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  }),
  handler: async (input, ctx) => {
    const timestamp = new Date().toISOString();
    const submissionId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const nzTime = new Date().toLocaleString('en-NZ', { 
      timeZone: 'Pacific/Auckland', 
      dateStyle: 'full', 
      timeStyle: 'short' 
    });

    const submissionData = {
      id: submissionId,
      timestamp,
      nzTime,
      ...input,
    };

    try {
      const resendApiKey = ctx.env.RESEND_API_KEY;
      const isProduction = resendApiKey && !ctx.env.PUBLIC_SITE_URL?.includes('localhost');

      if (isProduction) {
        const emailBody = [
          `New Quote Request from Mana Scaffolding Website`,
          `================================================`,
          ``,
          `Name:    ${input.name}`,
          `Email:   ${input.email}`,
          `Phone:   ${input.phone}`,
          `Project Type: ${input.project_type}`,
          ``,
          `Message:`,
          `${input.message}`,
          ``,
          `---`,
          `Submitted at: ${nzTime}`,
          `Submission ID: ${submissionId}`,
        ].join('\n');

        const sendRequest = new Request('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Mana Scaffolding <onboarding@resend.dev>',
            to: ['buttersnoco@gmail.com'],
            subject: `New Quote Request from ${input.name} - ${input.project_type}`,
            text: emailBody,
            reply_to: input.email,
          }),
        });

        const sendResponse = await fetch(sendRequest);

        if (!sendResponse.ok) {
          const errorText = await sendResponse.text();
          console.error('Resend API error:', errorText);
          throw new Error(`Resend API failed: ${sendResponse.status}`);
        }

        console.log(`Email sent successfully to buttersnoco@gmail.com via Resend`);
      } else {
        console.log('=== CONTACT FORM SUBMISSION (DEV MODE) ===');
        console.log(`Name: ${input.name}`);
        console.log(`Email: ${input.email}`);
        console.log(`Phone: ${input.phone}`);
        console.log(`Project Type: ${input.project_type}`);
        console.log(`Message: ${input.message}`);
        console.log(`Submitted at: ${nzTime}`);
        console.log('==========================================');
        console.log('Email not sent (DEV MODE - no Resend API key)');
      }

      await ctx.env.CONTACT_SUBMISSIONS.put(submissionId, JSON.stringify(submissionData));

      return {
        success: true,
        submissionId,
        message: 'Quote request sent successfully',
      };
    } catch (error) {
      console.error('Failed to process contact form:', error);
      
      await ctx.env.CONTACT_SUBMISSIONS.put(submissionId, JSON.stringify({
        ...submissionData,
        emailSent: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));

      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to send quote request. Please try again or call us directly.',
      });
    }
  },
});
