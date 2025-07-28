-- Fix RLS policies to properly isolate data between users
-- Users should only see students they created themselves

-- Drop all existing problematic policies
DROP POLICY IF EXISTS "Users can view students from appropriate college" ON public.students;
DROP POLICY IF EXISTS "Users can insert students to appropriate college" ON public.students;
DROP POLICY IF EXISTS "Users can update students from appropriate college" ON public.students;
DROP POLICY IF EXISTS "Users can delete students from appropriate college" ON public.students;

-- Create policies based on created_by field instead of college_id
-- This ensures each user only sees their own data

CREATE POLICY "Users can view their own students" 
ON public.students 
FOR SELECT 
USING (created_by = auth.uid());

CREATE POLICY "Users can insert their own students" 
ON public.students 
FOR INSERT 
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own students" 
ON public.students 
FOR UPDATE 
USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own students" 
ON public.students 
FOR DELETE 
USING (created_by = auth.uid());

-- Also fix attendance policies to be based on student ownership
DROP POLICY IF EXISTS "Users can view attendance from their college" ON public.attendance;
DROP POLICY IF EXISTS "Users can insert attendance for their college students" ON public.attendance;
DROP POLICY IF EXISTS "Users can update attendance for their college students" ON public.attendance;
DROP POLICY IF EXISTS "Users can delete attendance for their college students" ON public.attendance;

CREATE POLICY "Users can view attendance for their students" 
ON public.attendance 
FOR SELECT 
USING (
  student_id IN (
    SELECT id FROM public.students WHERE created_by = auth.uid()
  )
);

CREATE POLICY "Users can insert attendance for their students" 
ON public.attendance 
FOR INSERT 
WITH CHECK (
  student_id IN (
    SELECT id FROM public.students WHERE created_by = auth.uid()
  )
);

CREATE POLICY "Users can update attendance for their students" 
ON public.attendance 
FOR UPDATE 
USING (
  student_id IN (
    SELECT id FROM public.students WHERE created_by = auth.uid()
  )
);

CREATE POLICY "Users can delete attendance for their students" 
ON public.attendance 
FOR DELETE 
USING (
  student_id IN (
    SELECT id FROM public.students WHERE created_by = auth.uid()
  )
);