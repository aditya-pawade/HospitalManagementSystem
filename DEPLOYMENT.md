# Deployment Guide

This guide provides instructions for deploying the Hospital Management System in different environments.

## 📦 Production Build

### Backend (Spring Boot)

1. **Build the JAR file**:
```bash
mvn clean package -DskipTests
```

The JAR file will be created in `target/HospitalManagementSystem-0.0.1-SNAPSHOT.jar`

2. **Configure production database**:

Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://your-production-db-host:3306/hmsdb
spring.datasource.username=your-production-username
spring.datasource.password=your-production-password
```

Or use environment variables:
```bash
export SPRING_DATASOURCE_URL=jdbc:mysql://your-production-db-host:3306/hmsdb
export SPRING_DATASOURCE_USERNAME=your-production-username
export SPRING_DATASOURCE_PASSWORD=your-production-password
```

3. **Run the application**:
```bash
java -jar target/HospitalManagementSystem-0.0.1-SNAPSHOT.jar
```

Or with custom properties:
```bash
java -jar target/HospitalManagementSystem-0.0.1-SNAPSHOT.jar \
  --spring.datasource.url=jdbc:mysql://production-host:3306/hmsdb \
  --spring.datasource.username=prod_user \
  --spring.datasource.password=prod_password
```

### Frontend (React)

1. **Configure production API URL**:

Update `frontend/.env`:
```
VITE_API_BASE_URL=https://your-backend-api.com/api
```

2. **Build the frontend**:
```bash
cd frontend
npm run build
```

The production files will be created in `frontend/dist/`

3. **Serve the static files**:

You can serve the `dist` folder using:
- Nginx
- Apache
- Node.js static server
- Cloud hosting (Netlify, Vercel, AWS S3 + CloudFront)

## 🐳 Docker Deployment

### Backend Dockerfile

Create `Dockerfile` in the root directory:

```dockerfile
FROM maven:3.8-openjdk-11 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=build /app/target/HospitalManagementSystem-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

Create `frontend/nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: hmsdb
      MYSQL_USER: hms_user
      MYSQL_PASSWORD: hms_password
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - hms-network

  backend:
    build: .
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/hmsdb
      SPRING_DATASOURCE_USERNAME: hms_user
      SPRING_DATASOURCE_PASSWORD: hms_password
    ports:
      - "8080:8080"
    depends_on:
      - mysql
    networks:
      - hms-network

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - hms-network

volumes:
  mysql_data:

networks:
  hms-network:
    driver: bridge
```

### Running with Docker Compose

```bash
docker-compose up -d
```

Access the application at: http://localhost

## ☁️ Cloud Deployment

### AWS Deployment

#### Backend (Elastic Beanstalk)

1. Install AWS CLI and EB CLI
2. Initialize EB:
```bash
eb init -p java-11 hospital-management-backend
```

3. Create environment:
```bash
eb create production-env
```

4. Deploy:
```bash
mvn clean package
eb deploy
```

#### Frontend (S3 + CloudFront)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Upload to S3:
```bash
aws s3 sync dist/ s3://your-bucket-name/
```

3. Configure CloudFront distribution
4. Update CloudFront settings for SPA routing

### Heroku Deployment

#### Backend

1. Create Heroku app:
```bash
heroku create hospital-management-backend
```

2. Add MySQL addon:
```bash
heroku addons:create jawsdb:kitefin
```

3. Deploy:
```bash
git push heroku main
```

#### Frontend

1. Create Heroku app:
```bash
heroku create hospital-management-frontend
```

2. Add buildpack:
```bash
heroku buildpacks:set heroku/nodejs
```

3. Set environment variables:
```bash
heroku config:set VITE_API_BASE_URL=https://your-backend.herokuapp.com/api
```

4. Deploy:
```bash
git subtree push --prefix frontend heroku main
```

### Netlify Deployment (Frontend Only)

1. Connect your repository to Netlify
2. Configure build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
3. Set environment variables:
   - `VITE_API_BASE_URL`: Your backend API URL
4. Deploy

## 🔒 Security Considerations

### Production Checklist

- [ ] Change default passwords
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up database backups
- [ ] Enable database encryption
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Use strong authentication
- [ ] Implement JWT tokens for API authentication
- [ ] Configure firewall rules
- [ ] Regular security updates

### Environment Variables

Backend `.env`:
```
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
JWT_SECRET=your-secure-secret-key
```

Frontend `.env.production`:
```
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## 📊 Monitoring

### Backend Monitoring

Use Spring Boot Actuator:

1. Add to `pom.xml`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

2. Configure endpoints in `application.properties`:
```properties
management.endpoints.web.exposure.include=health,info,metrics
```

3. Access metrics at: `/actuator/health`, `/actuator/metrics`

### Frontend Monitoring

- Use Google Analytics
- Implement error tracking (Sentry, Rollbar)
- Monitor performance with Lighthouse

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 11
        uses: actions/setup-java@v2
        with:
          java-version: '11'
      - name: Build with Maven
        run: mvn clean package -DskipTests
      - name: Deploy to production
        run: |
          # Your deployment script here

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd frontend && npm ci
      - name: Build
        run: cd frontend && npm run build
      - name: Deploy to hosting
        run: |
          # Your deployment script here
```

## 🆘 Troubleshooting

### Common Issues

1. **CORS errors**: Configure CORS in Spring Boot
2. **Database connection**: Check connection string and credentials
3. **Port conflicts**: Ensure ports 8080 and 5173 are available
4. **Build failures**: Clear Maven/npm cache and rebuild

### Logs

- Backend logs: Check console output or configure logging in `application.properties`
- Frontend logs: Check browser console and network tab

## 📞 Support

For deployment issues, refer to:
- Spring Boot Documentation
- React/Vite Documentation
- Cloud provider documentation
