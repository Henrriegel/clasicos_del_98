const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "524428146434";

const formatPhoneDisplay = (number: string) => {
  const digits = number.replace(/\D/g, "");
  const local = digits.length === 12 && digits.startsWith("52") ? digits.slice(2) : digits;
  return local.length === 10 ? `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}` : digits;
};

export const site = {
  name: "Clásicos del 98",
  eyebrow: "Peluquería y barbería · Querétaro",
  tagline: "Buen corte. Buena plática. Buenos momentos.",
  phoneDisplay: formatPhoneDisplay(whatsappNumber),
  phoneDigits: whatsappNumber,
  address: "Calle Química #42, Col. Industrial (Obrera), Querétaro, Qro.",
  hours: [
    ["Lun — Vie", "11:00 — 21:00"],
    ["Sábado", "10:00 — 20:00"],
    ["Domingo", "Cerrado"],
  ],
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/Clasicosdel98?locale=es_LA",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/clasicos_del_98/",
  googleMapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? "https://www.google.com/maps/place/Peluquer%C3%ADa+y+Barberia+Cl%C3%A1sicos+del+98/@20.6194952,-100.428546,19z/data=!3m1!4b1!4m6!3m5!1s0x85d35b97e530a55f:0x5cf813906a3bc2a7!8m2!3d20.6194952!4d-100.4279023!16s%2Fg%2F11sx17w636?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D",
  googleReviewsUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ?? "https://www.google.com/maps/place//data=!4m4!3m3!1s0x85d35b97e530a55f:0x5cf813906a3bc2a7!9m1!1b1",
  googleWriteReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_WRITE_REVIEW_URL ?? "https://www.google.com/maps/place//data=!4m3!3m2!1s0x85d35b97e530a55f:0x5cf813906a3bc2a7!12e1",
  whatsapp:
    `https://wa.me/${whatsappNumber}?text=Hola%2C%20quiero%20agendar%20una%20cita%20en%20Cl%C3%A1sicos%20del%2098.`,
  feedbackWhatsapp:
    `https://wa.me/${whatsappNumber}?text=Hola%2C%20quiero%20compartir%20una%20opini%C3%B3n%20sobre%20mi%20visita%20a%20Cl%C3%A1sicos%20del%2098.`,
} as const;
