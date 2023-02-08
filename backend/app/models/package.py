from app import db

class Package(db.Model):
    package_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    votes = db.Column(db.Integer, default=0)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    category = db.relationship("Category", back_populates="packages")

    def create_response_dict (self):
        return {
            "package_id": self.package_id,
            "category_id": self.category_id,
            "title": self.title,
            "description": self.description,
            "votes":self.votes,
            }

    @classmethod
    def add_to_database(cls, req_body):
        return cls(
            title=req_body["title"],
            description=req_body['description'],
            votes = req_body["votes"],
            category_id = req_body['category_id']
        )
