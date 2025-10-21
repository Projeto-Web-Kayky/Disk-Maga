package com.disk.api.swagger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfiguration {

    private SecurityScheme createAPIKeyScheme() {
        return new SecurityScheme()
            .type(SecurityScheme.Type.HTTP)
            .bearerFormat("JWT")
            .scheme("bearer");
    }

    @Bean
    public OpenAPI openAPI() {
    return new OpenAPI().addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
        .components(new Components().addSecuritySchemes("Bearer Authentication", createAPIKeyScheme()));
    }
    
    @Bean
    public OpenAPI customOpenAPI() {
      return new OpenAPI()
              .info(new Info()
                      .title("Servidor")
                      .version("1.0")
                      .description("API para gerenciamento de vendas e produtos."))
              .components(new Components()
                      .addSecuritySchemes("bearer-key",
                              new SecurityScheme()
                                      .type(SecurityScheme.Type.HTTP)
                                      .scheme("bearer")
                                      .bearerFormat("JWT")));
  }
}
