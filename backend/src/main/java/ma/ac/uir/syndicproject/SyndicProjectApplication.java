package ma.ac.uir.syndicproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SyndicProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SyndicProjectApplication.class, args);
	}

	// Configuration CORS
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**") // Autoriser toutes les routes qui commencent par "/api/"
						.allowedOrigins("http://localhost:3000") // Frontend React
						.allowedMethods("GET", "POST", "PUT", "DELETE") // Méthodes autorisées
						.allowedHeaders("*") // Autoriser tous les headers
						.allowCredentials(true); // Autoriser les cookies si nécessaire
			}
		};
	}
}
