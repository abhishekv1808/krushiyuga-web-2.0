# AWS Deployment Guide for Krushiyuga Web Application

This guide provides multiple options for deploying your Krushiyuga web application on AWS.

## Prerequisites

1. **AWS Account**: Create an AWS account at https://aws.amazon.com
2. **AWS CLI**: Install and configure AWS CLI
3. **Docker**: Install Docker for containerized deployments
4. **Node.js**: Ensure you have Node.js 18+ installed locally

## Deployment Options

### Option 1: AWS Elastic Beanstalk (Recommended for beginners)

Elastic Beanstalk is the easiest way to deploy Node.js applications on AWS.

#### Steps:

1. **Install EB CLI**:
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB Application**:
   ```bash
   eb init
   # Select your region (e.g., us-east-1)
   # Choose Node.js platform
   # Select Node.js 18 running on 64bit Amazon Linux 2
   ```

3. **Create Environment**:
   ```bash
   eb create krushiyuga-production
   ```

4. **Set Environment Variables**:
   ```bash
   eb setenv NODE_ENV=production
   eb setenv MONGODB_URI=your-mongodb-connection-string
   eb setenv EMAIL_HOST=smtp.gmail.com
   eb setenv EMAIL_USER=your-email@gmail.com
   eb setenv EMAIL_PASS=your-app-password
   # Add all other environment variables
   ```

5. **Deploy**:
   ```bash
   eb deploy
   ```

6. **Open Application**:
   ```bash
   eb open
   ```

### Option 2: AWS ECS with Fargate (Recommended for production)

ECS with Fargate provides serverless container orchestration.

#### Steps:

1. **Build and Push Docker Image to ECR**:
   ```bash
   # Create ECR repository
   aws ecr create-repository --repository-name krushiyuga-web

   # Get login token
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

   # Build image
   docker build -t krushiyuga-web .

   # Tag image
   docker tag krushiyuga-web:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/krushiyuga-web:latest

   # Push image
   docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/krushiyuga-web:latest
   ```

2. **Create ECS Cluster**:
   ```bash
   aws ecs create-cluster --cluster-name krushiyuga-cluster
   ```

3. **Register Task Definition**:
   ```bash
   # Update task-definition.json with your ECR URI and account details
   aws ecs register-task-definition --cli-input-json file://task-definition.json
   ```

4. **Create ECS Service**:
   ```bash
   aws ecs create-service \
     --cluster krushiyuga-cluster \
     --service-name krushiyuga-service \
     --task-definition krushiyuga-web-task \
     --desired-count 1 \
     --launch-type FARGATE \
     --network-configuration "awsvpcConfiguration={subnets=[subnet-12345],securityGroups=[sg-12345],assignPublicIp=ENABLED}"
   ```

### Option 3: AWS EC2 with Docker

Deploy on EC2 instances using Docker.

#### Steps:

1. **Launch EC2 Instance**:
   - Choose Amazon Linux 2 AMI
   - Select t3.micro (free tier eligible)
   - Configure security group to allow HTTP (80) and SSH (22)

2. **Connect to EC2 and Install Docker**:
   ```bash
   sudo yum update -y
   sudo yum install -y docker
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -a -G docker ec2-user
   ```

3. **Install Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

4. **Clone Repository and Deploy**:
   ```bash
   git clone https://github.com/abhishekv1808/krushiyuga-web-2.0.git
   cd krushiyuga-web-2.0
   
   # Create .env file with your environment variables
   nano .env
   
   # Run with Docker Compose
   docker-compose up -d
   ```

### Option 4: AWS App Runner (Serverless)

App Runner automatically builds and deploys from your GitHub repository.

#### Steps:

1. **Go to AWS App Runner Console**
2. **Create Service**:
   - Source: Source code repository
   - Connect to GitHub: `abhishekv1808/krushiyuga-web-2.0`
   - Deployment trigger: Automatic
   - Build command: `npm run aws:build`
   - Start command: `npm run aws:start`

3. **Configure Environment Variables** in the App Runner console

## Environment Variables Setup

For all deployment options, you'll need to configure these environment variables:

### Required Variables:
- `NODE_ENV=production`
- `PORT=3000` (or 8080 for Elastic Beanstalk)
- `MONGODB_URI=your-mongodb-connection-string`
- `EMAIL_HOST=smtp.gmail.com`
- `EMAIL_PORT=587`
- `EMAIL_USER=your-email@gmail.com`
- `EMAIL_PASS=your-app-specific-password`

### Optional Variables:
- `CLOUDINARY_CLOUD_NAME=your-cloudinary-name`
- `CLOUDINARY_API_KEY=your-api-key`
- `CLOUDINARY_API_SECRET=your-api-secret`

## Security Considerations

1. **Use AWS Secrets Manager** for sensitive data like database credentials
2. **Enable HTTPS** using AWS Certificate Manager
3. **Set up WAF** (Web Application Firewall) for additional security
4. **Use IAM roles** instead of access keys where possible
5. **Enable CloudWatch logs** for monitoring

## Domain Setup

1. **Purchase domain** via Route 53 or external registrar
2. **Create hosted zone** in Route 53
3. **Add CNAME/A records** pointing to your AWS deployment
4. **Enable SSL certificate** through AWS Certificate Manager

## Monitoring and Scaling

1. **CloudWatch**: Set up alarms for CPU, memory, and error rates
2. **Auto Scaling**: Configure scaling policies for ECS or EC2
3. **Load Balancer**: Use Application Load Balancer for high availability

## Cost Optimization

1. **Free Tier**: Use t3.micro instances and free tier services
2. **Reserved Instances**: For predictable workloads
3. **Spot Instances**: For development environments
4. **CloudWatch billing alerts**: Monitor costs

## Troubleshooting

### Common Issues:

1. **Port Issues**: Ensure your app listens on the correct port (`process.env.PORT`)
2. **Environment Variables**: Double-check all required env vars are set
3. **Database Connection**: Ensure MongoDB allows connections from AWS IPs
4. **Health Checks**: Verify `/health` endpoint returns 200 status

### Logs:
- **Elastic Beanstalk**: `eb logs`
- **ECS**: CloudWatch Logs
- **EC2**: `docker logs container_name`

## Support

For issues or questions:
1. Check AWS documentation
2. Review CloudWatch logs
3. Test locally with Docker first
4. Use AWS support forums

---

**Next Steps After Deployment:**
1. Set up monitoring and alerts
2. Configure backups
3. Set up CI/CD pipeline
4. Implement caching (Redis/ElastiCache)
5. Set up CDN (CloudFront) for static assets
