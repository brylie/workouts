-- Create the completed_exercises table
CREATE TABLE completed_exercises (
    id SERIAL PRIMARY KEY,
    exercise_id TEXT NOT NULL,
    completed_at TIMESTAMPTZ NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    metrics JSONB NOT NULL DEFAULT '{}'
);
-- Set up row-level security
ALTER TABLE completed_exercises ENABLE ROW LEVEL SECURITY;
-- Create policy for users to only see and modify their own data
CREATE POLICY "Users can only access their own data" ON completed_exercises USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- Create indexes for better query performance
CREATE INDEX completed_exercises_user_id_idx ON completed_exercises (user_id);
CREATE INDEX completed_exercises_exercise_id_idx ON completed_exercises (exercise_id);
CREATE INDEX completed_exercises_completed_at_idx ON completed_exercises (completed_at);