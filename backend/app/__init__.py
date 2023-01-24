from flask import Flask, Blueprint, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from dotenv import load_dotenv
from flask_cors import CORS

db = SQLAlchemy
migrate = Migrate()
load_dotenv()

def create_app(test_config=None):
    app = Flask(__name__)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
            "SQLALCHEMY_DATABASE_URI")

    
    from app.models.category import Category
    from app.models.package import Package

    db.init_app(app)
    migrate.init_app(app,db)

    from .routes import category_bp
    app.register_blueprint(category_bp)

    from .routes import package_bp
    app.register_blueprint(package_bp)

    from .routes import vote_bp
    app.register_blueprint(vote_bp)

    CORS(app)
    return app

