async def fetch_value(client, key):
    """Fetch one value."""
    response = await client.get(key)
    return response


async def run(client):
    """Run async work."""
    return await fetch_value(client, "answer")
