package academy.atl.rover.models;

/**
 * Esta clase Enum, Permite asociar direcciones cardinales con valores numéricos, es especialmente útil para realizar un movimiento en un plano bidimensional.
 */
public enum Direction {

    NORTH(1), EAST(1), SOUTH(-1), WEST(-1);

    // Valores numéricos indican la dirección en la que se debe mover un objeto cuando se desplaza en esa dirección.
    private final int value;

    Direction(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

}
