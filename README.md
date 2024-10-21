# Automated CI/CD Pipeline for a Web Application

# OBJECTIVE
Set up a fully automated Continuous Integration and Continuous Deployment (CI/CD) pipeline to test, build, and deploy a Node.js web application to a container orchestration platform.

# Key Tools
* **Web Application:** Node.js
* **Version Control:** Git, GitHub
* **CI/CD:** Jenkins or GitHub Actions
* **Containerization:** Docker
* **Orchestration:** Kubernetes (Minikube)
* **Cloud:** Local Environment

# Docker Commands
```
docker build -t siddarthan5/capstone-node-project .
docker images
docker run -d -p 3000:3000 siddarthan5/capstone-node-project
docker ps
docker rm -f <container-id>
docker push siddarthan5/capstone-node-project:latest
```
# Kubernetes (Minikube) Commands
```
minikube start
docker context use default
minikube status
minikube dashboard
kubectl apply -f deployment.yml
kubectl apply -f service.yml
kubectl get pods
kubectl get deployments
kubectl get pods
minikube service <service-name>
```
# Connect to a Kubernetes Cluster and execute kubectl commands in Jenkins Pipeline
```
kubectl create sa jenkins
kubectl create clusterrolebinding jenkins --clusterrole=cluster-admin --serviceaccount=default:jenkins
kubectl create token jenkins
kubectl config view
kubectl port-forward svc/node-service 5000:5000
```
