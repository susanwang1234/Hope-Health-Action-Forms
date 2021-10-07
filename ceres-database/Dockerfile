FROM mysql

EXPOSE 3306

COPY ./rehab_report.sql /docker-entrypoint-initdb.d/

COPY ./test_dummy.sql /docker-entrypoint-initdb.d/

