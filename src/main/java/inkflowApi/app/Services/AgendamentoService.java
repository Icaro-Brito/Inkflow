package inkflowApi.app.Services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import inkflowApi.app.Helpers.JsonHelper;
import inkflowApi.app.Mappers.AgendamentoMapper;
import inkflowApi.app.models.Agendamento;
import inkflowApi.app.models.Cliente;
import inkflowApi.app.models.Dtos.AgendamentoDto;
import inkflowApi.app.models.Dtos.AgendamentoInputDto;
import inkflowApi.app.models.Servico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class AgendamentoService {
    private final AgendamentoMapper mapper;
    @Autowired
    private ClienteService clienteService;
    @Autowired
    private ServicoService servicoService;

    public AgendamentoService(AgendamentoMapper mapper) {
        this.mapper = mapper;
    }

    public List<Agendamento> carregar() {
        return JsonHelper.carregarJson(
                "Dados/agendamentos.json",
                new TypeReference<List<Agendamento>>() {});
    }

    public List<AgendamentoDto> adicionar(AgendamentoInputDto dto) {
        List<Agendamento> agendamentos = carregar();

        Agendamento ag = mapper.toEntity(dto);

        int novoId = agendamentos.stream()
                .mapToInt(Agendamento::getId) // Extrai todos os IDs
                .max()                        // Pega o maior
                .orElse(0) + 1;               // Se não houver nenhum, retorna 0 e soma 1

        ag.setId(novoId);
        Servico servico = servicoService.getById(dto.servicoId());
        ag.setServico(servico);

        Cliente cliente = clienteService.getById(dto.clienteId());
        ag.setCliente(cliente);

        agendamentos.add(ag);

        JsonHelper.criarJson(agendamentos, "Dados/agendamentos.json");

        return agendamentos.stream()             // Abre o "Select" (LINQ)
                .map(mapper::toDto)              // Para cada entidade, chama o metodo toDto do mapper
                .toList();
    }
    public List<Agendamento> atualizar(Agendamento Agendamento) {
        return JsonHelper.atualizarJson(
                "Dados/agendamentos.json",
                Agendamento,
                c -> c.getId(), // Lambda dizendo que o ID vem de getId()
                new TypeReference<List<Agendamento>>() {}
        );
    }
    public List<Agendamento> remover(int id) {
        return JsonHelper.removerJson(
                "Dados/agendamentos.json",
                id,
                c -> c.getId(),
                new TypeReference<List<Agendamento>>() {}
        );
    }


}
