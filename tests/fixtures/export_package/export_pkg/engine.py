from export_pkg._compile import compile_inputs


class Engine:
    """Runs a configured build."""

    def __init__(self, size):
        """Create an engine."""
        self.size = size

    def run(self):
        """Run the build."""
        return build(self.size)

    def _check(self):
        return self.size > 0


def build(size):
    """Build a result from compiled inputs."""
    return compile_inputs(size) + tune(size)


def tune(size):
    """Tune a size."""
    return size * 2
