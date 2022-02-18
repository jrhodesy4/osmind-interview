import AWS from "aws-sdk";

const params = { region: 'localhost', endpoint: 'http://localhost:8000' };

const client = new AWS.DynamoDB.DocumentClient(params);

export default {
  get   : (params) => client.get(params).promise(),
  put   : (params) => client.put(params).promise(),
  query : (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};
