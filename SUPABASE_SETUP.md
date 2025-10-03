# 🚀 Supabase Setup Instructions for HMS

## Prerequisites
1. Create a free Supabase account at https://supabase.com
2. Create a new project in Supabase

## Step-by-Step Setup

### 1. Get Supabase Connection Details
After creating your project in Supabase:

1. Go to your Supabase Dashboard
2. Click on your project
3. Go to **Settings** → **Database**
4. Copy the connection details:
   - **Host**: `db.YOUR_PROJECT_REF.supabase.co`
   - **Database name**: `postgres`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: [Your database password]

### 2. Update Application Configuration

Replace the values in `src/main/resources/application-supabase.properties`:

```properties
# Replace YOUR_PROJECT_REF with your actual project reference
spring.datasource.url=jdbc:postgresql://db.YOUR_PROJECT_REF.supabase.co:5432/postgres

# Replace YOUR_SUPABASE_PASSWORD with your actual password
spring.datasource.password=YOUR_SUPABASE_PASSWORD
```

### 3. Switch to Supabase Profile

To run with Supabase, use one of these methods:

**Method 1: Update main application.properties**
Copy the content from `application-supabase.properties` to `application.properties`

**Method 2: Use Spring Profile**
Run with: `java -jar -Dspring.profiles.active=supabase your-app.jar`

Or add to your IDE run configuration: `--spring.profiles.active=supabase`

### 4. Environment Variables (Recommended for Production)

Create environment variables:
```bash
SUPABASE_PROJECT_REF=your_project_ref
SUPABASE_PASSWORD=your_password
```

Then update properties to use:
```properties
spring.datasource.url=jdbc:postgresql://db.${SUPABASE_PROJECT_REF}.supabase.co:5432/postgres
spring.datasource.password=${SUPABASE_PASSWORD}
```

### 5. Database Migration

When you first run the application:
1. Hibernate will automatically create the tables (ddl-auto=update)
2. The DataInitializer will populate sample data
3. Your existing data structure will be recreated in PostgreSQL

### 6. Supabase Dashboard Features

After setup, you can:
- View tables in Supabase Dashboard → Table Editor
- Run SQL queries in SQL Editor
- Set up Row Level Security (RLS) if needed
- Monitor database performance
- Create backups

### 7. Connection Troubleshooting

If you get connection errors:
1. Check your Supabase project is active
2. Verify the connection string format
3. Ensure your IP is allowed (Supabase allows all by default)
4. Check your password is correct

### 8. Benefits of Supabase

- ✅ Managed PostgreSQL database
- ✅ Automatic backups
- ✅ Real-time subscriptions
- ✅ Built-in authentication (optional)
- ✅ REST and GraphQL APIs
- ✅ Dashboard for database management
- ✅ Free tier with generous limits

## Next Steps

1. Create your Supabase project
2. Update the configuration with your credentials
3. Test the connection
4. Deploy your application

Your HMS will now use Supabase as the database backend! 🎉