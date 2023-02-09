from flask import Blueprint, jsonify, make_response, request, abort
from app import db
import requests
import os
from app.models.category import Category
from app.models.package import Package
from app.models.vote import Votes

category_bp = Blueprint("category", __name__, url_prefix="/categories")
package_bp = Blueprint("package", __name__, url_prefix="/packages")
votes_bp = Blueprint("vote", __name__, url_prefix="/votes")

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
    categories = Category.query.all()

    category_response = [category.create_response_dict() for category in categories]
    
    return jsonify(category_response), 200

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

    packages_of_category = []

    for package in category.packages:
            packages_of_category.append(
                {
                    "id": package.package_id,
                    "title": package.title,
                    "description": package.description,
                    "votes":package.votes
                }
            )
    return make_response(jsonify(packages_of_category)),200 

@package_bp.route("", methods=["GET"])
def get_all_packages():
    package_response = []
    packages = Package.query.all()
    for package in packages:
        package_response.append({
            "id": package.package_id,
            "title" : package.title,
            "description" : package.description,
            "votes" : package.votes
    })
    return jsonify(package_response)

@package_bp.route("/leaderboard", methods=["GET"])
def get_leaderboard_data():
    response = []
    top_query = """
    WITH top_packages AS (
        SELECT c.title as category_title
    	, p.title as package_name
    	, p.votes
        , ROW_NUMBER() OVER(PARTITION BY c.id ORDER BY p.votes DESC) AS rank
        FROM category c 
	    JOIN package p 
	    ON c.id = p.category_id
        )
    SELECT *
    FROM top_packages
    WHERE rank = 1
    ORDER BY votes DESC;
    """
    result = db.session.execute(top_query)
    for r in result:
        response.append({
            "category_title": r.category_title,
            "package_name" : r.package_name,
            "votes" : r.votes,
    })

    
    return jsonify(response)
    # sorted_by_votes = Package.query.order_by(Package.votes.desc())
    
    # vote_query = request.args.get("votes")
    # sort_type = request.args.get("sort")    

    # if title_query is not None:
    #     tasks = Task.query.filter_by(title=title_query)
    # elif sort_type == "asc":
    #     tasks = Task.query.order_by(Task.title.asc())
    # elif sort_type == "desc":
    #     tasks = Task.query.order_by(Task.title.desc())
    # else:
    #     tasks = Task.query.all()

    # sorted = [v.create_response_dict() for v in sorted_by_votes]


    # To retrieve all rows:
#     result = db.session.query(Category, Package).filter(Category.id == Package.category_id).all()

# # To retrieve individual columns:
#     result = db.session.query(Category.id, Package.id).filter(Category.id == Package.category_id).all()


#     return jsonify(sorted), 200

@package_bp.route("/<package_id>", methods=["GET"])
def get_one_package(package_id):
  
    package = find_by_id(Package, package_id)
    
    return jsonify(package.create_response_dict()), 200

@package_bp.route("", methods=["POST"])
def create_package():
    request_body = request.get_json()

    try:
        new_package = Package.add_to_database(request_body)
        
        db.session.add(new_package)
        db.session.commit()

        return make_response(jsonify(new_package.create_response_dict())), 201

    except:
        if not (request_body.get("title")):
            abort(make_response({"details": "Invalid data"}, 400))

@package_bp.route("/<package_id>", methods=["PATCH"])
def add_votes(package_id):
    package = find_by_id(Package, package_id)

    package.votes += 1

    db.session.commit()

    return make_response(jsonify({"id":package.package_id,"votes": package.votes})),200 

@votes_bp.route("", methods=["GET"])
def get_all_votes():
    votes = Votes.query.all()

    vote_response = [vote.create_response_dict() for vote in votes]
    
    return jsonify(vote_response), 200

@votes_bp.route("", methods=["POST"])
def create_votes():
    request_body = request.get_json()

    try:
        new_vote = Votes.add_to_database(request_body)
        
        db.session.add(new_vote)
        db.session.commit()

        return make_response(jsonify(new_vote.create_response_dict())), 201

    except:
        if not (request_body.get("votes")):
            abort(make_response({"details": "Invalid data"}, 400))

@votes_bp.route("/<vote_id>", methods=["PATCH"])
def add_votes(package_id):
    votes = find_by_id(Votes, package_id)

    votes.votes += 1

    db.session.commit()

    return make_response(jsonify({"id":votes.id,"votes": votes.votes})),200 
