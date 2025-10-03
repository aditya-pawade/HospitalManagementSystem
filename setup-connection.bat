@echo off
echo HMS Supabase Setup Script
echo ========================

echo.
echo Project configured for: cmshogwqpkeswnzhqgxm.supabase.co
echo.

echo Please enter your Supabase database password:
set /p db_password="Database Password: "

echo.
echo Updating .env file with your credentials...

(
echo # HMS Supabase Configuration
echo # Project: cmshogwqpkeswnzhqgxm
echo.
echo SUPABASE_PROJECT_REF=cmshogwqpkeswnzhqgxm
echo SUPABASE_DB_URL=jdbc:postgresql://db.cmshogwqpkeswnzhqgxm.supabase.co:5432/postgres
echo SUPABASE_DB_USERNAME=postgres
echo SUPABASE_DB_PASSWORD=%db_password%
echo SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtc2hvZ3dxcGtlc3duemhxZ3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0OTUxNDQsImV4cCI6MjA3NTA3MTE0NH0.68rXiW7gyoao1Dlb6oCTSwIw94Z_xlF96Ts088Nd1i4
echo SUPABASE_PROJECT_URL=https://cmshogwqpkeswnzhqgxm.supabase.co
) > .env

echo.
echo ✅ Configuration updated!
echo.
echo Testing connection...
echo.
./mvnw spring-boot:run -Dspring.profiles.active=supabase

echo.
echo Setup complete! Your HMS application is now connected to Supabase.
pause