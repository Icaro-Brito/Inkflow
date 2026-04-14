package inkflowApi.app.Mappers;

import inkflowApi.app.models.Agendamento;
import inkflowApi.app.models.Cliente;
import inkflowApi.app.models.Dtos.AgendamentoDto;
import inkflowApi.app.models.Dtos.AgendamentoInputDto;
import inkflowApi.app.models.Dtos.ClienteDto;
import org.springframework.stereotype.Component;

@Component
public class AgendamentoMapper {
    public Agendamento toEntity(AgendamentoInputDto dto) {
        if (dto == null) return null;

        Agendamento entity = new Agendamento();
        entity.setClienteId(dto.clienteId());
        entity.setServicoId(dto.servicoId());
        entity.setDataHora(dto.dataHora());
        entity.setValor(dto.valor());
        entity.setValorPago(dto.valorPago());
        return entity;
    }

    public AgendamentoDto toDto(Agendamento entity) {
        if (entity == null) return null;

        return AgendamentoDto.builder()
                .id(entity.getId())
                .cliente(toClienteDto(entity.getCliente()))
                .servicoNome(entity.getServico() != null ? entity.getServico().getNome() : "Serviço não carregado")
                .valor(entity.getValor())
                .valorPago(entity.getValorPago())
                .dataHora(entity.getDataHora())
                .build();
    }
    private ClienteDto toClienteDto(Cliente cliente) {
        if (cliente == null) return null;
        return ClienteDto.builder()
                .id(cliente.getId())
                .nome(cliente.getNome())
                .email(cliente.getEmail())
                .telefone(cliente.getTelefone())
                .build();
    }


        // Mapeando o objeto aninhado (Cliente -> ClienteResumoDto)
       /* if (entity.getCliente() != null) {
            ClienteResumoDto clienteDto = new ClienteResumoDto();
            clienteDto.setId(entity.getCliente().getId());
            clienteDto.setNome(entity.getCliente().getNome());
            dto.setCliente(clienteDto);
        } */


    }

