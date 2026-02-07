-- Create the subscribers table
create table public.subscribers (
  id uuid not null default gen_random_uuid (),
  email text not null,
  created_at timestamp with time zone not null default now(),
  constraint subscribers_pkey primary key (id),
  constraint subscribers_email_key unique (email)
);

-- Enable Row Level Security (RLS)
alter table public.subscribers enable row level security;

-- Create Policy: Allow public to insert (subscribe)
create policy "Enable insert for public"
on public.subscribers
for insert
to public
with check (true);

-- Create Policy: Allow public to read their own email (optional, for verification)
-- For now, we only need insert.
