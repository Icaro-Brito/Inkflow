package inkflowApi.app.models.Dtos;

import inkflowApi.app.models.Agendamento;
import inkflowApi.app.models.Cliente;
import inkflowApi.app.models.Servico;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
public record AgendamentoDto(
         int id,
         BigDecimal valor,
         BigDecimal valorPago,
         LocalDateTime dataHora,
         ClienteDto cliente,
         String servicoNome) { }
