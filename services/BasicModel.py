from flask_cors import CORS
from werkzeug.security import safe_str_cmp
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api,Resource,request, fields, marshal_with
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt import JWT ,jwt_required
from flask_apispec.views import MethodResource
from marshmallow import Schema, fields
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from flask_apispec.extension import FlaskApiSpec
from flask_apispec import marshal_with, doc, use_kwargs

database_dir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'mykeyishere'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(database_dir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
api = Api(app)
migrate = Migrate(app,db)

# Implementing JWT 
def authenticate(email, password):
	if bool(Disabled.query.filter_by(email = email).first()):
		user = Disabled.query.filter_by(email = email).first()
		if user and safe_str_cmp(user.password, password):
			return user
	else:
		user = Volunteer.query.filter_by(email = email).first()
		if user and safe_str_cmp(user.password, password):
			return user
# identity function here
def identity(payload):
	user_id = payload['identity']
	if bool(Disabled.query.filter_by(id = user_id) ):
		return Disabled.query.filter_by(id = user_id) 
	else:
		Volunteer.query.filter_by(id = user_id) 

jwt = JWT(app, authenticate, identity)

# Creating a disabled persons table
class Disabled(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	
	name = db.Column(db.Text)
	email = db.Column(db.String(64),unique=True,index=True,nullable=False)
	mobile = db.Column(db.Integer)
	password = db.Column(db.String(128))
	#exams = db.relationship('Exam',backref='Disabled',lazy='dynamic')
	password = db.Column(db.String(128))
	#exams = db.relationship('Exam',backref='Disabled',lazy='dynamic')
	ratings = db.relationship('Volunteer_Rating',backref='Disabled',lazy='dynamic')
	def __init__(self,name,email,mobile,password):
		self.name =  name
		self.email = email
		self.mobile = mobile
		self.password = password
	def check_password(self,password):
		return check_password_hash(self.password,password)
	def json(self):
		return {"id":self.id,"name":self.name,"email":self.email,"mobile":self.mobile}
	def __repr__(self):
		return f"Person who needs Scribe: {self.name}    "

# Creating Volunteer table
class Volunteer(db.Model):
	id = db.Column(db.Integer,primary_key=True)

	name = db.Column(db.Text)
	email = db.Column(db.String(64),unique=True,index=True,nullable=False)
	mobile = db.Column(db.Integer)
	password = db.Column(db.String(128))
	gender = db.Column(db.String(20))
	city_town_village = db.Column(db.String(128))
	state = db.Column(db.String(64))
	pincode = db.Column(db.Integer)
	language_1 = db.Column(db.String(64))
	language_2 = db.Column(db.String(64))
	language_3 = db.Column(db.String(64))
	highest_degree = db.Column(db.String(64))
	vol_status = db.Column(db.String(64),default = "Y")
	#examss = db.relationship('Exam',backref='Volunteer',lazy='dynamic')
	ratings = db.relationship('Volunteer_Rating',backref='Volunteer',lazy='dynamic')
	def __init__(self,name,email,mobile,password,gender,city_town_village,state,pincode,language_1,language_2,language_3,highest_degree):
		self.name=name
		self.email = email
		self.mobile = mobile
		self.password = password
		self.gender = gender
		self.city_town_village = city_town_village
		self.state = state
		self.pincode = pincode
		self.language_1 = language_1
		self.language_2 = language_2
		self.language_3 = language_3
		self.highest_degree = highest_degree
	def check_password(self,password):
		return check_password_hash(self.password,password)
	def json(self):
		return {"name":self.name,"email":self.email,"mobile":self.mobile}
	def __repr__(self):
		return f"Volunteer: {self.name}    "

# Creating application master table
class Exam(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	exam_name = db.Column(db.Text)
	exam_date = db.Column(db.String(64))
	exam_start_time = db.Column(db.String(64))
	exam_end_time = db.Column(db.String(64))
	exam_centre_addr = db.Column(db.Text)
	exam_city = db.Column(db.String(64))
	exam_area_pincode = db.Column(db.Integer)
	skills_preference = db.Column(db.Text)
	gender_preference = db.Column(db.String(20))
	language_preference = db.Column(db.String(128))
	exam_request_status = db.Column(db.String(64),default='open')
	#disabled_id = db.Column(db.Integer,db.ForeignKey('disabled.id'))
	#volunteer_id = db.Column(db.Integer,db.ForeignKey('volunteer.id'))
	disabled_id = db.Column(db.String(255)) #db.Column(db.Integer,db.ForeignKey('disabled.id'))
	volunteer_id = db.Column(db.String(255)) #db.Column(db.Integer,db.ForeignKey('volunteer.id'))
	#status =  db.Column(db.String(10))
	def __init__(self,exam_name,exam_date,exam_start_time,exam_end_time,exam_centre_addr,exam_city,exam_area_pincode,skills_preference,gender_preference,language_preference,disabled_id,volunteer_id):
		self.exam_name = exam_name	
		self.exam_date = exam_date
		self.exam_start_time = exam_start_time
		self.exam_end_time = exam_end_time
		self.exam_centre_addr = exam_centre_addr
		self.exam_city = exam_city
		self.exam_area_pincode = exam_area_pincode
		self.skills_preference = skills_preference
		self.gender_preference = gender_preference
		self.language_preference = language_preference
		self.disabled_id = disabled_id
		self.volunteer_id = volunteer_id
		#self.status = "Active"
	def json(self):
		return {"disabled_id":self.disabled_id,"name":(Disabled.query.get(self.disabled_id)).name,"exam_name":self.exam_name,"exam_date":self.exam_date,"exam_start_time":self.exam_start_time,"exam_end_time":self.exam_end_time,"exam_centre_addr":self.exam_centre_addr,"exam_city":self.exam_city,"exam_area_pincode":self.exam_area_pincode,"exam_request_status":self.exam_request_status}
	def __repr__(self):
		return f"Application ID: {self.id} ------ Disabled person ID: {self.disabled_id} ---- Volunteer ID: {self.volunteer_id}"

##-----------Request/Response Scheema's for swagger
class VounteerRequestSchema(Schema):
    #api_type = fields.String(required=True, description="API type of be my scribe API")
	
	password=  fields.String(required=True, description="API type of be my scribe API")
	name =  fields.String(required=True, description="API type of be my scribe API")
	email = fields.String(required=True, description="API type of be my scribe API")
	mobile = fields.Integer(required=True, description="API type of be my scribe API")
	gender=fields.String(required=True, description="API type of be my scribe API")
	city_town_village=fields.String(required=True, description="API type of be my scribe API")
	state=fields.String(required=True, description="API type of be my scribe API")
	pincode=fields.Integer(required=True, description="API type of be my scribe API")
	language_1=fields.String(required=True, description="API type of be my scribe API")
	language_2=fields.String(required=True, description="API type of be my scribe API")
	language_3=fields.String(required=True, description="API type of be my scribe API")
	highest_degree=fields.String(required=True, description="API type of be my scribe API")

class ExamRequestSchema(Schema):
	exam_name = fields.String(required=True, description="API type of be my scribe API")
	exam_date = fields.String(required=True, description="API type of be my scribe API")
	exam_start_time = fields.String(required=True, description="API type of be my scribe API")
	exam_end_time = fields.String(required=True, description="API type of be my scribe API")
	exam_centre_addr = fields.String(required=True, description="API type of be my scribe API")
	exam_city = fields.String(required=True, description="API type of be my scribe API")
	exam_area_pincode = fields.String(required=True, description="API type of be my scribe API")
	skills_preference = fields.String(required=True, description="API type of be my scribe API")
	gender_preference = fields.String(required=True, description="API type of be my scribe API")
	language_preference = fields.String(required=True, description="API type of be my scribe API")
	disabled_id = fields.String(required=True, description="API type of be my scribe API")
	volunteer_id = fields.String(required=True, description="API type of be my scribe API")

class VolunteerResponseSchema(Schema):
	password=  fields.Str(default='Success')
	name =  fields.Str(default='Success')
	email = fields.Str(default='Success')
	mobile = fields.Str(default='Success')
	gender=fields.Str(default='Success')
	city_town_village=fields.Str(default='Success')
	state=fields.Str(default='Success')
	pincode=fields.Str(default='Success')
	language_1=fields.Str(default='Success')
	language_2=fields.Str(default='Success')
	language_3=fields.Str(default='Success')
	highest_degree=fields.Str(default='Success')

class DisableResponseSchema(Schema):
	id = fields.Str(default='Success')
	name = fields.Str(default='Success')
	email = fields.Str(default='Success')
	mobile = fields.Str(default='Success')
	exams = fields.Str(default='Success')
	ratings = fields.Str(default='Success')

class ExamResponseSchema(Schema):
	exam_name = fields.Str(default='Success')
	exam_date = fields.Str(default='Success')
	exam_start_time = fields.Str(default='Success')
	exam_end_time = fields.Str(default='Success')
	exam_centre_addr = fields.Str(default='Success')
	exam_city = fields.Str(default='Success')
	exam_area_pincode = fields.Str(default='Success')
	skills_preference = fields.Str(default='Success')
	gender_preference = fields.Str(default='Success')
	language_preference = fields.Str(default='Success')
	disabled_id = fields.Str(default='Success')
	volunteer_id = fields.Str(default='Success')
	
app.config.update({
    'APISPEC_SPEC': APISpec(
        title='Be My Scribe',
        version='v1',
        plugins=[MarshmallowPlugin()],
        openapi_version='2.0.0'
    ),
    'APISPEC_SWAGGER_URL': '/swagger/',  # URI to access API Doc JSON 
    'APISPEC_SWAGGER_UI_URL': '/swagger-ui/'  # URI to access UI of API Doc
})


# Creating Rating table
class Volunteer_Rating(db.Model):
	id = db.Column(db.Integer,primary_key=True)

	disabled_id = db.Column(db.Integer,db.ForeignKey('disabled.id'))
	volunteer_id = db.Column(db.Integer,db.ForeignKey('volunteer.id'))
	timely_response = db.Column(db.Integer)
	behaviour = db.Column(db.Integer)
	feedback = db.Column(db.Text)
	def __init__(self,disabled_id,volunteer_id,timely_response,behaviour,feedback):
		self.disabled_id = disabled_id
		self.volunteer_id = volunteer_id
		self.timely_response = timely_response
		self.behaviour = behaviour
		self.feedback = feedback
	def json(self):
		pass
	def __repr__(self):
		return f"Feedback ID: {self.id} ------ Disabled person ID: {self.disabled_id} ---- Volunteer ID: {self.volunteer_id}"


#disabledregister
class DisabledRegister(Resource):
	def post(self):
		data = request.get_json()
		name = data["name"]
		email = data["email"]
		mobile = data["mobile"]
		password=data["password"]
		disabled_user = Disabled(password=password,name=name,email=email,mobile=mobile)
		db.session.add(disabled_user)
		db.session.commit()
		return disabled_user.json()

#volunteerregister
class VolunteerRegister(Resource):
	#@doc(description='Add new volunteer API.', tags=['Vounteer'])
	#@use_kwargs(VounteerRequestSchema, location=('json'))
	#@marshal_with(VolunteerResponseSchema)  # marshalling with marshmallow library
	def post(self):
		data = request.get_json()
		name = data["name"]
		email = data["email"]
		mobile = data["mobile"]
		gender=data["gender"]
		city_town_village=data["city_town_village"]
		state=data["state"]
		pincode=data["pincode"]
		language_1=data["language_1"]
		language_2=data["language_2"]
		language_3=data["language_3"]
		highest_degree=data["highest_degree"]
		password=data["password"]
#		vol_status=data["vol_status"]
		volunteer_user = Volunteer(password=password,name=name,email=email,mobile=mobile,gender=gender,city_town_village=city_town_village,state=state,pincode=pincode,language_1=language_1,language_2=language_2,language_3=language_3,highest_degree=highest_degree)
		db.session.add(volunteer_user)
		db.session.commit()
		return volunteer_user.json()

# Fetch user
class DisabledResource(MethodResource, Resource):
	@doc(description='Get disabled info API.', tags=['Disable'])
	@marshal_with(DisableResponseSchema)  # marshalling with marshmallow library
	def get(self,email):
		disabled_user = Disabled.query.filter_by(email=email).first()
		if disabled_user:
			return disabled_user.json(), 200
		else:
			return {'email':'not found'}, 404

#Create/Assign Exams
class ExamApi(Resource):
	#@doc(description='Add new exam API.', tags=['Exam'])
	#@use_kwargs(ExamRequestSchema, location=('json'))
	#@marshal_with(ExamResponseSchema)  # marshalling with marshmallow library
	def post(self):
		data = request.get_json()		
		exam_name = data["exam_name"]
		exam_date = data["exam_date"]
		exam_start_time = data["exam_start_time"]
		exam_end_time = data["exam_end_time"]
		exam_centre_addr = data["exam_centre_addr"]
		exam_city = data["exam_city"]
		exam_area_pincode = data["exam_area_pincode"]
		skills_preference = data["skills_preference"]
		gender_preference = data["gender_preference"]
		language_preference = data["language_preference"]
		disabled_id = data["disabled_id"]
		volunteer_id = data["volunteer_id"]

		exam = Exam(exam_name = exam_name,exam_date = exam_date,exam_start_time = exam_start_time,exam_end_time = exam_end_time,exam_centre_addr = exam_centre_addr,exam_city = exam_city,exam_area_pincode = exam_area_pincode,skills_preference = skills_preference,gender_preference = gender_preference,language_preference = language_preference,disabled_id = disabled_id,volunteer_id = volunteer_id)
		db.session.add(exam)
		db.session.commit()		
		return exam.json()


api.add_resource(DisabledResource,'/disabled/<string:email>')
api.add_resource(DisabledRegister,'/disabledRegister')
api.add_resource(VolunteerRegister,'/volunteerRegister')
api.add_resource(ExamApi,'/saveExam')

# Add newly created api to swagger docs
docs = FlaskApiSpec(app)
docs.register(DisabledResource)
#docs.register(VolunteerRegister)
#docs.register(ExamApi)


#exam dasboard get request
class ExamDashboard(Resource):
	@jwt_required()
	def get(self,email):
		if bool(Disabled.query.filter_by(email = email).first()):
			return "disabled"
		else:
			return"volunteer"


api.add_resource(ExamDashboard,'/examDashboard/<email>')

# Creating a Get request for exam dashboard for Disabled
class DisabledExamDashboard(Resource):
	@jwt_required()
	def get(self,email):
		disabled_user = Disabled.query.filter_by(email = email).first()
		id_of_disabled = disabled_user.id
		exams_list = Exam.query.filter_by(disabled_id=id_of_disabled).all()
		return [exam.json() for exam in exams_list]

# Creating a Get request for exam dashboard for Volunteer
class VolunteerExamDashboard(Resource):
	@jwt_required()
	def get(self,email):
		volunteer_user = Volunteer.query.filter_by(email = email).first()
		id_of_volunteer = volunteer_user.id
		exams_list = Exam.query.filter((Exam.volunteer_id == id_of_volunteer) & (Exam.exam_request_status == "open")).all()
		name_json = {}

		return [exam.json() for exam in exams_list]

api.add_resource(DisabledExamDashboard,'/disabledExamDashboard/<email>')
api.add_resource(VolunteerExamDashboard,'/volunteerExamDashboard/<string:email>')



app.run(port=5000,debug=True)