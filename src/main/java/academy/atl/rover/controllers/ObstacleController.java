package academy.atl.rover.controllers;

import academy.atl.rover.dto.ObstacleDto;
import academy.atl.rover.models.Obstacle;
import academy.atl.rover.services.ObstacleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/obstacle/")
@RequiredArgsConstructor
public class ObstacleController {

    private final ObstacleService service;

    @PostMapping
    public void create(@RequestBody ObstacleDto obstacle) {
        System.out.println(obstacle);
    }

    @GetMapping
    public List<Obstacle> getAll() {
        return service.findAll();
    }

}
