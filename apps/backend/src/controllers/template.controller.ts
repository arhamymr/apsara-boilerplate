import { Context } from "hono";
import { z } from "zod";
import { TemplateService } from "../services/template.service";
import { APIResponse } from "../types/index";

/**
 * Template Controller
 *
 * This is a template controller that demonstrates the standard patterns for handling HTTP requests
 * in this application. It shows how to:
 *
 * 1. Structure a controller with dependency injection
 * 2. Handle CRUD operations
 * 3. Validate requests with Zod schemas
 * 4. Format responses using APIResponse
 * 5. Handle errors consistently
 *
 * To use this template:
 * 1. Copy this file to a new controller file (e.g., product.controller.ts)
 * 2. Rename the class and update the service import
 * 3. Replace the data types and validation schemas
 * 4. Implement the actual business logic in the corresponding service
 */
export class TemplateController {
  private templateService: TemplateService;

  constructor(templateService: TemplateService) {
    this.templateService = templateService;
  }

  /**
   * Create a new item
   *
   * @param c Hono Context
   * @returns Promise<Response> JSON response with created item or error
   *
   * Usage:
   * POST /items
   * Body: { name: string, description?: string }
   */
  async create(c: Context): Promise<Response> {
    const { name, description } = await c.req.json();

    try {
      const result = await this.templateService.create({ name, description });
      const response: APIResponse = {
        status: "ok",
        message: "Item created successfully",
        data: result,
      };
      return c.json(response, 201);
    } catch (error) {
      if (error instanceof Error) {
        const response: APIResponse = {
          status: "error",
          message: error.message,
        };
        return c.json(response, 400);
      }
      throw error;
    }
  }

  /**
   * Get all items
   *
   * @param c Hono Context
   * @returns Promise<Response> JSON response with items list or error
   *
   * Usage:
   * GET /items
   */
  async getAll(c: Context): Promise<Response> {
    try {
      const result = await this.templateService.getAll();
      const response: APIResponse = {
        status: "ok",
        message: "Items retrieved successfully",
        data: result,
      };
      return c.json(response);
    } catch (error) {
      if (error instanceof Error) {
        const response: APIResponse = {
          status: "error",
          message: error.message,
        };
        return c.json(response, 500);
      }
      throw error;
    }
  }

  /**
   * Get a single item by ID
   *
   * @param c Hono Context
   * @returns Promise<Response> JSON response with item data or error
   *
   * Usage:
   * GET /items/:id
   */
  async getById(c: Context): Promise<Response> {
    const id = c.req.param("id");

    try {
      const result = await this.templateService.getById(id);
      const response: APIResponse = {
        status: "ok",
        message: "Item retrieved successfully",
        data: result,
      };
      return c.json(response);
    } catch (error) {
      if (error instanceof Error) {
        const response: APIResponse = {
          status: "error",
          message: error.message,
        };
        return c.json(response, 404);
      }
      throw error;
    }
  }

  /**
   * Update an item by ID
   *
   * @param c Hono Context
   * @returns Promise<Response> JSON response with updated item or error
   *
   * Usage:
   * PUT /items/:id
   * Body: { name?: string, description?: string }
   */
  async update(c: Context): Promise<Response> {
    const id = c.req.param("id");
    const { name, description } = await c.req.json();

    try {
      const result = await this.templateService.update(id, {
        name,
        description,
      });
      const response: APIResponse = {
        status: "ok",
        message: "Item updated successfully",
        data: result,
      };
      return c.json(response);
    } catch (error) {
      if (error instanceof Error) {
        const response: APIResponse = {
          status: "error",
          message: error.message,
        };
        return c.json(response, 400);
      }
      throw error;
    }
  }

  /**
   * Delete an item by ID
   *
   * @param c Hono Context
   * @returns Promise<Response> JSON response confirming deletion or error
   *
   * Usage:
   * DELETE /items/:id
   */
  async delete(c: Context): Promise<Response> {
    const id = c.req.param("id");

    try {
      await this.templateService.delete(id);
      const response: APIResponse = {
        status: "ok",
        message: "Item deleted successfully",
      };
      return c.json(response);
    } catch (error) {
      if (error instanceof Error) {
        const response: APIResponse = {
          status: "error",
          message: error.message,
        };
        return c.json(response, 400);
      }
      throw error;
    }
  }

  // Validation Schemas
  // These methods return Zod schemas for request validation
  // Used by zValidator middleware in the route file

  /**
   * Schema for creating a new item
   */
  getCreateSchema() {
    return z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      description: z.string().optional(),
    });
  }

  /**
   * Schema for updating an item
   */
  getUpdateSchema() {
    return z.object({
      name: z.string().min(2, "Name must be at least 2 characters").optional(),
      description: z.string().optional(),
    });
  }

  /**
   * Schema for ID validation
   */
  getIdSchema() {
    return z.string().min(1, "ID is required");
  }
}
