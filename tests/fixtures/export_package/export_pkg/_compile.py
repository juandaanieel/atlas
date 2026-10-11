def compile_inputs(size):
    """Compile inputs for a build."""
    return _scale(size) + 1


def _scale(size):
    return size * 3
