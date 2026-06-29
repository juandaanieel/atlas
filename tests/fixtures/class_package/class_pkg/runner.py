class Runner:
    """Coordinates a small workflow."""

    def run(self, value):
        """Run one workflow step."""
        return self.step(value)

    @staticmethod
    def step(value):
        """Transform a value."""
        return value + 10


def build_runner():
    """Create a runner."""
    return Runner()
