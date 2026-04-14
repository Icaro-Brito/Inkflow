package inkflowApi.app.models.Dtos;


import inkflowApi.app.models.Agendamento;
import inkflowApi.app.models.Cliente;
import inkflowApi.app.models.Servico;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
public record AgendamentoInputDto(
        @NotNull BigDecimal valor,
        @NotNull BigDecimal valorPago,
        @Future LocalDateTime dataHora,
        @NotNull int clienteId,
        @NotNull int servicoId
) { }
