"""A package shaped to exercise each defect signal."""


def run(values):
    """Public entry point: reachable, drives the workflow."""
    total = 0
    for value in values:
        total = total + helper_one(value)
    return total


def helper_one(value):
    """Reached from run. A structural twin of helper_two lives below."""
    result = 0
    for index in range(value):
        if index > 0:
            result = result + index
        else:
            result = result - index
    return result


def helper_two(number):
    """Never called: dead code, and a structural clone of helper_one."""
    output = 0
    for position in range(number):
        if position > 0:
            output = output + position
        else:
            output = output - position
    return output


def _unused_private():
    """Private and uncalled: dead code."""
    buffer = []
    for item in range(10):
        buffer.append(item * 2)
    return buffer
