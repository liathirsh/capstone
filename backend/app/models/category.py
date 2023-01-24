from app import db

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String)
    description = db.Column(db.String)
    package = db.relationship("Package", back_populates = "package", lazy=True)

    def create_response_dict (self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description
            }
    @classmethod
    def add_to_database(cls, req_body):
        return cls(
            title=req_body["title"],
            description=req_body['description']
        )
    
    
    
