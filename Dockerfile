# Step 1: Build stage (Maven वापरून jar तयार करणे)
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Step 2: Run stage (Spring Boot चालवणे)
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Render $PORT variable वापरतं, fix port लिहू नकोस
CMD ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]
