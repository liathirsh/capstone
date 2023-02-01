# Something to read your CSV file into memmory
import pandas as pd
from dotenv import dotenv_values
from sqlalchemy import create_engine

config = dotenv_values()

packages_csv = pd.read_csv("data/packages.csv")
db_uri = config.get("SQLALCHEMY_DATABASE_URI")


with create_engine(db_uri).connect() as conn:
    conn.execute("DELETE FROM PACKAGE;")
    packages_csv.to_sql("package", con = conn, if_exists = "append", index=False)
    # df = pd.read_sql_table("category", conn)
    


