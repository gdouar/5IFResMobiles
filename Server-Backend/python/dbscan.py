# script de clustering des mesures d'un réseau donné.
import json
import sys
import numpy as np
from sklearn.cluster import DBSCAN
from sklearn import metrics
testData = [
            {
                "idmesure": 1356,
                "latitude": 45.7845,
                "longitude": 4.88172,
                "datemesure": {
                    "date": "2018-07-28 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 14.8603,
                "forcesignal": 4
            },
            {
                "idmesure": 1389,
                "latitude": 45.7845,
                "longitude": 4.88126,
                "datemesure": {
                    "date": "2018-03-10 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 16.538,
                "forcesignal": 2
            },
            {
                "idmesure": 1424,
                "latitude": 45.7846,
                "longitude": 4.88257,
                "datemesure": {
                    "date": "2018-11-16 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 16.655,
                "forcesignal": 1
            },
            {
                "idmesure": 1430,
                "latitude": 45.784,
                "longitude": 4.88259,
                "datemesure": {
                    "date": "2018-12-22 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 15.6713,
                "forcesignal": 4
            },
            {
                "idmesure": 1456,
                "latitude": 45.784,
                "longitude": 4.87958,
                "datemesure": {
                    "date": "2019-01-22 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 17.8081,
                "forcesignal": 3
            },
            {
                "idmesure": 1466,
                "latitude": 45.7841,
                "longitude": 4.88136,
                "datemesure": {
                    "date": "2018-09-19 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 16.9704,
                "forcesignal": 3
            },
            {
                "idmesure": 1523,
                "latitude": 45.7841,
                "longitude": 4.88398,
                "datemesure": {
                    "date": "2018-08-10 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 16.228,
                "forcesignal": 4
            },
            {
                "idmesure": 1560,
                "latitude": 45.7842,
                "longitude": 4.88222,
                "datemesure": {
                    "date": "2018-11-23 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 14.4484,
                "forcesignal": 4
            },
            {
                "idmesure": 1565,
                "latitude": 45.7846,
                "longitude": 4.87884,
                "datemesure": {
                    "date": "2018-07-05 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 17.6812,
                "forcesignal": 5
            },
            {
                "idmesure": 1588,
                "latitude": 45.7845,
                "longitude": 4.88347,
                "datemesure": {
                    "date": "2018-07-22 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 16.5594,
                "forcesignal": 1
            },
            {
                "idmesure": 1698,
                "latitude": 45.7845,
                "longitude": 4.88022,
                "datemesure": {
                    "date": "2019-01-12 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 14.2321,
                "forcesignal": 3
            },
            {
                "idmesure": 1704,
                "latitude": 45.7846,
                "longitude": 4.88273,
                "datemesure": {
                    "date": "2018-11-16 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 14.9785,
                "forcesignal": 5
            },
            {
                "idmesure": 1723,
                "latitude": 45.7844,
                "longitude": 4.87959,
                "datemesure": {
                    "date": "2018-08-06 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 15.8611,
                "forcesignal": 1
            },
            {
                "idmesure": 1733,
                "latitude": 45.7846,
                "longitude": 4.88279,
                "datemesure": {
                    "date": "2019-01-27 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 17.6451,
                "forcesignal": 5
            },
            {
                "idmesure": 1745,
                "latitude": 45.7845,
                "longitude": 4.8794,
                "datemesure": {
                    "date": "2018-03-07 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 16.3687,
                "forcesignal": 4
            },
            {
                "idmesure": 1769,
                "latitude": 45.7843,
                "longitude": 4.88029,
                "datemesure": {
                    "date": "2018-10-02 00:00:00.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Berlin"
                },
                "bandepassante": 16.2056,
                "forcesignal": 4
            }
        ]
if len(sys.argv) >= 2:
    strData=""
    i=1
    while i < len(sys.argv):        # reconstruction des arguments
        strData += " " + str(sys.argv[i])
        i = i+1
    data=json.loads(strData)
    if len(data) > 0:
        X = np.empty(shape=((len(data)), 3))
        for idx, mesure in enumerate(data):
            X[idx][0] = mesure["latitude"]
            X[idx][1] = mesure["longitude"]
            X[idx][2] = mesure["bandepassante"]
        clustering = DBSCAN(eps=0.5, min_samples=2).fit(X)
        result = clustering.labels_
        clusters2mesures = {}
        for idx, cluster in enumerate(result):
            strCluster = "zone" + str(cluster)
            if not(strCluster in clusters2mesures):
                clusters2mesures[strCluster] = []
            clusters2mesures[strCluster].append(data[idx])
        #print(X)
        print(json.dumps(clusters2mesures))
        #print(len(X))
        #print(result)
    else:   
        print(json.dumps({}))
else:
    raise Exception('Aucun input JSON détecté')