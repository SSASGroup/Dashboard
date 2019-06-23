部署流程
服务器后台环境配置
服务器系统环境
腾讯云 Ubuntu 16.04 LTS Server
Postgresql安装
sudo apt-get install python3-pip python3-dev libpq-dev postgresql postgresql-contrib
sudo apt-get install python-psycopg2
然后键入以下内容登录到交互式Postgres会话：

sudo -u postgres psql
然后创建数据库和用户（注意结尾的分号）

CREATE DATABASE myproject;
CREATE USER myprojectuser WITH PASSWORD 'password';
ALTER ROLE myprojectuser SET client_encoding TO 'utf8';
ALTER ROLE myprojectuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE myprojectuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE myproject TO myprojectuser;
退出SQL提示返回到postgres用户的shell会话：

\q
卸载python2安装python3
sudo apt-get install python3.5 # 安装python
sudo apt-get install python3-pip # 安装python 3-pip
sudo rm /usr/bin/python # 删除python 2.7版本
sudo ln -s /usr/bin/python3.5 /usr/bin/python  # 将python链接到最新3.5版的
pip3 install upgrade -- pip # 升级pip
Django安装
pip install django #安装django
uwsgi安装
pip install uwsgi
uwsgi -- version # 查看版本
nginx安装
sudo apt-get install nginx
服务器程序配置运行
部署连接原理
浏览器发起web请求<——>nginx接收请求<——>uwsgi处理请求<—–>django程序

获取源代码
通过Filezilla向服务器上传Django项目源代码

然后更改settings.py中的DATABASES:

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'myproject',
        'USER': 'myprojectuser',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '',
    }
}
然后执行：

python manage.py makemigrations
python manage.py migrate #生产数据表
python manage.py collectstatic #搜集静态文件
python manage.py runserver 0.0.0.0:8000 #测试程序能否正常运行
配置UWSGI：
# server.ini file
[uwsgi]
# Django-related settings
http = 0.0.0.0:8000
# socket = 127.0.0.1:8001
# the base directory (full path)
chdir           = /home/ubuntu/myproject/server
# Django s wsgi file
module          = server.wsgi
master          = true
processes       = 2

daemonize = /home/ubuntu/myproject/server/uwsgi.log
然后执行：

uwsgi --ini server.ini
此时应该已经可以通过服务器的公网IP加8000端口访问服务端了

配置Nginx：
执行以下命令创建并编辑项目的配置文件：

sudo vi /etc/nginx/sites-available/server.conf
并在其中输入：

# mysite_nginx.conf

# the upstream component nginx needs to connect to
upstream django {
    # server unix:///path/to/your/mysite/mysite.sock; # for a file socket
    server 127.0.0.1:8001; # for a web port socket (we'll use this first)
}

# configuration of the server
server {
    # the port your site will be served on
    listen      8000;
    # the domain name it will serve for
    server_name 129.28.40.31; # substitute your machine's IP address or FQDN
    charset     utf-8;

    # max upload size
    client_max_body_size 75M;   # adjust to taste

    # Django media
    location /media  {
        alias /home/ubuntu/myproject/server/media;  # your Django project's media files - amend as required
    }

    location /static {
        alias /home/ubuntu/myproject/server/static; # your Django project's static files - amend as required
    }

    # Finally, send all non-media requests to the Django server.
    location / {
        uwsgi_pass  django;
        include     /home/ubuntu/myproject/server/uwsgi_params; # the uwsgi_params file you installed
    }
}
此时把server.ini中的http行注释掉，并把sock行取消注释，然后重启uwsgi。

然后输入以下命令重启nginx：

nginx -s reload
至此完成了所有的部署流程。

补充：
众所周知，http协议很不安全，于是我就购买了域名并且申请了SSL证书，重新配置server.conf如下：

# mysite_nginx.conf

# the upstream component nginx needs to connect to
upstream django {
    # server unix:///path/to/your/mysite/mysite.sock; # for a file socket
    server 127.0.0.1:8001; # for a web port socket (we'll use this first)
}

# configuration of the server
server {
    # the port your site will be served on
    #listen      80;
    listen      443;
    ssl on;
    ssl_certificate /usr/local/nginx/conf/1_tiandiyijian.club_bundle.crt;
    ssl_certificate_key /usr/local/nginx/conf/2_tiandiyijian.club.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    # the domain name it will serve for
    #server_name 129.28.40.31; # substitute your machine's IP address or FQDN
    server_name tiandiyijian.club;
    charset     utf-8;

    # max upload size
    client_max_body_size 75M;   # adjust to taste

    # Django media
    location /media  {
        alias /home/ubuntu/myproject/server/media;  # your Django project's media files - amend as required
    }

    location /static {
        alias /home/ubuntu/myproject/server/static; # your Django project's static files - amend as required
    }

    # Finally, send all non-media requests to the Django server.
    location / {
        uwsgi_pass  django;
        include     /home/ubuntu/myproject/server/uwsgi_params; # the uwsgi_params file you installed
    }
}
然后重启Nginx就可以通过https访问服务端了。
