const AWS = require('aws-sdk')

const params = { region: 'localhost', endpoint: 'http://localhost:8000', accessKeyId: 'accessKeyId', secretAccessKey: 'secretAccessKey' };

const dynamodb = new AWS.DynamoDB(params);

const createTable = async () => {
  const tableName = 'dev-notes'
  const params = {
    TableName: tableName,
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' },
      { AttributeName: 'noteId', AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' },
      { AttributeName: 'noteId', KeyType: 'RANGE' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  }

  try {
    await dynamodb.createTable(params).promise()
  } catch (e) {
    console.log('already created table')
  }

  console.log('waiting for table to be created')

  await dynamodb.waitFor('tableExists', { TableName: tableName }).promise()

  console.log('table is completed')
}

createTable().catch(console.error)
