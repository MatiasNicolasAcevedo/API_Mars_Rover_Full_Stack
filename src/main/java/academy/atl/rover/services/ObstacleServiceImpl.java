package academy.atl.rover.services;

import academy.atl.rover.models.Obstacle;
import academy.atl.rover.repository.ObstacleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ObstacleServiceImpl implements ObstacleService {

    private final ObstacleRepository repository;

    @Override
    public List<Obstacle> findAll() {
        return repository.findAll();
    }

}
