# Something to read your CSV file into memmory
import pandas as pd
from dotenv import dotenv_values
from sqlalchemy import create_engine

config = dotenv_values()

db_uri = config.get("SQLALCHEMY_DATABASE_URI")
packages_csv = pd.read_csv("data/packages.csv")
categories_csv=pd.read_csv("data/Categories.csv")





with create_engine(db_uri).connect() as conn:
    conn.execute("DELETE FROM CATEGORY;")
    conn.execute("DELETE FROM PACKAGE;")
    categories_csv.to_sql("category", con = conn, if_exists = "append", index=False)
    packages_csv.to_sql("package", con = conn, if_exists = "append", index=False)
    # df = pd.read_sql_table("category", conn)
    


