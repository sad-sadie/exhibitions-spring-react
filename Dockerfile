FROM openjdk:17
EXPOSE 8080
ADD target/exhibitions-spring-boot.jar spring-boot-docker.jar
ENTRYPOINT ["java","-jar","/exhibitions-spring-boot.jar"]