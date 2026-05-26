export type BriefStatus = "pending" | "reviewed" | "in_progress" | "completed";

export type ProjectType = "website" | "ecommerce" | "app" | "landing" | "other";

export type WebSection =
  | "hero"
  | "about"
  | "services"
  | "portfolio"
  | "team"
  | "reviews"
  | "gallery"
  | "contact"
  | "map"
  | "faq"
  | "blog"
  | "pricing";

export interface BriefAssets {
  logo?: string;
  photos: string[];
  documents: string[];
}

export interface Brief {
  id: string;
  // Paso 1 - Info del cliente
  clientName: string;
  businessName: string;
  email: string;
  phone: string;
  // Correo del sistema
  notificationEmail: string;
  emailSetup: "create" | "existing";
  emailSetupDetail: string;
  emailSetupPassword: string;
  // Paso 2 - Proyecto
  projectType: ProjectType;
  description: string;
  referenceUrls: string[];
  // Paso 3 - Secciones deseadas
  sections: WebSection[];
  sectionNotes: string;
  // Paso 4 - Assets
  assets: BriefAssets;
  // Paso 5 - Preferencias
  colors: string;
  style: string;
  deadline: string;
  budget: string;
  extraNotes: string;
  // Meta
  status: BriefStatus;
  createdAt: string;
}
