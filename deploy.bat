@echo off
REM Quick AWS Deployment Script for Krushiyuga Web Application (Windows)

echo 🚀 Krushiyuga AWS Deployment Script
echo ==================================

REM Check if AWS CLI is installed
aws --version >nul 2>&1
if errorlevel 1 (
    echo ❌ AWS CLI is not installed. Please install it first.
    echo Visit: https://aws.amazon.com/cli/
    pause
    exit /b 1
)

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install it first.
    echo Visit: https://docker.com
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

set /p AWS_REGION="Enter your AWS region (default: us-east-1): "
if "%AWS_REGION%"=="" set AWS_REGION=us-east-1

set /p ACCOUNT_ID="Enter your AWS Account ID: "
if "%ACCOUNT_ID%"=="" (
    echo ❌ AWS Account ID is required
    pause
    exit /b 1
)

set /p REPO_NAME="Enter ECR repository name (default: krushiyuga-web): "
if "%REPO_NAME%"=="" set REPO_NAME=krushiyuga-web

echo.
echo 📋 Deployment Configuration:
echo    AWS Region: %AWS_REGION%
echo    Account ID: %ACCOUNT_ID%
echo    Repository: %REPO_NAME%
echo.

set /p CONFIRM="Continue with deployment? (y/N): "
if /i not "%CONFIRM%"=="y" (
    echo ❌ Deployment cancelled
    pause
    exit /b 1
)

echo.
echo 🏗️  Creating AWS infrastructure...

REM Create ECR repository
echo 📦 Creating ECR repository...
aws ecr create-repository --repository-name %REPO_NAME% --region %AWS_REGION% 2>nul || echo Repository may already exist

REM Build Docker image
echo 🐳 Building Docker image...
docker build -t %REPO_NAME% .

REM Login to ECR
echo 🔐 Logging into ECR...
for /f "tokens=*" %%i in ('aws ecr get-login-password --region %AWS_REGION%') do docker login --username AWS --password-stdin %ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com < echo %%i

REM Tag image
echo 🏷️  Tagging image...
docker tag %REPO_NAME%:latest %ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com/%REPO_NAME%:latest

REM Push image
echo ⬆️  Pushing image to ECR...
docker push %ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com/%REPO_NAME%:latest

echo.
echo ✅ Deployment completed successfully!
echo.
echo 📝 Next Steps:
echo 1. Update task-definition.json with your account details
echo 2. Create ECS cluster and service
echo 3. Set up environment variables in AWS Secrets Manager
echo 4. Configure domain and SSL certificate
echo.
echo 📖 For detailed instructions, see AWS_DEPLOYMENT.md

pause
