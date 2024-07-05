package com.clinitalPlatform.security.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.ArrayList;
import java.util.List;

@Data
@EnableAsync
@Configuration
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private List<String> authorizedRedirectUris = new ArrayList<>();

    private String tokenSecret;

    private long tokenExpirationMsec;

    private long accessTokenExpirationMsec;

    public long getAccessTokenExpirationMsec() {
        return accessTokenExpirationMsec;
    }

    private long refreshTokenExpirationMsec;

    public long getRefreshTokenExpirationMsec() {
        return refreshTokenExpirationMsec;
    }
}
