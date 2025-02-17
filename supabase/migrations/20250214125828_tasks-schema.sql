drop table if exists tasks;

create table
  tasks (
    id bigint primary key generated always as identity not null,
    created_at timestamp with time zone default now() not null,
    name text not null,
    description text not null,
    due_date date default null,
    profile_id uuid references profiles (id) on delete cascade not null,
    project_id bigint references projects (id) default null,
    status current_status default 'in-progress' not null,
    collaborators text array default array[]::text[] not null
  );