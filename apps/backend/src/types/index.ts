export interface APIResponse {
  status: string;
  message?: string;
  data?: any;
  endpoints?: Record<string, string>;
}
