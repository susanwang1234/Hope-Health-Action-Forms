FROM mysql

EXPOSE 3306

COPY ./rehab_report.sql /docker-entrypoint-initdb.d/

COPY ./test_dummy.sql /docker-entrypoint-initdb.d/

COPY ./user.sql /docker-entrypoint-initdb.d/
COPY ./role.sql /docker-entrypoint-initdb.d/
COPY ./department.sql /docker-entrypoint-initdb.d/
