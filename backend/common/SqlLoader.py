import os


def loadSqlQueries(directory_path: str) -> dict:
    queries = {}
    for file_name in os.listdir(directory_path):
        if file_name.endswith('.sql'):
            file_path = os.path.join(directory_path, file_name)
            with open(file_path, 'r') as file:
                current_query_name = None
                current_query = []
                for line in file:
                    if "-- name:" in line:
                        if current_query_name:
                            queries[current_query_name] = ''.join(
                                current_query).strip()
                            current_query = []
                        current_query_name = line.split("-- name:")[1].strip()
                    else:
                        current_query.append(line)
                if current_query_name:
                    queries[current_query_name] = ''.join(
                        current_query).strip()
    return queries
