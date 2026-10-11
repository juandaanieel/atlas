from dataclasses import dataclass


@dataclass
class Box:
    """An axis-aligned box."""

    width: float
    height: float

    def scaled(self, factor):
        """Return a scaled box."""
        return Box(self.width * factor, self.height * factor)


def area(box):
    """Return the area of a box."""
    return box.width * box.height


def _hidden():
    return 0
