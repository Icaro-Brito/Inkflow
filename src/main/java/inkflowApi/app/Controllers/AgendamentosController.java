package inkflowApi.app.Controllers;

import inkflowApi.app.Services.AgendamentoService;
import inkflowApi.app.models.Agendamento;
import inkflowApi.app.models.Dtos.AgendamentoDto;
import inkflowApi.app.models.Dtos.AgendamentoInputDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentosController {
    @Autowired
    private AgendamentoService _service;

    @GetMapping
    public List<Agendamento> carregar() {
        return _service.carregar();
    }
    @PostMapping
    public List<AgendamentoDto> salvar(@RequestBody AgendamentoInputDto Agendamento) {
        return _service.adicionar(Agendamento);
    }
    @PutMapping("/{id}")
    public List<Agendamento> atualizar(@RequestBody Agendamento Agendamento, @PathVariable int id) {
        return _service.atualizar(Agendamento);
    }
    @DeleteMapping("/{id}")
    public List<Agendamento> deletar(@PathVariable int id) {
        return _service.remover(id);
    }
}

