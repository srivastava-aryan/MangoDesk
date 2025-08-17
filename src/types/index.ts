export interface Summary {
  id: string;
  transcript: string;
  prompt: string;
  content: string;
  createdAt: Date;
  lastModified: Date;
}

export interface EmailData {
  recipients: string[];
  subject: string;
  body: string;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}