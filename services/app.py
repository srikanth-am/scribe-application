import flask
from flask import request, jsonify
import sqlite3

app = flask.Flask(__name__)
app.config["DEBUG"] = True

users = [{
    'id':100001,
    'firstName':'Mark',
    'lastName':'Dell',
    'email':'mark@dell.com',
    'gender':'male',
    'city':'New York',
    'knownLanguage':['english', 'hindi', 'tamil', 'marathi'],
    'degree':'M.A. English',
    'pincode':'123423'

},
{
    'id':100002,
    'firstName':'Mark',
    'lastName':'Dell',
    'email':'mark@dell.com',
    'gender':'male',
    'city':'New York',
    'knownLanguage':['english', 'hindi', 'tamil', 'marathi'],
    'degree':'M.A. English',
    'pincode':'123423'}]


@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"


@app.route('/api/users/all', methods=['GET'])
def getUsers():
    return jsonify(users)

#http://127.0.0.1:5000/api/user?id=100001
@app.route('/api/users', methods = ['GET'])
def getUserById():
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: missing id field"
    
    result = []
    for user in users:
        if user['id'] == id:
            result.append(user)

    return jsonify(result) 


#some database sample for api using sqllite3

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


@app.route('/api/books/all', methods=['GET'])
def api_all():
    conn = sqlite3.connect('books.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_books = cur.execute('SELECT * FROM books;').fetchall()

    return jsonify(all_books)

#http://127.0.0.1:5000/api/books?published=2011
@app.route('/api/books', methods=['GET'])
def api_filter():
    query_parameters = request.args

    id = query_parameters.get('id')
    published = query_parameters.get('published')
    author = query_parameters.get('author')

    query = "SELECT * FROM books WHERE"
    to_filter = []

    if id:
        query += ' id=? AND'
        to_filter.append(id)
    if published:
        query += ' published=? AND'
        to_filter.append(published)
    if author:
        query += ' author=? AND'
        to_filter.append(author)
    if not (id or published or author):
        return page_not_found(404)

    query = query[:-4] + ';'

    conn = sqlite3.connect('books.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()

    results = cur.execute(query, to_filter).fetchall()

    return jsonify(results)



app.run()