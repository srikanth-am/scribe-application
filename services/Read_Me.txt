1.Install Anaconda in the system
2.in the anaconda navigator, give pip install Flask-SQLAlchemy
3.in the anaconda navigator, give pip install Flask-Migrate

For checking the tables in the command line.
1.open anaconda prompt,navigate to data.sqlite and give sqlite3 data.sqlite command
2.Then give .tables to check the table names.

flask migrate commands
-----------------------
flask db init ##for the first time only-creates folders
flask db migrate -m "message"
flask db upgrade

Running the file
-----------------
1.python BasicModel.py
2.open the link http://127.0.0.1:5000/disabled/vsrraviteja@gmail.com

List of api
1. Request type: POST
  URL: localhost:5000/disabledRegister
  sample data : 			{"password":"test","name":"arun","email":"arunkumar629@gmail.com","mobile":8056018286}

2. request type : POST
  URL: localhost:5000/volunteerRegister
  sample data: {"password":"test","name":"arun","email":"arunkumar629@gmail.com","mobile":8056018286,"gender":"male","city_town_village":"chennnai","state":"tamilnadu","pincode":600103,"language_1":"tamil","language_2":"english","language_3":"none","highest_degree":"MCA"} 	

3. request type - post
 URL localhost:5000/saveExam
sample data: 
    {
        "exam_name": "tamil",
        "exam_date": "31-12-2021",
        "exam_start_time": "10:00",
        "exam_end_time": "12:00",
        "exam_centre_addr": "guindy high school",
        "exam_city": "chennai",
        "exam_area_pincode": 600042,
        "skills_preference":"abc",
        "gender_preference":"male",
        "language_preference":"tamil",
        "disabled_id":2,
       "volunteer_id":1

    }


Swagger Integration for API Documentation/Testing
----------------------------------------------------
1. Whenever you create new API, add Scheema, and register API to docs
2. Swagger URL: http://127.0.0.1:5000/swagger-ui/
3. Click any API and Try Out