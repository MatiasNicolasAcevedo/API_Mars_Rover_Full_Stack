package academy.atl.rover.controllers;

import academy.atl.rover.dto.ObstacleDto;
import academy.atl.rover.models.Obstacle;
import academy.atl.rover.services.ObstacleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/obstacle/")
@RequiredArgsConstructor
public class ObstacleController {

    private final ObstacleService service;

    @PostMapping
    public Obstacle create(@RequestBody ObstacleDto obstacleDto) {
        Obstacle obstacle = convertToObstacle(obstacleDto); // Puedes tener un método para convertir el DTO a la entidad Obstacle
        return service.create(obstacle);
    }

    @GetMapping
    public List<Obstacle> getAll() {
        return service.findAll();
    }

    @GetMapping("{id}")
    public Obstacle getById(@PathVariable Long id) {
        return service.findById(id).orElse(null);
    }

    @PutMapping("{id}")
    public Obstacle update(@PathVariable Long id, @RequestBody ObstacleDto updatedObstacleDto) {
        Obstacle updatedObstacle = convertToObstacle(updatedObstacleDto); // Puedes tener un método para convertir el DTO a la entidad Obstacle
        return service.update(id, updatedObstacle);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // Método para convertir ObstacleDto a Obstacle (puedes ajustar según la estructura de tus clases)
    private Obstacle convertToObstacle(ObstacleDto obstacleDto) {
        Obstacle obstacle = new Obstacle();
        obstacle.setX(obstacleDto.getX());
        obstacle.setY(obstacleDto.getY());
        // Puedes mapear más campos según sea necesario
        return obstacle;
    }

}
