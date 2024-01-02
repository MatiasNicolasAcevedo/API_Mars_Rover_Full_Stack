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
    public void create(@RequestBody RoverDto rover) {
        System.out.println(rover);
    }

    @PostMapping("command/")
    public void sendCommand(@RequestBody CommandDto commands) {
        System.out.println(commands);

        for (String command : commands.getCommands()) {
            service.sendCommand(command);
            System.out.println(command);
        }
    }

}
