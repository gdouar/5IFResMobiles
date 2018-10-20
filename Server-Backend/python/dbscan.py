# script de clustering des mesures d'un réseau donné.
import json
import sys
import numpy as np
from sklearn.cluster import DBSCAN
from sklearn import metrics
DBSCAN_EPS = 0.5
DBSCAN_MINPOINTS = 2

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
        clustering = DBSCAN(eps=DBSCAN_EPS, min_samples=DBSCAN_MINPOINTS).fit(X)
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

