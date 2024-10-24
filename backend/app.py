from flask import Flask, request, jsonify
from flask_jwt_extended import jwt_required
from models import add_country_operator, store_sms_metrics, get_high_priority_pairs
from sms_sessions import start_screen_session, stop_screen_session, restart_screen_session
from auth import configure_jwt, login
from alerts import alert_on_failure, alert_on_success_rate_drop
from prometheus_client import Counter, generate_latest

app = Flask(__name__)
jwt = configure_jwt(app)

sms_counter = Counter('sms_sent', 'Total SMS sent', ['country', 'operator'])
success_rate_counter = Counter('success_rate', 'Success rate of SMS', ['country', 'operator'])

@app.route('/login', methods=['POST'])
def login_route():
    return login()

@app.route('/country_operator', methods=['POST'])
@jwt_required()
def add_country_operator_route():
    data = request.json
    add_country_operator(data)
    return jsonify({'msg': 'Country-operator added successfully'}), 200

@app.route('/session/start/<string:program_name>', methods=['POST'])
@jwt_required()
def start_session(program_name):
    start_screen_session(program_name)
    return jsonify({'msg': f'{program_name} started'}), 200

@app.route('/session/stop/<string:program_name>', methods=['POST'])
@jwt_required()
def stop_session(program_name):
    stop_screen_session(program_name)
    return jsonify({'msg': f'{program_name} stopped'}), 200

@app.route('/session/restart/<string:program_name>',methods=['POST'])
@jwt_required()
def restart_session(program_name):
    restart_screen_session(program_name)
    return jsonify({'msg': f'{program_name} restarted'}), 200

@app.route('/metrics')
def metrics():
    return generate_latest()

@app.route('/send_sms', methods=['POST'])
@jwt_required()
def send_sms():
    data = request.json
    country = data['country']
    operator = data['operator']
    sms_sent = data['sms_sent']
    success_rate = data['success_rate']
    failure_count = data['failure_count']

    # Store SMS metrics in MySQL
    store_sms_metrics(country, operator, sms_sent, success_rate, failure_count)

    # Update Prometheus counters
    sms_counter.labels(country=country, operator=operator).inc(sms_sent)
    success_rate_counter.labels(country=country, operator=operator).inc(success_rate)

    # Trigger alerts if necessary
    if success_rate < 50:
        alert_on_success_rate_drop(f"{country}-{operator}", success_rate)

    return jsonify({'msg': 'SMS metrics logged'}), 200

@app.route('/health', methods=['POST'])
def health():
    return jsonify({'message':'UP'}) , 200

# Main entry point
if __name__ == "__main__":
    app.run(debug=True)
