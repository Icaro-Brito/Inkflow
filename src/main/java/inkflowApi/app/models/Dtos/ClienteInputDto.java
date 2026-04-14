package inkflowApi.app.models.Dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ClienteInputDto(
        @NotNull String Nome,
        @NotNull String Telefone,
        @Email String Email
) {}
