FROM maven:3.9.9-eclipse-temurin-21 

WORKDIR /app

COPY . .
#clean limpia y package compila todo el poryecto
# RUN mvn clean package -DskipTests= target/server1.0.0-SNAPSHOT.jar 
# cp target/*.jar app.jar para renombrar el archivo jar
RUN mvn clean package -DskipTests && cp target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT [ "java","-jar","app.jar" ]

