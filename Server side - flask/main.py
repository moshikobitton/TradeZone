##
from flask import Flask, request, jsonify
from flask_cors import CORS
import networkx as nx
import powerlaw

app = Flask(__name__)
cors = CORS(app)


def create_network(data, nodesDict):
    G = nx.Graph()
    nodes_to_remove = []

    # Add nodes and links to the graph
    for k in nodesDict:
        G.add_node(nodesDict.get(k)['id'], name=k)
    for row in data:
        G.add_edge(nodesDict[row.get('CouISO')]['id'],
                   nodesDict[row.get('ParISO')]['id'], strength=row.get('Value'))
    for node in G.nodes():
        if len(list(G.neighbors(node))) == 0:
            nodes_to_remove.append(node)
    for node in nodes_to_remove:
        G.remove_node(node)
    return G


def get_communities_newman_data(data, nodesDict):
    # Create an empty graph
    G = create_network(data, nodesDict)

    communities = nx.algorithms.community.greedy_modularity_communities(G)
    modularityNum = nx.algorithms.community.modularity(G, communities)

    nodes = []
    edges = []
    communityNodes = []
    communitiesData = []

    response = {"data": {"nodes": [], "edges": []},
                "modularity": modularityNum, "communitiesInfo": []}
    for i in range(len(communities)):

        total = 0
        continentsData = {'Europe': 0,
                          'Americas': 0, 'Asia': 0, 'Africa': 0, 'Oceania': 0, 'Total': 0}

        # Calculate the degree centrality for each node in the community
        centrality = nx.degree_centrality(G.subgraph(communities[i]))

        for cou in communities[i]:
            node = {"id": cou, "name": nodesDict[G.nodes[cou]['name']]['name'],
                    "continent": nodesDict[G.nodes[cou]['name']]['continent'], "group": i + 1,
                    "code": nodesDict[G.nodes[cou]['name']]['code'], "degree": centrality[cou]}
            nodesDict[G.nodes[cou]['name']]['group'] = i + 1
            nodes.append(node)
            communityNodes.append(node)
            continentsData[nodesDict[G.nodes[cou]['name']]['continent']] += 1
            total += 1

        for k in continentsData:
            continentsData[k] = round((continentsData[k] / total) * 100, 2)
        continentsData['Total'] = total

        communitiesData.append(
            {'group': i + 1, 'data': continentsData.copy(), 'nodes': communityNodes})
        communityNodes = []

    idEdge = 300
    edgesCommunity = [[], [], [], [], [], [], [], []]
    for s, t, v in G.edges(data='strength'):
        edgeToAdd = {"source": s, "target": t,
                     "color": "#e0e0e0", 'value': v}

        edges.append(edgeToAdd)
        idEdge += 1
        groupKey = nodesDict[G.nodes[s]['name']]['group']

        if groupKey == nodesDict[G.nodes[t]['name']]['group']:
            edgesCommunity[groupKey].append(edgeToAdd)

    for i in range(1, len(edgesCommunity)):
        for communityVar in communitiesData:
            if communityVar['group'] == i:
                communityVar['edges'] = edgesCommunity[i]
                communityVar['networkType'] = determine_network_type(
                    communityVar['nodes'], edgesCommunity[i])

    response.get('data')['nodes'] = nodes
    response.get('data')['edges'] = edges
    response['communitiesInfo'] = communitiesData
    return response


def determine_network_type(nodes, links):
    # Create graph
    G = nx.Graph()
    for n in nodes:
        try:
            G.add_node(n['id'], name=n['name'])
        except:
            print("Failed in nodes")
    for l in links:
        try:
            G.add_edge(l['source'], l['target'], strength=l['value'])
        except:
            print("Failed in links")
    # Get largest connected component
    largest_cc = max(nx.connected_components(G), key=len)
    # Create a subgraph containing only the largest connected component
    G = G.subgraph(largest_cc)

    # Calculate average path length
    avg_path_length = nx.average_shortest_path_length(G)

    # Calculate clustering coefficient
    clustering_coefficient = nx.average_clustering(G)

    # Determine if it's a small-world network
    degree_sequence = sorted([d for n, d in G.degree()], reverse=True)
    if degree_sequence[1] == 1:
        return "This network is Scale-Free"

    random_graph = nx.random_reference(G, niter=100, connectivity=False)
    random_avg_path_length = nx.average_shortest_path_length(random_graph)
    random_clustering_coefficient = nx.average_clustering(random_graph)

    if avg_path_length < random_avg_path_length and clustering_coefficient >= random_clustering_coefficient:
        return "This network is Small-World"

    # Determine if it's a scale-free network
    fit = powerlaw.Fit(degree_sequence)
    alpha = fit.alpha

    if alpha > 2:
        return "This network is Scale-Free"
    else:
        return "This network is neither Small-World nor Scale-Free"


