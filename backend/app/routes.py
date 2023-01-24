from flask import Blueprint, jsonify, make_response, request, abort
from app import db
import requests
import os
from app.models.category import Category
from app.models.package import Package

category_bp = Blueprint("category", __name__, url_prefix="/category")
package_bp = Blueprint("package", __name__, url_prefix="/package")
vote_bp = Blueprint("vote", __name__, url_prefix="/vote")

def find_by_id(cls, id):
    try:
        id = int(id)
    except:
        abort(make_response({"details": f"{cls.__name__} {id} invalid"}, 400))

    query_result = cls.query.get(id)
        
    if query_result is None:
        abort(make_response({"message": f"{cls.__name__} {id} not found."}, 404))

    return query_result


@category_bp.route("", methods=["GET"])
def get_all_categories():
    category = Category.query.all()

    category_list = [c.create_response_dict() for c in category]
    
    return jsonify(category_list)

@category_bp.route("/<id>", methods=["GET"])
def get_one_category(id):
    category = find_by_id(Category, id)
    
    return jsonify(category.create_response_dict()), 200

@category_bp.route("", methods = ["POST"])
def create_category():
    request_body = request.get_json()

    try:
        new_category = Category.add_to_database(request_body)
        
        db.session.add(new_category)
        db.session.commit()

        return make_response(jsonify(new_category.create_response_dict())), 201

    except:
        if not (request_body.get("title")):
            abort(make_response({"details": "Invalid data"}, 400))

@category_bp.route("/<id>", methods=["PUT"])
def update_category(id):
    category = find_by_id(Category, id)
    
    request_body = request.get_json()

    category.title = request_body["title"]
    category.description = request_body["description"]

    db.session.commit()

    return make_response(jsonify(category.create_response_dict())), 200

@category_bp.route("/<id>", methods=["DELETE"])
def delete_category(id):
    category = find_by_id(Category, id)

    db.session.delete(category)

    db.session.commit()

    return make_response({'{Category.title} successfully deleted'})


# @package_bp.route("", methods=["GET"])
# def get_on

