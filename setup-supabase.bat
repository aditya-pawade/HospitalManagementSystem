@echo off
echo ================================================
echo   HMS - Supabase Configuration Setup
echo ================================================
echo.

echo Setting up environment variables for Supabase...
echo.

echo Please enter your Supabase project details:
echo.

set /p PROJECT_REF="Enter your Supabase Project Reference: "
set /p DB_PASSWORD="Enter your Supabase Database Password: "

echo.
echo Creating environment configuration...

echo # Supabase Configuration > .env
echo SUPABASE_PROJECT_REF=%PROJECT_REF% >> .env
echo SUPABASE_DB_PASSWORD=%DB_PASSWORD% >> .env
echo SUPABASE_DB_URL=jdbc:postgresql://db.%PROJECT_REF%.supabase.co:5432/postgres >> .env
echo SUPABASE_DB_USERNAME=postgres >> .env

echo.
echo ✅ Configuration created successfully!
echo.
echo The following environment file has been created: .env
echo.
echo To run your application with Supabase:
echo 1. Make sure your Supabase project is active
echo 2. Run: mvnw spring-boot:run
echo.
echo Your HMS will now connect to Supabase PostgreSQL!
echo.
pause