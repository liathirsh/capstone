from flask import Blueprint, jsonify, make_response, request, abort
from app import db
import requests
import os
from app.models.category import Category
from app.models.package import Package

category_bp = Blueprint("category", __name__, url_prefix="/categories")
package_bp = Blueprint("package", __name__, url_prefix="/packages")
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

@category_bp.route("/<id>/packages", methods=["GET"])
def gets_packages_of_one_category(id):

    category = find_by_id(Category, id)
    packages_of_category =[]  
    
    for package in category.package:
        packages_of_category.append(
            {
                "id": package.id,
                "title" : package.title,
                "description" : package.description,
                "votes" : package.votes
            })
    return make_response(jsonify({"id":package.id,"title":package.title,"packages":packages_of_category})),200 

@package_bp.route("", methods=["GET"])
def get_all_packages():
    package_response = []
    packages = Package.query.all()
    for package in packages:
        package_response.append({
            "id": package.id,
            "title" : package.title,
            "description" : package.description,
            "votes" : package.votes
    })
    return jsonify(package_response)

@package_bp.route("/<package_id>/packages", methods=["GET"])
def get_one_package(id):

    category = find_by_id(Category, id)
    packages_of_category =[]  
    
    for package in category.package:
        packages_of_category.append(
            {
                "id": package.id,
                "title" : package.title,
                "description" : package.description,
                "votes" : package.votes
            })
    return make_response(jsonify({"id":package.id,"title":package.title,"packages":packages_of_category})),200 

@package_bp.route("", methods = ["POST"])
def create_package():

    request_body = request.get_json()

    try:
        new_package = Package.add_to_database(request_body)

        db.session.add(new_package)
        db.session.commit()

        return make_response(jsonify(new_package.to_dict())), 201

    except:
        if not (request_body.get("title")):
            abort(make_response({"details": "Invalid data"}, 400))


@package_bp.route("/<package_id>", methods=["PATCH"])
def add_votes(package_id):
    package = find_by_id(Package, package_bp)

    package.votes += 1

    db.session.commit()

    return make_response(jsonify({"id":package.package_id,"likes": package.likes})),200 

