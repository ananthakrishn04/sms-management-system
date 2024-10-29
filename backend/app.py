from flask import Flask, request, jsonify
from flask_jwt_extended import jwt_required
from models import add_country_operator, store_sms_metrics, get_high_priority_pairs, get_sms_metrics, get_sms_metrics_by_country, initialize_database_and_table
from sms_sessions import start_screen_session, stop_screen_session, restart_screen_session
from auth import configure_jwt, login
from alerts import alert_on_failure, alert_on_success_rate_drop
from prometheus_client import Counter, generate_latest, Gauge
from flask_cors import CORS

app = Flask(__name__)
jwt = configure_jwt(app)

CORS(app)

sms_counter = Counter('sms_sent', 'Total SMS sent', ['country', 'operator'])
success_rate_gauge = Gauge('success_rate', 'Success rate of SMS sent', ['country', 'operator'])
@app.route('/login', methods=['POST'])
def login_route():
    return login()

@app.route('/country_operator', methods=['POST'])
@jwt_required()
def add_country_operator_route():
    data = request.json
    try:
        add_country_operator(data)
        initialize_database_and_table()
        return jsonify({'msg': 'Country-operator added successfully'}), 200
    except Exception as e:
        return jsonify({'msg': str(e)}), 500

@app.route('/session/start/<string:program_name>', methods=['POST'])
@jwt_required()
def start_session(program_name):
    program , country, operator = program_name.split('_')
    id, country, operator, sms_sent, success_rate, failure_count, timestamp = get_sms_metrics_by_country(country, operator)[0].values()
    
    try:
        start_screen_session(program_name)
        success_rate = float((((sms_sent + 1) - failure_count)/ (sms_sent  + 1)) * 100)
        store_sms_metrics(country, operator, sms_sent+1, success_rate, failure_count)
        sms_counter.labels(country=country, operator=operator).inc(1)
        success_rate_gauge.labels(country=country, operator=operator).set(success_rate)
        if success_rate < 50:
            alert_on_success_rate_drop(f"{country}-{operator}", success_rate)
        return jsonify({'msg': f'{program_name} started'}), 200
    
    except Exception as e:
        success_rate = float((((sms_sent) - (failure_count+1))/ (sms_sent)) * 100)
        store_sms_metrics(country, operator, sms_sent, success_rate, failure_count+1)
        alert_on_failure(f"{country}-{operator}")
        return jsonify({'msg': str(e)}), 500

@app.route('/session/stop/<string:program_name>', methods=['POST'])
@jwt_required()
def stop_session(program_name):
    try:
        stop_screen_session(program_name)
        return jsonify({'msg': f'{program_name} stopped'}), 200
    except Exception as e:
        return jsonify({'msg': str(e)}), 500

@app.route('/session/restart/<string:program_name>',methods=['POST'])
@jwt_required()
def restart_session(program_name):
    try:
        restart_screen_session(program_name)
        return jsonify({'msg': f'{program_name} restarted'}), 200
    except Exception as e:
        return jsonify({'msg': str(e)}), 500

@app.route('/metrics')
def metrics():
    print(get_sms_metrics())
    return jsonify(data=get_sms_metrics()) , 200

@app.route('/health', methods=['POST'])
def health():
    return jsonify({'message':'UP'}) , 200

# Main entry point
if __name__ == "__main__":
    app.run(debug=True)