@app.route('/newman', methods=['POST'])
def get_newman_communities():
    data = request.get_json()
    if data == {} or data.get('countries') is None or data.get('trades') is None:
        return

    nodesDict = {}
    for country in data.get('countries'):
        nodesDict[country.get('Code')] = {'id': country.get('Id'),
                                          'name': country.get('Name'), 'continent': country.get('Continent'),
                                          'group': 0, "code": country.get('Code')}

    newmanData = get_communities_newman_data(data.get('trades'), nodesDict)
    response = jsonify(newmanData)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run(port=5001)
##
import networkx as nx
import pymssql as pymssql
import powerlaw

errors = []


def determine_network_type2(nodes, links):
    # Create graph
    G = nx.Graph()
    for row in nodes:
        try:
            G.add_node(row[2], name=row[1])
        except:
            print("Failed in nodes")
    for l in links:
        try:
            G.add_edge(l[0], l[1], strength=l[4])
        except:
            print("Failed in links")
    # Get largest connected component
    largest_cc = max(nx.connected_components(G), key=len)
    # Create a subgraph containing only the largest connected component
    G = G.subgraph(largest_cc)
    avg_path_length = 0
    try:
    # Calculate average path length
        avg_path_length = nx.average_shortest_path_length(G)
    except:
        raise Exception("Fuckkkk")
    # Calculate clustering coefficient
    clustering_coefficient = nx.average_clustering(G)

    # Determine if it's a small-world network
    degree_sequence = sorted([d for n, d in G.degree()], reverse=True)
    if degree_sequence[1] == 1:
        return "SF"

    random_graph = nx.random_reference(G, niter=100, connectivity=False)
    random_avg_path_length = nx.average_shortest_path_length(random_graph)
    random_clustering_coefficient = nx.average_clustering(random_graph)

    if avg_path_length < random_avg_path_length and clustering_coefficient >= random_clustering_coefficient:
        return "SM"

    # Determine if it's a scale-free network
    fit = powerlaw.Fit(degree_sequence)
    alpha = fit.alpha

    if alpha > 2:
        return "SF"
    else:
        return "NN"


conn = pymssql.connect(server='Media.ruppin.ac.il', user='igroup101', password='igroup101_69556',
                       database='igroup101_prod')

cursor = conn.cursor()
# Call the stored procedure
stored_proc_name = 'spGetAllProducts'
cursor.callproc(stored_proc_name)
products = cursor.fetchall()

conn = pymssql.connect(server='Media.ruppin.ac.il', user='igroup101', password='igroup101_69556',
                       database='igroup101_prod')

cursor = conn.cursor()
# Call the stored procedure
stored_proc_name = 'spGetAllCountries'
cursor.callproc(stored_proc_name)
countries = cursor.fetchall()

for i in range(12, len(products)):
    j = 1990
    if i == 6:
        j = 2021
    for year in range(j, 2022):
        param1 = year
        param2 = products[i][0]
        print(i + 1, "-", param1, param2)
        conn = pymssql.connect(server='Media.ruppin.ac.il', user='igroup101', password='igroup101_69556',
                               database='igroup101_prod')
        cursor = conn.cursor()
        stored_proc_name = 'spReadTradesByIndAndYear'

        # Execute the stored procedure with the parameters
        cursor.execute(f"EXEC {stored_proc_name} @ind=%s, @year=%s", (param2, param1))

        # Fetch the results
        trades = cursor.fetchall()
        # Close the cursor and connection
        cursor.close()
        conn.close()
        print(len(trades))
        param3 = 1
        try:
            param3 = determine_network_type2(countries, trades)
        except:
            errors.append((param1, param2))
            print("ERROR!", param1, param2)
            year = year - 1
            print(errors)
            continue
        print(param3)
        conn = pymssql.connect(server='Media.ruppin.ac.il', user='igroup101', password='igroup101_69556',
                               database='igroup101_prod')
        cursor = conn.cursor()

        # Execute the stored procedure with the parameters
        cursor.execute(f"EXEC spInsertNetworkType @year=%s, @code=%s, @networkType=%s", (param1, param2, param3))

        # Commit the changes (if necessary)
        conn.commit()

        # Close the cursor and connection
        cursor.close()
        conn.close()

print(errors)


##