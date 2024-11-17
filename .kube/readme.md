basic auth
```
htpasswd -nbB admin youtube8866
kubectl create secret generic nginx-basic-auth-secret --from-literal=auth='admin:$2y$05$2r2WdDk0YPs7DhGbN6kSueUpIxCQb2aLD1QlnbGsxmRx0AJ5CBZD6'
```