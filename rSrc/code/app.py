from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, current_user, UserMixin, login_required
from flask_principal import Principal, Permission, RoleNeed, identity_loaded
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
app.secret_key = '<your_secret_key>'

login_manager = LoginManager(app)
login_manager.login_view = 'login'

principal = Principal(app)

client = MongoClient('<mongodb_uri>')
db = client['<db_name>']
users = db['users']

admin_permission = Permission(RoleNeed('admin'))
user_permission = Permission(RoleNeed('user'))

class User(UserMixin):
    def __init__(self, user_data):
        self.id = user_data['username']
        self.password = user_data['password']
        self.role = user_data.get('role')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password)

@login_manager.user_loader
def load_user(user_id):
    user_data = users.find_one({'username': user_id})
    if user_data:
        return User(user_data)
    return None

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        existing_user = users.find_one({'$or': [{'username': username}, {'email': email}]})
        if existing_user:
            flash('Username or email already exists')
            return redirect(url_for('register'))
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user_data = {
            'username': username,
            'email': email,
            'password': hashed_password
        }
        users.insert_one(user_data)
        flash('Registration successful')
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user_data = users.find_one({'username': username})
        if not user_data:
            flash('Invalid username or password')
            return redirect(url_for('login'))
        user = User(user_data)
        if not user.check_password(password):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user)
        flash('Logged in successfully')
        return redirect(url_for('dashboard'))
    return render_template('login.html')

@app.route('/logout')
def logout():
    logout_user()
    flash('Logged out successfully')
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/dashboard/admin')
@admin_permission.require()
def dashboard_admin():
    return render_template('dashboard_admin.html')

@identity_loaded.connect_via(app)
def on_identity_loaded(sender, identity):
    identity.user = current_user
    if hasattr(current_user, 'role'):
        identity.provides.add(RoleNeed(current_user.role))

if __name__ == '__main__':
    app.run(debug=True)
