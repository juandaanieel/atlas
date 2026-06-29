from .b import beta


def main(value):
    """Run the simple pipeline."""
    prepared = helper(value)
    return beta(prepared)


def helper(value):
    """Prepare a value."""
    print(value)
    return value + 1
