#!/bin/bash

# Financial Calculators - Build & Deployment Script
# Usage: ./deploy.sh [command]

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Check if .env.local exists
check_env_local() {
    if [ ! -f .env.local ]; then
        print_error ".env.local not found!"
        print_info "Creating from template..."
        if [ -f .env.example ]; then
            cp .env.example .env.local
            print_warning "Please update .env.local with your actual values"
            return 1
        else
            print_error ".env.example not found!"
            return 1
        fi
    fi
    print_success ".env.local exists"
    return 0
}

# Check if environment variables are set
check_env_vars() {
    print_header "Checking Environment Variables"
    
    if [ -f .env.local ]; then
        # Check Google Analytics
        if grep -q "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-" .env.local; then
            GA_ID=$(grep "NEXT_PUBLIC_GA_MEASUREMENT_ID" .env.local | cut -d'=' -f2)
            if [[ $GA_ID != *"XXXXXXXXXX"* ]]; then
                print_success "Google Analytics ID configured: $GA_ID"
            else
                print_warning "Google Analytics ID is placeholder. Update .env.local"
            fi
        else
            print_warning "Google Analytics ID not found in .env.local"
        fi
        
        # Check Google AdSense
        if grep -q "NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-" .env.local; then
            ADSENSE_ID=$(grep "NEXT_PUBLIC_ADSENSE_CLIENT_ID" .env.local | cut -d'=' -f2)
            if [[ $ADSENSE_ID != *"XXXXXXXXXXXXXXXX"* ]]; then
                print_success "Google AdSense ID configured: $ADSENSE_ID"
            else
                print_warning "Google AdSense ID is placeholder. Update .env.local"
            fi
        else
            print_info "Google AdSense not configured (optional)"
        fi
    fi
}

# Install dependencies
install_deps() {
    print_header "Installing Dependencies"
    npm install
    print_success "Dependencies installed"
}

# Local development
dev_local() {
    print_header "Starting Local Development Server"
    check_env_local
    check_env_vars
    print_info "Starting on http://localhost:3000"
    npm run dev
}

# Build for production (local test)
build_local() {
    print_header "Building for Production (Local)"
    check_env_local
    check_env_vars
    
    print_info "Running build..."
    npm run build
    print_success "Build completed successfully!"
    
    print_info "\nTo test the production build locally, run:"
    echo -e "  ${GREEN}npm run start${NC}"
}

# Test production build locally
test_production() {
    print_header "Testing Production Build Locally"
    
    if [ ! -d ".next" ]; then
        print_error "No build found. Running build first..."
        build_local
    fi
    
    print_info "Starting production server on http://localhost:3000"
    npm run start
}

# Sync environment variables to Vercel
sync_env_to_vercel() {
    print_header "Syncing Environment Variables to Vercel"
    
    if [ ! -f .env.local ]; then
        print_error ".env.local not found. Cannot sync environment variables."
        return 1
    fi
    
    # Sync Google Analytics
    if grep -q "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-" .env.local; then
        GA_ID=$(grep "NEXT_PUBLIC_GA_MEASUREMENT_ID" .env.local | cut -d'=' -f2 | tr -d '"' | tr -d ' ')
        
        if [[ $GA_ID == *"XXXXXXXXXX"* ]]; then
            print_warning "Google Analytics ID is placeholder. Skipping..."
        else
            # Check if already set in Vercel
            if npx vercel env ls 2>&1 | grep -q "NEXT_PUBLIC_GA_MEASUREMENT_ID"; then
                print_info "NEXT_PUBLIC_GA_MEASUREMENT_ID already exists in Vercel"
            else
                # Add to all environments
                print_info "Adding NEXT_PUBLIC_GA_MEASUREMENT_ID to Vercel..."
                echo "$GA_ID" | npx vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
                echo "$GA_ID" | npx vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID preview  
                echo "$GA_ID" | npx vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID development
                print_success "Google Analytics ID synced!"
            fi
        fi
    else
        print_warning "NEXT_PUBLIC_GA_MEASUREMENT_ID not found in .env.local"
    fi
    
    # Sync Google AdSense
    if grep -q "NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-" .env.local; then
        ADSENSE_ID=$(grep "NEXT_PUBLIC_ADSENSE_CLIENT_ID" .env.local | cut -d'=' -f2 | tr -d '"' | tr -d ' ')
        
        if [[ $ADSENSE_ID == *"XXXXXXXXXXXXXXXX"* ]]; then
            print_warning "AdSense Client ID is placeholder. Skipping..."
        else
            # Check if already set in Vercel
            if npx vercel env ls 2>&1 | grep -q "NEXT_PUBLIC_ADSENSE_CLIENT_ID"; then
                print_info "NEXT_PUBLIC_ADSENSE_CLIENT_ID already exists in Vercel"
            else
                # Add to all environments
                print_info "Adding NEXT_PUBLIC_ADSENSE_CLIENT_ID to Vercel..."
                echo "$ADSENSE_ID" | npx vercel env add NEXT_PUBLIC_ADSENSE_CLIENT_ID production
                echo "$ADSENSE_ID" | npx vercel env add NEXT_PUBLIC_ADSENSE_CLIENT_ID preview  
                echo "$ADSENSE_ID" | npx vercel env add NEXT_PUBLIC_ADSENSE_CLIENT_ID development
                print_success "AdSense Client ID synced!"
            fi
        fi
    else
        print_info "AdSense not configured (optional)"
    fi
    
    print_success "Environment variables sync complete!"
}

