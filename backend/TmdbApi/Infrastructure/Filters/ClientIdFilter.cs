namespace TmdbApi.Infrastructure.Filters
{
    public sealed class ClientIdFilter : IEndpointFilter
    {
        public async ValueTask<object?> InvokeAsync(
            EndpointFilterInvocationContext context,
            EndpointFilterDelegate next)
        {
            var http = context.HttpContext;

            if (!http.Request.Headers.TryGetValue("X-Client-Id", out var value) ||
                !Guid.TryParse(value, out var clientId))
            {
                return Results.BadRequest("No client found");
            }

            http.Items["ClientId"] = clientId;

            return await next(context);
        }
    }
}