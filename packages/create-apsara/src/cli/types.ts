export interface ProjectConfig {
  name: string;
  apps: string[];
  features: string[];
  git: boolean;
  install: boolean;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  apps: string[];
  category: "core" | "ui" | "content" | "security";
  requires?: string[];
  requiredBy?: string[];
}

export interface FeatureManifest {
  id: string;
  version: string;
  name: string;
  description: string;
  apps: string[];
  features: string[];
  requires: string[];
  optionalFor: string[];
  config?: {
    web?: {
      dependencies?: string[];
      devDependencies?: string[];
      envVars?: {
        required: string[];
        optional: string[];
      };
    };
    backend?: {
      dependencies?: string[];
      devDependencies?: string[];
      envVars?: {
        required: string[];
        optional: string[];
      };
    };
    ai?: {
      dependencies?: string[];
      devDependencies?: string[];
    };
  };
  db?: {
    requiresTables: string[];
    adapterPattern: "repository" | "service" | "query";
    migrations: string[];
  };
  exposes?: {
    web?: {
      components: string[];
      hooks: string[];
      types: string[];
    };
    backend?: {
      routes: string[];
      middleware: string[];
      services: string[];
    };
  };
}

export interface Preset {
  name: string;
  description: string;
  features: string[];
  apps: string[];
}

export interface ResolvedConfig {
  features: string[];
  apps: string[];
  dependencies: Record<string, string[]>;
  devDependencies: Record<string, string[]>;
  envVars: {
    required: string[];
    optional: string[];
  };
}