# Deploy to Vercel (production)
deploy_production() {
    print_header "Deploying to Vercel Production"
    
    # Check git status
    if ! git diff-index --quiet HEAD --; then
        print_warning "You have uncommitted changes!"
        read -p "Do you want to commit and push? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git status
            read -p "Enter commit message: " commit_msg
            git add .
            git commit -m "$commit_msg"
            git push origin main
            print_success "Changes committed and pushed"
        else
            print_warning "Deploying with uncommitted local changes..."
        fi
    else
        print_success "Git working directory is clean"
    fi
    
    # Check and sync Vercel environment variables
    print_info "Checking Vercel environment variables..."
    if npx vercel env ls 2>&1 | grep -q "NEXT_PUBLIC_GA_MEASUREMENT_ID"; then
        print_success "GA_MEASUREMENT_ID is set in Vercel"
    else
        print_warning "GA_MEASUREMENT_ID not found in Vercel!"
        read -p "Do you want to sync from .env.local? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            sync_env_to_vercel
        else
            print_warning "Deploying without environment variables. GA tracking may not work!"
        fi
    fi
    
    # Deploy to production
    print_info "\nDeploying to production..."
    npx vercel --prod
    
    print_success "Deployment complete!"
    print_info "Visit: https://calculators.utltyhub.com"
}

# Deploy to Vercel (preview)
deploy_preview() {
    print_header "Deploying to Vercel Preview"
    
    print_info "Creating preview deployment..."
    npx vercel
    
    print_success "Preview deployment complete!"
}

# Check deployment status
check_status() {
    print_header "Deployment Status"
    
    print_info "Checking Vercel deployments..."
    npx vercel ls
    
    print_info "\nChecking environment variables..."
    npx vercel env ls
}

# Verify production deployment
verify_production() {
    print_header "Verifying Production Deployment"
    
    PROD_URL="https://calculators.utltyhub.com"
    
    print_info "Testing $PROD_URL..."
    
    # Check if site is accessible
    if curl -s -o /dev/null -w "%{http_code}" "$PROD_URL" | grep -q "200"; then
        print_success "Site is accessible (HTTP 200)"
    else
        print_error "Site returned non-200 status"
    fi
    
    # Check if GA tracking is present
    if curl -s "$PROD_URL" | grep -q "G-JVHMR8RYRY"; then
        print_success "Google Analytics tracking code found"
    else
        print_warning "Google Analytics tracking code not found"
    fi
    
    # Check all calculators
    print_info "\nChecking calculators..."
    CALCULATORS=("retirement" "mortgage" "tax" "compound-interest" "loan" "sip" "emi" "loan-payoff" "apr-apy" "fd")
    
    for calc in "${CALCULATORS[@]}"; do
        if curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/calculators/$calc" | grep -q "200"; then
            echo -e "  ${GREEN}✓${NC} $calc"
        else
            echo -e "  ${RED}✗${NC} $calc"
        fi
    done
}

# Show help
show_help() {
    echo -e "${BLUE}"
    echo "Financial Calculators - Build & Deployment Script"
    echo -e "${NC}"
    echo "Usage: ./deploy.sh [command]"
    echo ""
    echo "Commands:"
    echo "  dev              Start local development server"
    echo "  build            Build for production (test locally)"
    echo "  test             Test production build locally"
    echo "  deploy           Deploy to Vercel production"
    echo "  preview          Deploy to Vercel preview environment"
    echo "  status           Check deployment status"
    echo "  verify           Verify production deployment is working"
    echo "  sync             Sync environment variables from .env.local to Vercel"
    echo "  install          Install dependencies"
    echo "  check            Check environment variables"
    echo "  help             Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh dev              # Start local dev server"
    echo "  ./deploy.sh build            # Build for production"
    echo "  ./deploy.sh sync             # Sync env vars to Vercel"
    echo "  ./deploy.sh deploy           # Deploy to production"
    echo "  ./deploy.sh verify           # Verify production deployment"
    echo ""
}

# Main script
main() {
    case "${1:-help}" in
        dev|development)
            dev_local
            ;;
        build)
            build_local
            ;;
        test|start)
            test_production
            ;;
        deploy|production|prod)
            deploy_production
            ;;
        preview)
            deploy_preview
            ;;
        status)
            check_status
            ;;
        verify)
            verify_production
            ;;
        sync)
            sync_env_to_vercel
            ;;
        install|deps)
            install_deps
            ;;
        check|env)
            check_env_vars
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
