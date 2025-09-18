#!/bin/bash

# Quick AWS Deployment Script for Krushiyuga Web Application

set -e

echo "🚀 Krushiyuga AWS Deployment Script"
echo "=================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    echo "Visit: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install it first."
    echo "Visit: https://docker.com"
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Get user input
read -p "Enter your AWS region (default: us-east-1): " AWS_REGION
AWS_REGION=${AWS_REGION:-us-east-1}

read -p "Enter your AWS Account ID: " ACCOUNT_ID
if [ -z "$ACCOUNT_ID" ]; then
    echo "❌ AWS Account ID is required"
    exit 1
fi

read -p "Enter ECR repository name (default: krushiyuga-web): " REPO_NAME
REPO_NAME=${REPO_NAME:-krushiyuga-web}

echo ""
echo "📋 Deployment Configuration:"
echo "   AWS Region: $AWS_REGION"
echo "   Account ID: $ACCOUNT_ID"
echo "   Repository: $REPO_NAME"
echo ""

read -p "Continue with deployment? (y/N): " CONFIRM
if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "🏗️  Creating AWS infrastructure..."

# Create ECR repository
echo "📦 Creating ECR repository..."
aws ecr create-repository --repository-name $REPO_NAME --region $AWS_REGION || true

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t $REPO_NAME .

# Login to ECR
echo "🔐 Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Tag image
echo "🏷️  Tagging image..."
docker tag $REPO_NAME:latest $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:latest

# Push image
echo "⬆️  Pushing image to ECR..."
docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:latest

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "📝 Next Steps:"
echo "1. Update task-definition.json with your account details"
echo "2. Create ECS cluster and service"
echo "3. Set up environment variables in AWS Secrets Manager"
echo "4. Configure domain and SSL certificate"
echo ""
echo "📖 For detailed instructions, see AWS_DEPLOYMENT.md"
