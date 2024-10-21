pipeline {
    agent any

    tools { 
        nodejs 'node'
    }

    // Define variables for Git branch and repository URL
    environment {
        BRANCH_NAME = "main" // Default branch name
        REPO_URL = "https://github.com/ShafeeqAhamedS/guvi-capstone.git" // Default repository URL
        DOCKERHUB_CREDENTIALS = credentials('shafeeq2804-dockerhub')
        DOCKER_IMAGE = "shafeeq2804/capstone-node-project"
        DOCKER_TAG = "latest"
        DEPLOYMENT_NAME = "capstone-node-deployment" // Deployment name
        SERVICE_NAME = "node-service"
        NAMESPACE = "default" // Kubernetes namespace
        KUBE_CONTEXT = "minikube" // Kubernetes context
        KUBE_SERVER_URL = "https://127.0.0.1:51133" // Minikube server URL
        NODE_PORT = 5000 // Node application port
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the specified branch of the repository
                checkout scmGit(branches: [[name: "*/${BRANCH_NAME}"]], extensions: [], userRemoteConfigs: [[url: REPO_URL]])
            }
        }
        stage('Build App') {
            steps {
                // Install Node.js dependencies
                bat 'npm install'
            }
        }
        stage('Code Quality') {
            steps {
                // Run linter to check code quality
                bat 'npm run lint'
            }
        }
        stage('Testing') {
            steps {
                // Run unit tests
                bat 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        // Build the Docker image
                        bat """
                            docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        """
                    } catch (Exception e) {
                        echo "Docker image build failed: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error("Stopping pipeline due to Docker build failure.")
                    }
                }
            }
        }
        stage('Push Docker Image to DockerHub') {
            steps {
                script {
                    // Log in to DockerHub
                    bat """
                        docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}
                    """
                    // Push the Docker image to DockerHub
                    bat """
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }
        stage('Deploy to Minikube') {
            steps {
                withKubeConfig(caCertificate: '', clusterName: 'minikube', contextName: KUBE_CONTEXT, credentialsId: 'minikube-jenkins-secret', namespace: NAMESPACE, restrictKubeConfigAccess: false, serverUrl: KUBE_SERVER_URL) {
                    script {
                        try {
                            // Apply deployment and service configurations
                            bat 'kubectl apply -f deployment.yml'
                            bat 'kubectl apply -f service.yml'
                            
                            // Wait for the deployment to be ready
                            bat "kubectl rollout status deployment/${DEPLOYMENT_NAME}"

                            // Update the deployment image
                            bat "kubectl set image deployments/${DEPLOYMENT_NAME} capstone-nodeserver=${DOCKER_IMAGE}"

                            // Display pods and service details
                            echo "Pods status: ${bat(script: 'kubectl get pods --no-headers', returnStdout: true).trim()}"
                            echo "Service details: ${bat(script: 'kubectl get svc --no-headers', returnStdout: true).trim()}"

                            // Verify that the service is running
                            bat "kubectl describe services/${SERVICE_NAME}"

                            // Check the rollout status
                            bat "kubectl rollout status deployments/${DEPLOYMENT_NAME}"

                            // Current image version
                            bat 'kubectl describe pods'
                        } catch (Exception e) {
                            echo "Deployment failed: ${e.message}"
                            currentBuild.result = 'FAILURE'
                            
                            // Rollback to the previous version on failure
                            echo "Rolling back deployment..."
                            bat "kubectl rollout undo deployments/${DEPLOYMENT_NAME}"
                            error("Stopping pipeline due to deployment failure.")
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
            bat 'docker logout'
        }
        success {
            echo 'All stages completed successfully: Docker image pushed to DockerHub and deployed to Minikube!'
            echo "Visit http://localhost:${NODE_PORT}"
        }
        failure {
            echo 'One or more stages failed.'
            withKubeConfig(caCertificate: '', clusterName: 'minikube', contextName: KUBE_CONTEXT, credentialsId: 'minikube-jenkins-secret', namespace: NAMESPACE, restrictKubeConfigAccess: false, serverUrl: KUBE_SERVER_URL) {
                script {
                    echo "Rolling back deployment..."
                    bat "kubectl rollout undo deployments/${DEPLOYMENT_NAME}"
                }
            }
            echo "Visit http://localhost:${NODE_PORT}"
        }
    }
}
