class Repository:
    """Stores workflow results."""

    def save(self, value):
        """Save a value."""
        return value


class AuditRepository(Repository):
    """Stores workflow results and remembers the last one."""

    def save(self, value):
        """Save a value and remember it."""
        self.last_saved = value
        return value


class Stepper:
    """Transforms workflow values."""

    def step(self, value):
        """Transform a value."""
        return value + 10


class Runner:
    """Coordinates a small workflow."""

    def __init__(self, repository: Repository, offset=10):
        """Create a runner."""
        self.repository = repository
        self.stepper = Stepper()
        self.offset = offset
        self.ready = True
        self._prepare()

    def _prepare(self):
        """Prepare the runner before its public workflow starts."""
        return self.ready

    def run(self, value):
        """Run one workflow step."""
        self.repository.save(value)
        return self.stepper.step(self._normalize(value)) + self.offset

    @staticmethod
    def step(value):
        """Transform a value."""
        return value + 10

    def _normalize(self, value):
        """Normalize a value."""
        return value


class Empty:
    """Represents a class without analyzed methods."""


def build_runner():
    """Create a runner."""
    return Runner(Repository())
