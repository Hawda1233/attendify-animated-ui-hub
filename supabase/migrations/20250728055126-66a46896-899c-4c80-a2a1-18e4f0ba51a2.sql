-- Fix overly permissive RLS policies to prevent unauthorized data access

-- Drop existing overly permissive policies for students table
DROP POLICY IF EXISTS "Students are viewable by authenticated users" ON public.students;

-- Create proper RLS policy for students - users can only view students from their college
CREATE POLICY "Users can view students from their college" 
ON public.students 
FOR SELECT 
USING (
  college_id IN (
    SELECT college_id 
    FROM public.profiles 
    WHERE user_id = auth.uid()
  )
);

-- Drop existing overly permissive policies for attendance table
DROP POLICY IF EXISTS "Attendance is viewable by authenticated users" ON public.attendance;

-- Create proper RLS policy for attendance - users can only view attendance for students from their college
CREATE POLICY "Users can view attendance from their college" 
ON public.attendance 
FOR SELECT 
USING (
  student_id IN (
    SELECT s.id 
    FROM public.students s
    INNER JOIN public.profiles p ON s.college_id = p.college_id
    WHERE p.user_id = auth.uid()
  )
);

-- Update attendance modification policies to be more restrictive
DROP POLICY IF EXISTS "Authenticated users can insert attendance" ON public.attendance;
DROP POLICY IF EXISTS "Authenticated users can update attendance" ON public.attendance;
DROP POLICY IF EXISTS "Authenticated users can delete attendance" ON public.attendance;

CREATE POLICY "Users can insert attendance for their college students" 
ON public.attendance 
FOR INSERT 
WITH CHECK (
  student_id IN (
    SELECT s.id 
    FROM public.students s
    INNER JOIN public.profiles p ON s.college_id = p.college_id
    WHERE p.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update attendance for their college students" 
ON public.attendance 
FOR UPDATE 
USING (
  student_id IN (
    SELECT s.id 
    FROM public.students s
    INNER JOIN public.profiles p ON s.college_id = p.college_id
    WHERE p.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete attendance for their college students" 
ON public.attendance 
FOR DELETE 
USING (
  student_id IN (
    SELECT s.id 
    FROM public.students s
    INNER JOIN public.profiles p ON s.college_id = p.college_id
    WHERE p.user_id = auth.uid()
  )
);

-- Update students modification policies to be more restrictive  
DROP POLICY IF EXISTS "Authenticated users can insert students" ON public.students;
DROP POLICY IF EXISTS "Authenticated users can update students" ON public.students;
DROP POLICY IF EXISTS "Authenticated users can delete students" ON public.students;

CREATE POLICY "Users can insert students to their college" 
ON public.students 
FOR INSERT 
WITH CHECK (
  college_id IN (
    SELECT college_id 
    FROM public.profiles 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can update students from their college" 
ON public.students 
FOR UPDATE 
USING (
  college_id IN (
    SELECT college_id 
    FROM public.profiles 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete students from their college" 
ON public.students 
FOR DELETE 
USING (
  college_id IN (
    SELECT college_id 
    FROM public.profiles 
    WHERE user_id = auth.uid()
  )
);

-- Drop existing overly permissive policy for profiles
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;

-- Create proper RLS policy for profiles - users can only view profiles from their college
CREATE POLICY "Users can view profiles from their college" 
ON public.profiles 
FOR SELECT 
USING (
  college_id IN (
    SELECT college_id 
    FROM public.profiles 
    WHERE user_id = auth.uid()
  ) OR user_id = auth.uid()
);