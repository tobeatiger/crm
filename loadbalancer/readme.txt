1.install load balancer:
npm install -g loadbalancer

2.start crm servers:
make copies of crm project source to different folders
    - e.g.,if you want to totally start 2 servers,make 2 copies
edit the www file to change the port number for the new copies
    - e.g.,the new copy source, change port to 3001

3.start servers (3000 and 3001)

4.start load balancer server
    4.1 startLoadBalancer.bat - for random routing of requests
    4.2 startLoadBalancer_stick.bat - for fix routing based on IP address

5.try http://localhost/ip

6.command to stop load balancer server:
    loadbalancer stop