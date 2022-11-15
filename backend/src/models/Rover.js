class Rover {
    constructor(input) {
        const start_input = input.split(' ');
        const start_x = start_input[0];
        const start_y = start_input[1];
        const start_direction = start_input[2];

        this.x = parseInt(start_x.toString());
        this.y = parseInt(start_y.toString());
        this.direction = start_direction.toUpperCase();
    }

    getFinalPosition = (instructions) => {
        const start_position = {
            x: this.x,
            y: this.y,
            direction: this.direction,
        };

        let current_x = start_position.x;
        let current_y = start_position.y;
        let current_direction = start_position.direction;

        for (const instruction of instructions.split('')) {
            if (current_direction == 'E') {
                if (instruction == 'R') {
                    current_direction = 'S';
                }
                if (instruction == 'L') {
                    current_direction = 'N';
                }
                if (instruction == 'M') {
                    current_x = current_x + 1;
                }
                continue;
            }

            if (current_direction == 'W') {
                if (instruction == 'R') {
                    current_direction = 'N';
                }
                if (instruction == 'L') {
                    current_direction = 'S';
                }
                if (instruction == 'M') {
                    current_x = current_x - 1;
                }
                continue;
            }

            if (current_direction == 'N') {
                if (instruction == 'R') {
                    current_direction = 'E';
                }
                if (instruction == 'L') {
                    current_direction = 'W';
                }
                if (instruction == 'M') {
                    current_y = current_y + 1;
                }
                continue;
            }

            if (current_direction == 'S') {
                if (instruction == 'R') {
                    current_direction = 'W';
                }
                if (instruction == 'L') {
                    current_direction = 'E';
                }
                if (instruction == 'M') {
                    current_y = current_y - 1;
                }
                continue;
            }
        }

        return [current_x, current_y, current_direction].join(' ');
    };
}

module.exports = Rover;
