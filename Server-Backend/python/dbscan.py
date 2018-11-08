# script de clustering des mesures d'un réseau donné.
from __future__ import with_statement
import json
import sys
import numpy as np
from sklearn.cluster import DBSCAN
from sklearn import metrics
from sklearn.preprocessing import MinMaxScaler
import os

DBSCAN_EPS = 0.5
DBSCAN_MINPOINTS = 2
try:
    if len(sys.argv) >= 2:
        with open(sys.argv[1], "r+") as fileObj:
            splittedLines = fileObj.read().splitlines(True)
            data = splittedLines[0]
            fileObj.truncate(0)
            fileObj.flush()
            fileObj.close()
            if(len(splittedLines) > 1):                 # réécriture queue messages JSON
                fileObj.writelines(splittedLines[1:])
            if data != "":
                data = json.loads(data)
                #data=testData
                if len(data) > 0:
                    X = np.empty(shape=((len(data)), 3))
                    for idx, mesure in enumerate(data):
                        X[idx][0] = mesure["latitude"]
                        X[idx][1] = mesure["longitude"]
                        X[idx][2] = mesure["bandepassante"]
                    scaler = MinMaxScaler()
                    scaler.fit(X)
                    #print(X)
                    #print(scaler.transform(X))
                    X = scaler.transform(X)
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
                print("ERREUR: fichier vide")
    else:
        print("ERREUR : chemin du fichier non fourni")
except EnvironmentError as e:  # parent of IOError, OSError *and* WindowsError where available
    print('ERREUR : fichier de donnees data.json inacessible')
    print(e)
"""import json
import sys
import numpy as np
from sklearn.cluster import DBSCAN
from sklearn import metrics
from sklearn.preprocessing import MinMaxScaler
DBSCAN_EPS = 0.5
DBSCAN_MINPOINTS = 3

if len(sys.argv) >= 2:
    strData=""
    i=1
    while i < len(sys.argv):        # reconstruction des arguments
        strData += " " + str(sys.argv[i])
        i = i+1
    data=json.loads(strData)
    #data=testData
    if len(data) > 0:
        X = np.empty(shape=((len(data)), 3))
        for idx, mesure in enumerate(data):
            X[idx][0] = mesure["latitude"]
            X[idx][1] = mesure["longitude"]
            X[idx][2] = mesure["bandepassante"]
        scaler = MinMaxScaler()
        scaler.fit(X)
        #print(X)
        #print(scaler.transform(X))
        X = scaler.transform(X)
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

"""