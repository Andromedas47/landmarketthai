import { z } from "zod";

const thaiPhone = z
  .string()
  .regex(/^0[0-9]{8,9}$/, "กรุณากรอกเบอร์โทรให้ถูกต้อง (เช่น 0812345678)");

// In Zod v4, z.literal(true) takes the value only; use .refine for a custom message
const consentPdpa = z
  .boolean()
  .refine((v) => v === true, "กรุณายอมรับนโยบายความเป็นส่วนตัว");

export const buyerLeadSchema = z.object({
  name: z.string().min(2, "กรุณากรอกชื่อ"),
  phone: thaiPhone,
  line_id: z.string().optional(),
  province: z.string().optional(),
  land_type: z.string().optional(),
  budget_min: z.number().optional(),
  budget_max: z.number().optional(),
  notes: z.string().optional(),
  listing_id: z.string().optional(),
  referral_code: z.string().optional(),
  consent_pdpa: consentPdpa,
  source: z.string().optional(),
});

export const partnerLeadSchema = z.object({
  name: z.string().min(2, "กรุณากรอกชื่อ"),
  phone: thaiPhone,
  line_id: z.string().optional(),
  working_area: z.string().optional(),
  experience: z.string().optional(),
  network_size: z.string().optional(),
  referral_code: z.string().optional(),
  consent_pdpa: consentPdpa,
  source: z.string().optional(),
});

export const ownerLeadSchema = z.object({
  name: z.string().min(2, "กรุณากรอกชื่อ"),
  phone: thaiPhone,
  line_id: z.string().optional(),
  province: z.string().min(1, "กรุณาเลือกจังหวัด"),
  district: z.string().optional(),
  size_rai: z.number().positive("กรุณากรอกพื้นที่"),
  asking_price: z.number().positive().optional(),
  deed_type: z.string().optional(),
  notes: z.string().optional(),
  consent_pdpa: consentPdpa,
  source: z.string().optional(),
});

export const presignSchema = z.object({
  leadId: z.string().uuid(),
  mimeType: z.string().min(1),
  fileSize: z.number().positive().max(20 * 1024 * 1024),
  originalName: z.string().min(1),
});

export const uploadConfirmSchema = z.object({
  storageKey: z.string().min(1),
  leadId: z.string().uuid(),
  docType: z.enum(["title_deed", "map", "brochure", "other"]).optional(),
  mimeType: z.string().min(1),
  fileSize: z.number().positive(),
  originalName: z.string().min(1),
});

export type BuyerLeadInput = z.infer<typeof buyerLeadSchema>;
export type PartnerLeadInput = z.infer<typeof partnerLeadSchema>;
export type OwnerLeadInput = z.infer<typeof ownerLeadSchema>;
