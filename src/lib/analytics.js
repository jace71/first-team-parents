// Public GA4 measurement ID. Set NEXT_PUBLIC_GA_MEASUREMENT_ID to point the
// site at a different property. The fallback is the live ID, so the tag works
// without a new host environment variable.
export const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-974NTZQMYL";
