drop table if exists profiles;
TRUNCATE auth.users cascade;

create table
  profiles (
    id uuid references auth.users on delete cascade not null,
    created_at timestamp with time zone default now() not null,
    username text unique not null,
    full_name text not null,
    bio text default ''::text null,
    mode text default 'dark' not null,
    avatar_url text default ''::text null,

    primary key (id)
  );