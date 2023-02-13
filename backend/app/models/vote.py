
from app import db

class Votes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    votes=db.Column(db.Integer)
    package_name=db.Column(db.String)


    def create_response_dict (self):
        return {
            "id": self.id,
            "votes": self.votes,
            "package_name":self.package_name
            }
    
    @classmethod
    def add_to_database(cls, req_body):
        return cls(
           votes = req_body['votes'],
           package_name=req_body["package_name"]
        )