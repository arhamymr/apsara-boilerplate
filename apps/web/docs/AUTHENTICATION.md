# Better Auth Integration

This template comes with Better Auth pre-configured for authentication. Better Auth is a modern, TypeScript-first authentication library that provides a simple and secure way to handle user authentication.

## Features

- ✅ Email/Password authentication
- ✅ Session management with secure cookies
- ✅ Protected routes with middleware
- ✅ OAuth providers ready (GitHub, Google)
- ✅ TypeScript support
- ✅ React hooks for easy integration

## Quick Start

### 1. Set up your database

Add your database connection string to `.env`:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Initialize the database

If using Prisma:
```bash
npx prisma db push
```

Or run the SQL script directly:
```bash
psql $DATABASE_URL < scripts/init-db.sql
```

### 3. Start using authentication

The login and registration pages are already set up at `/login` and `/register`.

## Usage Examples

### Client-side Session Check

```typescript
"use client"
import { authClient } from "@/lib/auth-client"

export default function MyComponent() {
  const { data: session, isPending } = authClient.useSession()
  
  if (isPending) return <div>Loading...</div>
  if (!session) return <div>Not authenticated</div>
  
  return <div>Welcome, {session.user.name}!</div>
}
```

### Sign In

```typescript
import { authClient } from "@/lib/auth-client"

await authClient.signIn.email({
  email: "user@example.com",
  password: "password123",
})
```

### Sign Up

```typescript
import { authClient } from "@/lib/auth-client"

await authClient.signUp.email({
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
})
```

### Sign Out

```typescript
import { authClient } from "@/lib/auth-client"

await authClient.signOut()
```

## Protected Routes

Routes are automatically protected using the middleware in `proxy.ts`:

- `/dashboard/*` - Requires authentication
- `/login`, `/register` - Redirects to dashboard if already authenticated

To protect additional routes, update the matcher in `proxy.ts`:

```typescript
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
}
```

## Adding OAuth Providers

To enable social login, add the provider credentials to `.env`:

```bash
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
```

The OAuth providers are already configured in `lib/auth.ts`.

## Customization

### Modify Authentication Configuration

Edit `lib/auth.ts` to customize:
- Session duration
- Cookie settings
- Additional OAuth providers
- Email verification
- Password requirements

### Customize Auth Pages

The authentication forms are located in:
- `app/(auth)/login/page.tsx`
- `app/(auth)/register/page.tsx`
- `app/(auth)/forgot-password/page.tsx`

### Reusable Auth Components

Use the pre-built form components:
- `components/auth/login-form.tsx`
- `components/auth/register-form.tsx`
- `components/auth/forgot-password-form.tsx`

## Security Best Practices

1. **Always use HTTPS in production**
2. **Set strong password requirements**
3. **Enable email verification** (configure in `lib/auth.ts`)
4. **Use environment variables** for sensitive data
5. **Implement rate limiting** for login attempts
6. **Keep Better Auth updated** to the latest version

## Learn More

- [Better Auth Documentation](https://better-auth.com/docs)
- [Better Auth GitHub](https://github.com/better-auth/better-auth)
