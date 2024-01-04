package academy.atl.rover.controllers;

import academy.atl.rover.dto.CommandDto;
import academy.atl.rover.dto.RoverDto;
import academy.atl.rover.models.Rover;
import academy.atl.rover.services.RoverService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/rover/")
@RequiredArgsConstructor
public class RoverController {

    private final RoverService service;

    @GetMapping
    public Rover get() {
        return service.get();
    }

    @PostMapping
    public Rover create(@RequestBody RoverDto roverDto) {
        Rover rover = convertToRover(roverDto); // Puedes tener un método para convertir el DTO a la entidad Rover
        return service.create(rover);
    }

    @PutMapping("{id}")
    public Rover update(@PathVariable Long id, @RequestBody RoverDto updatedRoverDto) {
        Rover updatedRover = convertToRover(updatedRoverDto); // Puedes tener un método para convertir el DTO a la entidad Rover
        return service.update(id, updatedRover);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PostMapping("command/")
    public void sendCommand(@RequestBody CommandDto commands) {
        for (String command : commands.getCommands()) {
            service.sendCommand(command);
        }
    }

    // Método para convertir RoverDto a Rover (puedes ajustar según la estructura de tus clases)
    private Rover convertToRover(RoverDto roverDto) {
        Rover rover = new Rover();
        rover.setX(roverDto.getX());
        rover.setY(roverDto.getY());
        rover.setDirection(roverDto.getDirection());
        // Puedes mapear más campos según sea necesario
        return rover;
    }
}

