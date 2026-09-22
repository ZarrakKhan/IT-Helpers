/** Shared shape for the contact form payload — used by both the client form and the API route. */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  /** Optional context — e.g. the service name when submitted from a service detail page. */
  service?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}
