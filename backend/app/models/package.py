from app import db

class Package(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.string)
    votes = db.Column(db.Integer, default=0)
    category = db.relationship("Package", back_populates="package")
    category_id = db.Column(db.Integer, db.ForeignKey('Category.id'), nullable=True)
    
    def create_response_dict (self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "votes":self.votes
            }
    @classmethod
    def add_to_database(cls, req_body):
        return cls(
            title=req_body["title"],
            description=req_body['description']
            votes = req_body["votes"]
        )
