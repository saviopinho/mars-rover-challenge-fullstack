class Rover {
    constructor(start_x, start_y, start_direction) {
        this.current_x = start_x;
        this.current_y = start_y;
        this.current_direction = start_direction;
    }

    _turnRight = (direction) => {
        if (direction == 'E') {
            return (this.current_direction = 'S');
        }

        if (direction == 'S') {
            return (this.current_direction = 'W');
        }

        if (direction == 'W') {
            return (this.current_direction = 'N');
        }

        if (direction == 'N') {
            return (this.current_direction = 'E');
        }
    };

    _turnLeft = (direction) => {
        if (direction == 'E') {
            return (this.current_direction = 'N');
        }

        if (direction == 'N') {
            return (this.current_direction = 'W');
        }

        if (direction == 'W') {
            return (this.current_direction = 'S');
        }

        if (direction == 'S') {
            return (this.current_direction = 'E');
        }
    };

    _move = (direction) => {
        if (direction == 'E') {
            return (this.current_x = this.current_x + 1);
        }

        if (direction == 'S') {
            return (this.current_y = this.current_y - 1);
        }

        if (direction == 'W') {
            return (this.current_x = this.current_x - 1);
        }

        if (direction == 'N') {
            return (this.current_y = this.current_y + 1);
        }
    };

    getFinalPosition = (instruction) => {
        for (const command of instruction.split('')) {
            if (command == 'R') {
                this._turnRight(this.current_direction);
                continue;
            }

            if (command == 'L') {
                this._turnLeft(this.current_direction);
                continue;
            }

            if (command == 'M') {
                this._move(this.current_direction);
                continue;
            }
        }

        return [this.current_x, this.current_y, this.current_direction].join(
            ' '
        );
    };
}

module.exports = Rover;
