from bottle import run, route, get, response, request
from elasticsearch import Elasticsearch

def search_for(search_query):
    es = Elasticsearch()
    search_results = es.search(
        index='twitter-bachelornation*', body={
            'query' : {
                'bool' : {
                    'must' : {
                        'match' : { 'text' : search_query }
                    }
                }
            },
            'size' : 500
        }
    )

    ret_dict = {}
    ret_dict['results'] = []

    tweets = search_results["hits"]["hits"]
    for tweet in tweets:
        #print(tweet)
        #print(tweet['_source'].keys())

        tweet_obj = {}
        tweet_obj['text'] = tweet['_source']['text']
        tweet_obj['account'] = tweet['_source']['user']['screen_name']
        tweet_obj['time'] = tweet['_source']['timestamp_ms']

        ret_dict['results'].append(tweet_obj)

    return ret_dict

"""
Thanks to Ron Rothman from https://stackoverflow.com/questions/17262170/bottle-py-enabling-cors-for-jquery-ajax-requests
for instructions on how to do this
"""
def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if request.method != 'OPTIONS':
            return fn(*args, **kwargs)

    return _enable_cors

@route('/search/<searchquery>')
@enable_cors
def index(searchquery):
    response.headers['Content-type'] = 'application/json'
    return search_for(searchquery)

run(host='localhost', port=8080)