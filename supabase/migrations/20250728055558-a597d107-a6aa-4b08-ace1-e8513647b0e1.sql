-- Fix infinite recursion in profiles RLS policy

-- Drop the problematic policy
DROP POLICY IF EXISTS "Users can view profiles from their college" ON public.profiles;

-- Create a security definer function to get current user's college_id
CREATE OR REPLACE FUNCTION public.get_current_user_college_id()
RETURNS UUID AS $$
  SELECT college_id FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create a security definer function to check if user can view profile
CREATE OR REPLACE FUNCTION public.can_view_profile(profile_college_id UUID, profile_user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT profile_user_id = auth.uid() OR profile_college_id = public.get_current_user_college_id();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create new profile policy using the security definer function
CREATE POLICY "Users can view profiles from their college" 
ON public.profiles 
FOR SELECT 
USING (public.can_view_profile(college_id, user_id));