from flask import Flask, request, jsonify
from flask_cors import CORS
from Recommendation_System import recommendationSystem

app = Flask(__name__)
cors = CORS(app)

@app.route('/api/recommendation_system', methods=['POST'])
def recommendation_system():
    print("Recommendation System called")

    data = request.json

    userid = data.get('param')
    
    recommendations = recommendationSystem(userid)
    print({'result': recommendations})
    return({'result': recommendations})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)