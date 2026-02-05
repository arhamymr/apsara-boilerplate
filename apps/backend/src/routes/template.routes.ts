import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { TemplateController } from "../controllers/template.controller";
import { TemplateService } from "../services/template.service";

/**
 * Template Routes
 *
 * This is a template route file that demonstrates the standard patterns for defining
 * API endpoints in this application. It shows how to:
 *
 * 1. Structure a route module
 * 2. Wire together services and controllers
 * 3. Define endpoints with proper HTTP methods
 * 4. Apply validation middleware
 * 5. Bind controller methods with correct context
 *
 * To use this template:
 * 1. Copy this file to a new route file (e.g., product.routes.ts)
 * 2. Update the service and controller imports
 * 3. Modify the base route path
 * 4. Adjust the endpoints as needed
 * 5. Register the routes in src/routes/index.routes.ts
 */

// Instantiate service and controller
// These instances are created once per module, ensuring singleton behavior
const templateService = new TemplateService();
const templateController = new TemplateController(templateService);

// Create a new Hono instance for this module
// This allows routes to be independently managed and composed
export const templateRoutes = new Hono();

// Define endpoints with validation middleware
// Each endpoint follows a consistent pattern:
// 1. HTTP method and path
// 2. Validation middleware (using zValidator for request body)
// 3. Controller method bound to maintain proper `this` context

/**
 * Create a new item
 *
 * POST /items
 * Body: { name: string, description?: string }
 *
 * The request body is validated against the schema returned by getCreateSchema()
 */
templateRoutes.post(
  "/items",
  zValidator("json", templateController.getCreateSchema()),
  templateController.create.bind(templateController),
);

/**
 * Get all items
 *
 * GET /items
 *
 * Returns a list of all items. No validation needed as there's no request body.
 */
templateRoutes.get(
  "/items",
  templateController.getAll.bind(templateController),
);

/**
 * Get a single item by ID
 *
 * GET /items/:id
 *
 * The ID parameter is extracted from the URL and passed to the controller.
 * Path parameter validation can be added if needed.
 */
templateRoutes.get(
  "/items/:id",
  templateController.getById.bind(templateController),
);

/**
 * Update an item by ID
 *
 * PUT /items/:id
 * Body: { name?: string, description?: string }
 *
 * The request body is validated against the schema returned by getUpdateSchema()
 */
templateRoutes.put(
  "/items/:id",
  zValidator("json", templateController.getUpdateSchema()),
  templateController.update.bind(templateController),
);

/**
 * Delete an item by ID
 *
 * DELETE /items/:id
 *
 * The ID parameter is extracted from the URL and passed to the controller.
 */
templateRoutes.delete(
  "/items/:id",
  templateController.delete.bind(templateController),
);

// Additional patterns you might find useful:

/**
 * Example of a PATCH endpoint for partial updates
 *
 * Uncomment and modify if you need partial update functionality:
 */
/*
templateRoutes.patch(
  "/items/:id",
  zValidator("json", templateController.getUpdateSchema()),
  templateController.update.bind(templateController),
);
*/

/**
 * Example of adding middleware for authentication
 *
 * Uncomment and modify if you need protected endpoints:
 */
/*
import { authMiddleware } from "../middleware/auth";

templateRoutes.use(
  "/items/*",
  authMiddleware
);
*/

/**
 * Example of adding query parameter validation
 *
 * Uncomment and modify if you need query validation:
 */
/*
import { zValidator } from "@hono/zod-validator";

templateRoutes.get(
  "/items",
  zValidator("query", z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    sort: z.enum(["name", "createdAt"]).optional(),
  })),
  templateController.getAll.bind(templateController),
);
*/

// Export the routes to be registered in the main application
// In src/routes/index.routes.ts, add:
// routes.route("/", templateRoutes);
