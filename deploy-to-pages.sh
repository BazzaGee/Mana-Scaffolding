#!/bin/bash
# Cloudflare Pages Deployment Script

# Build the project
echo "Building Astro project..."
npm run build

# Create deployment directory
DEPLOY_DIR="dist/pages-deploy"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

# Copy client files
cp -r dist/client/* "$DEPLOY_DIR/"

# Copy server files to functions directory
mkdir -p "$DEPLOY_DIR/functions"
cp dist/server/entry.mjs "$DEPLOY_DIR/functions/[[path]].mjs"
cp -r dist/server/chunks "$DEPLOY_DIR/functions/"
cp dist/server/virtual_astro_middleware.mjs "$DEPLOY_DIR/functions/"

# Copy wrangler config
cp dist/server/wrangler.json "$DEPLOY_DIR/"

echo "Deployment structure created in $DEPLOY_DIR"
