-- Minimal lead-capture schema required by src/app/api/leads/route.ts
-- and src/app/actions/leads.ts.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'lead_type_enum') then
    create type lead_type_enum as enum ('buyer', 'partner', 'owner');
  end if;

  if not exists (select 1 from pg_type where typname = 'lead_status_enum') then
    create type lead_status_enum as enum ('new', 'contacting', 'qualified', 'won', 'lost');
  end if;

  if not exists (select 1 from pg_type where typname = 'partner_status_enum') then
    create type partner_status_enum as enum ('pending', 'active', 'inactive');
  end if;

  if not exists (select 1 from pg_type where typname = 'entity_type_enum') then
    create type entity_type_enum as enum ('buyer', 'owner');
  end if;
end $$;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  lead_type lead_type_enum not null,
  name text not null,
  phone text not null,
  line_id text,
  source text,
  referral_code text,
  status lead_status_enum not null default 'new',
  assigned_to text,
  details jsonb not null default '{}',
  consent_pdpa boolean not null default false,
  consent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  name text not null,
  phone text not null,
  line_id text,
  referral_code text not null unique,
  working_area text,
  experience text,
  network_size text,
  status partner_status_enum not null default 'pending',
  total_paid numeric(18, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists referral_attributions (
  id uuid primary key default gen_random_uuid(),
  referral_code text not null,
  lead_id uuid not null references leads(id) on delete cascade,
  partner_id uuid references partners(id) on delete set null,
  entity_type entity_type_enum not null,
  first_touch_at timestamptz not null default now(),
  converted boolean not null default false
);

create index if not exists idx_leads_type on leads(lead_type);
create index if not exists idx_leads_status on leads(status);
create index if not exists idx_leads_created on leads(created_at desc);
create index if not exists idx_leads_referral on leads(referral_code) where referral_code is not null;
create index if not exists idx_partners_referral_code on partners(referral_code);
create index if not exists idx_partners_status on partners(status);
create index if not exists idx_referral_attributions_code on referral_attributions(referral_code);
create index if not exists idx_referral_attributions_lead on referral_attributions(lead_id);
create index if not exists idx_referral_attributions_partner on referral_attributions(partner_id);

alter table leads enable row level security;
alter table partners enable row level security;
alter table referral_attributions enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'leads'
      and policyname = 'anon insert leads'
  ) then
    create policy "anon insert leads" on leads for insert with check (true);
  end if;
end $$;
