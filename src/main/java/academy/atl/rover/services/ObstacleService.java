package academy.atl.rover.services;

import academy.atl.rover.models.Obstacle;

import java.util.List;
import java.util.Optional;

public interface ObstacleService {

    List<Obstacle> findAll(); // Método para obtener todos los obstáculos

    Optional<Obstacle> findById(Long id); // Método para obtener un obstáculo por su ID

    Obstacle create(Obstacle obstacle); // Método para crear un nuevo obstáculo

    Obstacle update(Long id, Obstacle updatedObstacle); // Método para actualizar un obstáculo existente

    void delete(Long id); // Método para eliminar un obstáculo por su ID
}

