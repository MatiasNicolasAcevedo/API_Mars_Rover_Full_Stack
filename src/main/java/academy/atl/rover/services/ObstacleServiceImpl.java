package academy.atl.rover.services;

import academy.atl.rover.models.Obstacle;
import academy.atl.rover.repository.ObstacleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ObstacleServiceImpl implements ObstacleService {

    private final ObstacleRepository repository;

    @Override
    public List<Obstacle> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Obstacle> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Obstacle create(Obstacle obstacle) {
        return repository.save(obstacle);
    }

    @Override
    public Obstacle update(Long id, Obstacle updatedObstacle) {
        Optional<Obstacle> existingObstacle = repository.findById(id);
        if (existingObstacle.isPresent()) {
            Obstacle obstacle = existingObstacle.get();
            obstacle.setX(updatedObstacle.getX());
            obstacle.setY(updatedObstacle.getY());
            // Puedes actualizar más campos aquí según sea necesario.
            return repository.save(obstacle);
        }
        return null; // O puedes manejar esto según tu lógica de negocio
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

}
