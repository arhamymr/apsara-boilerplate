# API Templates Guide

This directory contains template files that demonstrate the standard patterns for building API endpoints in this application. These templates serve as a starting point for creating new features following the established architecture.

## Template Files

### 1. `template.controller.ts`

A controller template that shows how to:

- Structure a controller class with dependency injection
- Handle HTTP requests and responses
- Implement CRUD operations
- Validate request data with Zod schemas
- Format consistent API responses
- Handle errors appropriately

### 2. `template.service.ts`

A service template that demonstrates:

- Defining data interfaces and types
- Implementing business logic
- Database operations with Drizzle ORM
- Error handling with meaningful messages
- Separation of concerns from the controller layer

### 3. `template.routes.ts`

A route template that shows:

- Creating a Hono route module
- Wiring services and controllers together
- Defining endpoints with proper HTTP methods
- Applying validation middleware
- Registering routes in the main application

## How to Use These Templates

### Step 1: Create New Files

Copy the template files to your new feature:

```bash
# Example: Creating a "product" feature
cp src/controllers/template.controller.ts src/controllers/product.controller.ts
cp src/services/template.service.ts src/services/product.service.ts
cp src/routes/template.routes.ts src/routes/product.routes.ts
```

### Step 2: Update the Controller

1. Rename the class (e.g., `ProductController`)
2. Update the service import
3. Replace data types and validation schemas
4. Adjust response messages

### Step 3: Implement the Service

1. Define your data interfaces
2. Implement database queries using your schema
3. Add business logic specific to your domain
4. Update the import in the controller

### Step 4: Configure Routes

1. Update service and controller imports
2. Modify endpoint paths
3. Add or remove endpoints as needed
4. Register in `src/routes/index.routes.ts`

### Step 5: Register Routes

Add your new routes to `src/routes/index.routes.ts`:

```typescript
import { productRoutes } from "./product.routes";

// In the routes setup:
routes.route("/", productRoutes);
```

## Architecture Patterns

### Directory Structure

```
src/
├── controllers/    # Handle HTTP requests and responses
├── services/       # Implement business logic
├── routes/         # Define API endpoints
├── lib/           # Configuration and utilities
├── middleware/    # Custom middleware
├── types/         # Type definitions
└── index.ts       # Application entry point
```

### Layer Dependencies

- **Controller** depends on **Service**
- **Service** depends on **Database** (via Drizzle)
- **Route** wires together **Controller** and **Service**
- **Types** are shared across all layers

### Request Flow

1. Route receives HTTP request
2. Validation middleware validates request
3. Controller method handles request
4. Service method executes business logic
5. Database operations via Drizzle
6. Response flows back through layers

## Best Practices

### Error Handling

- Services throw errors with meaningful messages
- Controllers catch errors and format responses
- Use appropriate HTTP status codes (400, 404, 500)
- Return consistent error response format

### Data Validation

- Use Zod schemas for request validation
- Define schemas in controller methods
- Apply validation at the route level
- Validate both body and query parameters

### Response Format

- Use the `APIResponse` interface for consistency
- Include status, message, and optional data
- Use appropriate HTTP status codes
- Maintain consistent naming conventions

### Database Operations

- Use Drizzle ORM for type-safe queries
- Implement transactions when needed
- Handle database errors gracefully
- Consider performance (indexes, pagination)

## Common Patterns

### Pagination

```typescript
// In controller
async getAll(c: Context): Promise<Response> {
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '10');
  const result = await this.service.getAll(page, limit);
  return c.json(result);
}

// In service
async getAll(page: number, limit: number): Promise<ItemResponse[]> {
  const offset = (page - 1) * limit;
  return await db.select()
    .from(schema.items)
    .limit(limit)
    .offset(offset);
}
```

### Search/Filter

```typescript
// In route
templateRoutes.get(
  "/items",
  zValidator("query", z.object({
    search: z.string().optional(),
    category: z.string().optional(),
  })),
  templateController.getAll.bind(templateController)
);

// In service
async getAll(filters?: { search?: string, category?: string }): Promise<ItemResponse[]> {
  let query = db.select().from(schema.items);

  if (filters?.search) {
    query = query.where(like(schema.items.name, `%${filters.search}%`));
  }

  return await query;
}
```

### Authentication Middleware

```typescript
// In route
import { authMiddleware } from "../middleware/auth";

templateRoutes.use("/items/*", authMiddleware);

// Or per-endpoint
templateRoutes.post(
  "/items",
  authMiddleware,
  zValidator("json", schema),
  controller.create.bind(controller),
);
```

## Testing

When implementing new endpoints, consider:

1. Unit tests for service methods
2. Integration tests for controller methods
3. API tests for complete request flow
4. Validation tests for input validation

## Additional Resources

- [Hono Documentation](https://hono.dev/)
- [Zod Documentation](https://zod.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Better Auth Documentation](https://better-auth.com/)
