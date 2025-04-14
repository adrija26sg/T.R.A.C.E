# Model for logging file uploads and conversions

from ..utils.db import db
from datetime import datetime

class FileLog(db.Model):
    __tablename__ = 'file_logs'
    id = db.Column(db.Integer, primary_key=True)
    original_path = db.Column(db.String, nullable=False)
    converted_path = db.Column(db.String, nullable=True)
    status = db.Column(db.String, nullable=False)  # success, error
    error_message = db.Column(db.String, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
