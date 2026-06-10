-- Leads da landing page lp.juspilot.ai
CREATE TABLE IF NOT EXISTS public.lp_juspilot_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  nome text NOT NULL,
  email text NOT NULL,
  telefone text NOT NULL,
  cargo text NOT NULL,
  empresa text NOT NULL,
  uf char(2) NOT NULL,
  locale text,
  form_name text NOT NULL,
  lead_source text,
  page_hostname text,
  page_path text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  fbclid text,
  gclid text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'disqualified')),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS lp_juspilot_leads_created_at_idx ON public.lp_juspilot_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS lp_juspilot_leads_email_idx ON public.lp_juspilot_leads (email);
CREATE INDEX IF NOT EXISTS lp_juspilot_leads_status_idx ON public.lp_juspilot_leads (status);

ALTER TABLE public.lp_juspilot_leads ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_lp_juspilot_leads_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS lp_juspilot_leads_updated_at ON public.lp_juspilot_leads;
CREATE TRIGGER lp_juspilot_leads_updated_at
  BEFORE UPDATE ON public.lp_juspilot_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.set_lp_juspilot_leads_updated_at();
