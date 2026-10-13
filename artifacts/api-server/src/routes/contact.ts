import { Router, type IRouter } from "express";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import {
  SubmitContactBody,
  SubmitContactResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler(_req, res): void {
    res.status(429).json({
      error: "Too many requests. Please wait a little before trying again.",
    });
  },
});

const successResponse = SubmitContactResponse.parse({
  success: true,
  message: "Thank you! I've received your message and will reply within 24 hours.",
});

function sanitizeText(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, " ")
    .trim();
}

function asPlainText(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key,
      typeof entry === "string" ? sanitizeText(entry) : entry,
    ]),
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

router.post("/contact", contactLimiter, async (req, res): Promise<void> => {
  const raw = asPlainText(req.body);
  if (!raw) {
    res.status(400).json({ error: "Please check the form and try again." });
    return;
  }

  // Silently accept filled honeypots so automated spam does not learn the field exists.
  if (typeof raw.website === "string" && raw.website.length > 0) {
    res.status(200).json(successResponse);
    return;
  }

  const parsed = SubmitContactBody.safeParse(raw);
  if (!parsed.success) {
    res.status(400).json({ error: "Please check the form fields and try again." });
    return;
  }

  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASS;
  const recipient = process.env.CONTACT_TO?.trim();

  if (
    !host ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    !user ||
    !password ||
    !recipient
  ) {
    req.log.warn("Contact email settings are incomplete");
    res.status(503).json({
      error: "Email delivery is not set up yet. Please email rafiariqmaulana48@gmail.com directly.",
    });
    return;
  }

  const { name, email, service, project, timeline, budget, referenceLinks } =
    parsed.data;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `What do you need?: ${service}`,
    `Timeline: ${timeline}`,
    `Budget range in USD: ${budget}`,
    `Reference links: ${referenceLinks || "Not provided"}`,
    "",
    "Project details:",
    project,
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass: password },
    });
    await transporter.sendMail({
      from: user,
      to: recipient,
      replyTo: { name, address: email },
      subject: `Portfolio enquiry from ${name.replace(/[\r\n]/g, " ")}`,
      text,
      html: `<pre style="font:14px/1.5 sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
    });
    res.status(200).json(successResponse);
  } catch (error) {
    req.log.error({ err: error }, "Contact email delivery failed");
    res.status(500).json({
      error: "Your message could not be sent right now. Please try again or email rafiariqmaulana48@gmail.com.",
    });
  }
});

export default router;
