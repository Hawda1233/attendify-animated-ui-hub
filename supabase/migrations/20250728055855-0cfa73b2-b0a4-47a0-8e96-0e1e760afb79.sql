-- Fix RLS policy to allow users without college_id to add students to any college
-- This handles cases where user profiles don't have college_id set

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Users can insert students to their college" ON public.students;

-- Create more flexible policy that allows:
-- 1. Users with college_id can only add to their college
-- 2. Users without college_id can add to any college (for initial setup)
CREATE POLICY "Users can insert students to appropriate college" 
ON public.students 
FOR INSERT 
WITH CHECK (
  CASE 
    WHEN (SELECT college_id FROM public.profiles WHERE user_id = auth.uid()) IS NULL THEN true
    ELSE college_id = (SELECT college_id FROM public.profiles WHERE user_id = auth.uid())
  END
);

-- Also update the SELECT policy to handle users without college_id
DROP POLICY IF EXISTS "Users can view students from their college" ON public.students;

CREATE POLICY "Users can view students from appropriate college" 
ON public.students 
FOR SELECT 
USING (
  CASE 
    WHEN (SELECT college_id FROM public.profiles WHERE user_id = auth.uid()) IS NULL THEN true
    ELSE college_id = (SELECT college_id FROM public.profiles WHERE user_id = auth.uid())
  END
);

-- Update other policies similarly
DROP POLICY IF EXISTS "Users can update students from their college" ON public.students;
DROP POLICY IF EXISTS "Users can delete students from their college" ON public.students;

CREATE POLICY "Users can update students from appropriate college" 
ON public.students 
FOR UPDATE 
USING (
  CASE 
    WHEN (SELECT college_id FROM public.profiles WHERE user_id = auth.uid()) IS NULL THEN true
    ELSE college_id = (SELECT college_id FROM public.profiles WHERE user_id = auth.uid())
  END
);

CREATE POLICY "Users can delete students from appropriate college" 
ON public.students 
FOR DELETE 
USING (
  CASE 
    WHEN (SELECT college_id FROM public.profiles WHERE user_id = auth.uid()) IS NULL THEN true
    ELSE college_id = (SELECT college_id FROM public.profiles WHERE user_id = auth.uid())
  END
);