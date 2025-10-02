package com.disk.api.swagger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfiguration {
    
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                    .title("Disk API")
                    .version("1.0")
                    .description("API do Disk da Maga"));
    }
}
